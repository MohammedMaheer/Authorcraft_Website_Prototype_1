import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { GlassmorphCard } from './GlassmorphCard';
import ScrollReveal from './ScrollReveal';
import { X, ChevronLeft, ChevronRight, ZoomIn } from 'lucide-react';

interface GalleryItem {
  id: string;
  title: string;
  author: string;
  genre: string;
  image: string;
  views: number;
  likes: number;
  rating: number;
}

interface FilteredGalleryProps {
  items: GalleryItem[];
  className?: string;
}

/**
 * FilteredGallery Component
 * Advanced image gallery with filtering, sorting, and lightbox
 */
export const FilteredGallery: React.FC<FilteredGalleryProps> = ({
  items = [],
  className = '',
}) => {
  const [selectedGenre, setSelectedGenre] = useState<string>('All');
  const [sortBy, setSortBy] = useState<'latest' | 'trending' | 'views' | 'rating'>('latest');
  const [selectedItem, setSelectedItem] = useState<GalleryItem | null>(null);
  const [lightboxIndex, setLightboxIndex] = useState(0);

  // Extract unique genres
  const genres = useMemo(() => {
    const uniqueGenres = new Set(items.map((item) => item.genre));
    return ['All', ...Array.from(uniqueGenres)];
  }, [items]);

  // Filter and sort items
  const filteredItems = useMemo(() => {
    let filtered = items;

    if (selectedGenre !== 'All') {
      filtered = filtered.filter((item) => item.genre === selectedGenre);
    }

    const sorted = [...filtered];
    switch (sortBy) {
      case 'trending':
        sorted.sort((a, b) => (b.likes + b.rating * 100) - (a.likes + a.rating * 100));
        break;
      case 'views':
        sorted.sort((a, b) => b.views - a.views);
        break;
      case 'rating':
        sorted.sort((a, b) => b.rating - a.rating);
        break;
      default:
        break;
    }

    return sorted;
  }, [items, selectedGenre, sortBy]);

  return (
    <div className={className}>
      {/* Controls */}
      <div className="mb-12 space-y-6">
        {/* Genre Filter */}
        <div>
          <h3 className="text-lg font-bold mb-4 text-gray-800 dark:text-gray-100">Filter by Genre</h3>
          <div className="flex flex-wrap gap-3">
            {genres.map((genre) => (
              <motion.button
                key={genre}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setSelectedGenre(genre)}
                className={`px-6 py-2 rounded-full font-bold transition-all ${
                  selectedGenre === genre
                    ? 'bg-gradient-to-r from-primary to-secondary text-white'
                    : 'bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-100 hover:bg-gray-300 dark:hover:bg-gray-600'
                }`}
              >
                {genre}
              </motion.button>
            ))}
          </div>
        </div>

        {/* Sort Options */}
        <div>
          <h3 className="text-lg font-bold mb-4 text-gray-800 dark:text-gray-100">Sort by</h3>
          <div className="flex flex-wrap gap-3">
            {(['latest', 'trending', 'views', 'rating'] as const).map((sort) => (
              <motion.button
                key={sort}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setSortBy(sort)}
                className={`px-6 py-2 rounded-full font-bold transition-all capitalize ${
                  sortBy === sort
                    ? 'bg-gradient-to-r from-primary to-secondary text-white'
                    : 'bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-100 hover:bg-gray-300 dark:hover:bg-gray-600'
                }`}
              >
                {sort}
              </motion.button>
            ))}
          </div>
        </div>
      </div>

      {/* Masonry Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
        <AnimatePresence>
          {filteredItems.map((item, idx) => (
            <ScrollReveal key={item.id} direction="up" delay={idx * 0.1}>
              <motion.div
                layout
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
              >
                <GlassmorphCard
                  className="h-full cursor-pointer group"
                  onClick={() => {
                    setSelectedItem(item);
                    setLightboxIndex(filteredItems.indexOf(item));
                  }}
                >
                  <div className="p-6">
                    {/* Image */}
                    <div className="relative mb-4 overflow-hidden rounded-xl bg-gray-300 dark:bg-gray-700 aspect-video">
                      <img
                        src={item.image}
                        alt={item.title}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                      />
                      <motion.div
                        whileHover={{ scale: 1.1 }}
                        className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity duration-300"
                      >
                        <ZoomIn className="w-8 h-8 text-white" />
                      </motion.div>
                    </div>

                    {/* Content */}
                    <h3 className="font-bold text-lg text-gray-900 dark:text-white mb-2 line-clamp-2">
                      {item.title}
                    </h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">by {item.author}</p>

                    {/* Stats */}
                    <div className="flex justify-between items-center text-sm">
                      <div className="flex gap-3">
                        <span className="text-gray-600 dark:text-gray-400">👁️ {item.views}</span>
                        <span className="text-red-500">❤️ {item.likes}</span>
                      </div>
                      <span className="font-bold text-primary">⭐ {item.rating.toFixed(1)}</span>
                    </div>
                  </div>
                </GlassmorphCard>
              </motion.div>
            </ScrollReveal>
          ))}
        </AnimatePresence>
      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {selectedItem && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/90 flex items-center justify-center z-50 p-4"
            onClick={() => setSelectedItem(null)}
          >
            <motion.div
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.9 }}
              onClick={(e) => e.stopPropagation()}
              className="w-full max-w-4xl"
            >
              {/* Close button */}
              <button
                onClick={() => setSelectedItem(null)}
                className="absolute top-4 right-4 text-white hover:text-gray-300 z-10"
              >
                <X className="w-8 h-8" />
              </button>

              {/* Image */}
              <img
                src={selectedItem.image}
                alt={selectedItem.title}
                className="w-full h-auto rounded-xl mb-6"
              />

              {/* Info */}
              <GlassmorphCard className="p-6">
                <h2 className="text-3xl font-bold text-white mb-2">{selectedItem.title}</h2>
                <p className="text-gray-300 mb-4">by {selectedItem.author}</p>
                <p className="text-sm text-gray-400">Genre: {selectedItem.genre}</p>
                <div className="flex gap-6 mt-4 text-white">
                  <span>👁️ {selectedItem.views} views</span>
                  <span>❤️ {selectedItem.likes} likes</span>
                  <span>⭐ {selectedItem.rating.toFixed(1)} rating</span>
                </div>
              </GlassmorphCard>

              {/* Navigation */}
              <div className="flex justify-center gap-4 mt-6">
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  onClick={() => {
                    const newIndex = (lightboxIndex - 1 + filteredItems.length) % filteredItems.length;
                    setLightboxIndex(newIndex);
                    setSelectedItem(filteredItems[newIndex]);
                  }}
                  className="bg-primary/80 hover:bg-primary text-white p-3 rounded-full"
                >
                  <ChevronLeft className="w-6 h-6" />
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  onClick={() => {
                    const newIndex = (lightboxIndex + 1) % filteredItems.length;
                    setLightboxIndex(newIndex);
                    setSelectedItem(filteredItems[newIndex]);
                  }}
                  className="bg-primary/80 hover:bg-primary text-white p-3 rounded-full"
                >
                  <ChevronRight className="w-6 h-6" />
                </motion.button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default FilteredGallery;
