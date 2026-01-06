import { z } from "zod";

const schema = z.object({
  name: z.string().min(3, "Name must be at least 3 characters long").trim(),
  email: z.string().email("Invalid email address").trim(),
  password: z
    .string()
    .min(6, "Password must be at least 6 characters long")
    .trim()
    .regex(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
      "Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character"
    ),
  role: z.enum(["admin", "owner"]).default("owner"),
  status: z.enum(["active", "inactive"]).default("active"),
  phone: z
    .string()
    .regex(
      /^[6-9]\d{9}$/,
      "Phone number must be a valid 10-digit Indian mobile number"
    ),
  subject: z
    .string()
    .min(3, "Subject must be at least 3 characters long")
    .max(100, "Subject must not exceed 100 characters")
    .trim(),

  message: z
    .string()
    .min(10, "Message must be at least 10 characters long")
    .max(1000, "Message must not exceed 1000 characters")
    .trim(),
  source: z
    .string()
    .regex(/^[a-zA-Z ]+$/, "source is not valid string")
    .optional(),
});

export default schema;
