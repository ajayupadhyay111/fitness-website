import { Link } from "react-router-dom";
import {
  Dumbbell,
  Users,
  Trophy,
  Clock,
  ArrowRight,
  CheckCircle,
  Zap,
  Heart,
  type LucideIcon,
} from "lucide-react";
import { Button } from "../components/ui/button";
import type { Stat } from "../types";
import heroImg from "../../public/home-hero.webp";
import FreeTrail from "../../public/home-free-trail.webp";
import { useState } from "react";
import CustomButton from "../components/CustomButton";

const Home = () => {
  const [loaded, setLoaded] = useState(false);

  const stats: Stat[] = [
    { id: 1, value: "5000+", label: "Active Members", icon: "users" },
    { id: 2, value: "50+", label: "Expert Trainers", icon: "dumbbell" },
    { id: 3, value: "100+", label: "Success Stories", icon: "trophy" },
    { id: 4, value: "24/7", label: "Gym Access", icon: "clock" },
  ];

  const features = [
    {
      icon: Dumbbell,
      title: "Professional Equipment",
      description:
        "State-of-the-art fitness equipment for all your workout needs.",
    },
    {
      icon: Users,
      title: "Expert Trainers",
      description:
        "Certified professionals to guide you through your fitness journey.",
    },
    {
      icon: Zap,
      title: "Group Classes",
      description: "Energizing group sessions including yoga, HIIT, and more.",
    },
    {
      icon: Heart,
      title: "Nutrition Guidance",
      description: "Personalized meal plans to complement your training.",
    },
  ];

  const benefits = [
    "Access to all equipment and facilities",
    "Unlimited group fitness classes",
    "Personal training sessions",
    "Nutrition consultation",
    "Progress tracking app",
    "Member community events",
  ];

  const getStatIcon = (iconName: string) => {
    const icons: Record<string, LucideIcon> = {
      users: Users,
      dumbbell: Dumbbell,
      trophy: Trophy,
      clock: Clock,
    };
    const Icon = icons[iconName];
    return Icon ? <Icon size={32} /> : null;
  };

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative bg-gray-50 pt-32 pb-20 md:pt-40 md:pb-32 overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute top-0 left-0 w-96 h-96 bg-primary rounded-full blur-3xl"></div>
          <div className="absolute bottom-0 right-0 w-96 h-96 bg-accent rounded-full blur-3xl"></div>
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Text Content */}
            <div className="space-y-6 animate-fadeIn">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight text-secondary">
                Transform Your Body,
                <span className="block text-primary">Transform Your Life</span>
              </h1>
              <p className="text-lg md:text-xl text-gray-600 leading-relaxed">
                Join FitLife and discover the best version of yourself. Expert
                trainers, premium facilities, and a supportive community await
                you.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 pt-4">
                <Link to="/contact">
                  <Button
                    size="lg"
                    className="bg-primary hover:bg-primary/90 text-white text-lg px-8 py-6"
                  >
                    Start Free Trial
                    <ArrowRight className="ml-2" size={20} />
                  </Button>
                </Link>
                <Link to="/about">
                  <Button
                    size="lg"
                    variant="outline"
                    className="border-2 border-primary text-primary hover:bg-primary hover:border-primary hover:text-primary text-lg px-8 py-6 group"
                  >
                    Learn More
                    <ArrowRight
                      className="ml-1 group-hover:translate-x-2 transition-transform"
                      size={20}
                    />
                  </Button>
                </Link>
              </div>
            </div>

            {/* Image/Visual Element */}
            <div className="relative">
              <div className="relative w-full h-96 lg:h-[500px] rounded-2xl overflow-hidden shadow-2xl">
                {/* Skeleton */}
                {!loaded && (
                  <div className="absolute inset-0 bg-gray-200 animate-pulse" />
                )}

                {/* Image */}
                <img
                  src={heroImg}
                  alt="hero-img"
                  loading="lazy"
                  onLoad={() => setLoaded(true)}
                  className={`w-full h-full object-cover transition-opacity duration-1000 ${loaded ? "opacity-100" : "opacity-0"
                    }`}
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-12 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
            {stats.map((stat) => (
              <div
                key={stat.id}
                className="text-center p-6 rounded-xl hover:shadow-lg transition-shadow"
              >
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 text-primary mb-4">
                  {getStatIcon(stat.icon)}
                </div>
                <div className="text-3xl md:text-4xl font-bold text-secondary mb-2">
                  {stat.value}
                </div>
                <div className="text-gray-600 font-medium">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Preview Section */}
      <section className="section-padding bg-muted">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16 animate-fadeIn">
            <h2 className="section-title">Why Choose FitLife?</h2>
            <p className="section-subtitle">
              Everything you need to achieve your fitness goals in one place
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <div key={index} className="bg-white p-6 rounded-xl card-hover">
                <div className="feature-icon mb-4">
                  <feature.icon size={24} />
                </div>
                <h3 className="text-xl font-bold text-secondary mb-3">
                  {feature.title}
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>

          <div className="text-center mt-12">
            <Link to="/features">
              <Button size="lg" className="button-gradient group">
                Explore All Features
                <ArrowRight
                  className="ml-2 group-hover:translate-x-2 transition-transform"
                  size={20}
                />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="section-padding bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid  lg:grid-cols-2 gap-12 items-center">
            {/* Image Side */}
            <div className="relative">
              <div className="relative  w-full h-96 lg:h-[500px] bg-gradient-secondary rounded-2xl overflow-hidden shadow-xl">
                <img
                  src={FreeTrail}
                  alt="free trail img"
                  className="w-full h-full object-cover"
                  loading="lazy"
                />
              </div>
            </div>

            {/* Content Side */}
            <div className="space-y-6">
              <h2 className="text-3xl md:text-4xl font-bold text-secondary">
                Membership Benefits That Matter
              </h2>
              <p className="text-lg text-gray-600">
                Get access to everything you need for a successful fitness
                journey. Our comprehensive membership includes:
              </p>
              <ul className="space-y-4">
                {benefits.map((benefit, index) => (
                  <li key={index} className="flex items-start space-x-3">
                    <CheckCircle
                      className="text-primary shrink-0 mt-1"
                      size={20}
                    />
                    <span className="text-gray-700">{benefit}</span>
                  </li>
                ))}
              </ul>
              <Link to="/contact">
                <Button size="lg" className="button-gradient group">
                  Get Started Today
                  <ArrowRight
                    className="ml-2 group-hover:translate-x-2 transition-transform"
                    size={20}
                  />
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="section-padding bg-white text-black">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Ready to Start Your Fitness Journey?
          </h2>
          <p className="text-xl mb-8 text-black/90">
            Join thousands of members who have transformed their lives with
            FitLife. Start your free trial today!
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <CustomButton title="Start Free Trail" />
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
