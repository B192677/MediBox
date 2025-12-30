

// src/pages/FAQ.jsx
import React from "react";

const FAQ = () => {
  return (
    <div className="relative w-full max-w-5xl mx-auto min-h-screen flex-col justify-between overflow-x-hidden bg-gray-50">
      {/* Header */}
      <header className="sticky top-0 z-10 bg-gray-50/80 backdrop-blur-sm shadow">
        <div className="flex items-center px-4 py-4">
          <button
            onClick={() => window.history.back()}
            className="text-gray-600 hover:text-gray-900"
          >
            {/* Back Icon */}
            <svg
              fill="currentColor"
              height="24"
              width="24"
              viewBox="0 0 256 256"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M224,128a8,8,0,0,1-8,8H59.31l58.35,58.34a8,8,0,0,1-11.32,11.32l-72-72a8,8,0,0,1,0-11.32l72-72a8,8,0,0,1,11.32,11.32L59.31,120H216A8,8,0,0,1,224,128Z" />
            </svg>
          </button>
          <h1 className="text-3xl pl-6 font-extrabold text-gray-900 sm:text-4xl lg:text-5xl">
            Frequently Asked Questions
          </h1>
        </div>
      </header>

      <main className="flex-1">
        {/* Hero Section */}
        <section className="bg-primary-50 py-16 px-6 lg:px-10">
          <div className="max-w-3xl mx-auto text-center">
            <p className="mt-4 text-lg text-gray-600">
              Can't find the answer you're looking for?  
              Reach out to our customer support team.
            </p>
          </div>
        </section>

        {/* FAQ Content */}
        <section className=" px-6 lg:px-10">
          <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-10">
            {/* Categories */}
            <div className="sticky top-24 self-start">
              <h2 className="text-xl font-bold text-gray-900 mb-6">Categories</h2>
              <ul className="space-y-2">
                {["general", "product", "ordering", "returns", "account"].map(
                  (cat, i) => (
                    <li key={i}>
                      <a
                        href={`#${cat}`}
                        className="block py-2 px-4 rounded-md text-gray-700 hover:bg-gray-100 font-medium"
                      >
                        {cat
                          .replace(/^\w/, (c) => c.toUpperCase())
                          .replace("-", " ")}
                      </a>
                    </li>
                  )
                )}
              </ul>
            </div>

            {/* Questions */}
            <div className="md:col-span-2 space-y-16">
              {/* General Inquiries */}
              <div id="general">
                <h2 className="text-2xl font-bold text-gray-900 mb-6">
                  General Inquiries
                </h2>
                {[
                  {
                    q: "What is MediBox?",
                    a: "MediBox is your trusted partner for authentic medicines, healthcare products, and wellness essentials delivered to your doorstep."
                  },
                  {
                    q: "Do you operate across India?",
                    a: "Yes, we deliver to most cities and towns across India. Delivery availability is shown at checkout based on your pincode."
                  },
                  {
                    q: "How do I contact support?",
                    a: "You can email us at support@medibox.com, call +91 98765 43210, or use the live chat feature on our website."
                  }
                ].map((faq, i) => (
                  <details
                    key={i}
                    className="group rounded-md border border-gray-200 bg-white shadow-sm"
                  >
                    <summary className="flex cursor-pointer items-center justify-between gap-6 p-4">
                      <h3 className="text-lg font-medium text-gray-900">
                        {faq.q}
                      </h3>
                      <span className="text-gray-500 group-open:rotate-180 transition-transform">
                        ▼
                      </span>
                    </summary>
                    <div className="px-4 pb-4 text-gray-600">{faq.a}</div>
                  </details>
                ))}
              </div>

              {/* Product Information */}
              <div id="product">
                <h2 className="text-2xl font-bold text-gray-900 mb-6">
                  Product Information
                </h2>
                {[
                  {
                    q: "Are all medicines authentic?",
                    a: "Absolutely. All our medicines are 100% genuine and sourced only from licensed pharmacies and distributors."
                  },
                  {
                    q: "Do you sell prescription medicines?",
                    a: "Yes, prescription medicines are available. You will need to upload a valid doctor’s prescription during checkout."
                  },
                  {
                    q: "Do you provide product details?",
                    a: "Yes, each product page contains detailed information, including dosage, side effects, storage instructions, and manufacturer details."
                  }
                ].map((faq, i) => (
                  <details
                    key={i}
                    className="group rounded-md border border-gray-200 bg-white shadow-sm"
                  >
                    <summary className="flex cursor-pointer items-center justify-between gap-6 p-4">
                      <h3 className="text-lg font-medium text-gray-900">
                        {faq.q}
                      </h3>
                      <span className="text-gray-500 group-open:rotate-180 transition-transform">
                        ▼
                      </span>
                    </summary>
                    <div className="px-4 pb-4 text-gray-600">{faq.a}</div>
                  </details>
                ))}
              </div>

              {/* Ordering and Shipping */}
              <div id="ordering">
                <h2 className="text-2xl font-bold text-gray-900 mb-6">
                  Ordering and Shipping
                </h2>
                {[
                  {
                    q: "How do I place an order?",
                    a: "Simply browse our products, add items to your cart, and checkout. You can pay via credit/debit card, UPI, or cash on delivery."
                  },
                  {
                    q: "How long does delivery take?",
                    a: "Most orders are delivered within 2-5 business days depending on your location."
                  },
                  {
                    q: "Can I track my order?",
                    a: "Yes. Once shipped, you will receive a tracking number via email/SMS to monitor your package in real-time."
                  }
                ].map((faq, i) => (
                  <details
                    key={i}
                    className="group rounded-md border border-gray-200 bg-white shadow-sm"
                  >
                    <summary className="flex cursor-pointer items-center justify-between gap-6 p-4">
                      <h3 className="text-lg font-medium text-gray-900">
                        {faq.q}
                      </h3>
                      <span className="text-gray-500 group-open:rotate-180 transition-transform">
                        ▼
                      </span>
                    </summary>
                    <div className="px-4 pb-4 text-gray-600">{faq.a}</div>
                  </details>
                ))}
              </div>

              {/* Returns and Refunds */}
              <div id="returns">
                <h2 className="text-2xl font-bold text-gray-900 mb-6">
                  Returns and Refunds
                </h2>
                {[
                  {
                    q: "What is your return policy?",
                    a: "We accept returns of unopened medicines within 7 days of delivery. Cold-chain medicines are non-returnable."
                  },
                  {
                    q: "How do I request a refund?",
                    a: "Contact our support team with your order details. Refunds are processed within 5–7 working days after product verification."
                  },
                  {
                    q: "Are shipping charges refundable?",
                    a: "No, shipping charges are non-refundable unless the product was damaged or delivered incorrectly."
                  }
                ].map((faq, i) => (
                  <details
                    key={i}
                    className="group rounded-md border border-gray-200 bg-white shadow-sm"
                  >
                    <summary className="flex cursor-pointer items-center justify-between gap-6 p-4">
                      <h3 className="text-lg font-medium text-gray-900">
                        {faq.q}
                      </h3>
                      <span className="text-gray-500 group-open:rotate-180 transition-transform">
                        ▼
                      </span>
                    </summary>
                    <div className="px-4 pb-4 text-gray-600">{faq.a}</div>
                  </details>
                ))}
              </div>

              {/* Account Management */}
              <div id="account">
                <h2 className="text-2xl font-bold text-gray-900 mb-6">
                  Account Management
                </h2>
                {[
                  {
                    q: "Do I need an account to order?",
                    a: "Yes, having an account allows you to track your orders, save prescriptions, and access faster checkout."
                  },
                  {
                    q: "How do I reset my password?",
                    a: "Click on 'Forgot Password' on the login page, and follow the instructions sent to your registered email."
                  },
                  {
                    q: "Can I save multiple addresses?",
                    a: "Yes, you can add multiple shipping addresses in your account and select the one you prefer at checkout."
                  }
                ].map((faq, i) => (
                  <details
                    key={i}
                    className="group rounded-md border border-gray-200 bg-white shadow-sm"
                  >
                    <summary className="flex cursor-pointer items-center justify-between gap-6 p-4">
                      <h3 className="text-lg font-medium text-gray-900">
                        {faq.q}
                      </h3>
                      <span className="text-gray-500 group-open:rotate-180 transition-transform">
                        ▼
                      </span>
                    </summary>
                    <div className="px-4 pb-4 text-gray-600">{faq.a}</div>
                  </details>
                ))}
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
};

export default FAQ;

