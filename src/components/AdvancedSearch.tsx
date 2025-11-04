import React, { useState, useMemo, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, Filter, X } from 'lucide-react';
import { GlassmorphCard } from './GlassmorphCard';

interface SearchableItem {
  id: string;
  title: string;
  author: string;
  content?: string;
  genre?: string;
  rating?: number;
  views?: number;
  date?: Date;
}

interface SearchFilters {
  genre?: string;
  minRating?: number;
  author?: string;
  dateRange?: { from: Date; to: Date };
}

interface AdvancedSearchProps {
  items: SearchableItem[];
  onSelect?: (item: SearchableItem) => void;
  className?: string;
}

/**
 * AdvancedSearch Component
 * Full-text search with filters and autocomplete
 */
export const AdvancedSearch: React.FC<AdvancedSearchProps> = ({
  items = [],
  onSelect,
  className = '',
}) => {
  const [query, setQuery] = useState('');
  const [filters, setFilters] = useState<SearchFilters>({});
  const [showFilters, setShowFilters] = useState(false);
  const [showSuggestions, setShowSuggestions] = useState(false);

  // Extract unique genres
  const genres = useMemo(
    () => [...new Set(items.map((item) => item.genre).filter(Boolean))],
    [items]
  );

  // Extract unique authors
  const authors = useMemo(
    () => [...new Set(items.map((item) => item.author).filter(Boolean))],
    [items]
  );

  // Search and filter logic
  const results = useMemo(() => {
    let filtered = items;

    // Text search
    if (query.trim()) {
      const searchTerm = query.toLowerCase();
      filtered = filtered.filter(
        (item) =>
          item.title.toLowerCase().includes(searchTerm) ||
          item.author.toLowerCase().includes(searchTerm) ||
          item.content?.toLowerCase().includes(searchTerm)
      );
    }

    // Apply filters
    if (filters.genre) {
      filtered = filtered.filter((item) => item.genre === filters.genre);
    }

    if (filters.author) {
      filtered = filtered.filter((item) => item.author === filters.author);
    }

    if (filters.minRating) {
      filtered = filtered.filter((item) => (item.rating || 0) >= (filters.minRating || 0));
    }

    if (filters.dateRange) {
      filtered = filtered.filter((item) => {
        const date = item.date || new Date();
        return date >= filters.dateRange!.from && date <= filters.dateRange!.to;
      });
    }

    return filtered;
  }, [query, filters, items]);

  // Get autocomplete suggestions
  const suggestions = useMemo(() => {
    if (!query.trim()) return [];

    const searchTerm = query.toLowerCase();
    return items
      .filter(
        (item) =>
          item.title.toLowerCase().includes(searchTerm) ||
          item.author.toLowerCase().includes(searchTerm)
      )
      .slice(0, 5);
  }, [query, items]);

  const handleClearFilters = useCallback(() => {
    setFilters({});
  }, []);

  return (
    <div className={className}>
      {/* Search Bar */}
      <div className="relative mb-6">
        <div className="relative">
          <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
          <input
            type="text"
            placeholder="Search by title, author, or content..."
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              setShowSuggestions(true);
            }}
            onFocus={() => setShowSuggestions(true)}
            onBlur={() => setTimeout(() => setShowSuggestions(false), 200)}
            className="w-full pl-12 pr-12 py-3 rounded-lg bg-light dark:bg-dark border-2 border-gray-200 dark:border-gray-700 focus:border-primary focus:outline-none"
          />
          {query && (
            <button
              onClick={() => {
                setQuery('');
                setShowSuggestions(false);
              }}
              className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
            >
              <X className="w-5 h-5" />
            </button>
          )}
        </div>

        {/* Autocomplete Suggestions */}
        <AnimatePresence>
          {showSuggestions && suggestions.length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="absolute top-full left-0 right-0 mt-2 bg-light dark:bg-dark rounded-lg border border-gray-200 dark:border-gray-700 shadow-xl z-10"
            >
              {suggestions.map((item) => (
                <button
                  key={item.id}
                  onClick={() => {
                    setQuery(item.title);
                    setShowSuggestions(false);
                    onSelect?.(item);
                  }}
                  className="w-full text-left px-4 py-3 hover:bg-gray-100 dark:hover:bg-gray-800 border-b last:border-b-0 transition"
                >
                  <p className="font-bold text-gray-900 dark:text-white">{item.title}</p>
                  <p className="text-sm text-gray-600 dark:text-gray-400">by {item.author}</p>
                </button>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Filter Button & Controls */}
      <div className="flex flex-wrap gap-3 mb-6 items-center">
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => setShowFilters(!showFilters)}
          className="flex items-center gap-2 px-4 py-2 rounded-lg bg-primary text-white font-bold hover:shadow-lg transition"
        >
          <Filter className="w-5 h-5" />
          Filters
        </motion.button>

        {Object.keys(filters).length > 0 && (
          <motion.button
            whileHover={{ scale: 1.05 }}
            onClick={handleClearFilters}
            className="px-4 py-2 rounded-lg bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-100 font-bold hover:bg-gray-300 dark:hover:bg-gray-600 transition"
          >
            Clear Filters
          </motion.button>
        )}

        <span className="text-sm text-gray-600 dark:text-gray-400 font-bold">
          {results.length} result{results.length !== 1 ? 's' : ''}
        </span>
      </div>

      {/* Filter Panel */}
      <AnimatePresence>
        {showFilters && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="mb-6 p-6 bg-light dark:bg-dark rounded-lg border border-gray-200 dark:border-gray-700"
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Genre Filter */}
              {genres.length > 0 && (
                <div>
                  <label className="block text-sm font-bold mb-2 text-gray-800 dark:text-gray-100">
                    Genre
                  </label>
                  <select
                    value={filters.genre || ''}
                    onChange={(e) =>
                      setFilters({ ...filters, genre: e.target.value || undefined })
                    }
                    className="w-full px-4 py-2 rounded-lg bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 focus:border-primary focus:outline-none"
                  >
                    <option value="">All Genres</option>
                    {genres.map((genre) => (
                      <option key={genre} value={genre}>
                        {genre}
                      </option>
                    ))}
                  </select>
                </div>
              )}

              {/* Author Filter */}
              {authors.length > 0 && (
                <div>
                  <label className="block text-sm font-bold mb-2 text-gray-800 dark:text-gray-100">
                    Author
                  </label>
                  <select
                    value={filters.author || ''}
                    onChange={(e) =>
                      setFilters({ ...filters, author: e.target.value || undefined })
                    }
                    className="w-full px-4 py-2 rounded-lg bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 focus:border-primary focus:outline-none"
                  >
                    <option value="">All Authors</option>
                    {authors.map((author) => (
                      <option key={author} value={author}>
                        {author}
                      </option>
                    ))}
                  </select>
                </div>
              )}

              {/* Rating Filter */}
              <div>
                <label className="block text-sm font-bold mb-2 text-gray-800 dark:text-gray-100">
                  Minimum Rating
                </label>
                <select
                  value={filters.minRating || ''}
                  onChange={(e) =>
                    setFilters({
                      ...filters,
                      minRating: e.target.value ? parseFloat(e.target.value) : undefined,
                    })
                  }
                  className="w-full px-4 py-2 rounded-lg bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 focus:border-primary focus:outline-none"
                >
                  <option value="">Any Rating</option>
                  {[1, 2, 3, 4, 4.5].map((rating) => (
                    <option key={rating} value={rating}>
                      ⭐ {rating}+
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Results */}
      <div className="space-y-4">
        {results.length > 0 ? (
          results.map((item, idx) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: idx * 0.05 }}
            >
              <GlassmorphCard
                className="p-6 cursor-pointer hover:shadow-lg"
                onClick={() => onSelect?.(item)}
              >
                <div className="flex justify-between items-start">
                  <div className="flex-1">
                    <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-1">
                      {item.title}
                    </h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                      by {item.author}
                    </p>
                    {item.genre && (
                      <span className="inline-block px-3 py-1 rounded-full bg-primary/20 text-primary text-xs font-bold">
                        {item.genre}
                      </span>
                    )}
                  </div>
                  <div className="text-right ml-4">
                    {item.rating && (
                      <div className="text-lg font-bold text-primary mb-1">⭐ {item.rating}</div>
                    )}
                    {item.views && (
                      <div className="text-xs text-gray-600 dark:text-gray-400">
                        👁️ {item.views} views
                      </div>
                    )}
                  </div>
                </div>
              </GlassmorphCard>
            </motion.div>
          ))
        ) : query || Object.keys(filters).length > 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-600 dark:text-gray-400 font-bold text-lg">
              No results found. Try adjusting your search or filters.
            </p>
          </div>
        ) : null}
      </div>
    </div>
  );
};

export default AdvancedSearch;
