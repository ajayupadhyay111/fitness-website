import jwt, { decode } from "jsonwebtoken";
import { response } from "../lib/helperfunction.js";
export default async function AdminAuth(req, res, next) {
  try {
    const token = req.cookies.token;
    if (!token) {
      console.log("No token found");
      return response(res, 401, false, "Unauthorized");
    }
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    if (!decoded) {
      console.log("Invalid token");
      return response(res, 401, false, "Unauthorized");
    }
    if (decoded.role !== "owner") {
      console.log("Invalid role");
      return response(res, 401, false, "Unauthorized");
    }
    req.user_id = decoded.id;
    next();
  } catch (error) {
    console.log("Error while verifying token", error);
    return next(error);
  }
}
