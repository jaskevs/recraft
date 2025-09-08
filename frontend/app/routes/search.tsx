import type { MetaFunction } from "@remix-run/node";
import { useState } from "react";
import { Link } from "@remix-run/react";

export const meta: MetaFunction = () => {
  return [
    { title: "Search — reCraft" },
    { name: "description", content: "Search our blog posts and articles" },
  ];
};

export default function Search() {
  const [searchQuery, setSearchQuery] = useState("");
  const [isSearching, setIsSearching] = useState(false);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (!searchQuery.trim()) return;
    
    setIsSearching(true);
    // TODO: Implement actual search functionality
    setTimeout(() => setIsSearching(false), 1000);
  };

  return (
    <div className="minimal-search">
      <header style={{ 
        textAlign: 'center', 
        marginBottom: 'var(--space-4xl)' 
      }}>
        <h1 style={{ 
          fontSize: 'var(--text-3xl)', 
          fontWeight: 600, 
          marginBottom: 'var(--space-md)',
          letterSpacing: '-0.02em'
        }}>
          Search
        </h1>
        <p style={{ 
          fontSize: 'var(--text-lg)', 
          color: 'var(--color-dark-gray)',
          maxWidth: '500px',
          margin: '0 auto'
        }}>
          Find articles, insights, and thoughts from our blog
        </p>
      </header>

      <form onSubmit={handleSearch} style={{ marginBottom: 'var(--space-4xl)' }}>
        <input
          type="text"
          placeholder="Search for articles..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="minimal-search-input"
          autoFocus
        />
      </form>

      {isSearching && (
        <div className="minimal-loading">
          <div className="minimal-spinner"></div>
        </div>
      )}

      {searchQuery && !isSearching && (
        <div>
          <p style={{ 
            color: 'var(--color-dark-gray)', 
            marginBottom: 'var(--space-3xl)',
            fontSize: 'var(--text-sm)'
          }}>
            Showing results for "{searchQuery}"
          </p>
          
          <div style={{
            textAlign: 'center',
            padding: 'var(--space-4xl) 0',
            color: 'var(--color-medium-gray)'
          }}>
            <p style={{ marginBottom: 'var(--space-md)' }}>
              Search functionality will be connected to Directus soon.
            </p>
            <Link 
              to="/blog"
              style={{
                color: 'var(--color-link)',
                textDecoration: 'underline',
                textUnderlineOffset: '2px'
              }}
            >
              Browse all posts instead
            </Link>
          </div>
        </div>
      )}

      {!searchQuery && (
        <div style={{
          textAlign: 'center',
          padding: 'var(--space-4xl) 0',
          color: 'var(--color-medium-gray)'
        }}>
          <p style={{ marginBottom: 'var(--space-md)' }}>
            Start typing to search through our articles
          </p>
          <Link 
            to="/blog"
            style={{
              color: 'var(--color-link)',
              textDecoration: 'underline',
              textUnderlineOffset: '2px'
            }}
          >
            Or browse all posts
          </Link>
        </div>
      )}
    </div>
  );
}