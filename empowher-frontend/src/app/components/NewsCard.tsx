"use client";

interface NewsCardProps {
  title: string;
  description: string;
  imageUrl: string;
  source: string;
  date: string;
  url: string;
}

export default function NewsCard({
  title,
  description,
  imageUrl,
  source,
  date,
  url,
}: NewsCardProps) {
  // Format the source name to be more readable
  const formatSource = (source: string) => {
    return source
      .split("-")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ");
  };

  // Format the date to be more readable
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffTime = Math.abs(now.getTime() - date.getTime());
    const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));

    if (diffDays === 0) {
      const hours = Math.floor(diffTime / (1000 * 60 * 60));
      if (hours === 0) {
        const minutes = Math.floor(diffTime / (1000 * 60));
        return `${minutes} minutes ago`;
      }
      return `${hours} hours ago`;
    } else if (diffDays === 1) {
      return "Yesterday";
    } else if (diffDays < 7) {
      return `${diffDays} days ago`;
    } else {
      return date.toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric",
      });
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-200 h-full">
      <div className="relative h-48 overflow-hidden">
        {imageUrl ? (
          <img
            src={imageUrl}
            alt={title}
            className="w-full h-full object-cover transform hover:scale-105 transition-transform duration-300"
          />
        ) : (
          <div className="w-full h-full bg-[#450C1C]/10 flex items-center justify-center">
            <svg
              className="w-16 h-16 text-[#450C1C]/20"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v12a2 2 0 01-2 2z"
              />
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M16 2v4M8 2v4M3 10h18"
              />
            </svg>
          </div>
        )}
      </div>
      <div className="p-4 flex flex-col h-[calc(100%-12rem)]">
        <div className="flex items-center justify-between mb-2 text-sm text-gray-600">
          <span className="bg-[#450C1C]/5 px-2 py-1 rounded-full">
            {formatSource(source)}
          </span>
          <span className="text-[#7D0D2C]">{formatDate(date)}</span>
        </div>
        <h3 className="text-lg font-semibold text-[#450C1C] mb-2 line-clamp-2">
          {title}
        </h3>
        <p className="text-[#7D0D2C] mb-4 line-clamp-3 flex-grow">
          {description}
        </p>
        <a
          href={url}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center text-[#D2042D] hover:text-[#A8092D] font-medium group mt-auto"
        >
          <span>Read full article</span>
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
        </a>
      </div>
    </div>
  );
}
