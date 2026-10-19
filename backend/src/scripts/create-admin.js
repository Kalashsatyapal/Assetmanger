
require("dotenv").config();

const bcrypt = require("bcrypt");
const prisma = require("../lib/prisma");

async function main() {
  const email = process.env.ADMIN_EMAIL?.trim().toLowerCase();
  const password = process.env.ADMIN_PASSWORD;

  if (!email || !password) {
    throw new Error(
      "Set ADMIN_EMAIL and ADMIN_PASSWORD before running this script."
    );
  }

  if (password.length < 12 || Buffer.byteLength(password, "utf8") > 72) {
    throw new Error(
      "Admin password must be at least 12 characters and at most 72 UTF-8 bytes."
    );
  }

  const existing = await prisma.user.findUnique({
    where: { email },
  });

  if (existing) {
    if (existing.role !== "ADMIN") {
      throw new Error(
        "This email already belongs to a non-admin account. No changes made."
      );
    }

    console.log("An administrator with this email already exists.");
    return;
  }

  const passwordHash = await bcrypt.hash(password, 12);

  await prisma.user.create({
    data: {
      fullName: "System Administrator",
      email,
      passwordHash,
      role: "ADMIN",
      isActive: true,
    },
  });

  console.log("Administrator created successfully.");
}

main()
  .catch((error) => {
    console.error("Admin creation failed:", error.message);
    process.exitCode = 1;
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
