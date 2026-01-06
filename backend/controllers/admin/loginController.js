import { response } from "../../lib/helperfunction.js";
import schema from "../../lib/schema.js";
import Admin from "../../models/admin.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import RefreshToken from "../../models/refreshtoken.js";

export default async function loginController(req, res, next) {
  try {
    const { email, password } = req.body;
    const loginSchema = schema.pick({
      email: true,
      password: true,
    });
    const validate = loginSchema.safeParse({
      email,
      password,
    });
    if (!validate.success) {
      return response(res, 400, false, validate.error.issues[0].message);
    }

    const user = await Admin.findOne({ email });
    if (!user) {
      return response(res, 404, false, "User not found");
    }

    if (user.role !== "owner") {
      return response(res, 401, false, "You are not authorized to login");
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return response(res, 401, false, "Invalid password");
    }

    // delete the previous refresh token from db
    await RefreshToken.deleteMany({ user: user._id });

    const token = jwt.sign(
      { id: user._id, role: user.role },
      process.env.JWT_SECRET,
      {
        expiresIn: "1h",
      }
    );

    const refreshToken = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });

    await RefreshToken.create({
      token: refreshToken,
      user: user._id,
      expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
    });

    const isProduction = process.env.NODE_ENV === "production";

    return res
      .cookie("token", token, {
        httpOnly: true,
        secure: isProduction, // ✅ prod: true, dev: false
        sameSite: isProduction ? "none" : "lax",
        maxAge: 60 * 60 * 1000, // 1 hour
      })
      .cookie("refreshToken", refreshToken, {
        httpOnly: true,
        secure: isProduction, // ✅ prod: true, dev: false
        sameSite: isProduction ? "none" : "lax",
        maxAge: 7 * 24 * 60 * 60 * 1000, // 1 hour
      })
      .json({
        success: true,
        message: "Login successful",
        data: {
          name: user.name,
          email: user.email,
          role: user.role,
          id: user._id,
        },
      });
  } catch (error) {
    console.log("Error while logging in", error);
    next(error);
  }
}
