import React from "react";
import Link from "next/link";
import {
  BookOpen,
  Shield,
  Zap,
  Globe,
  Users,
  BarChart,
  ArrowRight,
  Mail,
  MessageSquare,
  MapPin,
  Star,
  Award,
  Clock,
  Brain,
  Target,
  Rocket,
  Coffee,
  Layout,
  Smartphone,
  Code,
  Database,
  Palette,
} from "lucide-react";

export default function Home() {
  const features = [
    {
      icon: <BookOpen className="h-6 w-6" />,
      title: "Extensive Course Library",
      description:
        "Access thousands of courses across multiple disciplines and skill levels.",
    },
    {
      icon: <Shield className="h-6 w-6" />,
      title: "Safe Learning Environment",
      description:
        "Experience a secure platform with privacy and data protection.",
    },
    {
      icon: <Zap className="h-6 w-6" />,
      title: "Interactive Learning",
      description: "Engage with multimedia content and real-time feedback.",
    },
    {
      icon: <Globe className="h-6 w-6" />,
      title: "Global Community",
      description: "Join learners from over 150 countries worldwide.",
    },
    {
      icon: <Users className="h-6 w-6" />,
      title: "Expert Instructors",
      description: "Learn from industry professionals and thought leaders.",
    },
    {
      icon: <BarChart className="h-6 w-6" />,
      title: "Progress Tracking",
      description: "Monitor your learning journey with detailed analytics.",
    },
  ];

  const courses = [
    {
      id: 1,
      title: "Complete Web Development Bootcamp",
      instructor: "John Smith",
      rating: 4.8,
      students: 15420,
      image:
        "https://images.unsplash.com/photo-1498050108023-c5249f4df085?ixlib=rb-1.2.1&auto=format&fit=crop&w=2850&q=80",
      price: 99.99,
      category: "Web Development",
      level: "Beginner",
      duration: "12 weeks",
    },
    {
      id: 2,
      title: "Data Science Fundamentals",
      instructor: "Sarah Johnson",
      rating: 4.9,
      students: 12350,
      image:
        "https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-1.2.1&auto=format&fit=crop&w=2850&q=80",
      price: 89.99,
      category: "Data Science",
      level: "Intermediate",
      duration: "10 weeks",
    },
    {
      id: 3,
      title: "UI/UX Design Masterclass",
      instructor: "Michael Chen",
      rating: 4.7,
      students: 8940,
      image:
        "https://images.unsplash.com/photo-1561070791-2526d30994b5?ixlib=rb-1.2.1&auto=format&fit=crop&w=2850&q=80",
      price: 79.99,
      category: "Design",
      level: "All Levels",
      duration: "8 weeks",
    },
    {
      id: 4,
      title: "Mobile App Development with React Native",
      instructor: "Emma Davis",
      rating: 4.8,
      students: 10280,
      image:
        "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?ixlib=rb-1.2.1&auto=format&fit=crop&w=2850&q=80",
      price: 94.99,
      category: "Mobile Development",
      level: "Intermediate",
      duration: "10 weeks",
    },
    {
      id: 5,
      title: "Machine Learning A-Z",
      instructor: "David Wilson",
      rating: 4.9,
      students: 18650,
      image:
        "https://images.unsplash.com/photo-1515879218367-8466d910aaa4?ixlib=rb-1.2.1&auto=format&fit=crop&w=2850&q=80",
      price: 109.99,
      category: "AI & ML",
      level: "Advanced",
      duration: "14 weeks",
    },
    {
      id: 6,
      title: "Digital Marketing Mastery",
      instructor: "Lisa Anderson",
      rating: 4.7,
      students: 9840,
      image:
        "https://images.unsplash.com/photo-1460925895917-afdab827c52f?ixlib=rb-1.2.1&auto=format&fit=crop&w=2850&q=80",
      price: 69.99,
      category: "Marketing",
      level: "Beginner",
      duration: "6 weeks",
    },
  ];

  const categories = [
    {
      name: "Web Development",
      icon: <Code className="h-6 w-6" />,
      courses: 120,
      color: "bg-blue-100 text-blue-600",
      popular: true,
    },
    {
      name: "Data Science",
      icon: <Database className="h-6 w-6" />,
      courses: 85,
      color: "bg-green-100 text-green-600",
      popular: true,
    },
    {
      name: "UI/UX Design",
      icon: <Palette className="h-6 w-6" />,
      courses: 65,
      color: "bg-purple-100 text-purple-600",
      popular: true,
    },
    {
      name: "Mobile Development",
      icon: <Smartphone className="h-6 w-6" />,
      courses: 95,
      color: "bg-orange-100 text-orange-600",
      popular: true,
    },
    {
      name: "Machine Learning",
      icon: <Brain className="h-6 w-6" />,
      courses: 45,
      color: "bg-red-100 text-red-600",
      popular: false,
    },
    {
      name: "Digital Marketing",
      icon: <Target className="h-6 w-6" />,
      courses: 75,
      color: "bg-yellow-100 text-yellow-600",
      popular: false,
    },
    {
      name: "Business",
      icon: <BarChart className="h-6 w-6" />,
      courses: 110,
      color: "bg-indigo-100 text-indigo-600",
      popular: false,
    },
    {
      name: "Photography",
      icon: <Layout className="h-6 w-6" />,
      courses: 55,
      color: "bg-pink-100 text-pink-600",
      popular: false,
    },
  ];

  const stats = [
    {
      label: "Active Students",
      value: "50M+",
      icon: <Users className="h-6 w-6" />,
    },
    {
      label: "Total Courses",
      value: "500+",
      icon: <BookOpen className="h-6 w-6" />,
    },
    {
      label: "Expert Instructors",
      value: "100+",
      icon: <Award className="h-6 w-6" />,
    },
    {
      label: "Success Rate",
      value: "95%",
      icon: <Target className="h-6 w-6" />,
    },
  ];

  const testimonials = [
    {
      name: "Davy Kennang",
      role: "Web Developer at Google",
      image: "https://avatars.githubusercontent.com/u/148960418?v=4",
      content:
        "ADC.LEARN transformed my career. The practical projects and mentor support helped me land my dream job at Google.",
      rating: 5,
    },
    {
      name: "Giress Ayuk",
      role: "Data Scientist at Amazon",
      image: "https://avatars.githubusercontent.com/u/149671919?v=4",
      content:
        "The data science courses here are exceptional. Real-world projects and industry-relevant curriculum made all the difference.",
      rating: 5,
    },
    {
      name: "Tem chelsy",
      role: "UX Designer at Apple",
      image:
        "https://media.licdn.com/dms/image/v2/D4E03AQGbwwCULtAC4w/profile-displayphoto-shrink_100_100/profile-displayphoto-shrink_100_100/0/1722606167980?e=1744848000&v=beta&t=GlNmBzf9k68I158wCP_4P3tjosHk9QeQKOw_CRzQ1rY",
      content:
        "Great platform for learning design. The community feedback on projects is invaluable. Highly recommended!",
      rating: 5,
    },
  ];

  const benefits = [
    {
      icon: <Target className="h-8 w-8" />,
      title: "Career-Focused Learning",
      description: "Courses designed to help you achieve your career goals",
    },
    {
      icon: <Coffee className="h-8 w-8" />,
      title: "Learn at Your Pace",
      description: "Flexible learning schedule that fits your lifestyle",
    },
    {
      icon: <Rocket className="h-8 w-8" />,
      title: "Industry Recognition",
      description: "Certificates valued by top employers worldwide",
    },
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Navbar */}
      <nav className="fixed top-0 left-0 right-0 bg-white/80 backdrop-blur-md z-50 border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center gap-2">
              <BookOpen className="h-8 w-8 text-blue-600" />
              <span className="text-xl font-bold text-gray-900">ADC.LEARN</span>
            </div>

            <div className="hidden md:flex items-center space-x-8">
              <Link
                href="#features"
                className="text-gray-600 hover:text-blue-600 transition-colors"
              >
                Features
              </Link>
              <Link
                href="#courses"
                className="text-gray-600 hover:text-blue-600 transition-colors"
              >
                Courses
              </Link>
              <Link
                href="#testimonials"
                className="text-gray-600 hover:text-blue-600 transition-colors"
              >
                Testimonials
              </Link>
              <Link
                href="#contact"
                className="text-gray-600 hover:text-blue-600 transition-colors"
              >
                Contact
              </Link>
            </div>

            <div className="flex items-center gap-4">
              <Link
                href="/login"
                className="text-gray-600 hover:text-blue-600 transition-colors"
              >
                Sign In
              </Link>
              <Link
                href="/auth"
                className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
              >
                Get Started
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <div className="relative pt-16 pb-32 overflow-hidden">
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?ixlib=rb-1.2.1&auto=format&fit=crop&w=2850&q=80"
            alt="Learning Environment"
            className="w-full h-full object-cover opacity-10"
          />
        </div>
        <div className="pb-10"></div>

        <div className="relative">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20">
            <div className="text-center">
              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl tracking-tight font-extrabold text-gray-900">
                <span
                  className="block"
                  style={{ fontSize: "5rem", lineHeight: "1.3" }}
                >
                  Transform Your Future with
                </span>
                <span
                  className="block text-blue-600"
                  style={{ fontSize: "4rem", lineHeight: "1.2" }}
                >
                  A.D.C Online Learning
                </span>
              </h1>
              <div className="pb-10"></div>

              <p className="mt-3 max-w-md mx-auto text-base text-gray-500 sm:text-lg md:mt-5 md:text-xl md:max-w-3xl">
                Join millions of learners worldwide and master the skills you
                need to advance your career. Learn from industry experts and get
                certified in today's most in-demand fields.
              </p>
              <div className="pb-10"></div>

              <div className="mt-10 flex flex-col sm:flex-row justify-center gap-4">
                <Link
                  href="/auth"
                  className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 transition-colors"
                >
                  Explore Courses
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
                <Link
                  href="#how-it-works"
                  className="inline-flex items-center px-6 py-4 border border-gray-300 text-base font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 transition-colors"
                >
                  How It Works
                </Link>
              </div>
              <div className="pb-10"></div>
              <div className="pb-10"></div>
              <div className="pb-10"></div>
              <div className="pb-10"></div>
              <div className="pb-10"></div>
              <div className="pb-10"></div>
            </div>
          </div>
        </div>
      </div>
      {/* Stats Section */}
      <section className="py-12 bg-blue-600">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="flex justify-center mb-4">
                  <div className="bg-blue-500 p-3 rounded-lg">
                    {React.cloneElement(stat.icon, {
                      className: "h-6 w-6 text-white",
                    })}
                  </div>
                </div>
                <div className="text-3xl font-bold text-white mb-2">
                  {stat.value}
                </div>
                <div className="text-blue-100">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900">
              Explore Top Categories
            </h2>
            <p className="mt-4 text-xl text-gray-600">
              Find the perfect course in our extensive library
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {categories.map((category, index) => (
              <div
                key={index}
                className="relative group bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition-all cursor-pointer"
              >
                <div
                  className={`${category.color} w-12 h-12 rounded-lg flex items-center justify-center mb-4`}
                >
                  {category.icon}
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  {category.name}
                </h3>
                <p className="text-gray-600">{category.courses} courses</p>
                {category.popular && (
                  <div className="absolute top-4 right-4 bg-blue-600 text-white text-xs px-2 py-1 rounded-full">
                    Popular
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Courses Section */}
      <section id="courses" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900">
              Featured Courses
            </h2>
            <p className="mt-4 text-xl text-gray-600">
              Start learning from our most popular courses
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {courses.map((course) => (
              <div
                key={course.id}
                className="bg-white rounded-lg shadow-sm overflow-hidden hover:shadow-md transition-all"
              >
                <div className="relative">
                  <img
                    src={course.image}
                    alt={course.title}
                    className="w-full h-48 object-cover"
                  />
                  <div className="absolute top-4 right-4 bg-white px-2 py-1 rounded-full text-sm font-medium text-gray-600">
                    {course.level}
                  </div>
                </div>
                <div className="p-6">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm text-blue-600 font-medium">
                      {course.category}
                    </span>
                    <div className="flex items-center">
                      <Star className="h-4 w-4 text-yellow-400 fill-current" />
                      <span className="ml-1 text-sm text-gray-600">
                        {course.rating}
                      </span>
                    </div>
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">
                    {course.title}
                  </h3>
                  <p className="text-gray-600 text-sm mb-4">
                    by {course.instructor}
                  </p>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center text-sm text-gray-500">
                      <Clock className="h-4 w-4 mr-1" />
                      {course.duration}
                    </div>
                    <span className="font-bold text-gray-900">
                      ${course.price}
                    </span>
                  </div>
                  <div className="mt-4 pt-4 border-t border-gray-100">
                    <div className="flex items-center text-sm text-gray-500">
                      <Users className="h-4 w-4 mr-1" />
                      {course.students.toLocaleString()} students enrolled
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center mt-12">
            <Link
              href="/courses"
              className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 transition-colors"
            >
              View All Courses
              <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900">
              Why Choose ADC.LEARN?
            </h2>
            <p className="mt-4 text-xl text-gray-600">
              We're committed to your success
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {benefits.map((benefit, index) => (
              <div
                key={index}
                className="bg-white p-8 rounded-xl shadow-sm hover:shadow-md transition-all"
              >
                <div className="text-blue-600 mb-4">{benefit.icon}</div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  {benefit.title}
                </h3>
                <p className="text-gray-600">{benefit.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900">
              Everything you need to succeed
            </h2>
            <p className="mt-4 text-xl text-gray-600">
              Comprehensive features to support your learning journey
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <div
                key={index}
                className="relative group bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition-all"
              >
                <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity blur" />
                <div className="relative bg-white p-6 rounded-xl">
                  <div className="text-blue-600 mb-4">{feature.icon}</div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">
                    {feature.title}
                  </h3>
                  <p className="text-gray-600">{feature.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section id="testimonials" className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900">
              Success Stories
            </h2>
            <p className="mt-4 text-xl text-gray-600">
              Hear from our successful graduates
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <div
                key={index}
                className="bg-white p-8 rounded-xl shadow-sm hover:shadow-md transition-all"
              >
                <div className="flex items-center mb-6">
                  <img
                    src={testimonial.image}
                    alt={testimonial.name}
                    className="w-12 h-12 rounded-full"
                  />
                  <div className="ml-4">
                    <h4 className="text-lg font-semibold text-gray-900">
                      {testimonial.name}
                    </h4>
                    <p className="text-gray-600">{testimonial.role}</p>
                  </div>
                </div>
                <p className="text-gray-600 mb-4">{testimonial.content}</p>
                <div className="flex items-center">
                  {Array.from({ length: testimonial.rating }).map((_, i) => (
                    <Star
                      key={i}
                      className="h-5 w-5 text-yellow-400 fill-current"
                    />
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-blue-600">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">
            Ready to Start Your Learning Journey?
          </h2>
          <p className="text-xl text-blue-100 mb-8">
            Join millions of learners and transform your career today
          </p>
          <Link
            href="/auth"
            className="inline-flex items-center px-8 py-4 border-2 border-white text-lg font-medium rounded-lg text-white hover:bg-white hover:text-blue-600 transition-colors"
          >
            Get Started For Free
            <ArrowRight className="ml-2 h-5 w-5" />
          </Link>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <div>
              <h2 className="text-3xl font-bold text-gray-900">Get in touch</h2>
              <p className="mt-4 text-lg text-gray-600">
                Have questions about our platform? We're here to help. Contact
                us for support or course inquiries.
              </p>

              <div className="mt-8 space-y-6">
                <div className="flex items-center space-x-4">
                  <MapPin className="h-6 w-6 text-blue-600" />
                  <div>
                    <h3 className="font-semibold text-gray-900">Location</h3>
                    <p className="text-gray-600">Rebase Code Camp, Yaounde</p>
                  </div>
                </div>

                <div className="flex items-center space-x-4">
                  <Mail className="h-6 w-6 text-blue-600" />
                  <div>
                    <h3 className="font-semibold text-gray-900">Email</h3>
                    <p className="text-gray-600">contact@adc-learn.com</p>
                  </div>
                </div>

                <div className="flex items-center space-x-4">
                  <MessageSquare className="h-6 w-6 text-blue-600" />
                  <div>
                    <h3 className="font-semibold text-gray-900">Live Chat</h3>
                    <p className="text-gray-600">Available 24/7</p>
                  </div>
                </div>
              </div>
            </div>

            <form className="bg-white p-8 rounded-lg shadow-sm">
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Name
                  </label>
                  <input
                    type="text"
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Email
                  </label>
                  <input
                    type="email"
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Message
                  </label>
                  <textarea
                    rows={4}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                >
                  Send Message
                </button>
              </div>
            </form>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900">
        <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="col-span-1">
              <div className="flex items-center space-x-2">
                <BookOpen className="h-8 w-8 text-blue-500" />
                <span className="text-2xl font-bold text-white">ADC.LEARN</span>
              </div>
              <p className="mt-4 text-gray-400">
                Empowering learners worldwide with quality education and
                practical skills.
              </p>
            </div>

            <div>
              <h3 className="text-sm font-semibold text-gray-400 tracking-wider uppercase">
                Platform
              </h3>
              <ul className="mt-4 space-y-4">
                <li>
                  <Link
                    href="/courses"
                    className="text-gray-300 hover:text-white"
                  >
                    Browse Courses
                  </Link>
                </li>
                <li>
                  <Link
                    href="/categories"
                    className="text-gray-300 hover:text-white"
                  >
                    Categories
                  </Link>
                </li>
                <li>
                  <Link
                    href="/pricing"
                    className="text-gray-300 hover:text-white"
                  >
                    Pricing
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="text-sm font-semibold text-gray-400 tracking-wider uppercase">
                Company
              </h3>
              <ul className="mt-4 space-y-4">
                <li>
                  <Link
                    href="/about"
                    className="text-gray-300 hover:text-white"
                  >
                    About Us
                  </Link>
                </li>
                <li>
                  <Link
                    href="/careers"
                    className="text-gray-300 hover:text-white"
                  >
                    Careers
                  </Link>
                </li>
                <li>
                  <Link href="/blog" className="text-gray-300 hover:text-white">
                    Blog
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="text-sm font-semibold text-gray-400 tracking-wider uppercase">
                Legal
              </h3>
              <ul className="mt-4 space-y-4">
                <li>
                  <Link
                    href="/privacy"
                    className="text-gray-300 hover:text-white"
                  >
                    Privacy Policy
                  </Link>
                </li>
                <li>
                  <Link
                    href="/terms"
                    className="text-gray-300 hover:text-white"
                  >
                    Terms of Service
                  </Link>
                </li>
                <li>
                  <Link
                    href="/cookies"
                    className="text-gray-300 hover:text-white"
                  >
                    Cookie Policy
                  </Link>
                </li>
              </ul>
            </div>
          </div>

          <div className="mt-8 border-t border-gray-800 pt-8 text-center">
            <p className="text-gray-400">
              © {new Date().getFullYear()} ADC.LEARN. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
