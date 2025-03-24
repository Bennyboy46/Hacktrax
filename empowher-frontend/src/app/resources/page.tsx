"use client";

import React from "react";
import Navbar from "../components/Navbar";
import Link from "next/link";

export default function ResourcesPage() {
  return (
    <main>
      <Navbar />
      <div className="min-h-screen bg-gradient-to-b from-[#450C1C] to-[#D2042D] pt-20 p-6">
        <div className="max-w-6xl mx-auto">
          <div className="bg-white rounded-lg shadow-xl p-6">
            <h1 className="text-3xl font-bold text-[#450C1C] mb-8 text-center">
              Legal Resources
            </h1>

            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {/* Resource Cards */}
              <div className="bg-white p-6 rounded-lg shadow-md border border-[#7D0D2C]/10">
                <h3 className="text-xl font-semibold text-[#450C1C] mb-3">
                  Women&apos;s Rights
                </h3>
                <p className="text-[#7D0D2C] mb-4">
                  Essential information about legal rights and protections for
                  women in India.
                </p>
                <a
                  href="#"
                  className="text-[#D2042D] hover:text-[#A8092D] font-medium"
                >
                  Learn more →
                </a>
              </div>

              <div className="bg-white p-6 rounded-lg shadow-md border border-[#7D0D2C]/10">
                <h3 className="text-xl font-semibold text-[#450C1C] mb-3">
                  Legal Aid
                </h3>
                <p className="text-[#7D0D2C] mb-4">
                  Information about accessing free or low-cost legal services
                  and support.
                </p>
                <a
                  href="#"
                  className="text-[#D2042D] hover:text-[#A8092D] font-medium"
                >
                  Learn more →
                </a>
              </div>

              <div className="bg-white p-6 rounded-lg shadow-md border border-[#7D0D2C]/10 hover:shadow-lg transition-shadow duration-200">
                <h3 className="text-xl font-semibold text-[#450C1C] mb-3">
                  Helpline Numbers
                </h3>
                <p className="text-[#7D0D2C] mb-4">
                  Emergency contacts and helpline numbers for women in distress.
                </p>
                <Link
                  href="/resources/helpline"
                  className="inline-flex items-center text-[#D2042D] hover:text-[#A8092D] font-medium group"
                >
                  <span>Read more</span>
                  <svg
                    className="w-5 h-5 ml-1 transform transition-transform group-hover:translate-x-1"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M17 8l4 4m0 0l-4 4m4-4H3"
                    />
                  </svg>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
