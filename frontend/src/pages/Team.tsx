import { Instagram, Twitter, Linkedin, Mail } from "lucide-react";
import type { TeamMember } from "../types";
import { Link } from "react-router-dom";
import CustomButton from "../components/CustomButton";

const Team = () => {
  const teamMembers: TeamMember[] = [
    {
      id: 1,
      name: "Sarah Johnson",
      role: "Head Trainer & Fitness Director",
      specialty: "Strength Training & HIIT",
      image: "", // Placeholder
      bio: "With 10+ years of experience, Sarah specializes in building strength and transforming bodies through high-intensity training.",
      social: {
        instagram: "#",
        twitter: "#",
        linkedin: "#",
      },
    },
    {
      id: 2,
      name: "Mike Chen",
      role: "Personal Trainer",
      specialty: "Bodybuilding & Nutrition",
      image: "",
      bio: "Former competitive bodybuilder with expertise in muscle building and sports nutrition. Mike helps clients achieve their physique goals.",
      social: {
        instagram: "#",
        linkedin: "#",
      },
    },
    {
      id: 3,
      name: "Emily Rodriguez",
      role: "Yoga & Wellness Instructor",
      specialty: "Yoga, Pilates & Mindfulness",
      image: "",
      bio: "Certified yoga instructor bringing balance and flexibility to your fitness journey through mindful movement practices.",
      social: {
        instagram: "#",
        twitter: "#",
      },
    },
    {
      id: 4,
      name: "David Thompson",
      role: "Sports Performance Coach",
      specialty: "Athletic Training & Conditioning",
      image: "",
      bio: "Former professional athlete dedicated to enhancing athletic performance through specialized training programs.",
      social: {
        linkedin: "#",
        twitter: "#",
      },
    },
    {
      id: 5,
      name: "Lisa Anderson",
      role: "Nutrition Specialist",
      specialty: "Sports Nutrition & Meal Planning",
      image: "",
      bio: "Registered dietitian helping clients optimize their nutrition for peak performance and healthy living.",
      social: {
        instagram: "#",
        linkedin: "#",
      },
    },
    {
      id: 6,
      name: "James Wilson",
      role: "Group Fitness Instructor",
      specialty: "HIIT, Spinning & Dance",
      image: "",
      bio: "High-energy instructor known for creating motivating group classes that push members to their limits.",
      social: {
        instagram: "#",
        twitter: "#",
      },
    },
  ];

  const stats = [
    { value: "50+", label: "Expert Trainers" },
    { value: "15+", label: "Years Experience" },
    { value: "100+", label: "Certifications" },
    { value: "5000+", label: "Clients Trained" },
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
              Meet Our Expert Team
            </h1>
            <p className="text-xl md:text-2xl text-black max-w-3xl mx-auto leading-relaxed">
              Certified professionals dedicated to helping you achieve your
              fitness goals
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

      {/* Team Members Grid */}
      <section className="section-padding bg-muted">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="section-title">Our Trainers</h2>
            <p className="section-subtitle">
              Each trainer brings unique expertise and passion to help you
              succeed
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {teamMembers.map((member) => (
              <div
                key={member.id}
                className="bg-white rounded-2xl overflow-hidden shadow-lg card-hover"
              >
                {/* Image Placeholder */}
                <div className="relative h-80 bg-gradient-primary">
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-32 h-32 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center">
                      <span className="text-5xl font-bold text-white">
                        {member.name
                          .split(" ")
                          .map((n) => n[0])
                          .join("")}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Content */}
                <div className="p-6 space-y-4">
                  <div>
                    <h3 className="text-2xl font-bold text-secondary mb-1">
                      {member.name}
                    </h3>
                    <p className="text-primary font-semibold mb-1">
                      {member.role}
                    </p>
                    <p className="text-sm text-gray-500">{member.specialty}</p>
                  </div>

                  <p className="text-gray-600 leading-relaxed">{member.bio}</p>

                  {/* Social Links */}
                  <div className="flex space-x-3 pt-4 border-t">
                    {member.social.instagram && (
                      <a
                        href={member.social.instagram}
                        className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary hover:bg-primary hover:text-white transition-colors"
                        aria-label="Instagram"
                      >
                        <Instagram size={18} />
                      </a>
                    )}
                    {member.social.twitter && (
                      <a
                        href={member.social.twitter}
                        className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary hover:bg-primary hover:text-white transition-colors"
                        aria-label="Twitter"
                      >
                        <Twitter size={18} />
                      </a>
                    )}
                    {member.social.linkedin && (
                      <a
                        href={member.social.linkedin}
                        className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary hover:bg-primary hover:text-white transition-colors"
                        aria-label="LinkedIn"
                      >
                        <Linkedin size={18} />
                      </a>
                    )}
                    <a
                      href={`mailto:${member.name
                        .toLowerCase()
                        .replace(" ", ".")}@fitlife.com`}
                      className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary hover:bg-primary hover:text-white transition-colors"
                      aria-label="Email"
                    >
                      <Mail size={18} />
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Our Trainers Section */}
      <section className="section-padding bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center space-y-6">
            <h2 className="section-title">Why Train With Us?</h2>
            <p className="text-lg text-gray-600 leading-relaxed">
              Our trainers are more than just fitness experts – they're mentors,
              motivators, and partners in your fitness journey. Every member of
              our team holds multiple certifications and continues their
              education to bring you the latest in fitness science and training
              techniques.
            </p>
            <div className="grid md:grid-cols-3 gap-6 pt-8">
              <div className="p-6 bg-muted rounded-xl">
                <div className="text-3xl font-bold text-primary mb-2">100%</div>
                <div className="text-gray-700">Certified Professionals</div>
              </div>
              <div className="p-6 bg-muted rounded-xl">
                <div className="text-3xl font-bold text-primary mb-2">15+</div>
                <div className="text-gray-700">Years Average Experience</div>
              </div>
              <div className="p-6 bg-muted rounded-xl">
                <div className="text-3xl font-bold text-primary mb-2">24/7</div>
                <div className="text-gray-700">Support Available</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="section-padding bg-gradient-primary text-black">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Work With Our Expert Trainers
          </h2>
          <p className="text-xl mb-8 text-black/90">
            Book a consultation with one of our trainers and start your
            transformation today.
          </p>
          <Link to="/contact">
            <CustomButton title="Book Consultation" />
          </Link>
        </div>
      </section>
    </div>
  );
};

export default Team;
