"use client";

import Link from "next/link";
import Image from "next/image";
import Navbar from "./components/Navbar";
import NewsFeed from "./components/NewsFeed";

export default function Home() {
  return (
    <main className="min-h-screen">
      <Navbar />

      {/* Hero Section */}
      <section className="bg-gradient-to-r from-[#450C1C] to-[#D2042D] text-white">
        <div className="container mx-auto px-4 py-16 flex flex-col md:flex-row items-center justify-between">
          {/* Left side - Text content */}
          <div className="md:w-1/2 mb-8 md:mb-0">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              Empowering Women Through Legal Knowledge
            </h1>
            <p className="text-lg mb-8 text-gray-100">
              Your trusted companion for understanding and accessing legal
              rights in India
            </p>
            <div className="space-y-4">
              <div className="flex items-center">
                <div className="w-2 h-2 bg-white rounded-full mr-3"></div>
                <p>Access to legal information and resources</p>
              </div>
              <div className="flex items-center">
                <div className="w-2 h-2 bg-white rounded-full mr-3"></div>
                <p>24/7 AI-powered legal assistant</p>
              </div>
              <div className="flex items-center">
                <div className="w-2 h-2 bg-white rounded-full mr-3"></div>
                <p>Emergency helpline numbers</p>
              </div>
            </div>
            <div className="mt-8 space-x-4">
              <Link
                href="/chatbot"
                className="bg-white text-[#450C1C] px-6 py-3 rounded-lg font-medium hover:bg-gray-100 transition-colors duration-200"
              >
                Start Chat
              </Link>
              <Link
                href="/resources"
                className="border-2 border-white text-white px-6 py-3 rounded-lg font-medium hover:bg-white/10 transition-colors duration-200"
              >
                View Resources
              </Link>
            </div>
          </div>

          {/* Right side - Logo */}
          <div className="md:w-1/2 flex justify-center">
            <div className="relative w-64 h-64 md:w-96 md:h-96">
              <Image
                src="/logo.png"
                alt="EmpowHer Logo"
                fill
                style={{ objectFit: "contain" }}
                priority
              />
            </div>
          </div>
        </div>
      </section>

      {/* News Feed Section */}
      <NewsFeed />
    </main>
  );
}
