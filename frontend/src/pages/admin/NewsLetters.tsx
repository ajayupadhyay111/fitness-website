import { useState, useEffect } from "react";
import { Search, Trash2, Mail, CheckCircle, XCircle } from "lucide-react";
import { Button } from "../../components/ui/button";
import type { NewsletterSubscriber } from "../../types/admin";
import AdminLayout from "../../components/admin/AdminLayout";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { axiosInstance } from "../../lib/axios";
import { toast } from "react-toastify";
import { isAxiosError } from "axios";

const NewsLetters = () => {
  const [searchTitle, setSearchTitle] = useState("");
  const [debouncedSearchTitle, setDebouncedSearchTitle] = useState("");
  const [status, setStatus] = useState<string>("all");
  const [page, setPage] = useState<number>(1);
  const queryClient = useQueryClient();

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const getStatusColor = (status: NewsletterSubscriber["status"]) => {
    switch (status) {
      case "active":
        return "bg-green-100 text-green-700";
      case "unsubscribed":
        return "bg-red-100 text-red-700";
      default:
        return "bg-gray-100 text-gray-700";
    }
  };

  const getStatusIcon = (status: NewsletterSubscriber["status"]) => {
    switch (status) {
      case "active":
        return <CheckCircle size={14} />;
      case "unsubscribed":
        return <XCircle size={14} />;
      default:
        return null;
    }
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearchTitle(searchTitle);
      setPage(1);
    }, 500);
    return () => clearTimeout(timer);
  }, [searchTitle]);

  const { data } = useQuery({
    queryKey: ["newsletters", page, status, debouncedSearchTitle],
    queryFn: async () => {
      const res = await axiosInstance.get(
        `/newsletter?searchTitle=${debouncedSearchTitle}&status=${status}&page=${page}`
      );
      return res.data;
    },
    refetchOnWindowFocus: false,
  });

  const allNewsletters = data?.data.data;
  const paginationData = data?.data.pagination;

  const { mutateAsync: deleteNewsletter } = useMutation({
    mutationFn: async (id: string) => {
      await axiosInstance.delete(`/newsletter/${id}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["newsletters"] });
      toast.success("Subscriber removed successfully");
    },
    onError: (error) => {
      if (isAxiosError(error)) {
        toast.error(
          error.response?.data?.message || "Failed to remove subscriber"
        );
      } else {
        toast.error("Something went wrong");
      }
    },
  });

  const handleDelete = async (id: string) => {
    if (window.confirm("Are you sure you want to remove this subscriber?")) {
      await deleteNewsletter(id);
    }
  };

  return (
    <AdminLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-secondary mb-2">
              Newsletter Subscribers
            </h1>
            <p className="text-gray-600">
              Manage your newsletter subscriptions ({paginationData?.total || 0}{" "}
              total)
            </p>
          </div>
        </div>

        {/* Filters */}
        <div className="bg-white rounded-xl shadow-md border border-gray-100 p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Search */}
            <div className="relative">
              <Search
                className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                size={20}
              />
              <input
                type="text"
                placeholder="Search by email..."
                value={searchTitle}
                onChange={(e) => {
                  setSearchTitle(e.target.value);
                }}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
              />
            </div>

            {/* Status Filter */}
            <select
              value={status}
              onChange={(e) => {
                setStatus(e.target.value);
                setPage(1);
              }}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
            >
              <option value="all">All Status</option>
              <option value="active">Active</option>
              <option value="unsubscribed">Unsubscribed</option>
            </select>
          </div>
        </div>

        {/* Table */}
        <div className="bg-white rounded-xl shadow-md border border-gray-100 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr>
                  <th className="px-6 py-4 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">
                    Email
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">
                    Source
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">
                    Subscribed Date
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {allNewsletters?.length === 0 ? (
                  <tr>
                    <td
                      colSpan={5}
                      className="px-6 py-12 text-center text-gray-500"
                    >
                      No subscribers found matching your criteria
                    </td>
                  </tr>
                ) : (
                  allNewsletters?.map((subscriber: NewsletterSubscriber) => (
                    <tr
                      key={subscriber._id}
                      className="hover:bg-gray-50 transition-colors"
                    >
                      <td className="px-6 py-4">
                        <div className="flex items-center space-x-3">
                          <div className="p-2 bg-blue-50 rounded-lg">
                            <Mail size={18} className="text-blue-500" />
                          </div>
                          <span className="font-medium text-gray-900">
                            {subscriber.email}
                          </span>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <span className="text-sm text-gray-600 bg-gray-100 px-2 py-1 rounded-md">
                          {subscriber.source || "Unknown"}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <span
                          className={`inline-flex items-center space-x-1 px-2.5 py-1 rounded-full text-xs font-medium ${getStatusColor(
                            subscriber.status
                          )}`}
                        >
                          {getStatusIcon(subscriber.status)}
                          <span>
                            {subscriber.status.charAt(0).toUpperCase() +
                              subscriber.status.slice(1)}
                          </span>
                        </span>
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-500">
                        {formatDate(subscriber.subscribed_at)}
                      </td>
                      <td className="px-6 py-4">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleDelete(subscriber._id)}
                          className="text-red-500 hover:text-red-700 hover:bg-red-50"
                        >
                          <Trash2 size={18} />
                        </Button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* Pagination */}
        {allNewsletters && allNewsletters.length > 0 && (
          <div className="flex items-center justify-between bg-white px-4 py-3 sm:px-6 rounded-lg shadow-md border border-gray-100">
            <div className="flex flex-1 justify-between sm:hidden">
              <Button
                variant="outline"
                onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
                disabled={page === 1}
              >
                Previous
              </Button>
              <Button
                variant="outline"
                onClick={() => setPage((prev) => prev + 1)}
                disabled={page >= (paginationData?.totalPages || 1)}
              >
                Next
              </Button>
            </div>
            <div className="hidden sm:flex sm:flex-1 sm:items-center sm:justify-between">
              <div>
                <p className="text-sm text-gray-700">
                  Showing page <span className="font-medium">{page}</span> of{" "}
                  <span className="font-medium">
                    {paginationData?.totalPages || 1}
                  </span>
                </p>
              </div>
              <div className="flex space-x-2">
                <Button
                  variant="outline"
                  onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
                  disabled={page === 1}
                >
                  Previous
                </Button>
                <Button
                  variant="outline"
                  onClick={() => setPage((prev) => prev + 1)}
                  disabled={page >= (paginationData?.totalPages || 1)}
                >
                  Next
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </AdminLayout>
  );
};

export default NewsLetters;
