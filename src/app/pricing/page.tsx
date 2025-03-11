import React from 'react';
import Link from 'next/link';

const Pricing: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-50 py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto bg-white rounded-lg shadow-lg p-8">
        <h1 className="text-4xl font-extrabold text-center mb-6 text-gray-900">
          Pricing Plans
        </h1>
        <p className="text-center mb-12 text-lg text-gray-600">
          Choose the plan that suits your learning needs.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {/* Individual Plan */}
          <div className="border rounded-lg p-6 shadow-md bg-gray-100 hover:shadow-xl transition-shadow duration-300 ease-in-out">
            <h2 className="text-2xl font-semibold mb-4 text-gray-800">Individual Plan</h2>
            <p className="text-lg font-bold mb-6 text-blue-600">$19/month</p>
            <ul className="list-disc list-inside text-gray-700 mb-6">
              <li>Access to all basic courses</li>
              <li>Community support</li>
              <li>Weekly webinars</li>
            </ul>
            <Link href="/auth">
                Sign Up Now
            </Link>
          </div>

          {/* Team Plan */}
          <div className="border rounded-lg p-6 shadow-md bg-gray-100 hover:shadow-xl transition-shadow duration-300 ease-in-out">
            <h2 className="text-2xl font-semibold mb-4 text-gray-800">Team Plan</h2>
            <p className="text-lg font-bold mb-6 text-blue-600">$99/month for up to 5 users</p>
            <ul className="list-disc list-inside text-gray-700 mb-6">
              <li>Everything in the Individual Plan</li>
              <li>Team collaboration tools</li>
              <li>Custom onboarding sessions</li>
            </ul>
            <Link href="/auth">
                Sign Up Now
            </Link>
          </div>

          {/* Enterprise Plan */}
          <div className="border rounded-lg p-6 shadow-md bg-gray-100 hover:shadow-xl transition-shadow duration-300 ease-in-out">
            <h2 className="text-2xl font-semibold mb-4 text-gray-800">Enterprise Plan</h2>
            <p className="text-lg font-bold mb-6 text-blue-600">Contact us for a custom quote</p>
            <ul className="list-disc list-inside text-gray-700 mb-6">
              <li>Everything in the Team Plan</li>
              <li>Dedicated account manager</li>
              <li>Advanced analytics and reporting</li>
              <li>Customized training solutions</li>
            </ul>
            <Link href="/contact">
                Contact Us
            </Link>
          </div>
        </div>

        <div className="mt-12 text-center">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">Why Choose Us?</h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Our platform offers a wide range of courses taught by expert instructors. Join us today to enhance your skills and advance your career.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Pricing;
