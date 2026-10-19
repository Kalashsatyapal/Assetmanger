const { z } = require("zod");
const registerSchema = z.object({
    fullName: z.string().trim().min(2, "name must contain atleast 2 characters").max(120, "name not exceed 120 characters"),

    email:
        z.string().trim().email("must enter a valid email").max(191).transform((value) => value.toLowerCase()),
    password:
    z.string().min(8,"Password must contain at least 8 character").max(72,"Password is too long"),
}).strict();

const loginSchema=z.object({
    email:
        z.string().trim().email("must enter a valid email").max(191).transform((value) => value.toLowerCase()),
    password: 
        z.string().min(1,"password is required").max(72),
}).strict();
module.exports={
registerSchema,loginSchema,
};