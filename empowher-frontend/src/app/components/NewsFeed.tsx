"use client";

import { useState, useEffect } from "react";
import NewsCard from "./NewsCard";

interface NewsItem {
  title: string;
  description: string;
  image_url: string;
  source_id: string;
  pubDate: string;
  link: string;
  category?: "achievement" | "issue";
}

export default function NewsFeed() {
  const [news, setNews] = useState<NewsItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [activeCategory, setActiveCategory] = useState<
    "all" | "achievement" | "issue"
  >("all");

  useEffect(() => {
    const fetchNews = async () => {
      try {
        // Fetch achievements
        const achievementsResponse = await fetch(
          "https://newsdata.io/api/1/latest?" +
            "apikey=pub_7616164c589448d60d3e94b4e268df17531d8&" +
            'q="women achievement" OR "women success" OR "women award" OR "women entrepreneur"&' +
            "country=in&" +
            "language=en"
        );

        // Fetch issues/problems
        const issuesResponse = await fetch(
          "https://newsdata.io/api/1/latest?" +
            "apikey=pub_7616164c589448d60d3e94b4e268df17531d8&" +
            'q="women harassment" OR "women violence" OR "women discrimination" OR "women safety"&' +
            "country=in&" +
            "language=en"
        );

        if (!achievementsResponse.ok || !issuesResponse.ok) {
          throw new Error("Failed to fetch news");
        }

        const achievementsData = await achievementsResponse.json();
        const issuesData = await issuesResponse.json();

        const achievements =
          achievementsData.status === "success"
            ? achievementsData.results.map((item: NewsItem) => ({
                ...item,
                category: "achievement",
              }))
            : [];
        const issues =
          issuesData.status === "success"
            ? issuesData.results.map((item: NewsItem) => ({
                ...item,
                category: "issue",
              }))
            : [];

        const allNews = [...achievements, ...issues]
          .filter((item: NewsItem) => item.description && item.title)
          .sort(
            (a, b) =>
              new Date(b.pubDate).getTime() - new Date(a.pubDate).getTime()
          );

        setNews(allNews);
      } catch (err) {
        setError("Failed to load news. Please try again later.");
        console.error("Error fetching news:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchNews();
  }, []);

  // Auto-scroll effect with pause functionality
  useEffect(() => {
    if (news.length === 0 || isPaused) return;

    const interval = setInterval(() => {
      setCurrentIndex(
        (prevIndex) => (prevIndex + 1) % getFilteredNews().length
      );
    }, 5000); // Scroll every 5 seconds

    return () => clearInterval(interval);
  }, [news.length, isPaused, activeCategory]);

  const getFilteredNews = () => {
    if (activeCategory === "all") return news;
    return news.filter((item) => item.category === activeCategory);
  };

  if (error) {
    return (
      <div className="text-center py-8">
        <p className="text-[#D2042D]">{error}</p>
      </div>
    );
  }

  const handleNext = () => {
    const filteredNews = getFilteredNews();
    setCurrentIndex((prevIndex) => (prevIndex + 1) % filteredNews.length);
  };

  const handlePrev = () => {
    const filteredNews = getFilteredNews();
    setCurrentIndex(
      (prevIndex) => (prevIndex - 1 + filteredNews.length) % filteredNews.length
    );
  };

  const filteredNews = getFilteredNews();

  return (
    <section className="py-16 bg-gray-50 overflow-hidden">
      <div className="container mx-auto px-4">
        <div className="flex flex-col items-center mb-8">
          <h2 className="text-3xl font-bold text-[#450C1C] mb-6">
            Women&apos;s News in India
          </h2>

          {/* Category filters */}
          <div className="flex gap-4 mb-6">
            <button
              onClick={() => {
                setActiveCategory("all");
                setCurrentIndex(0);
              }}
              className={`px-4 py-2 rounded-full transition-all duration-200 ${
                activeCategory === "all"
                  ? "bg-[#450C1C] text-white"
                  : "bg-white text-[#450C1C] hover:bg-[#450C1C]/10"
              }`}
            >
              All News
            </button>
            <button
              onClick={() => {
                setActiveCategory("achievement");
                setCurrentIndex(0);
              }}
              className={`px-4 py-2 rounded-full transition-all duration-200 ${
                activeCategory === "achievement"
                  ? "bg-[#450C1C] text-white"
                  : "bg-white text-[#450C1C] hover:bg-[#450C1C]/10"
              }`}
            >
              Achievements
            </button>
            <button
              onClick={() => {
                setActiveCategory("issue");
                setCurrentIndex(0);
              }}
              className={`px-4 py-2 rounded-full transition-all duration-200 ${
                activeCategory === "issue"
                  ? "bg-[#450C1C] text-white"
                  : "bg-white text-[#450C1C] hover:bg-[#450C1C]/10"
              }`}
            >
              Issues
            </button>
          </div>

          <button
            onClick={() => setIsPaused(!isPaused)}
            className="flex items-center gap-2 px-4 py-2 rounded-lg bg-[#450C1C] text-white hover:bg-[#7D0D2C] transition-colors duration-200"
          >
            {isPaused ? (
              <>
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
                    d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
                <span>Resume</span>
              </>
            ) : (
              <>
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
                    d="M10 9v6m4-6v6m7-3a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
                <span>Pause</span>
              </>
            )}
          </button>
        </div>

        {loading ? (
          <div className="flex gap-6 overflow-hidden">
            {[...Array(3)].map((_, index) => (
              <div
                key={index}
                className="flex-shrink-0 w-full md:w-[calc(33.333%-1rem)] bg-white rounded-lg shadow-md overflow-hidden animate-pulse"
              >
                <div className="h-48 bg-gray-200" />
                <div className="p-4">
                  <div className="h-4 bg-gray-200 rounded w-2/3 mb-2" />
                  <div className="h-8 bg-gray-200 rounded mb-4" />
                  <div className="h-4 bg-gray-200 rounded w-full mb-2" />
                  <div className="h-4 bg-gray-200 rounded w-5/6" />
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="relative">
            {filteredNews.length > 0 && (
              <>
                <button
                  onClick={handlePrev}
                  className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 z-10 bg-white/80 rounded-full p-2 shadow-md hover:bg-white transition-all duration-200 hover:scale-110"
                  aria-label="Previous slide"
                >
                  <svg
                    className="w-6 h-6 text-[#450C1C]"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M15 19l-7-7 7-7"
                    />
                  </svg>
                </button>
                <button
                  onClick={handleNext}
                  className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 z-10 bg-white/80 rounded-full p-2 shadow-md hover:bg-white transition-all duration-200 hover:scale-110"
                  aria-label="Next slide"
                >
                  <svg
                    className="w-6 h-6 text-[#450C1C]"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 5l7 7-7 7"
                    />
                  </svg>
                </button>
              </>
            )}

            {filteredNews.length > 0 ? (
              <div
                className="flex gap-6 transition-transform duration-500 ease-in-out"
                style={{
                  transform: `translateX(-${currentIndex * (100 / 3)}%)`,
                  width: `${filteredNews.length * (100 / 3)}%`,
                }}
              >
                {filteredNews.map((item, index) => (
                  <div
                    key={index}
                    className="flex-shrink-0 w-full md:w-[calc(33.333%-1rem)]"
                  >
                    <NewsCard
                      title={item.title}
                      description={item.description}
                      imageUrl={item.image_url}
                      source={item.source_id}
                      date={item.pubDate}
                      url={item.link}
                    />
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-8">
                <p className="text-[#7D0D2C]">
                  No news available for this category
                </p>
              </div>
            )}

            {filteredNews.length > 0 && (
              <div className="flex justify-center mt-6 gap-2">
                {filteredNews.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentIndex(index)}
                    className={`w-2 h-2 rounded-full transition-all duration-300 ${
                      index === currentIndex
                        ? "bg-[#D2042D] w-4"
                        : "bg-[#450C1C]/20 hover:bg-[#450C1C]/40"
                    }`}
                    aria-label={`Go to slide ${index + 1}`}
                  />
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    </section>
  );
}
