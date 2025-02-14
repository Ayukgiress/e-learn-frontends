'use client';

import React, { useState } from 'react';

interface FAQ {
  question: string;
  answer: string;
}

const faqs: FAQ[] = [
  { question: "What courses do you offer?", answer: "We offer a variety of courses in programming, web development, and data science." },
  { question: "How do I enroll?", answer: "You can enroll directly through our website by selecting a course and completing the registration process." },
  { question: "What payment methods are accepted?", answer: "We accept credit cards, PayPal, and bank transfers." },
  { question: "Is there a refund policy?", answer: "Yes, we offer a full refund within the first 14 days of enrollment." },
  { question: "Can I access the courses after completion?", answer: "Yes, you will have lifetime access to the course materials." },
  { question: "Are there any prerequisites?", answer: "Some courses may have prerequisites, which will be listed on the course page." },
  { question: "Do you offer certificates?", answer: "Yes, you will receive a certificate of completion after finishing a course." },
  { question: "What if I have more questions?", answer: "Feel free to reach out to us through the contact form or live chat." },
  { question: "Can I take courses at my own pace?", answer: "Yes, all courses are self-paced." },
  { question: "Do you provide support during the course?", answer: "Yes, our instructors are available to assist you throughout the course." },
];

const FAQs: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleOpen = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="mt-12 text-center w-full max-w-2xl">
        <h2 className="text-2xl font-bold text-gray-900">Frequently Asked Questions</h2>
        <div className="mt-6 space-y-4">
          {faqs.map((faq, index) => (
            <div 
              key={index} 
              className="border p-4 rounded-md cursor-pointer" 
              onClick={() => toggleOpen(index)}
            >
              <h3 className="font-semibold text-gray-800">{faq.question}</h3>
              {openIndex === index && <p className="mt-2 text-gray-600">{faq.answer}</p>}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default FAQs;