import { Calendar, Clock, User, ArrowRight, Search } from "lucide-react";
import type { BlogPost } from "../types";
import { Button } from "../components/ui/button";
import { useState } from "react";
import FeaturedBlog from "../../public/featured-blog.webp";
import { useMutation } from "@tanstack/react-query";
import { axiosInstance } from "../lib/axios";
import { toast } from "react-toastify";
import { isAxiosError } from "axios";

const categories = [
  "All",
  "Nutrition",
  "Workouts",
  "Wellness",
  "Tips",
  "Success Stories",
];

const blogPosts: BlogPost[] = [
  {
    id: 1,
    title: "10 Essential Tips for Building Muscle Mass",
    excerpt:
      "Discover the scientifically-backed strategies for effective muscle growth and strength gains.",
    content: "",
    image: "",
    author: "Mike Chen",
    date: "2024-12-20",
    category: "Workouts",
    readTime: "5 min read",
  },
  {
    id: 2,
    title: "The Ultimate Guide to Pre and Post-Workout Nutrition",
    excerpt:
      "Learn what to eat before and after your workouts for maximum performance and recovery.",
    content: "",
    image: "",
    author: "Lisa Anderson",
    date: "2024-12-18",
    category: "Nutrition",
    readTime: "8 min read",
  },
  {
    id: 3,
    title: "How Sarah Lost 40 Pounds in 6 Months",
    excerpt:
      "An inspiring transformation story about dedication, discipline, and the power of consistency.",
    content: "",
    image: "",
    author: "Sarah Johnson",
    date: "2024-12-15",
    category: "Success Stories",
    readTime: "6 min read",
  },
  {
    id: 4,
    title: "5 Common Workout Mistakes and How to Fix Them",
    excerpt:
      "Avoid these common errors to maximize your workout effectiveness and prevent injuries.",
    content: "",
    image: "",
    author: "David Thompson",
    date: "2024-12-12",
    category: "Tips",
    readTime: "4 min read",
  },
  {
    id: 5,
    title: "The Benefits of Yoga for Athletes",
    excerpt:
      "Why every athlete should incorporate yoga into their training routine for better performance.",
    content: "",
    image: "",
    author: "Emily Rodriguez",
    date: "2024-12-10",
    category: "Wellness",
    readTime: "7 min read",
  },
  {
    id: 6,
    title: "HIIT vs. Steady State: Which is Better?",
    excerpt:
      "A comprehensive comparison of high-intensity interval training and steady-state cardio.",
    content: "",
    image: "",
    author: "James Wilson",
    date: "2024-12-08",
    category: "Workouts",
    readTime: "6 min read",
  },
  {
    id: 7,
    title: "Meal Prep Made Easy: A Beginner's Guide",
    excerpt:
      "Simple strategies to prepare healthy meals for the week and stay on track with your nutrition.",
    content: "",
    image: "",
    author: "Lisa Anderson",
    date: "2024-12-05",
    category: "Nutrition",
    readTime: "10 min read",
  },
  {
    id: 8,
    title: "The Importance of Rest and Recovery",
    excerpt:
      "Why rest days are just as important as workout days for achieving your fitness goals.",
    content: "",
    image: "",
    author: "Sarah Johnson",
    date: "2024-12-03",
    category: "Wellness",
    readTime: "5 min read",
  },
  {
    id: 9,
    title: "Strength Training for Beginners: Where to Start",
    excerpt:
      "A complete guide for newcomers to weight training, including essential exercises and form tips.",
    content: "",
    image: "",
    author: "Mike Chen",
    date: "2024-12-01",
    category: "Workouts",
    readTime: "9 min read",
  },
];
const Blog = () => {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [email, setEmail] = useState<string>("");

  const featuredPost = blogPosts[0];
  const regularPosts = blogPosts.slice(1);

  const filteredPosts =
    selectedCategory === "All"
      ? regularPosts
      : regularPosts.filter((post) => post.category === selectedCategory);

  const getCategoryColor = (category: string) => {
    const colors: Record<string, string> = {
      Nutrition: "bg-green-100 text-green-700",
      Workouts: "bg-blue-100 text-blue-700",
      Wellness: "bg-purple-100 text-purple-700",
      Tips: "bg-orange-100 text-orange-700",
      "Success Stories": "bg-pink-100 text-pink-700",
    };
    return colors[category] || "bg-gray-100 text-gray-700";
  };

  const { mutateAsync: subscribe, isPending } = useMutation({
    mutationFn: async () => {
      const response = await axiosInstance.post("/newsletter/subscribe", {
        email,
        source: "blog",
      });
      return response.data;
    },
    onSuccess: () => {
      setEmail("");
      toast.success("Subscribed successfully");
    },
    onError: (error) => {
      if (isAxiosError(error)) {
        if (error.response?.data.success) {
          toast.success(error.response?.data.message);
        } else {
          toast.error(error.response?.data.message);
        }
      } else {
        toast.error("Something went wrong");
      }
      setEmail("");
    },
  });

  const handleSubmit = () => {
    if (!email) return;
    subscribe();
  };

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative bg-gradient-secondary pt-32 pb-20 md:pt-40 md:pb-32">
        {/* Background Pattern */}
        <div className="absolute w-full h-full inset-0 opacity-7">
          <div className="absolute top-0 left-0 w-full h-full bg-primary rounded-full blur-3xl"></div>
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="animate-fadeIn">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-secondary mb-6">
              FitLife Blog
            </h1>
            <p className="text-xl md:text-2xl text-gray-600 max-w-3xl mx-auto leading-relaxed mb-8">
              Expert tips, workout guides, and inspiring stories to fuel your
              fitness journey
            </p>

            {/* Search Bar */}
            <div className="max-w-2xl mx-auto">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search articles..."
                  className="peer w-full px-6 py-4 pl-14 rounded-full text-gray-700 border border-gray-400 focus:outline-none focus:ring-2 focus:ring-primary"
                />

                <Search
                  size={20}
                  className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-400 transition-colors duration-200 peer-focus:text-primary"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Post */}
      <section className="section-padding bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold text-secondary mb-8">
            Featured Article
          </h2>

          <div className="grid lg:grid-cols-2 gap-8 bg-muted rounded-2xl overflow-hidden shadow-xl card-hover">
            {/* Featured Image */}
            <div className="relative h-64 lg:h-auto bg-gradient-primary">
              <img
                src={FeaturedBlog}
                alt="Featured Blog"
                className="w-full h-full object-cover"
                loading="lazy"
              />
            </div>

            {/* Featured Content */}
            <div className="p-8 flex flex-col justify-center">
              <span
                className={`inline-block px-3 py-1 rounded-full text-sm font-semibold mb-4 w-fit ${getCategoryColor(
                  featuredPost.category
                )}`}
              >
                {featuredPost.category}
              </span>

              <h3 className="text-3xl font-bold text-secondary mb-4">
                {featuredPost.title}
              </h3>

              <p className="text-gray-600 leading-relaxed mb-6">
                {featuredPost.excerpt}
              </p>

              <div className="flex items-center space-x-6 text-sm text-gray-500 mb-6">
                <div className="flex items-center space-x-2">
                  <User size={16} />
                  <span>{featuredPost.author}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Calendar size={16} />
                  <span>
                    {new Date(featuredPost.date).toLocaleDateString()}
                  </span>
                </div>
                <div className="flex items-center space-x-2">
                  <Clock size={16} />
                  <span>{featuredPost.readTime}</span>
                </div>
              </div>

              <Button className="bg-gradient-primary hover:opacity-90 w-fit">
                Read Article
                <ArrowRight className="ml-2" size={18} />
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Category Filter */}
      <section className="py-8 bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap gap-3 justify-center">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-6 py-2 rounded-full font-medium transition-all ${
                  selectedCategory === category
                    ? "bg-primary text-white"
                    : "bg-muted text-gray-700 hover:bg-gray-300"
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Blog Posts Grid */}
      <section className="section-padding bg-muted">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold text-secondary mb-8">
            Latest Articles
          </h2>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredPosts.map((post) => (
              <article
                key={post.id}
                className="bg-white rounded-xl overflow-hidden shadow-lg card-hover"
              >
                {/* Post Image */}
                <div className="relative h-48 bg-gradient-secondary">
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="text-white text-4xl font-bold opacity-20">
                      {post.category.substring(0, 2).toUpperCase()}
                    </div>
                  </div>
                  <span
                    className={`absolute top-4 right-4 px-3 py-1 rounded-full text-xs font-semibold ${getCategoryColor(
                      post.category
                    )}`}
                  >
                    {post.category}
                  </span>
                </div>

                {/* Post Content */}
                <div className="p-6 space-y-4">
                  <h3 className="text-xl font-bold text-secondary hover:text-primary transition-colors line-clamp-2">
                    {post.title}
                  </h3>

                  <p className="text-gray-600 line-clamp-3">{post.excerpt}</p>

                  <div className="flex items-center justify-between pt-4 border-t">
                    <div className="flex items-center space-x-2 text-sm text-gray-500">
                      <User size={14} />
                      <span>{post.author}</span>
                    </div>
                    <div className="flex items-center space-x-2 text-sm text-gray-500">
                      <Clock size={14} />
                      <span>{post.readTime}</span>
                    </div>
                  </div>

                  <Button
                    variant="outline"
                    className="w-full group hover:text-black"
                  >
                    Read More
                    <ArrowRight
                      className="ml-2 group-hover:translate-x-1 transition-transform "
                      size={16}
                    />
                  </Button>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="section-padding bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gray-900">
            Subscribe to Our Newsletter
          </h2>

          <p className="text-xl mb-8 text-gray-600">
            Get the latest fitness tips, workout guides, and exclusive content
            delivered to your inbox.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto border border-gray-300 rounded-full px-4 py-2 focus-within:ring-2 focus-within:ring-primary focus-within:border-primary transition">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              className="w-full focus:outline-none bg-transparent text-gray-900 placeholder-gray-400"
            />

            <Button
              className={`rounded-full ${
                isPending ? "opacity-50 cursor-not-allowed" : ""
              }`}
              onClick={handleSubmit}
              disabled={isPending}
            >
              {isPending ? "Subscribing..." : "Subscribe"}
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Blog;
