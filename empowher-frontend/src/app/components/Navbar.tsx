"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";

export default function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [userGender, setUserGender] = useState<string>("");
  const pathname = usePathname();
  const router = useRouter();

  useEffect(() => {
    // Check if user has selected gender
    const gender = localStorage.getItem("userGender");
    if (!gender && pathname !== "/select-user") {
      router.push("/select-user");
    } else {
      setUserGender(gender || "");
    }
  }, [pathname, router]);

  const isActive = (path: string) => pathname === path;

  // Only show Resources link for female users
  const showResources = userGender === "female";

  return (
    <nav className="bg-white shadow-md fixed top-0 left-0 right-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          {/* Brand/Logo */}
          <div className="flex-shrink-0 flex items-center">
            <Link href="/" className="text-xl font-bold text-[#D2042D]">
              empow<span className="text-[#450C1C]">Her</span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden sm:flex sm:items-center sm:space-x-8">
            <Link
              href="/"
              className={`px-4 py-2 text-sm font-medium transition-colors ${
                isActive("/")
                  ? "text-[#D2042D] font-semibold"
                  : "text-[#7D0D2C] hover:text-[#A8092D]"
              }`}
            >
              Home
            </Link>
            <Link
              href="/chatbot"
              className={`px-4 py-2 text-sm font-medium transition-colors ${
                isActive("/chatbot")
                  ? "text-[#D2042D] font-semibold"
                  : "text-[#7D0D2C] hover:text-[#A8092D]"
              }`}
            >
              Legal Assistant
            </Link>
            <Link
              href="/search"
              className={`px-4 py-2 text-sm font-medium transition-colors ${
                isActive("/search")
                  ? "text-[#D2042D] font-semibold"
                  : "text-[#7D0D2C] hover:text-[#A8092D]"
              }`}
            >
              Legal Search Engine
            </Link>
            {showResources && (
              <Link
                href="/resources"
                className={`px-4 py-2 text-sm font-medium transition-colors ${
                  isActive("/resources")
                    ? "text-[#D2042D] font-semibold"
                    : "text-[#7D0D2C] hover:text-[#A8092D]"
                }`}
              >
                Resources
              </Link>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="sm:hidden flex items-center">
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="text-[#7D0D2C] hover:text-[#A8092D] focus:outline-none"
            >
              <svg
                className="h-6 w-6"
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                {isMobileMenuOpen ? (
                  <path d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {isMobileMenuOpen && (
        <div className="sm:hidden bg-white border-t border-gray-200">
          <div className="pt-2 pb-3 space-y-1">
            <Link
              href="/"
              className={`block px-4 py-2 text-sm font-medium ${
                isActive("/")
                  ? "text-[#D2042D] bg-gray-50 font-semibold"
                  : "text-[#7D0D2C] hover:text-[#A8092D] hover:bg-gray-50"
              }`}
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Home
            </Link>
            <Link
              href="/chatbot"
              className={`block px-4 py-2 text-sm font-medium ${
                isActive("/chatbot")
                  ? "text-[#D2042D] bg-gray-50 font-semibold"
                  : "text-[#7D0D2C] hover:text-[#A8092D] hover:bg-gray-50"
              }`}
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Legal Assistant
            </Link>
            <Link
              href="/search"
              className={`block px-4 py-2 text-sm font-medium ${
                isActive("/search")
                  ? "text-[#D2042D] bg-gray-50 font-semibold"
                  : "text-[#7D0D2C] hover:text-[#A8092D] hover:bg-gray-50"
              }`}
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Legal Search Engine
            </Link>
            {showResources && (
              <Link
                href="/resources"
                className={`block px-4 py-2 text-sm font-medium ${
                  isActive("/resources")
                    ? "text-[#D2042D] bg-gray-50 font-semibold"
                    : "text-[#7D0D2C] hover:text-[#A8092D] hover:bg-gray-50"
                }`}
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Resources
              </Link>
            )}
          </div>
        </div>
      )}
    </nav>
  );
}
