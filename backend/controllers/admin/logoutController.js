import RefreshToken from "../../models/refreshtoken.js";
import { response } from "../../lib/helperfunction.js";

export default async function logoutController(req, res, next) {
  try {
    const token = req.cookies.token;
    const refreshToken = req.cookies.refreshToken;
    if (!token || !refreshToken) {
      return response(res, 401, false, "Unauthorized");
    }
    await RefreshToken.deleteOne({ token: refreshToken });
    res.clearCookie("token");
    res.clearCookie("refreshToken");
    return response(res, 200, true, "Logout successful");
  } catch (error) {
    next(error);
  }
}
