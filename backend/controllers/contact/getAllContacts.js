import Contact from "../../models/contact.js";
import { response } from "../../lib/helperfunction.js";
export default async function getAllContactsController(req, res, next) {
  try {
    const { searchTitle = "", status, page = 1, limit = 5 } = req.query;

    //  Pagination
    const pageNumber = Number(page) || 1;
    const pageSize = Number(limit) || 10;
    const skip = (pageNumber - 1) * pageSize;

    //  Filters
    const filter = {};

    // search by name, email, subject, message
    if (searchTitle) {
      filter.$or = [
        { name: { $regex: searchTitle, $options: "i" } },
        { email: { $regex: searchTitle, $options: "i" } },
        { subject: { $regex: searchTitle, $options: "i" } },
        { message: { $regex: searchTitle, $options: "i" } },
      ];
    }

    // status filter
    if (status) {
      if (status === "all")
        filter.status = { $in: ["new", "read", "responded"] };
      else filter.status = status;
    }

    // DB Queries
    const [contacts, total] = await Promise.all([
      Contact.find(filter)
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(pageSize)
        .select("-updatedAt -__v -createdAt"),

      Contact.countDocuments(filter),
    ]);

    // Response
    return response(res, 200, true, "Contacts fetched successfully", {
      data: contacts,
      pagination: {
        total,
        page: pageNumber,
        limit: pageSize,
        totalPages: Math.ceil(total / pageSize),
      },
    });
  } catch (error) {
    next(error);
  }
}
