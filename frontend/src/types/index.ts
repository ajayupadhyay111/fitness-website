// Type definitions for the Fitness Website

export interface NavLink {
  name: string;
  path: string;
}

export interface TeamMember {
  id: number;
  name: string;
  role: string;
  specialty: string;
  image: string;
  bio: string;
  social: {
    instagram?: string;
    twitter?: string;
    linkedin?: string;
  };
}

export interface Testimonial {
  id: number;
  name: string;
  role: string;
  image: string;
  content: string;
  rating: number;
}

export interface BlogPost {
  id: number;
  title: string;
  excerpt: string;
  content: string;
  image: string;
  author: string;
  date: string;
  category: string;
  readTime: string;
}

export interface Feature {
  id: number;
  title: string;
  description: string;
  icon: string;
  benefits: string[];
}

export interface ContactFormData {
  name: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
}

export interface Stat {
  id: number;
  value: string;
  label: string;
  icon: string;
}

export interface PricingPlan {
  id: number;
  name: string;
  price: string;
  period: string;
  features: string[];
  popular?: boolean;
}

export interface SocialLink {
  platform: string;
  url: string;
  icon: string;
}
