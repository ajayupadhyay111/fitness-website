import {
  Dumbbell,
  Users,
  Apple,
  Calendar,
  Trophy,
  Heart,
  Activity,
  Smartphone,
  Clock,
  Target,
  Zap,
  Shield,
} from "lucide-react";
import Equipment from "../../public/equipment.webp";
import GroupClass from "../../public/group-class.webp";
import PersonalTraining from "../../public/personalTraining.webp";
import Nutrition from "../../public/nutrition.webp";
import CustomButton from "../components/CustomButton";

const Features = () => {
  const mainFeatures = [
    {
      icon: Dumbbell,
      title: "Premium Equipment",
      description:
        "Access to state-of-the-art fitness equipment from leading brands. Our facility features cardio machines, free weights, resistance equipment, and specialized training zones.",
      benefits: [
        "Latest cardio machines with entertainment systems",
        "Complete free weight section",
        "Functional training area",
        "Olympic lifting platform",
      ],
      img: Equipment,
    },
    {
      icon: Users,
      title: "Group Classes",
      description:
        "Join our energizing group fitness classes led by certified instructors. From high-intensity workouts to relaxing yoga sessions, we have something for everyone.",
      benefits: [
        "HIIT & Circuit Training",
        "Yoga & Pilates",
        "Spinning & Cycling",
        "Zumba & Dance Fitness",
      ],
      img: GroupClass,
    },
    {
      icon: Target,
      title: "Personal Training",
      description:
        "Work one-on-one with our certified personal trainers to achieve your specific fitness goals. Customized workout plans designed just for you.",
      benefits: [
        "Personalized workout programs",
        "Form correction and technique",
        "Goal setting and tracking",
        "Nutritional guidance",
      ],
      img: PersonalTraining,
    },
    {
      icon: Apple,
      title: "Nutrition Coaching",
      description:
        "Complement your training with expert nutrition guidance. Our certified nutritionists help you fuel your body for optimal performance and results.",
      benefits: [
        "Personalized meal plans",
        "Macro tracking assistance",
        "Supplement recommendations",
        "Weekly check-ins",
      ],
      img: Nutrition,
    },
  ];

  const additionalFeatures = [
    {
      icon: Smartphone,
      title: "Mobile App",
      description:
        "Track your progress, book classes, and stay connected with our community through our mobile app.",
    },
    {
      icon: Calendar,
      title: "Flexible Scheduling",
      description:
        "Book classes and training sessions that fit your busy lifestyle with our easy online booking system.",
    },
    {
      icon: Clock,
      title: "24/7 Access",
      description:
        "Premium members enjoy round-the-clock access to our facilities. Work out on your schedule.",
    },
    {
      icon: Activity,
      title: "Progress Tracking",
      description:
        "Monitor your fitness journey with detailed analytics and progress reports to stay motivated.",
    },
    {
      icon: Shield,
      title: "Safe & Clean",
      description:
        "We maintain the highest standards of cleanliness and safety protocols for your peace of mind.",
    },
    {
      icon: Trophy,
      title: "Challenges & Events",
      description:
        "Participate in fitness challenges and community events to stay motivated and meet like-minded people.",
    },
  ];

  const programs = [
    {
      title: "Beginner Program",
      description:
        "Perfect for those new to fitness. Learn proper form and build a strong foundation.",
      duration: "8 weeks",
      icon: Heart,
    },
    {
      title: "Weight Loss",
      description:
        "Structured program combining cardio, strength training, and nutrition for sustainable weight loss.",
      duration: "12 weeks",
      icon: Activity,
    },
    {
      title: "Muscle Building",
      description:
        "Advanced strength training program designed to help you build lean muscle mass.",
      duration: "16 weeks",
      icon: Dumbbell,
    },
    {
      title: "Athletic Performance",
      description:
        "Enhance your sports performance with specialized training and conditioning.",
      duration: "12 weeks",
      icon: Zap,
    },
  ];

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
              Our Features & Services
            </h1>
            <p className="text-xl md:text-2xl text-black/90 max-w-3xl mx-auto leading-relaxed">
              Everything you need to achieve your fitness goals, all in one
              place
            </p>
          </div>
        </div>
      </section>

      {/* Main Features Section */}
      <section className="section-padding bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="section-title">Core Features</h2>
            <p className="section-subtitle">
              Comprehensive fitness solutions tailored to your needs
            </p>
          </div>

          <div className="space-y-16">
            {mainFeatures.map((feature, index) => (
              <div
                key={index}
                className={`grid lg:grid-cols-2 gap-12 items-center ${
                  index % 2 === 1 ? "lg:flex-row-reverse" : ""
                }`}
              >
                <div
                  className={`space-y-6 ${index % 2 === 1 ? "lg:order-2" : ""}`}
                >
                  <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 text-primary">
                    <feature.icon size={32} />
                  </div>
                  <h3 className="text-3xl font-bold text-secondary">
                    {feature.title}
                  </h3>
                  <p className="text-lg text-gray-600 leading-relaxed">
                    {feature.description}
                  </p>
                  <ul className="space-y-3">
                    {feature.benefits.map((benefit, idx) => (
                      <li key={idx} className="flex items-start space-x-3">
                        <div className="w-6 h-6 rounded-full bg-primary/20 flex items-center justify-center shrink-0 mt-0.5">
                          <div className="w-2 h-2 rounded-full bg-primary"></div>
                        </div>
                        <span className="text-gray-700">{benefit}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div
                  className={`relative ${index % 2 === 1 ? "lg:order-1" : ""}`}
                >
                  <div className="relative w-full  h-80 lg:h-96 bg-gradient-primary rounded-2xl overflow-hidden shadow-xl">
                    <img
                      src={feature.img}
                      alt={feature.title}
                      className="w-full h-full object-cover"
                      loading="lazy"
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Additional Features Grid */}
      <section className="section-padding bg-muted">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="section-title">More Benefits</h2>
            <p className="section-subtitle">
              Additional features that make FitLife stand out
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {additionalFeatures.map((feature, index) => (
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
        </div>
      </section>

      {/* Training Programs Section */}
      <section className="section-padding bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="section-title">Specialized Programs</h2>
            <p className="section-subtitle">
              Structured programs designed to help you reach specific goals
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {programs.map((program, index) => (
              <div
                key={index}
                className="bg-linear-to-br from-primary/5 to-accent/5 p-6 rounded-xl border-2 border-primary/10 hover:border-primary/30 transition-all card-hover"
              >
                <div className="feature-icon mb-4">
                  <program.icon size={24} />
                </div>
                <h3 className="text-xl font-bold text-secondary mb-2">
                  {program.title}
                </h3>
                <p className="text-sm text-accent font-semibold mb-3">
                  {program.duration}
                </p>
                <p className="text-gray-600 leading-relaxed">
                  {program.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="section-padding bg-gradient-primary text-black">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Ready to Experience All These Features?
          </h2>
          <p className="text-xl mb-8 text-black/90">
            Start your free trial today and discover what makes FitLife special.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <CustomButton title="Schedule a Tour" />
          </div>
        </div>
      </section>
    </div>
  );
};

export default Features;
