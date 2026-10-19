
require("dotenv").config();

const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

async function testDatabase() {
  try {
    const result = await prisma.$queryRaw`
      SELECT DATABASE() AS databaseName,
             VERSION() AS mysqlVersion
    `;

    console.log("Database connection successful!");
    console.log(result);
  } catch (error) {
    console.error("Database connection failed:", error.message);
    process.exitCode = 1;
  } finally {
    await prisma.$disconnect();
  }
}

testDatabase();
