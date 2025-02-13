import React from 'react';
import Link from 'next/link';
import { 
  BookOpen, 
  Shield, 
  Zap, 
  Globe, 
  Users, 
  BarChart,
  ArrowRight,
  FileCode,
  Mail,
  MessageSquare,
  MapPin
} from 'lucide-react';

export default function Home() {
  const features = [
    {
      icon: <BookOpen className="h-6 w-6" />,
      title: 'Extensive Course Library',
      description: 'Access a wide range of courses across various subjects and skills.'
    },
    {
      icon: <Shield className="h-6 w-6" />,
      title: 'Safe Learning Environment',
      description: 'Experience a secure platform with privacy and data protection.'
    },
    {
      icon: <Zap className="h-6 w-6" />,
      title: 'Interactive Learning',
      description: 'Engage with multimedia content and real-time feedback.'
    },
    {
      icon: <Globe className="h-6 w-6" />,
      title: 'Global Community',
      description: 'Join a diverse community of learners from around the world.'
    },
    {
      icon: <Users className="h-6 w-6" />,
      title: 'Collaborative Projects',
      description: 'Work together with peers on projects and assignments.'
    },
    {
      icon: <BarChart className="h-6 w-6" />,
      title: 'Track Your Progress',
      description: 'Monitor your learning journey with detailed analytics.'
    },
    {
      icon: <FileCode className="h-6 w-6" />,
      title: 'Code Playground',
      description: 'Experiment with code directly on our platform with real-time feedback.'
    },
    {
      icon: <Shield className="h-6 w-6" />,
      title: 'Security & Privacy',
      description: 'We take your privacy seriously, ensuring a secure environment for learning.'
    },
    {
      icon: <Globe className="h-6 w-6" />,
      title: 'Global Networking',
      description: 'Connect with learners, instructors, and professionals worldwide.'
    },
    {
      icon: <Users className="h-6 w-6" />,
      title: 'Group Discussions',
      description: 'Join topic-based discussions and collaborate with like-minded individuals.'
    }
  ];

  const steps = [
    {
      icon: <FileCode className="h-6 w-6" />,
      title: 'Sign Up',
      description: 'Create your account and start your learning journey.'
    },
    {
      icon: <Zap className="h-6 w-6" />,
      title: 'Explore Courses',
      description: 'Browse through our extensive library of courses.'
    },
    {
      icon: <Users className="h-6 w-6" />,
      title: 'Join Classes',
      description: 'Participate in live classes and interact with instructors.'
    },
    {
      icon: <BarChart className="h-6 w-6" />,
      title: 'Earn Certificates',
      description: 'Complete courses and earn certificates to showcase your skills.'
    },
    {
      icon: <Zap className="h-6 w-6" />,
      title: 'Apply Skills',
      description: 'Use your new skills in real-world projects and challenges.'
    },
    {
      icon: <Globe className="h-6 w-6" />,
      title: 'Share Achievements',
      description: 'Show off your accomplishments and certifications with your network.'
    }
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Navbar */}
      <nav className="sticky top-0 z-50 bg-white shadow-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center gap-2">
              <BookOpen className="h-8 w-8 text-blue-600" />
              <span className="text-xl font-bold text-gray-900">ADC.LEARN</span>
            </div>
            <div className="hidden md:flex items-center space-x-8">
              <Link href="#features" className="text-gray-600 hover:text-blue-600 transition-colors">Features</Link>
              <Link href="#process" className="text-gray-600 hover:text-blue-600 transition-colors">How it Works</Link>
              <Link href="#contact" className="text-gray-600 hover:text-blue-600 transition-colors">Contact</Link>
            </div>
            <div className="flex items-center gap-4">
              <Link href="/login" className="text-gray-600 hover:text-blue-600 transition-colors">Sign In</Link>
              <Link href="/auth" className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors">Get Started</Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <div className="relative pt-16 pb-32 overflow-hidden">
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1551434678-e076c223a692?ixlib=rb-1.2.1&auto=format&fit=crop&w=2850&q=80"
            alt="Learning Environment"
            className="w-full h-full object-cover opacity-10"
          />
        </div>
        <div className="relative">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20">
            <div className="text-center">
              <h1 className="text-4xl tracking-tight font-extrabold text-gray-900 sm:text-5xl md:text-6xl">
                <span className="block">Learn Anytime,</span>
                <span className="block text-blue-600">Anywhere with ADC-Learn</span>
              </h1>
              <p className="mt-3 max-w-md mx-auto text-base text-gray-500 sm:text-lg md:mt-5 md:text-xl md:max-w-3xl">
                The ultimate platform for enhancing your skills. Access a wide range of courses and learn from the best educators.
              </p>
              <div className="mt-10 flex justify-center gap-4">
                <Link
                  href="/auth"
                  className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 transition-colors"
                >
                  Get Started
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
                <Link
                  href="#features"
                  className="inline-flex items-center px-6 py-3 border border-gray-300 text-base font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 transition-colors"
                >
                  Learn More
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <section id="features" className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl font-bold text-gray-900">Everything you need to learn</h2>
            <p className="mt-4 text-xl text-gray-600">Powerful features to help you succeed in your learning journey</p>
          </div>

          <div className="mt-20 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {features.map((feature, index) => (
              <div key={index} className="relative group bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition-shadow">
                <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity blur" />
                <div className="relative bg-white p-6 rounded-xl">
                  <div className="text-blue-600 mb-4">{feature.icon}</div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">{feature.title}</h3>
                  <p className="text-gray-600">{feature.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section id="process" className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl font-bold text-gray-900">How it works</h2>
            <p className="mt-4 text-xl text-gray-600">Get started in six simple steps</p>
          </div>

          <div className="mt-16">
            <div className="relative">
              <div className="absolute inset-0 flex items-center" aria-hidden="true">
                <div className="w-full border-t border-gray-300" />
              </div>
              <div className="relative flex justify-between">
                {steps.map((step, index) => (
                  <div key={index} className="text-center">
                    <div className="relative flex flex-col items-center">
                      <div className="rounded-full bg-blue-600 p-4 text-white">
                        {step.icon}
                      </div>
                      <h3 className="mt-6 text-lg font-medium text-gray-900">{step.title}</h3>
                      <p className="mt-2 text-sm text-gray-500 max-w-[200px]">{step.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <div>
              <h2 className="text-3xl font-bold text-gray-900">Get in touch</h2>
              <p className="mt-4 text-lg text-gray-600">
                Have questions about our platform? We're here to help. Contact us for support or course inquiries.
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
                    <p className="text-gray-600">elearn@gmail.com</p>
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
                  <label className="block text-sm font-medium text-gray-700">Name</label>
                  <input
                    type="text"
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700">Email</label>
                  <input
                    type="email"
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700">Message</label>
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
                <span className="text-2xl font-bold text-white">ADC-Learn</span>
              </div>
              <p className="mt-4 text-gray-400">
                Empowering learners with knowledge for a brighter future.
              </p>
            </div>

            <div>
              <h3 className="text-sm font-semibold text-gray-400 tracking-wider uppercase">Product</h3>
              <ul className="mt-4 space-y-4">
                <li>
                  <Link href="#features" className="text-gray-300 hover:text-white">Features</Link>
                </li>
                <li>
                  <Link href="#pricing" className="text-gray-300 hover:text-white">Pricing</Link>
                </li>
                <li>
                  <Link href="#security" className="text-gray-300 hover:text-white">Security</Link>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="text-sm font-semibold text-gray-400 tracking-wider uppercase">Company</h3>
              <ul className="mt-4 space-y-4">
                <li>
                  <Link href="/about" className="text-gray-300 hover:text-white">About</Link>
                </li>
                <li>
                  <Link href="/blog" className="text-gray-300 hover:text-white">Blog</Link>
                </li>
                <li>
                  <Link href="/careers" className="text-gray-300 hover:text-white">Careers</Link>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="text-sm font-semibold text-gray-400 tracking-wider uppercase">Legal</h3>
              <ul className="mt-4 space-y-4">
                <li>
                  <Link href="/terms" className="text-gray-300 hover:text-white">Terms of Service</Link>
                </li>
                <li>
                  <Link href="/privacy" className="text-gray-300 hover:text-white">Privacy Policy</Link>
                </li>
              </ul>
            </div>
          </div>

          <div className="mt-12 flex justify-center text-gray-400">
            <p>&copy; 2025 ADC-Learn. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}