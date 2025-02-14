// components/TermsOfService.tsx

import React from 'react';

const TermsOfService: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto bg-white rounded-xl shadow-lg p-8">
        <h1 className="text-2xl font-bold mb-4">Terms of Service</h1>
        <p className="mb-4">
          Welcome to our website. These Terms of Service govern your use of our website located at JOUVENCE, Yaounde.
        </p>

        <h2 className="text-xl font-semibold mt-6 mb-2">1. Acceptance of Terms</h2>
        <p className="mb-4">
          By accessing or using our service, you agree to be bound by these Terms. If you do not agree, please do not use our service.
        </p>

        <h2 className="text-xl font-semibold mt-6 mb-2">2. Changes to Terms</h2>
        <p className="mb-4">
          We may modify these Terms at any time. Your continued use of the service after any changes indicates your acceptance of the new Terms.
        </p>

        <h2 className="text-xl font-semibold mt-6 mb-2">3. User Responsibilities</h2>
        <p className="mb-4">
          You are responsible for your use of the service and must comply with all applicable laws and regulations.
        </p>

        <h2 className="text-xl font-semibold mt-6 mb-2">4. Limitation of Liability</h2>
        <p className="mb-4">
          We are not liable for any indirect, incidental, or consequential damages arising from your use of the service.
        </p>

        <h2 className="text-xl font-semibold mt-6 mb-2">5. Governing Law</h2>
        <p className="mb-4">
          These Terms are governed by the laws of [Your Jurisdiction].
        </p>

        <h2 className="text-xl font-semibold mt-6 mb-2">6. Contact Us</h2>
        <p className="mb-4">
          If you have any questions about these Terms, please contact us at ADC.LEARN@GMAIL.COM.
        </p>

        <p className="mt-6 text-sm text-gray-600">
          Last updated: [Date]
        </p>
      </div>
    </div>
  );
};

export default TermsOfService;