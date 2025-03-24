"use client";

import { useState, useEffect } from "react";
import { nationalHelplines, stateHelplines } from "@/lib/helplineData";
import Navbar from "@/app/components/Navbar";

export default function HelplinePage() {
  const [userState, setUserState] = useState<string>("");

  useEffect(() => {
    const state = localStorage.getItem("userRegion");
    if (state) {
      setUserState(state);
    }
  }, []);

  const getStateHelplines = () => {
    return stateHelplines[userState] || stateHelplines["default"];
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <main className="container mx-auto px-4 py-8 mt-16">
        <h1 className="text-3xl font-bold text-[#450C1C] mb-8">
          Emergency Helpline Numbers
        </h1>

        {/* Description */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <p className="text-gray-700 mb-4">
            In case of emergency, please contact the appropriate helpline number
            below. These numbers are available 24/7 to provide assistance and
            support.
          </p>
          <div className="bg-[#FFF5F5] border-l-4 border-[#D2042D] p-4">
            <p className="text-[#450C1C] font-medium">Important Note:</p>
            <p className="text-gray-700">
              All emergency numbers are toll-free and can be dialed from any
              phone, even without balance.
            </p>
          </div>
        </div>

        {/* National Helplines Section */}
        <section className="bg-white rounded-lg shadow-md p-6 mb-8">
          <h2 className="text-2xl font-semibold text-[#450C1C] mb-6">
            National Helplines
          </h2>
          <div className="grid gap-6 md:grid-cols-2">
            {nationalHelplines.map((helpline, index) => (
              <div
                key={index}
                className="bg-gray-50 rounded-lg p-4 border-l-4 border-[#D2042D]"
              >
                <div className="flex flex-col h-full justify-between">
                  <div>
                    <h3 className="text-lg font-medium text-[#7D0D2C] mb-2">
                      {helpline.name}
                    </h3>
                    <p className="text-gray-600 mb-4">{helpline.description}</p>
                  </div>
                  <a
                    href={`tel:${helpline.number}`}
                    className="inline-flex items-center gap-2 text-[#D2042D] hover:text-[#A8092D] font-medium"
                  >
                    <svg
                      className="w-5 h-5"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                      />
                    </svg>
                    {helpline.number}
                  </a>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* State Helplines Section */}
        <section className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-2xl font-semibold text-[#450C1C] mb-6">
            State Helplines
            {userState &&
              ` - ${userState
                .split("-")
                .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
                .join(" ")}`}
          </h2>
          <div className="grid gap-6 md:grid-cols-2">
            {getStateHelplines().map((helpline, index) => (
              <div
                key={index}
                className="bg-gray-50 rounded-lg p-4 border-l-4 border-[#7D0D2C]"
              >
                <div className="flex flex-col h-full justify-between">
                  <div>
                    <h3 className="text-lg font-medium text-[#7D0D2C] mb-2">
                      {helpline.name}
                    </h3>
                    <p className="text-gray-600 mb-4">{helpline.description}</p>
                  </div>
                  <a
                    href={`tel:${helpline.number}`}
                    className="inline-flex items-center gap-2 text-[#D2042D] hover:text-[#A8092D] font-medium"
                  >
                    <svg
                      className="w-5 h-5"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                      />
                    </svg>
                    {helpline.number}
                  </a>
                </div>
              </div>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
}
