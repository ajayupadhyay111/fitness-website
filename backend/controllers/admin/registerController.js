import { response } from "../../lib/helperfunction.js";
import schema from "../../lib/schema.js";
import Admin from "../../models/admin.js";
import bcrypt from "bcryptjs";

export default async function registerController(req, res) {
  try {
    const { name, email, password, role, status } = req.body;
    const registerSchema = schema.pick({
      name: true,
      email: true,
      password: true,
      role: true,
      status: true,
    });
    const validate = registerSchema.safeParse({
      name,
      email,
      password,
      role,
      status,
    });
    if (!validate.success) {
      return response(res, 400, false, validate.error.issues[0].message);
    }

    const user = await Admin.findOne({ email });
    if (user) {
      return response(res, 409, false, "User already exists");
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    await Admin.create({
      name,
      email,
      password: hashedPassword,
      role,
      status,
    });
    return response(res, 201, true, "User registered successfully", {});
  } catch (error) {
    console.log("Error while registering user", error);
    next(error);
  }
}
