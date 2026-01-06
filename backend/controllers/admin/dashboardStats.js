import Contact from "../../models/contact.js";
import { calculateOverallGrowth, response } from "../../lib/helperfunction.js";
import Newsletter from "../../models/newsletter.js";

export default async function dashboardStatsController(req, res, next) {
  try {
    // Date Ranges
    const now = new Date();

    // Start of current month
    const startOfCurrentMonth = new Date(now.getFullYear(), now.getMonth(), 1);

    // Start of last month
    const startOfLastMonth = new Date(now.getFullYear(), now.getMonth() - 1, 1);
    console.log(startOfCurrentMonth, startOfLastMonth);
    // End of last month
    const endOfLastMonth = new Date(
      now.getFullYear(),
      now.getMonth(),
      0,
      23,
      59,
      59,
      999
    );
    console.log(endOfLastMonth);
    // Parallel DB Queries
    const [
      totalContacts,
      currentMonthContacts,
      lastMonthContacts,
      totalSubscribers,
      currentMonthSubscribers,
      lastMonthSubscribers,
      pendingResponses,
      recentContacts,
    ] = await Promise.all([
      // Total contacts
      Contact.countDocuments(),

      // Current month contacts
      Contact.countDocuments({
        createdAt: { $gte: startOfCurrentMonth },
      }),

      // Last month contacts
      Contact.countDocuments({
        createdAt: {
          $gte: startOfLastMonth,
          $lte: endOfLastMonth,
        },
      }),

      //   total subscriber
      Newsletter.countDocuments({ status: "active" }),

      // current month subscribers
      Newsletter.countDocuments({
        createdAt: { $gte: startOfCurrentMonth },
      }),

      // last month subscribers
      Newsletter.countDocuments({
        createdAt: {
          $gte: startOfLastMonth,
          $lte: endOfLastMonth,
        },
      }),

      // Pending responses
      Contact.countDocuments({ $or: [{ status: "new" }, { status: "read" }] }),

      // Recent 10 contacts
      Contact.find()
        .sort({ createdAt: -1 })
        .limit(10)
        .select("name email subject phone message createdAt status"),
    ]);

    const overallGrowth = calculateOverallGrowth(
      currentMonthContacts,
      lastMonthContacts,
      currentMonthSubscribers,
      lastMonthSubscribers
    );

    // Response
    return response(res, 200, true, "Dashboard stats fetched successfully", {
      stats: {
        totalContacts,
        pendingResponses,
        totalNewsletters: totalSubscribers,
        monthlyGrowth: overallGrowth, // can be negative also
        contactsThisMonth: currentMonthContacts,
        newslettersThisMonth: currentMonthSubscribers,
      },
      recentContacts,
    });
  } catch (error) {
    next(error);
  }
}
