import Newsletter from "../../models/newsletter.js";
import { response } from "../../lib/helperfunction.js";

export default async function deleteNewsletterController(req, res, next) {
  try {
    const newsletter = await Newsletter.findByIdAndDelete(req.params.id);
    if (!newsletter) {
      return response(res, 404, false, "Newsletter not found");
    }
    return response(res, 200, true, "Newsletter deleted successfully");
  } catch (error) {
    next(error);
  }
}
