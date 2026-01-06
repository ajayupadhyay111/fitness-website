import { Mail, MessageSquare, Clock, TrendingUp } from "lucide-react";
import AdminLayout from "../../components/admin/AdminLayout";
import StatsCard from "../../components/admin/StatsCard";
import type { ContactSubmission } from "../../types/admin";
import { useQuery } from "@tanstack/react-query";
import { axiosInstance } from "../../lib/axios";

const Dashboard = () => {
  const { data: dashboardStats } = useQuery({
    queryKey: ["dashboardStats"],
    queryFn: async () =>
      await axiosInstance.get("/admin/dashboard").then((res) => res.data),
  });
  const stats = dashboardStats?.data?.stats;
  const recentContacts = dashboardStats?.data?.recentContacts;

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  };

  const getStatusColor = (status: ContactSubmission["status"]) => {
    switch (status) {
      case "new":
        return "bg-blue-100 text-blue-700";
      case "read":
        return "bg-yellow-100 text-yellow-700";
      case "responded":
        return "bg-green-100 text-green-700";
      default:
        return "bg-gray-100 text-gray-700";
    }
  };

  return (
    <AdminLayout>
      <div className="space-y-8">
        {/* Header */}
        <div>
          <h1 className="text-3xl font-bold text-secondary mb-2">
            Dashboard Overview
          </h1>
          <p className="text-gray-600">
            Welcome back! Here's what's happening with FitLife today.
          </p>
        </div>

        {/* Stats Grid */}
        {stats && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <StatsCard
              title="Total Contacts"
              value={stats.totalContacts}
              icon={MessageSquare}
              description={`${stats.contactsThisMonth} this month`}
            />
            <StatsCard
              title="Newsletter Subscribers"
              value={stats.totalNewsletters}
              icon={Mail}
              description={`${stats.newslettersThisMonth} this month`}
            />
            <StatsCard
              title="Pending Responses"
              value={stats.pendingResponses}
              icon={Clock}
              description="Needs attention"
            />
            <StatsCard
              title="Monthly Growth"
              value={`${stats.monthlyGrowth}%`}
              icon={TrendingUp}
              trend={{
                value: stats.monthlyGrowth,
                isPositive: stats.monthlyGrowth >= 0,
              }}
            />
          </div>
        )}

        {/* Recent Contact Submissions */}
        <div className="bg-white rounded-xl shadow-md border border-gray-100">
          <div className="p-6 border-b border-gray-100">
            <h2 className="text-xl font-bold text-secondary">
              Recent Contact Submissions
            </h2>
            <p className="text-sm text-gray-600 mt-1">
              Latest inquiries from potential members
            </p>
          </div>

          <div className="divide-y divide-gray-100">
            {recentContacts?.length === 0 ? (
              <div className="p-8 text-center text-gray-500">
                <MessageSquare className="w-12 h-12 mx-auto mb-3 text-gray-300" />
                <p>No contact submissions yet</p>
              </div>
            ) : (
              recentContacts?.map((contact: ContactSubmission) => (
                <div
                  key={contact._id}
                  className="p-6 hover:bg-gray-50 transition-colors"
                >
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center space-x-3 mb-2">
                        <h3 className="font-semibold text-secondary">
                          {contact.name}
                        </h3>
                        <span
                          className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(
                            contact.status
                          )}`}
                        >
                          {contact.status.charAt(0).toUpperCase() +
                            contact.status.slice(1)}
                        </span>
                      </div>
                      <p className="text-sm text-gray-600 mb-1">
                        <strong>Subject:</strong> {contact.subject}
                      </p>
                      <p className="text-sm text-gray-500 line-clamp-2">
                        {contact.message}
                      </p>
                      <div className="flex items-center space-x-4 mt-2 text-xs text-gray-500">
                        <span>{contact.email}</span>
                        <span>•</span>
                        <span>{formatDate(contact.submitted_at)}</span>
                      </div>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

          <div className="p-4 bg-gray-50 border-t border-gray-100 text-center">
            <a
              href="/admin/contacts"
              className="text-primary hover:text-primary/80 font-medium text-sm"
            >
              View All Contacts →
            </a>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-gradient-primary rounded-xl p-6 text-white">
            <h3 className="text-xl font-bold mb-2">Manage Contact Forms</h3>
            <p className="text-white/90 mb-4">
              Review and respond to member inquiries and facility tour requests.
            </p>
            <a
              href="/admin/contacts"
              className="inline-block bg-white text-primary px-6 py-2 rounded-lg font-medium hover:bg-gray-100 transition-colors"
            >
              View Contacts
            </a>
          </div>

          <div className="bg-secondary rounded-xl p-6 text-white">
            <h3 className="text-xl font-bold mb-2">Newsletter Subscribers</h3>
            <p className="text-white/90 mb-4">
              Manage your email list and export subscribers for marketing
              campaigns.
            </p>
            <a
              href="/admin/newsletters"
              className="inline-block bg-white text-secondary px-6 py-2 rounded-lg font-medium hover:bg-gray-100 transition-colors"
            >
              View Subscribers
            </a>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
};

export default Dashboard;
