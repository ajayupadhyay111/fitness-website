import { useState, useEffect } from "react";
import { Search, Eye, CheckCircle, Clock, X } from "lucide-react";
import { Button } from "../../components/ui/button";
import type { ContactSubmission } from "../../types/admin";
import AdminLayout from "../../components/admin/AdminLayout";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { axiosInstance } from "../../lib/axios";
import { toast } from "react-toastify";

const Contacts = () => {
  const [searchTitle, setSearchTitle] = useState("");
  const [debouncedSearchTitle, setDebouncedSearchTitle] = useState("");
  const [status, setStatus] = useState<string>("all");
  const [page, setPage] = useState<number>(1);
  const [selectedContact, setSelectedContact] =
    useState<ContactSubmission | null>(null);
  const [showModal, setShowModal] = useState(false);
  const queryClient = useQueryClient();

  const openModal = (contact: ContactSubmission) => {
    setSelectedContact(contact);
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setSelectedContact(null);
  };

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

  const getStatusIcon = (status: ContactSubmission["status"]) => {
    switch (status) {
      case "new":
        return <Clock size={14} />;
      case "read":
        return <Eye size={14} />;
      case "responded":
        return <CheckCircle size={14} />;
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

  const { data: contacts } = useQuery({
    queryKey: ["contacts", page, status, debouncedSearchTitle],
    queryFn: async () => {
      const res = await axiosInstance.get(
        `/contact?searchTitle=${debouncedSearchTitle}&status=${status}&page=${page}`
      );
      return res.data;
    },
    refetchOnWindowFocus: false,
  });
  const allContacts = contacts?.data.data;
  const paginationData = contacts?.data.pagination;

  const { mutateAsync: handleStatusChange } = useMutation({
    mutationFn: async ({
      id,
      status,
    }: {
      id: string;
      status: string;
    }): Promise<void> => {
      await axiosInstance.patch(`/contact/${id}`, { status });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["contacts"] });
      toast.success("Status updated successfully");
    },
    onError: () => {
      toast.error("Something went wrong");
    },
  });

  return (
    <AdminLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-secondary mb-2">
              Contact Submissions
            </h1>
            <p className="text-gray-600">
              Manage and respond to member inquiries ({allContacts?.length}{" "}
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
                placeholder="Search by name, email, subject, or message..."
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
              <option value="new">New</option>
              <option value="read">Read</option>
              <option value="responded">Responded</option>
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
                    Contact
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">
                    Subject
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">
                    Date
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {allContacts?.length === 0 ? (
                  <tr>
                    <td
                      colSpan={5}
                      className="px-6 py-12 text-center text-gray-500"
                    >
                      No contacts found matching your criteria
                    </td>
                  </tr>
                ) : (
                  allContacts?.map((contact: ContactSubmission) => (
                    <tr
                      key={contact._id}
                      className="hover:bg-gray-50 transition-colors"
                    >
                      <td className="px-3 py-4">
                        <div>
                          <div className="font-medium text-secondary">
                            {contact.name}
                          </div>
                          <div className="text-sm text-gray-500">
                            {contact.email}
                          </div>
                          <div className="text-sm text-gray-400">
                            {contact.phone}
                          </div>
                        </div>
                      </td>
                      <td className="px-3 py-4">
                        <div className="text-sm text-gray-900">
                          {contact.subject}
                        </div>
                        <div className="text-sm text-gray-500 line-clamp-2 max-w-xs">
                          {contact.message}
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <span
                          className={`inline-flex items-center space-x-1 px-2.5 py-1 rounded-full text-xs font-medium ${getStatusColor(
                            contact.status
                          )}`}
                        >
                          {getStatusIcon(contact.status)}
                          <span>
                            {contact.status.charAt(0).toUpperCase() +
                              contact.status.slice(1)}
                          </span>
                        </span>
                      </td>
                      <td className="px-3 py-4 text-sm text-gray-500">
                        {formatDate(contact.submitted_at)}
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center space-x-2">
                          <button
                            onClick={() => openModal(contact)}
                            className="text-primary hover:text-primary/80 p-2 rounded-lg hover:bg-primary/10 transition-colors"
                            title="View Details"
                          >
                            <Eye size={18} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* Pagination */}
        {allContacts && allContacts.length > 0 && (
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

      {/* Modal */}
      {showModal && selectedContact && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            {/* Modal Header */}
            <div className="p-6 border-b border-gray-200 flex items-center justify-between">
              <h2 className="text-2xl font-bold text-secondary">
                Contact Details
              </h2>
              <button
                onClick={closeModal}
                className="text-gray-400 hover:text-gray-600 p-2 rounded-lg hover:bg-gray-100"
              >
                <X size={24} />
              </button>
            </div>

            {/* Modal Content */}
            <div className="p-6 space-y-6">
              {/* Status Badge */}
              <div className="flex items-center justify-between">
                <span
                  className={`inline-flex items-center space-x-1 px-3 py-1.5 rounded-full text-sm font-medium ${getStatusColor(
                    selectedContact.status
                  )}`}
                >
                  {getStatusIcon(selectedContact.status)}
                  <span>
                    {selectedContact.status.charAt(0).toUpperCase() +
                      selectedContact.status.slice(1)}
                  </span>
                </span>
                <span className="text-sm text-gray-500">
                  {formatDate(selectedContact.submitted_at)}
                </span>
              </div>

              {/* Contact Info */}
              <div className="space-y-4">
                <div>
                  <label className="text-sm font-medium text-gray-600">
                    Name
                  </label>
                  <p className="mt-1 text-lg font-semibold text-secondary">
                    {selectedContact.name}
                  </p>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-medium text-gray-600">
                      Email
                    </label>
                    <p className="mt-1 text-gray-900">
                      {selectedContact.email}
                    </p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-600">
                      Phone
                    </label>
                    <p className="mt-1 text-gray-900">
                      {selectedContact.phone}
                    </p>
                  </div>
                </div>

                <div>
                  <label className="text-sm font-medium text-gray-600">
                    Subject
                  </label>
                  <p className="mt-1 text-gray-900">
                    {selectedContact.subject}
                  </p>
                </div>

                <div>
                  <label className="text-sm font-medium text-gray-600">
                    Message
                  </label>
                  <p className="mt-1 text-gray-900 leading-relaxed whitespace-pre-wrap">
                    {selectedContact.message}
                  </p>
                </div>

                {selectedContact.respondedAt && (
                  <div>
                    <label className="text-sm font-medium text-gray-600">
                      Responded At
                    </label>
                    <p className="mt-1 text-gray-900">
                      {formatDate(selectedContact.respondedAt)}
                    </p>
                  </div>
                )}
              </div>

              {/* Actions */}
              <div className="flex space-x-3 pt-4 border-t border-gray-200">
                {selectedContact.status === "new" && (
                  <Button
                    onClick={() => {
                      handleStatusChange({
                        id: selectedContact._id,
                        status: "read",
                      });
                      closeModal();
                    }}
                    className="flex-1 bg-yellow-500 hover:bg-yellow-600 text-white"
                  >
                    <Eye size={18} className="mr-2" />
                    Mark as Read
                  </Button>
                )}
                {selectedContact.status !== "responded" && (
                  <Button
                    onClick={() => {
                      handleStatusChange({
                        id: selectedContact._id,
                        status: "responded",
                      });
                      closeModal();
                    }}
                    className="flex-1 bg-green-500 hover:bg-green-600 text-white"
                  >
                    <CheckCircle size={18} className="mr-2" />
                    Mark as Responded
                  </Button>
                )}
                <Button
                  onClick={closeModal}
                  variant="outline"
                  className="border-gray-300"
                >
                  Close
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </AdminLayout>
  );
};

export default Contacts;
