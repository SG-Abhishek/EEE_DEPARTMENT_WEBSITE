"use client";

import { useState, useMemo } from "react";

export default function LibraryClient({ initialTextbooks = [] }) {
  const [searchQuery, setSearchQuery] = useState("");

  // Search exclusively by textbook name (title)
  const filteredTextbooks = useMemo(() => {
    const q = searchQuery.toLowerCase().trim();
    if (!q) return initialTextbooks;
    return initialTextbooks.filter((book) =>
      book.title?.toLowerCase().includes(q)
    );
  }, [initialTextbooks, searchQuery]);

  return (
    <div style={{ maxWidth: "1100px", margin: "0 auto", paddingTop: "140px", paddingBottom: "80px", paddingLeft: "24px", paddingRight: "24px", color: "#f4f4f5", fontFamily: "sans-serif" }}>
      
      {/* Header */}
      <div style={{ marginBottom: "32px", borderBottom: "1px solid #27272a", paddingBottom: "24px" }}>
        <span style={{ fontSize: "11px", textTransform: "uppercase", letterSpacing: "2px", color: "#a1a1aa", fontWeight: "600" }}>
          EEE DEPARTMENT REPOSITORY
        </span>
        <h1 style={{ fontSize: "32px", fontWeight: "700", marginTop: "8px", marginBottom: "8px", color: "#ffffff" }}>
          Department Textbooks
        </h1>
        <p style={{ fontSize: "14px", color: "#a1a1aa", margin: 0 }}>
          Search and download core curriculum reference and course textbooks.
        </p>
      </div>

      {/* Search Bar */}
      <div style={{ marginBottom: "28px", display: "flex", gap: "16px", alignItems: "center", flexWrap: "wrap" }}>
        <div style={{ position: "relative", flex: 1, minWidth: "280px", maxWidth: "500px" }}>
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search textbook by name..."
            style={{
              width: "100%",
              padding: "12px 16px",
              paddingRight: searchQuery ? "40px" : "16px",
              backgroundColor: "#18181b",
              border: "1px solid #27272a",
              borderRadius: "12px",
              color: "#f4f4f5",
              fontSize: "14px",
              outline: "none",
              boxSizing: "border-box"
            }}
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery("")}
              style={{
                position: "absolute",
                right: "12px",
                top: "50%",
                transform: "translateY(-50%)",
                background: "none",
                border: "none",
                color: "#a1a1aa",
                cursor: "pointer",
                fontSize: "14px"
              }}
            >
              ✕
            </button>
          )}
        </div>
        <span style={{ fontSize: "13px", color: "#71717a" }}>
          {filteredTextbooks.length} {filteredTextbooks.length === 1 ? "textbook" : "textbooks"} available
        </span>
      </div>

      {/* Textbooks Grid */}
      {filteredTextbooks.length > 0 ? (
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))", gap: "20px" }}>
          {filteredTextbooks.map((book) => (
            <div
              key={book._id}
              style={{
                backgroundColor: "rgba(24, 24, 27, 0.5)",
                border: "1px solid #27272a",
                borderRadius: "16px",
                padding: "20px",
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between"
              }}
            >
              <div>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "12px" }}>
                  <div style={{ padding: "8px", backgroundColor: "#27272a", borderRadius: "10px", display: "inline-flex" }}>
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#f4f4f5" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H20v20H6.5a2.5 2.5 0 0 1 0-5H20" />
                    </svg>
                  </div>
                  <span style={{ fontSize: "11px", padding: "4px 8px", backgroundColor: "#27272a", borderRadius: "6px", color: "#a1a1aa" }}>
                    PDF
                  </span>
                </div>

                <h3 style={{ fontSize: "16px", fontWeight: "600", color: "#ffffff", margin: "0 0 6px 0", lineHeight: "1.4" }}>
                  {book.title}
                </h3>

                {book.author && (
                  <p style={{ fontSize: "13px", color: "#a1a1aa", margin: 0 }}>
                    Author: {book.author}
                  </p>
                )}
              </div>

              <div style={{ marginTop: "24px", paddingTop: "16px", borderTop: "1px solid #27272a", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                {book.fileUrl ? (
                  <a
                    href={book.fileUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{
                      display: "inline-flex",
                      alignItems: "center",
                      gap: "8px",
                      fontSize: "13px",
                      fontWeight: "500",
                      color: "#ffffff",
                      backgroundColor: "#27272a",
                      padding: "8px 14px",
                      borderRadius: "8px",
                      textDecoration: "none"
                    }}
                  >
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                      <polyline points="7 10 12 15 17 10" />
                      <line x1="12" y1="15" x2="12" y2="3" />
                    </svg>
                    Download PDF
                  </a>
                ) : (
                  <span style={{ fontSize: "12px", color: "#71717a", fontStyle: "italic" }}>No File Attached</span>
                )}

                {book.externalUrl && (
                  <a
                    href={book.externalUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{ fontSize: "12px", color: "#a1a1aa", textDecoration: "underline" }}
                  >
                    External Link ↗
                  </a>
                )}
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div style={{ textAlign: "center", padding: "60px 20px", backgroundColor: "rgba(24, 24, 27, 0.3)", borderRadius: "16px", border: "1px solid #27272a" }}>
          <p style={{ color: "#a1a1aa", fontSize: "14px", margin: 0 }}>No textbooks found matching that name.</p>
        </div>
      )}
    </div>
  );
}