import { response } from "../../lib/helperfunction.js";
import Admin from "../../models/admin.js";

export default async function meController(req, res, next) {
  try {
    const user = await Admin.findById(req.user_id).select(
      "_id name email role"
    );
    if (!user) {
      return response(res, 404, false, "User not found");
    }
    return response(res, 200, true, "", {
      name: user.name,
      email: user.email,
      role: user.role,
      id: user._id,
    });
  } catch (error) {
    console.log("Error while getting user", error);
    return response(res, 500, false, error.message);
  }
}
