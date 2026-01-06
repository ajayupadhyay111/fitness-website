import { response } from "../../lib/helperfunction.js";
import schema from "../../lib/schema.js";
import Newsletter from "../../models/newsletter.js";

export default async function subscribeController(req, res, next) {
  try {
    const { email, source } = req.body;
    const NewsletterSchema = schema.pick({
      email: true,
      source: true,
    });
    const validatedData = NewsletterSchema.safeParse({ email, source });
    if (validatedData.error) {
      return response(res, 400, false, validatedData.error.issues[0].message);
    }
    if (!email) {
      return response(res, 400, false, "Email is required");
    }

    const subscriber = await Newsletter.findOne({ email });
    if (subscriber) {
      return response(res, 400, true, "You are already subscribed.");
    }
    await Newsletter.create({ email, source });
    return response(res, 201, true, "Subscribed successfully");
  } catch (error) {
    next(error);
  }
}
