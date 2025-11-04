import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { GlassmorphCard } from './GlassmorphCard';
import { Heart, Share2, MessageCircle, UserPlus } from 'lucide-react';

interface AuthorProfileProps {
  name: string;
  bio: string;
  avatar: string;
  banner: string;
  totalWorks: number;
  totalViews: number;
  followers: number;
  joinedYear: number;
  achievements?: string[];
  onFollow?: () => void;
  className?: string;
}

/**
 * AuthorProfile Component
 * Displays author information with stats and achievements
 */
export const AuthorProfile: React.FC<AuthorProfileProps> = ({
  name,
  bio,
  avatar,
  banner,
  totalWorks,
  totalViews,
  followers,
  joinedYear,
  achievements = [],
  onFollow,
  className = '',
}) => {
  const [isFollowing, setIsFollowing] = useState(false);

  const handleFollow = () => {
    setIsFollowing(!isFollowing);
    onFollow?.();
  };

  const achievements_list = [
    { icon: '📝', name: 'Prolific', description: '10+ works published' },
    { icon: '⭐', name: 'Rising Star', description: '1000+ views' },
    { icon: '❤️', name: 'Fan Favorite', description: '100+ likes' },
    { icon: '🎯', name: 'Genre Master', description: 'Expert in multiple genres' },
  ].slice(0, achievements.length || 2);

  return (
    <div className={className}>
      {/* Banner */}
      <div className="relative h-64 rounded-t-2xl overflow-hidden mb-32">
        <img
          src={banner}
          alt="Banner"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-dark/50" />
      </div>

      {/* Profile Card */}
      <div className="px-6 -mt-24 relative z-10 mb-12">
        <GlassmorphCard className="p-8">
          <div className="flex flex-col md:flex-row gap-8">
            {/* Avatar */}
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="flex-shrink-0"
            >
              <img
                src={avatar}
                alt={name}
                className="w-32 h-32 rounded-full border-4 border-primary object-cover"
              />
            </motion.div>

            {/* Info */}
            <div className="flex-1">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h1 className="text-4xl font-grotesk font-black bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent mb-2">
                    {name}
                  </h1>
                  <p className="text-gray-600 dark:text-gray-400 text-sm">
                    Joined {joinedYear}
                  </p>
                </div>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={handleFollow}
                  className={`flex items-center gap-2 px-6 py-3 rounded-lg font-bold transition-all ${
                    isFollowing
                      ? 'bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-100'
                      : 'bg-gradient-to-r from-primary to-secondary text-white'
                  }`}
                >
                  <UserPlus className="w-5 h-5" />
                  {isFollowing ? 'Following' : 'Follow'}
                </motion.button>
              </div>

              <p className="text-gray-700 dark:text-gray-300 mb-6 leading-relaxed">
                {bio}
              </p>

              {/* Stats Grid */}
              <div className="grid grid-cols-3 gap-4">
                <div className="bg-primary/10 p-4 rounded-lg">
                  <p className="text-2xl font-black text-primary">{totalWorks}</p>
                  <p className="text-xs text-gray-600 dark:text-gray-400 font-bold">Works</p>
                </div>
                <div className="bg-secondary/10 p-4 rounded-lg">
                  <p className="text-2xl font-black text-secondary">{totalViews.toLocaleString()}</p>
                  <p className="text-xs text-gray-600 dark:text-gray-400 font-bold">Views</p>
                </div>
                <div className="bg-accent/10 p-4 rounded-lg">
                  <p className="text-2xl font-black text-accent">{followers.toLocaleString()}</p>
                  <p className="text-xs text-gray-600 dark:text-gray-400 font-bold">Followers</p>
                </div>
              </div>
            </div>
          </div>
        </GlassmorphCard>
      </div>

      {/* Achievements */}
      {achievements_list.length > 0 && (
        <div className="mb-12">
          <h2 className="text-2xl font-grotesk font-black mb-6 text-gray-900 dark:text-white">
            Achievements
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {achievements_list.map((achievement, idx) => (
              <motion.div
                key={idx}
                whileHover={{ scale: 1.05, rotateZ: 5 }}
                transition={{ type: 'spring', stiffness: 300 }}
              >
                <GlassmorphCard className="p-6 text-center cursor-pointer group">
                  <div className="text-5xl mb-3 group-hover:scale-125 transition-transform">
                    {achievement.icon}
                  </div>
                  <h3 className="font-bold text-lg mb-2 text-gray-900 dark:text-white">
                    {achievement.name}
                  </h3>
                  <p className="text-xs text-gray-600 dark:text-gray-400">
                    {achievement.description}
                  </p>
                </GlassmorphCard>
              </motion.div>
            ))}
          </div>
        </div>
      )}

      {/* Action Buttons */}
      <div className="flex gap-4 mb-12">
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="flex items-center gap-2 px-6 py-3 rounded-lg bg-red-500/20 text-red-500 font-bold hover:bg-red-500/30 transition"
        >
          <Heart className="w-5 h-5" />
          Support
        </motion.button>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="flex items-center gap-2 px-6 py-3 rounded-lg bg-blue-500/20 text-blue-500 font-bold hover:bg-blue-500/30 transition"
        >
          <MessageCircle className="w-5 h-5" />
          Message
        </motion.button>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="flex items-center gap-2 px-6 py-3 rounded-lg bg-green-500/20 text-green-500 font-bold hover:bg-green-500/30 transition"
        >
          <Share2 className="w-5 h-5" />
          Share
        </motion.button>
      </div>
    </div>
  );
};

export default AuthorProfile;
