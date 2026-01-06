export interface AdminUser {
  id: string;
  email: string;
  name: string;
  role: "admin" | "owner";
}

export interface ContactSubmission {
  _id: string;
  name: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
  status: "new" | "read" | "responded";
  submitted_at: string;
  respondedAt?: string;
}

export interface NewsletterSubscriber {
  _id: string;
  email: string;
  subscribed_at: string;
  status: "active" | "unsubscribed";
  source?: string;
}

export interface DashboardStats {
  totalContacts: number;
  totalNewsletters: number;
  pendingResponses: number;
  monthlyGrowth: number;
  contactsThisMonth: number;
  newslettersThisMonth: number;
}

export interface AuthContextType {
  user: AdminUser | null;
  isAuthenticated: boolean;
}

export interface DataTableColumn {
  key: string;
  label: string;
  sortable?: boolean;
  width?: string;
}

export interface FilterOptions {
  search?: string;
  status?: string;
  dateFrom?: string;
  dateTo?: string;
}

export interface IPaginationData {
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}
