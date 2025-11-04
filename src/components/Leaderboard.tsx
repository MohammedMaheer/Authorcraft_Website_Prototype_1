import React, { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { GlassmorphCard } from './GlassmorphCard';
import { TrendingUp } from 'lucide-react';

interface LeaderboardEntry {
  id: string;
  name: string;
  avatar: string;
  score: number;
  metric: number;
  rank?: number;
  trend?: 'up' | 'down' | 'stable';
  badge?: string;
}

type LeaderboardType = 'authors' | 'trending' | 'readers' | 'weekly';

interface LeaderboardProps {
  entries: LeaderboardEntry[];
  type?: LeaderboardType;
  className?: string;
}

/**
 * Leaderboard Component
 * Display rankings for authors, readers, and trending creators
 */
export const Leaderboard: React.FC<LeaderboardProps> = ({
  entries = [],
  type = 'authors',
  className = '',
}) => {
  const [selectedType, setSelectedType] = useState<LeaderboardType>(type);

  // Add ranks to entries
  const rankedEntries = useMemo(() => {
    return entries
      .sort((a, b) => b.score - a.score)
      .map((entry, idx) => ({
        ...entry,
        rank: idx + 1,
      }));
  }, [entries]);

  const typeConfig = {
    authors: {
      title: 'Top Authors',
      icon: '👑',
      description: 'Most published works',
      color: 'from-amber-400 to-orange-600',
    },
    trending: {
      title: 'Trending',
      icon: '🔥',
      description: 'Growing in popularity',
      color: 'from-red-400 to-pink-600',
    },
    readers: {
      title: 'Top Readers',
      icon: '📚',
      description: 'Most engaged community members',
      color: 'from-blue-400 to-cyan-600',
    },
    weekly: {
      title: 'Weekly Champions',
      icon: '⭐',
      description: 'This week\'s top performers',
      color: 'from-purple-400 to-pink-600',
    },
  };

  const config = typeConfig[selectedType];

  const getMedalColor = (rank: number) => {
    switch (rank) {
      case 1:
        return 'text-yellow-500';
      case 2:
        return 'text-gray-400';
      case 3:
        return 'text-orange-400';
      default:
        return 'text-gray-600 dark:text-gray-400';
    }
  };

  const getMedalIcon = (rank: number) => {
    switch (rank) {
      case 1:
        return '🥇';
      case 2:
        return '🥈';
      case 3:
        return '🥉';
      default:
        return `#${rank}`;
    }
  };

  return (
    <div className={className}>
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center gap-4 mb-4">
          <span className="text-5xl">{config.icon}</span>
          <div>
            <h2 className="text-4xl font-grotesk font-black bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
              {config.title}
            </h2>
            <p className="text-gray-600 dark:text-gray-400">{config.description}</p>
          </div>
        </div>
      </div>

      {/* Type Selector */}
      <div className="flex gap-3 mb-8 overflow-x-auto">
        {(Object.keys(typeConfig) as LeaderboardType[]).map((t) => (
          <motion.button
            key={t}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setSelectedType(t)}
            className={`px-6 py-2 rounded-full font-bold whitespace-nowrap transition-all ${
              selectedType === t
                ? 'bg-gradient-to-r from-primary to-secondary text-white'
                : 'bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-100 hover:bg-gray-300 dark:hover:bg-gray-600'
            }`}
          >
            {typeConfig[t].icon} {typeConfig[t].title}
          </motion.button>
        ))}
      </div>

      {/* Leaderboard Table */}
      <div className="space-y-3">
        {rankedEntries.map((entry, idx) => (
          <motion.div
            key={entry.id}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: idx * 0.05 }}
          >
            <GlassmorphCard
              className={`p-4 cursor-pointer transition-all ${
                entry.rank <= 3 ? 'ring-2 ring-primary' : ''
              }`}
            >
              <div className="flex items-center gap-4">
                {/* Rank */}
                <div className={`text-3xl font-black w-12 text-center ${getMedalColor(entry.rank)}`}>
                  {getMedalIcon(entry.rank)}
                </div>

                {/* Avatar & Name */}
                <div className="flex items-center gap-3 flex-1 min-w-0">
                  <img
                    src={entry.avatar}
                    alt={entry.name}
                    className="w-12 h-12 rounded-full object-cover flex-shrink-0"
                  />
                  <div className="min-w-0">
                    <h3 className="font-bold text-gray-900 dark:text-white truncate">
                      {entry.name}
                    </h3>
                    {entry.badge && (
                      <span className="text-xs bg-primary/20 text-primary px-2 py-1 rounded-full">
                        {entry.badge}
                      </span>
                    )}
                  </div>
                </div>

                {/* Trend */}
                {entry.trend && (
                  <div className="flex-shrink-0">
                    {entry.trend === 'up' && (
                      <div className="flex items-center gap-1 text-green-500 font-bold">
                        <TrendingUp className="w-4 h-4" />
                        Up
                      </div>
                    )}
                    {entry.trend === 'down' && (
                      <div className="flex items-center gap-1 text-red-500 font-bold">
                        <TrendingUp className="w-4 h-4 rotate-180" />
                        Down
                      </div>
                    )}
                    {entry.trend === 'stable' && (
                      <div className="text-gray-500 font-bold">Stable</div>
                    )}
                  </div>
                )}

                {/* Score */}
                <div className="text-right flex-shrink-0">
                  <p className="text-2xl font-black bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                    {entry.score.toLocaleString()}
                  </p>
                  <p className="text-xs text-gray-600 dark:text-gray-400">
                    {selectedType === 'authors' && '📚 works'}
                    {selectedType === 'trending' && '📈 velocity'}
                    {selectedType === 'readers' && '💬 interactions'}
                    {selectedType === 'weekly' && '⭐ points'}
                  </p>
                </div>
              </div>

              {/* Progress Bar */}
              <div className="mt-3 h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${(entry.score / (rankedEntries[0]?.score || 100)) * 100}%` }}
                  transition={{ delay: idx * 0.05 + 0.2, duration: 0.5 }}
                  className={`h-full bg-gradient-to-r ${config.color}`}
                />
              </div>
            </GlassmorphCard>
          </motion.div>
        ))}
      </div>

      {/* Top 3 Special Display */}
      {rankedEntries.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6"
        >
          {rankedEntries.slice(0, 3).map((entry) => (
            <motion.div
              key={entry.id}
              whileHover={{ scale: 1.05, y: -10 }}
              className="relative"
            >
              <GlassmorphCard className="p-6 text-center relative overflow-hidden">
                {/* Background gradient */}
                <div
                  className={`absolute inset-0 bg-gradient-to-br ${config.color} opacity-10 -z-10`}
                />

                {/* Medal */}
                <div className="text-6xl mb-3">{getMedalIcon(entry.rank)}</div>

                {/* Avatar */}
                <img
                  src={entry.avatar}
                  alt={entry.name}
                  className="w-20 h-20 rounded-full mx-auto mb-3 border-4 border-primary object-cover"
                />

                {/* Name & Score */}
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-1">
                  {entry.name}
                </h3>
                <p className="text-3xl font-black bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent mb-2">
                  {entry.score.toLocaleString()}
                </p>

                {/* Rank */}
                <div className="inline-block px-4 py-2 rounded-full bg-primary/20 text-primary font-bold text-sm">
                  Rank #{entry.rank}
                </div>
              </GlassmorphCard>
            </motion.div>
          ))}
        </motion.div>
      )}
    </div>
  );
};

export default Leaderboard;
