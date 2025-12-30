import React from "react";

const Shipping = () => {
  return (
    <div className="max-w-4xl mx-auto px-6 py-12">

<header className="sticky top-0 z-10 bg-gray-50/80 backdrop-blur-sm">
        <div className="flex items-center px-4 py-3">
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

      <h1 className="text-3xl font-bold pl-25 mb-6 text-gray-800">Shipping & Returns</h1>

        </div>
        <div className="h-px bg-gray-200"></div>
      </header>


      {/* Shipping Policy */}
      <section className="mb-10">
        <h2 className="text-xl font-semibold mb-3 text-gray-700">📦 Shipping Policy</h2>
        <p className="text-gray-600 mb-2">
          At <span className="font-semibold">MediBox</span>, we aim to deliver your
          orders quickly and securely. Orders are processed within{" "}
          <span className="font-semibold">1-2 business days</span>.
        </p>
        <ul className=" ml-6 text-gray-600">
          <li>Standard Delivery: 3-7 business days</li>
          <li>Express Delivery: 1-3 business days</li>
          <li>Free shipping on orders above ₹999</li>
        </ul>
      </section>

      {/* Returns Policy */}
      <section className="mb-10">
        <h2 className="text-xl font-semibold mb-3 text-gray-700">🔄 Returns Policy</h2>
        <p className="text-gray-600 mb-2">
          Your satisfaction is our priority. If you are not satisfied with your purchase,
          you may return the product within <span className="font-semibold">7 days</span>{" "}
          of delivery.
        </p>
        <ul className=" ml-6 text-gray-600">
          <li>Items must be unused and in original packaging.</li>
          <li>Medicines with broken seals cannot be returned due to safety reasons.</li>
          <li>Refunds will be processed within 5-7 working days after inspection.</li>
        </ul>
      </section>

      {/* Contact */}
      <section>
        <h2 className="text-xl font-semibold mb-3 text-gray-700">📞 Need Help?</h2>
        <p className="text-gray-600">
          For shipping or return queries, reach us at{" "}
          <span className="font-semibold">support@medibox.com</span> or call{" "}
          <span className="font-semibold">+91 98765 43210</span>.
        </p>
      </section>
    </div>
  );
};

export default Shipping;