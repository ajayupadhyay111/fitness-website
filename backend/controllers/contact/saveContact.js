import { response } from "../../lib/helperfunction.js";
import schema from "../../lib/schema.js";
import Contact from "../../models/contact.js";

export default async function saveContactController(req, res, next) {
  try {
    const { name, email, phone, subject, message } = req.body;
    const contactSchema = schema.pick({
      name: true,
      email: true,
      phone: true,
      subject: true,
      message: true,
    });
    const validate = contactSchema.safeParse({
      name,
      email,
      phone,
      subject,
      message,
    });
    if (!validate.success) {
      return response(res, 400, false, validate.error.issues[0].message);
    }

    // start of today
    const startOfDay = new Date();
    startOfDay.setHours(0, 0, 0, 0);

    // end of today
    const endOfDay = new Date();
    endOfDay.setHours(23, 59, 59, 999);

    const count = await Contact.countDocuments({
      email,
      createdAt: {
        $gte: startOfDay,
        $lte: endOfDay,
      },
    });

    if (count >= 3) {
      return response(res, 429, false, "You can only send 3 messages per day");
    }

    await Contact.create({
      name,
      email,
      phone,
      subject,
      message,
    });
    return response(res, 201, true, "Contact saved successfully", {});
  } catch (error) {
    next(error);
  }
}
