import React from "react";

function Terms() {
  return (
    <div className="bg-gray-50 text-gray-800 min-h-screen flex flex-col">
      {/* Header */}
      <header className="sticky top-0 bg-white/80 backdrop-blur-sm z-10">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between py-4">
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
            <h1 className="text-lg font-bold text-gray-900">Terms of Service</h1>
            <div className="w-6"></div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-grow container mx-auto px-6 py-8">
        <div className="space-y-8">
          {/* Introduction */}
          <section id="introduction">
            <h2 className="text-2xl font-bold text-gray-900 mb-3">Introduction</h2>
            <p className="text-base text-gray-600 leading-relaxed">
              Welcome to MediBox! These Terms of Service govern your use of our
              platform and services. By accessing or using MediBox, you agree to
              be bound by these terms. If you do not agree to these terms,
              please do not use our services.
            </p>
          </section>

          {/* User Responsibilities */}
          <section id="user-responsibilities">
            <h2 className="text-2xl font-bold text-gray-900 mb-3">
              User Responsibilities
            </h2>
            <p className="text-base text-gray-600 leading-relaxed">
              As a user of MediBox, you are responsible for maintaining the
              confidentiality of your account information and for all activities
              that occur under your account. You agree to provide accurate and
              complete information when using our services and to comply with
              all applicable laws and regulations.
            </p>
          </section>

          {/* Limitation of Liability */}
          <section id="limitation-of-liability">
            <h2 className="text-2xl font-bold text-gray-900 mb-3">
              Limitation of Liability
            </h2>
            <p className="text-base text-gray-600 leading-relaxed">
              MediBox is not liable for any direct, indirect, incidental,
              special, or consequential damages arising out of or in connection
              with your use of our services. We do not guarantee the accuracy,
              completeness, or reliability of any information provided on our
              platform.
            </p>
          </section>

          {/* Governing Law */}
          <section id="governing-law">
            <h2 className="text-2xl font-bold text-gray-900 mb-3">
              Governing Law
            </h2>
            <p className="text-base text-gray-600 leading-relaxed">
              These Terms of Service shall be governed by and construed in
              accordance with the laws of the jurisdiction in which MediBox
              operates. Any disputes arising under these terms shall be resolved
              in the courts of that jurisdiction.
            </p>
          </section>
        </div>
      </main>

      {/* Footer */}
      <footer className="sticky bottom-0 bg-white border-t border-gray-200">
        <div className="container mx-auto px-6 py-4">
          <button
            onClick={() => window.history.back()}
            className="w-full h-12 px-5 bg-[#1173d4] text-white text-base font-bold rounded-lg shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 transition-colors"
          >
            Agree and Continue
          </button>
        </div>
      </footer>
    </div>
  );
}

export default Terms;