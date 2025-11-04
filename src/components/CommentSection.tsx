import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Heart, MessageCircle, Trash2 } from 'lucide-react';
import { GlassmorphCard } from './GlassmorphCard';

interface Comment {
  id: string;
  author: string;
  avatar: string;
  content: string;
  timestamp: Date;
  likes: number;
  replies?: Comment[];
  liked?: boolean;
}

interface CommentSectionProps {
  comments: Comment[];
  onAddComment?: (content: string) => void;
  onDeleteComment?: (id: string) => void;
  className?: string;
}

/**
 * CommentSection Component
 * Threaded comments with replies and nested structure
 */
export const CommentSection: React.FC<CommentSectionProps> = ({
  comments = [],
  onAddComment,
  onDeleteComment,
  className = '',
}) => {
  const [newComment, setNewComment] = useState('');
  const [replyingTo, setReplyingTo] = useState<string | null>(null);
  const [likes, setLikes] = useState<Record<string, boolean>>({});

  const handleAddComment = () => {
    if (newComment.trim()) {
      onAddComment?.(newComment);
      setNewComment('');
    }
  };

  const handleLike = (id: string) => {
    setLikes({ ...likes, [id]: !likes[id] });
  };

  const formatDate = (date: Date) => {
    const now = new Date();
    const diff = now.getTime() - new Date(date).getTime();
    const minutes = Math.floor(diff / 60000);
    const hours = Math.floor(diff / 3600000);
    const days = Math.floor(diff / 86400000);

    if (minutes < 1) return 'now';
    if (minutes < 60) return `${minutes}m ago`;
    if (hours < 24) return `${hours}h ago`;
    if (days < 7) return `${days}d ago`;
    return new Date(date).toLocaleDateString();
  };

  const renderComment = (comment: Comment, level = 0) => (
    <motion.div
      key={comment.id}
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: level * 0.05 }}
      style={{ marginLeft: `${level * 24}px` }}
      className="mb-4"
    >
      <GlassmorphCard className="p-4">
        <div className="flex gap-3">
          {/* Avatar */}
          <img
            src={comment.avatar}
            alt={comment.author}
            className="w-10 h-10 rounded-full object-cover flex-shrink-0"
          />

          {/* Content */}
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 mb-1">
              <span className="font-bold text-gray-900 dark:text-white">
                {comment.author}
              </span>
              <span className="text-xs text-gray-500 dark:text-gray-400">
                {formatDate(comment.timestamp)}
              </span>
            </div>

            <p className="text-gray-700 dark:text-gray-300 break-words mb-3">
              {comment.content}
            </p>

            {/* Actions */}
            <div className="flex items-center gap-4">
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => handleLike(comment.id)}
                className={`flex items-center gap-1 text-sm font-bold transition ${
                  likes[comment.id]
                    ? 'text-red-500'
                    : 'text-gray-600 dark:text-gray-400 hover:text-red-500'
                }`}
              >
                <Heart
                  className="w-4 h-4"
                  fill={likes[comment.id] ? 'currentColor' : 'none'}
                />
                {comment.likes}
              </motion.button>

              <motion.button
                whileHover={{ scale: 1.05 }}
                className="flex items-center gap-1 text-sm font-bold text-gray-600 dark:text-gray-400 hover:text-primary transition"
                onClick={() =>
                  setReplyingTo(replyingTo === comment.id ? null : comment.id)
                }
              >
                <MessageCircle className="w-4 h-4" />
                Reply
              </motion.button>

              <motion.button
                whileHover={{ scale: 1.05 }}
                className="flex items-center gap-1 text-sm font-bold text-gray-600 dark:text-gray-400 hover:text-red-500 transition ml-auto"
                onClick={() => onDeleteComment?.(comment.id)}
              >
                <Trash2 className="w-4 h-4" />
              </motion.button>
            </div>

            {/* Reply Form */}
            <AnimatePresence>
              {replyingTo === comment.id && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-700"
                >
                  <div className="flex gap-2">
                    <input
                      type="text"
                      placeholder="Write a reply..."
                      className="flex-1 px-3 py-2 rounded-lg bg-light dark:bg-dark border border-gray-200 dark:border-gray-700 focus:border-primary focus:outline-none text-sm"
                      onKeyPress={(e) => {
                        if (e.key === 'Enter') {
                          const value = e.currentTarget.value;
                          if (value.trim()) {
                            onAddComment?.(value);
                            e.currentTarget.value = '';
                          }
                        }
                      }}
                    />
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="px-3 py-2 rounded-lg bg-primary text-white font-bold text-sm hover:shadow-lg transition"
                      onClick={() => setReplyingTo(null)}
                    >
                      Cancel
                    </motion.button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </GlassmorphCard>

      {/* Replies */}
      {comment.replies && comment.replies.length > 0 && (
        <div className="mt-2">
          {comment.replies.map((reply) => renderComment(reply, level + 1))}
        </div>
      )}
    </motion.div>
  );

  return (
    <div className={className}>
      {/* New Comment Form */}
      <GlassmorphCard className="p-6 mb-8">
        <h3 className="text-xl font-bold mb-4 text-gray-900 dark:text-white">
          Add a Comment
        </h3>
        <div className="flex gap-3">
          <img
            src="https://api.avatar.com/avatar?seed=user"
            alt="You"
            className="w-10 h-10 rounded-full flex-shrink-0"
          />
          <div className="flex-1">
            <textarea
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
              placeholder="Share your thoughts..."
              rows={3}
              className="w-full px-4 py-2 rounded-lg bg-light dark:bg-dark border border-gray-200 dark:border-gray-700 focus:border-primary focus:outline-none resize-none"
            />
            <div className="flex gap-2 justify-end mt-2">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setNewComment('')}
                className="px-4 py-2 rounded-lg bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-100 font-bold hover:bg-gray-300 dark:hover:bg-gray-600 transition"
              >
                Cancel
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleAddComment}
                disabled={!newComment.trim()}
                className="px-4 py-2 rounded-lg bg-gradient-to-r from-primary to-secondary text-white font-bold hover:shadow-lg disabled:opacity-50 transition"
              >
                Comment
              </motion.button>
            </div>
          </div>
        </div>
      </GlassmorphCard>

      {/* Comments List */}
      <h3 className="text-xl font-bold mb-6 text-gray-900 dark:text-white">
        Comments ({comments.length})
      </h3>
      {comments.length > 0 ? (
        <div>{comments.map((comment) => renderComment(comment))}</div>
      ) : (
        <div className="text-center py-12 text-gray-600 dark:text-gray-400 font-bold">
          No comments yet. Be the first to share your thoughts!
        </div>
      )}
    </div>
  );
};

export default CommentSection;
