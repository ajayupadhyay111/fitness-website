import { Target, Heart, Users, Award, Shield, Zap } from "lucide-react";
import { Link } from "react-router-dom";
import Img from "../../public/about.webp";
import CustomButton from "../components/CustomButton";

const About = () => {
  const values = [
    {
      icon: Heart,
      title: "Passion",
      description:
        "We are passionate about helping people achieve their fitness goals and live healthier lives.",
    },
    {
      icon: Users,
      title: "Community",
      description:
        "Building a supportive community where everyone feels welcome and motivated.",
    },
    {
      icon: Award,
      title: "Excellence",
      description:
        "Committed to providing the highest quality training, facilities, and service.",
    },
    {
      icon: Shield,
      title: "Integrity",
      description:
        "Honest guidance and transparent practices in everything we do.",
    },
  ];

  const milestones = [
    {
      year: "2015",
      event: "FitLife Founded",
      description: "Started with a vision to revolutionize fitness",
    },
    {
      year: "2017",
      event: "1000 Members",
      description: "Reached our first major milestone",
    },
    {
      year: "2019",
      event: "Expanded Facilities",
      description: "Doubled our gym space and equipment",
    },
    {
      year: "2021",
      event: "Digital Platform",
      description: "Launched online training programs",
    },
    {
      year: "2023",
      event: "5000+ Members",
      description: "Became the leading fitness center in the region",
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
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-secondary mb-6">
              About FitLife
            </h1>
            <p className="text-xl md:text-2xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              Empowering individuals to reach their peak performance through
              expert guidance, premium facilities, and unwavering support.
            </p>
          </div>
        </div>
      </section>

      {/* Our Story Section */}
      <section className="section-padding bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <h2 className="text-3xl md:text-4xl font-bold text-secondary">
                Our Story
              </h2>
              <div className="space-y-4 text-gray-600 leading-relaxed">
                <p>
                  FitLife was born from a simple belief: everyone deserves
                  access to world-class fitness training and facilities. Founded
                  in 2015, we started as a small community gym with big dreams.
                </p>
                <p>
                  Today, we've grown into a leading fitness center serving over
                  5,000 members. But our mission remains the same – to help
                  people transform their lives through fitness, one workout at a
                  time.
                </p>
                <p>
                  We've built more than just a gym; we've created a community
                  where people support each other, celebrate victories together,
                  and push each other to be their best selves.
                </p>
              </div>
            </div>

            <div className="relative">
              <div className="relative w-full h-96 lg:h-[500px] bg-gradient-primary rounded-2xl overflow-hidden shadow-xl">
                <img
                  src={Img}
                  alt="about"
                  className="w-full h-full object-cover"
                  loading="lazy"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Mission & Vision Section */}
      <section className="section-padding bg-muted">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-8">
            {/* Mission */}
            <div className="bg-white p-8 rounded-2xl shadow-lg">
              <div className="feature-icon mb-6 bg-primary/20">
                <Target size={32} className="text-primary" />
              </div>
              <h3 className="text-2xl font-bold text-secondary mb-4">
                Our Mission
              </h3>
              <p className="text-gray-600 leading-relaxed">
                To inspire and empower individuals to achieve their fitness
                goals through personalized training, state-of-the-art
                facilities, and a supportive community that celebrates every
                milestone on the journey to better health.
              </p>
            </div>

            {/* Vision */}
            <div className="bg-white p-8 rounded-2xl shadow-lg">
              <div className="feature-icon mb-6 bg-accent/20">
                <Zap size={32} className="text-accent" />
              </div>
              <h3 className="text-2xl font-bold text-secondary mb-4">
                Our Vision
              </h3>
              <p className="text-gray-600 leading-relaxed">
                To become the most trusted and innovative fitness partner,
                transforming lives by making world-class training accessible to
                everyone and building a global community of health-conscious
                individuals.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Core Values Section */}
      <section className="section-padding bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="section-title">Our Core Values</h2>
            <p className="section-subtitle">
              The principles that guide everything we do
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => (
              <div
                key={index}
                className="text-center p-6 rounded-xl hover:shadow-lg transition-shadow"
              >
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 text-primary mb-4">
                  <value.icon size={32} />
                </div>
                <h3 className="text-xl font-bold text-secondary mb-3">
                  {value.title}
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  {value.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline Section */}
      <section className="section-padding bg-muted">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="section-title">Our Journey</h2>
            <p className="section-subtitle">
              Key milestones in our growth story
            </p>
          </div>

          <div className="space-y-8">
            {milestones.map((milestone, index) => (
              <div
                key={index}
                className="flex flex-col md:flex-row gap-6 items-start bg-white p-6 rounded-xl shadow-md card-hover"
              >
                <div className="shrink-0">
                  <div className="w-20 h-20 rounded-full bg-gradient-primary flex items-center justify-center text-white font-bold text-lg">
                    {milestone.year}
                  </div>
                </div>
                <div className="grow">
                  <h3 className="text-xl font-bold text-secondary mb-2">
                    {milestone.event}
                  </h3>
                  <p className="text-gray-600">{milestone.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="section-padding bg-gradient-primary text-black">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Be Part of Our Story
          </h2>
          <p className="text-xl mb-8 text-black/90">
            Join the FitLife community and write your own success story with us.
          </p>
          <Link to="/contact">
            <CustomButton title="Get Started Today" />
          </Link>
        </div>
      </section>
    </div>
  );
};

export default About;
