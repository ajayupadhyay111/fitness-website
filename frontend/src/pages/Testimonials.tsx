import { Star, Quote } from "lucide-react";
import type { Testimonial } from "../types";
import { Link } from "react-router-dom";
import CustomButton from "../components/CustomButton";

const Testimonials = () => {
  const testimonials: Testimonial[] = [
    {
      id: 1,
      name: "Jennifer Martinez",
      role: "Weight Loss Success",
      image: "",
      content:
        "I lost 40 pounds in 6 months with FitLife! The trainers are incredibly supportive, and the community keeps me motivated. This place changed my life.",
      rating: 5,
    },
    {
      id: 2,
      name: "Robert Taylor",
      role: "Strength Transformation",
      image: "",
      content:
        "The personal training program helped me gain 20 pounds of muscle. The nutrition guidance and workout plans are top-notch. Best investment I've ever made.",
      rating: 5,
    },
    {
      id: 3,
      name: "Amanda Foster",
      role: "Marathon Runner",
      image: "",
      content:
        "Trained for my first marathon with FitLife's athletic performance program. Not only did I finish, but I beat my goal time! The coaches are phenomenal.",
      rating: 5,
    },
    {
      id: 4,
      name: "Michael Brown",
      role: "Busy Professional",
      image: "",
      content:
        "As a busy executive, I needed flexibility. The 24/7 access and mobile app make it easy to stay consistent. Down 30 pounds and feeling amazing!",
      rating: 5,
    },
    {
      id: 5,
      name: "Lisa Chen",
      role: "Yoga Enthusiast",
      image: "",
      content:
        "The yoga and wellness programs are incredible. Emily is an amazing instructor who helped me find balance between fitness and mindfulness.",
      rating: 5,
    },
    {
      id: 6,
      name: "David Williams",
      role: "Senior Member",
      image: "",
      content:
        "At 62, I thought it was too late to get in shape. FitLife proved me wrong. The trainers adapted everything to my needs, and I feel 20 years younger!",
      rating: 5,
    },
    {
      id: 7,
      name: "Sarah Thompson",
      role: "New Mom",
      image: "",
      content:
        "Lost all my baby weight and gained so much strength! The postnatal program was perfect, and the trainers were so understanding of my journey.",
      rating: 5,
    },
    {
      id: 8,
      name: "Kevin Rodriguez",
      role: "College Athlete",
      image: "",
      content:
        "The sports performance program took my game to the next level. Improved my speed, strength, and agility. Couldn't have done it without this team.",
      rating: 5,
    },
    {
      id: 9,
      name: "Michelle Lee",
      role: "Group Class Regular",
      image: "",
      content:
        "The group classes are addictive! James makes every workout fun and challenging. I've made amazing friends and seen incredible results.",
      rating: 5,
    },
  ];

  const stats = [
    { value: "98%", label: "Member Satisfaction" },
    { value: "5000+", label: "Success Stories" },
    { value: "4.9/5", label: "Average Rating" },
    { value: "90%", label: "Goal Achievement" },
  ];

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, index) => (
      <Star
        key={index}
        size={18}
        className={
          index < rating ? "fill-amber-400 text-amber-400" : "text-gray-300"
        }
      />
    ));
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
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-black mb-6">
              Success Stories
            </h1>
            <p className="text-xl md:text-2xl text-black max-w-3xl mx-auto leading-relaxed">
              Real transformations from real people. See how FitLife has changed
              lives.
            </p>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-12 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
            {stats.map((stat, index) => (
              <div key={index} className="text-center p-6">
                <div className="text-3xl md:text-4xl font-bold text-gradient mb-2">
                  {stat.value}
                </div>
                <div className="text-gray-600 font-medium">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Grid */}
      <section className="section-padding bg-muted">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="section-title">What Our Members Say</h2>
            <p className="section-subtitle">
              Hear directly from people who have transformed their lives with
              FitLife
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {testimonials.map((testimonial) => (
              <div
                key={testimonial.id}
                className="bg-white rounded-2xl p-6 shadow-lg card-hover relative"
              >
                {/* Quote Icon */}
                <div className="absolute top-4 right-4 text-primary/10">
                  <Quote size={48} />
                </div>

                {/* Rating */}
                <div className="flex space-x-1 mb-4">
                  {renderStars(testimonial.rating)}
                </div>

                {/* Content */}
                <p className="text-gray-700 leading-relaxed mb-6 relative z-10">
                  "{testimonial.content}"
                </p>

                {/* Author */}
                <div className="flex items-center space-x-4 pt-4 border-t">
                  <div className="w-12 h-12 rounded-full bg-gradient-primary flex items-center justify-center shrink-0 border border-primary">
                    <span className="text-primary font-bold text-lg">
                      {testimonial.name
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </span>
                  </div>
                  <div>
                    <div className="font-bold text-black">
                      {testimonial.name}
                    </div>
                    <div className="text-sm text-gray-500">
                      {testimonial.role}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Video Testimonials Section */}
      <section className="section-padding bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="section-title">Video Testimonials</h2>
            <p className="section-subtitle">
              Watch our members share their transformation journeys
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[1, 2, 3].map((index) => (
              <div
                key={index}
                className="relative aspect-video bg-gradient-primary rounded-xl overflow-hidden shadow-lg group cursor-pointer"
              >
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-16 h-16 rounded-full bg-white/90 flex items-center justify-center group-hover:scale-110 transition-transform">
                    <div className="w-0 h-0 border-l-16 border-l-primary border-t-10 border-t-transparent border-b-10 border-b-transparent ml-1"></div>
                  </div>
                </div>
                <div className="absolute bottom-0 left-0 right-0 bg-linear-to-t from-black/60 to-transparent p-4">
                  <p className="text-white font-semibold">
                    Member Transformation Story {index}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Transformation Stats */}
      <section className="section-padding bg-muted">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="section-title">Average Member Results</h2>
            <p className="section-subtitle">
              Based on members who completed our 12-week program
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white p-8 rounded-xl text-center shadow-lg">
              <div className="text-4xl font-bold text-gradient mb-2">
                15 lbs
              </div>
              <div className="text-gray-600">Average Weight Loss</div>
            </div>
            <div className="bg-white p-8 rounded-xl text-center shadow-lg">
              <div className="text-4xl font-bold text-gradient mb-2">25%</div>
              <div className="text-gray-600">Strength Increase</div>
            </div>
            <div className="bg-white p-8 rounded-xl text-center shadow-lg">
              <div className="text-4xl font-bold text-gradient mb-2">30%</div>
              <div className="text-gray-600">Energy Improvement</div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="section-padding bg-gradient-primary text-black">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Ready to Write Your Success Story?
          </h2>
          <p className="text-xl mb-8 text-black/90">
            Join thousands of members who have achieved their fitness goals with
            FitLife.
          </p>
          <Link to="/contact">
            <CustomButton title="Book Consultation" />
          </Link>
        </div>
      </section>
    </div>
  );
};

export default Testimonials;
