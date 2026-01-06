import Contact from "../../models/contact.js";
import { response } from "../../lib/helperfunction.js";

export default async function getContactsController(req, res, next) {
  try {
    const contact = await Contact.findById(req.params.id).select(
      "-updatedAt -__v"
    );
    if (!contact) {
      return response(res, 404, false, "Contact not found");
    }
    return response(res, 200, true, "Contact fetched successfully", contact);
  } catch (error) {
    next(error);
  }
}
