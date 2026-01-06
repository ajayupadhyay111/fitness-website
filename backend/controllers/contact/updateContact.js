import Contact from "../../models/contact.js";
import { response } from "../../lib/helperfunction.js";

export default async function updateContactController(req, res, next) {
  try {
    const contact = await Contact.findById(req.params.id);
    if (!contact) {
      return response(res, 404, false, "Contact not found");
    }
    contact.status = req.body.status;
    if (req.body.status === "responded") {
      contact.responded_at = Date.now();
    }
    await contact.save();
    return response(res, 201, true, "Contact updated successfully");
  } catch (error) {
    console.log(error.message);
    next(error);
  }
}
