import RefreshToken from "../../models/refreshtoken.js";
import jwt from "jsonwebtoken";
import Admin from "../../models/admin.js";
import { response } from "../../lib/helperfunction.js";

export default async function refreshTokenController(req, res, next) {
  try {
    const refreshToken = req.cookies.refreshToken;
    if (!refreshToken) {
      return response(res, 401, false, "Refresh token not found");
    }

    const verify = jwt.verify(refreshToken, process.env.JWT_SECRET);
    if (!verify) {
      return response(res, 401, false, "Invalid refresh token");
    }

    const refreshTokenDoc = await RefreshToken.findOne({ token: refreshToken });
    if (!refreshTokenDoc) {
      return response(res, 401, false, "Invalid refresh token");
    }
    const user = await Admin.findById(refreshTokenDoc.user);
    if (!user) {
      return response(res, 401, false, "User not found");
    }

    const token = jwt.sign(
      { id: user._id, role: user.role },
      process.env.JWT_SECRET,
      {
        expiresIn: "1h",
      }
    );

    const isProduction = process.env.NODE_ENV === "production";

    return res
      .cookie("token", token, {
        httpOnly: true,
        secure: isProduction, // ✅ prod: true, dev: false
        sameSite: isProduction ? "none" : "lax",
        maxAge: 60 * 60 * 1000, // 1 hour
      })
      .json({
        success: true,
        message: "Refresh token successful",
      });
  } catch (error) {
    console.log("Error while refreshing token", error);
    return response(res, 500, false, error.message);
  }
}
