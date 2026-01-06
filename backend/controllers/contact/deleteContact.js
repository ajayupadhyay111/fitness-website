import Contact from "../../models/contact.js";
import { response } from "../../lib/helperfunction.js";

export default async function deleteContactController(req, res, next) {
  try {
    const contact = await Contact.findByIdAndDelete(req.params.id);
    if (!contact) {
      return response(res, 404, false, "Contact not found");
    }
    return response(res, 200, true, "Contact deleted successfully");
  } catch (error) {
    console.log(error.message);
    next(error);
  }
}
