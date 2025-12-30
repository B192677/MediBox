import React from "react";
import { useNavigate } from "react-router-dom";

const PrivacyPolicy = () => {
  const navigate = useNavigate();

  const handleAgree = () => {
    navigate("/register"); // navigate to register page
  };

  return (
    <div className="relative flex min-h-screen flex-col justify-between overflow-x-hidden bg-gray-50">
      {/* Header */}
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
          <h1 className="flex-1 pr-10 text-center text-xl font-bold tracking-tight text-gray-900">
            Privacy Policy
          </h1>
        </div>
        <div className="h-px bg-gray-200"></div>
      </header>

      {/* Main Content */}
      <main className="flex-grow p-6 space-y-8">
        <section>
          <h2 className="mb-3 text-2xl font-bold text-gray-800">Introduction</h2>
          <p className="leading-relaxed text-gray-600">
            Welcome to MediBox! Your privacy is important to us. This Privacy
            Policy explains how we collect, use, and protect your personal
            information when you use our services. By using MediBox, you agree
            to the terms outlined in this policy.
          </p>
        </section>

        <section>
          <h2 className="mb-3 text-2xl font-bold text-gray-800">
            Data Collection
          </h2>
          <p className="leading-relaxed text-gray-600">
            We collect information you provide directly, such as when you
            register, book appointments, or communicate with us. This may
            include your name, contact details, medical history, and payment
            information. We also collect data automatically, like your IP
            address and usage patterns, to improve our services.
          </p>
        </section>

        <section>
          <h2 className="mb-3 text-2xl font-bold text-gray-800">
            How We Use Your Data
          </h2>
          <p className="leading-relaxed text-gray-600">
            Your data is used to provide and enhance our services. This includes
            managing appointments, processing payments, personalizing your
            experience, and communicating with you about updates or offers. We
            may also use your data for research and analytics to improve our
            platform.
          </p>
        </section>

        <section>
          <h2 className="mb-3 text-2xl font-bold text-gray-800">Data Sharing</h2>
          <p className="leading-relaxed text-gray-600">
            We may share your information with healthcare providers, payment
            processors, and service providers who assist us in delivering our
            services. We ensure these parties adhere to strict data protection
            standards. We do not sell your personal information to third
            parties.
          </p>
        </section>

        <section>
          <h2 className="mb-3 text-2xl font-bold text-gray-800">Your Rights</h2>
          <p className="leading-relaxed text-gray-600">
            You have the right to access, correct, or delete your personal
            information. You can also object to certain data processing
            activities. Please contact us to exercise these rights or if you
            have any concerns about your data.
          </p>
        </section>

        <section>
          <h2 className="mb-3 text-2xl font-bold text-gray-800">
            Security Measures
          </h2>
          <p className="leading-relaxed text-gray-600">
            We employ robust security measures to protect your data from
            unauthorized access, alteration, or disclosure. This includes
            encryption, access controls, and regular security audits. We are
            committed to maintaining the confidentiality and integrity of your
            information.
          </p>
        </section>
      </main>

      {/* Footer */}


      <footer className="sticky bottom-0 border-t border-gray-200 bg-white p-4">
         <button
           onClick={handleAgree}
           className="flex w-full justify-center h-12 px-6 bg-green-500 text-white font-bold rounded-xl hover:bg-green-600 transition-colors"
         >
           Agree and Continue
         </button>
       </footer>

      
    </div>
  );
};

export default PrivacyPolicy;