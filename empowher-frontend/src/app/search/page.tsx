"use client";

import React, { useState } from "react";
import Navbar from "../components/Navbar";

interface SearchResult {
  link: string;
  title: string;
  snippet: string;
}

interface SearchData {
  items?: SearchResult[];
}

interface CaseDetails {
  court: string;
  date: string;
}

const WomenLegalSearch: React.FC = () => {
  // Replace these with your own API key and Search Engine ID
  const API_KEY = process.env.NEXT_PUBLIC_GOOGLE_API_KEY;
  const SEARCH_ENGINE_ID = process.env.NEXT_PUBLIC_GOOGLE_SEARCH_ENGINE_ID;

  // States
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [results, setResults] = useState<SearchResult[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  // Mandatory women-related terms - at least one must be present
  const WOMEN_TERMS = [
    "women",
    "woman",
    "female",
    "girl",
    "mother",
    "wife",
    "daughter",
    "sister",
    "maternal",
    "gender",
    "feminine",
    "widow",
    "aunt",
    "grandmother",
    "bride",
    "fiancée",
  ];

  // Legal terms - at least one must be present
  const LEGAL_TERMS = [
    "judgment",
    "verdict",
    "court order",
    "case law",
    "petition",
    "versus",
    "vs",
    "v.",
    "legal",
    "law",
    "act",
    "statute",
    "section",
    "article",
    "clause",
    "ruling",
    "decree",
  ];

  // Specific women's rights legal terms (organized by category)
  const WOMEN_LEGAL_TERMS: Record<string, string[]> = {
    PROTECTION_ACTS: [
      "domestic violence",
      "protection of women",
      "sexual harassment",
      "maternity benefit",
      "dowry prohibition",
      "POCSO",
      "immoral traffic",
      "sexual assault",
      "rape",
      "eve teasing",
      "indecent representation",
      "sati prevention",
      "honor killing",
      "female genital mutilation",
      "acid attack",
      "cyber stalking",
    ],
    LEGAL_SECTIONS: [
      "498A",
      "304B",
      "354",
      "376",
      "375",
      "377",
      "509",
      "125",
      "306",
      "313-316",
      "493-498",
      "405-409",
      "415-420",
      "493-498",
    ],
    RIGHTS_AREAS: [
      "property rights",
      "inheritance",
      "equal pay",
      "education",
      "employment",
      "marriage",
      "divorce",
      "maintenance",
      "alimony",
      "child custody",
      "adoption",
      "surrogacy",
      "abortion",
      "reproductive rights",
      "healthcare",
      "pension",
      "voting",
      "political participation",
      "workplace equality",
    ],
    INTERNATIONAL_LAW: [
      "CEDAW",
      "Convention on Elimination of Discrimination",
      "Beijing Platform",
      "UN Women",
      "gender equality",
      "women empowerment",
      "sustainable development goal 5",
    ],
  };

  // Strict validation of women-related content
  const isWomenRelatedContent = (content: string): boolean => {
    content = content.toLowerCase();

    // Must contain at least one women-related term
    const hasWomenTerm = WOMEN_TERMS.some((term) =>
      content.includes(term.toLowerCase())
    );

    // Must contain at least one specific women's rights term
    const hasWomenRightsTerm = Object.values(WOMEN_LEGAL_TERMS)
      .flat()
      .some((term) => content.includes(term.toLowerCase()));

    return hasWomenTerm || hasWomenRightsTerm;
  };

  const checkConfiguration = (): boolean => {
    if (!API_KEY || !SEARCH_ENGINE_ID) {
      setError("Configuration Error: API key or Search Engine ID is missing");
      return false;
    }
    return true;
  };

  const constructStrictQuery = (userQuery: string): string => {
    // Force women-related terms in the search
    const womenTerms = `(${WOMEN_TERMS.join(" OR ")})`;

    // Force legal terms in the search
    const legalTerms = `(${LEGAL_TERMS.join(" OR ")})`;

    // Combine with user query
    return `${userQuery} (${womenTerms} OR ${Object.values(WOMEN_LEGAL_TERMS)
      .flat()
      .join(" OR ")}) AND ${legalTerms}`;
  };

  const applyStrictFiltering = (data: SearchData): SearchData => {
    if (!data.items) return { items: [] };

    const filteredItems = data.items.filter((item) => {
      const content = (item.title + " " + item.snippet).toLowerCase();

      // Must contain at least one women-related term
      const hasWomenTerm = WOMEN_TERMS.some((term) =>
        content.includes(term.toLowerCase())
      );

      // Must contain at least one legal term
      const hasLegalTerm = LEGAL_TERMS.some((term) =>
        content.includes(term.toLowerCase())
      );

      // Must contain at least one specific women's rights term
      const hasWomenRightsTerm = Object.values(WOMEN_LEGAL_TERMS)
        .flat()
        .some((term) => content.includes(term.toLowerCase()));

      // All conditions must be met
      return (hasWomenTerm || hasWomenRightsTerm) && hasLegalTerm;
    });

    return {
      ...data,
      items: filteredItems,
    };
  };

  const isWomenRelatedLegalCase = (item: SearchResult): boolean => {
    const content = (item.title + " " + item.snippet).toLowerCase();

    // Check for presence of women-related terms
    const hasWomenTerm = WOMEN_TERMS.some((term) =>
      content.includes(term.toLowerCase())
    );

    // Check for presence of legal terms
    const hasLegalTerm = LEGAL_TERMS.some((term) =>
      content.includes(term.toLowerCase())
    );

    // Check for specific women's legal issues
    const hasSpecificIssue = Object.values(WOMEN_LEGAL_TERMS)
      .flat()
      .some((term) => content.includes(term.toLowerCase()));

    return (hasWomenTerm || hasSpecificIssue) && hasLegalTerm;
  };

  const calculateRelevanceScore = (item: SearchResult): number => {
    const content = (item.title + " " + item.snippet).toLowerCase();
    let score = 0;

    // Count women-related terms
    WOMEN_TERMS.forEach((term) => {
      const regex = new RegExp(term, "gi");
      const matches = content.match(regex);
      if (matches) score += matches.length;
    });

    // Count legal terms
    LEGAL_TERMS.forEach((term) => {
      const regex = new RegExp(term, "gi");
      const matches = content.match(regex);
      if (matches) score += matches.length;
    });

    // Count specific women's legal issues (higher weight)
    Object.values(WOMEN_LEGAL_TERMS)
      .flat()
      .forEach((term) => {
        const regex = new RegExp(term, "gi");
        const matches = content.match(regex);
        if (matches) score += matches.length * 2;
      });

    return score;
  };

  const highlightTerms = (text: string): string => {
    if (!text) return "";

    let highlighted = text;

    // Highlight women terms
    WOMEN_TERMS.forEach((term) => {
      const regex = new RegExp(term, "gi");
      highlighted = highlighted.replace(
        regex,
        `<mark class="women-term">$&</mark>`
      );
    });

    // Highlight legal terms
    LEGAL_TERMS.forEach((term) => {
      const regex = new RegExp(term, "gi");
      highlighted = highlighted.replace(
        regex,
        `<mark class="legal-term">$&</mark>`
      );
    });

    // Highlight specific women's legal terms
    Object.values(WOMEN_LEGAL_TERMS)
      .flat()
      .forEach((term) => {
        const regex = new RegExp(term, "gi");
        highlighted = highlighted.replace(
          regex,
          `<mark class="specific-term">$&</mark>`
        );
      });

    return highlighted;
  };

  const extractCaseDetails = (item: SearchResult): CaseDetails => {
    const details = {
      court: "",
      date: "",
    };

    const courtPatterns = [
      /supreme court of india/i,
      /high court of \w+/i,
      /district court/i,
      /family court/i,
      /national commission for women/i,
      /women commission/i,
      /human rights commission/i,
    ];

    for (const pattern of courtPatterns) {
      const match = (item.title + " " + item.snippet).match(pattern);
      if (match) {
        details.court = match[0];
        break;
      }
    }

    const datePattern =
      /\b\d{1,2}[-/.]\d{1,2}[-/.]\d{2,4}\b|\b(?:jan|feb|mar|apr|may|jun|jul|aug|sep|oct|nov|dec)[a-z]* \d{1,2},? \d{4}\b|\b\d{4}\b/i;
    const dateMatch = (item.title + " " + item.snippet).match(datePattern);
    if (dateMatch) {
      details.date = dateMatch[0];
    }

    return details;
  };

  const identifyCategories = (item: SearchResult): string[] => {
    const content = (item.title + " " + item.snippet).toLowerCase();
    const categories: string[] = [];

    for (const [category, keywords] of Object.entries(WOMEN_LEGAL_TERMS)) {
      if (keywords.some((keyword) => content.includes(keyword.toLowerCase()))) {
        categories.push(category.replace("_", " "));
      }
    }

    if (categories.length === 0 && isWomenRelatedContent(content)) {
      categories.push("women&apos;s rights");
    }

    return categories.slice(0, 3);
  };

  const getRelevanceColor = (score: number): string => {
    if (score < 3) return "#ff9999"; // Light red - low relevance
    if (score < 6) return "#ffcc99"; // Light orange - medium relevance
    if (score < 9) return "#ffff99"; // Light yellow - good relevance
    return "#99ff99"; // Light green - high relevance
  };

  const performSearch = async (page = 1) => {
    if (!checkConfiguration()) return;

    if (!searchQuery.trim()) return;
    setLoading(true);
    setError(null);

    // First check if the query itself contains women-related terms
    if (!isWomenRelatedContent(searchQuery)) {
      setResults([]);
      setLoading(false);
      return;
    }

    const enhancedQuery = constructStrictQuery(searchQuery);
    const startIndex = (page - 1) * 10 + 1;

    try {
      const response = await fetch(
        `https://www.googleapis.com/customsearch/v1?key=${API_KEY}&cx=${SEARCH_ENGINE_ID}&q=${encodeURIComponent(
          enhancedQuery
        )}&start=${startIndex}&sort=date`
      );

      const data: SearchData = await response.json();
      const filteredResults = applyStrictFiltering(data);

      if (filteredResults.items) {
        setResults(
          filteredResults.items.filter((item) => isWomenRelatedLegalCase(item))
        );
      } else {
        setResults([]);
      }
    } catch (error) {
      console.error("Error performing search:", error);
      setError("Error performing search. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = () => {
    performSearch(1);
  };

  const handleKeyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      handleSearch();
    }
  };

  const renderResultItem = (item: SearchResult) => {
    const relevanceScore = calculateRelevanceScore(item);

    if (relevanceScore < 3) {
      return null;
    }

    const categories = identifyCategories(item);
    const caseDetails = extractCaseDetails(item);

    return (
      <div
        key={item.link}
        className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow"
      >
        <div
          className="w-2 h-full absolute left-0 top-0 rounded-l-lg"
          style={{ backgroundColor: getRelevanceColor(relevanceScore) }}
        ></div>

        <a
          href={item.link}
          className="text-xl font-semibold text-[#450C1C] hover:text-[#D2042D] mb-2 block"
          target="_blank"
          rel="noreferrer"
          dangerouslySetInnerHTML={{ __html: highlightTerms(item.title) }}
        />

        <div className="flex flex-wrap gap-2 mb-3">
          {caseDetails.court && (
            <span className="px-3 py-1 bg-[#450C1C] text-white text-sm rounded-full">
              {caseDetails.court}
            </span>
          )}
          {caseDetails.date && (
            <span className="px-3 py-1 bg-[#7D0D2C] text-white text-sm rounded-full">
              {caseDetails.date}
            </span>
          )}
        </div>

        <div className="flex flex-wrap gap-2 mb-3">
          {categories.map((cat) => (
            <span
              key={cat}
              className="px-3 py-1 bg-[#A8092D] text-white text-sm rounded-full"
            >
              {cat}
            </span>
          ))}
        </div>

        <div
          className="text-gray-600 mb-2"
          dangerouslySetInnerHTML={{ __html: highlightTerms(item.snippet) }}
        />

        <div className="text-sm text-gray-400 truncate">{item.link}</div>
      </div>
    );
  };

  const renderNoResultsMessage = () => {
    return (
      <div className="no-results">
        <h3>No Women&apos;s Rights Legal Cases Found</h3>
        <p>Try refining your search with these suggestions:</p>
        <ul>
          <li>Add more specific women-related terms</li>
          <li>
            Include legal terminology like &quot;judgment&quot; or
            &quot;verdict&quot;
          </li>
          <li>
            Specify a particular law or section (e.g., &quot;section 498A&quot;)
          </li>
          <li>Mention a specific court or jurisdiction</li>
        </ul>
      </div>
    );
  };

  const renderStrictNoResultsMessage = () => {
    return (
      <div className="no-results">
        <h3>Strict Women&apos;s Rights Filter Applied</h3>
        <p>No results found that specifically relate to women&apos;s rights.</p>
        <p>Your search must include terms related to women or gender issues.</p>
        <p>Try these examples:</p>
        <ul>
          <li>Supreme Court judgment on women&apos;s property rights</li>
          <li>Landmark domestic violence cases in India</li>
          <li>Recent rulings on maternity benefits</li>
          <li>Legal protections against workplace sexual harassment</li>
          <li>Case law on section 498A IPC</li>
        </ul>
        <div className="keyword-suggestions">
          <h4>Women-Related Terms:</h4>
          <div className="keyword-group">
            {WOMEN_TERMS.map((term) => (
              <span className="keyword" key={term}>
                {term}
              </span>
            ))}
          </div>
          <h4>Legal Terms:</h4>
          <div className="keyword-group">
            {LEGAL_TERMS.map((term) => (
              <span className="keyword" key={term}>
                {term}
              </span>
            ))}
          </div>
        </div>
      </div>
    );
  };

  return (
    <main>
      <Navbar />
      <div className="min-h-screen bg-gradient-to-b from-[#450C1C] to-[#D2042D] pt-20 p-6">
        <div className="max-w-6xl mx-auto">
          <div className="bg-white rounded-lg shadow-xl p-6">
            <h1 className="text-3xl font-bold text-[#450C1C] mb-8 text-center">
              Legal Search Engine
            </h1>

            <div className="search-container mb-8">
              <input
                type="text"
                id="searchInput"
                placeholder="Search for women's rights legal cases..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onKeyPress={handleKeyPress}
                className="w-full p-4 border-2 border-[#7D0D2C] rounded-lg focus:outline-none focus:border-[#D2042D] text-lg"
              />
              <button
                onClick={handleSearch}
                disabled={loading}
                className="mt-4 w-full md:w-auto px-8 py-3 bg-[#D2042D] text-white rounded-lg hover:bg-[#A8092D] transition-colors disabled:bg-gray-400"
              >
                {loading ? "Searching..." : "Search"}
              </button>
            </div>

            <div className="results-container space-y-6">
              {error && (
                <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
                  {error}
                </div>
              )}

              {!loading && !error && (
                <>
                  {results.length === 0 &&
                    searchQuery &&
                    (isWomenRelatedContent(searchQuery)
                      ? renderNoResultsMessage()
                      : renderStrictNoResultsMessage())}

                  <div className="space-y-6">
                    {results.map((item) => renderResultItem(item))}
                  </div>
                </>
              )}

              {loading && (
                <div className="flex justify-center items-center py-8">
                  <div className="animate-spin rounded-full h-12 w-12 border-4 border-[#D2042D] border-t-transparent"></div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default WomenLegalSearch;
