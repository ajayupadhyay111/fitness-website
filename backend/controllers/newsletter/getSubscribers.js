import Newsletter from "../../models/newsletter.js";
import { response } from "../../lib/helperfunction.js";

export default async function getSubscribersController(req, res, next) {
  try {
    const { searchTitle = "", status, page = 1, limit = 10 } = req.query;

    //  Pagination
    const pageNumber = Number(page) || 1;
    const pageSize = Number(limit) || 10;
    const skip = (pageNumber - 1) * pageSize;

    //  Filters
    const filter = {};

    // search by email
    if (searchTitle) {
      filter.$or = [{ email: { $regex: searchTitle, $options: "i" } }];
    }

    // status filter
    if (status) {
      if (status === "all") {
        filter.status = { $in: ["active", "unsubscribed"] };
      } else {
        filter.status = status;
      }
    }

    // DB Queries
    const [subscribers, total] = await Promise.all([
      Newsletter.find(filter)
        .sort({ subscribed_at: -1 })
        .skip(skip)
        .limit(pageSize)
        .select("-updatedAt -__v -createdAt -unsubscribed_at"),

      Newsletter.countDocuments(filter),
    ]);

    // Response
    return response(res, 200, true, "Subscribers fetched successfully", {
      data: subscribers,
      totalSubscribers: total,
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
