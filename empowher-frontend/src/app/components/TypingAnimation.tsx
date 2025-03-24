"use client";

import { useState, useEffect } from "react";

interface TypingAnimationProps {
  text: string;
  className?: string;
}

export default function TypingAnimation({
  text,
  className = "",
}: TypingAnimationProps) {
  const [displayedText, setDisplayedText] = useState("");
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (currentIndex < text.length) {
      const timeout = setTimeout(() => {
        setDisplayedText((prev) => prev + text[currentIndex]);
        setCurrentIndex((prev) => prev + 1);
      }, 8); // Changed from 15ms to 8ms for faster typing

      return () => clearTimeout(timeout);
    }
  }, [currentIndex, text]);

  // Reset animation when text changes
  useEffect(() => {
    setDisplayedText("");
    setCurrentIndex(0);
  }, [text]);

  return (
    <div className={className}>
      {text.split("\n").map((line, i) => (
        <p key={i} className={line.startsWith("•") ? "pl-4" : ""}>
          {displayedText.split("\n")[i] || ""}
        </p>
      ))}
    </div>
  );
}
