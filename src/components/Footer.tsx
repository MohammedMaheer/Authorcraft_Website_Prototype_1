import React from 'react';
import { Instagram, Mail, Linkedin } from 'lucide-react';
import { motion } from 'framer-motion';

export const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  const socialLinks = [
    {
      name: 'Instagram',
      url: 'https://www.instagram.com/authorcraft_nmamit/',
      icon: Instagram,
    },
    {
      name: 'Email',
      url: 'mailto:authorcraft@nmamit.in',
      icon: Mail,
    },
    {
      name: 'LinkedIn',
      url: 'https://www.linkedin.com/company/authorcraft-nmamit/',
      icon: Linkedin,
    },
  ];

  return (
    <footer className="bg-light dark:bg-dark border-t border-gray-200 dark:border-gray-800 py-12 mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          {/* Branding */}
          <div>
            <h3 className="text-xl font-grotesk font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent mb-2">
              ✍️ Authorcraft
            </h3>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              NMAMIT's creative voice. Where words come alive ✨
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-poppins font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2 text-sm">
              {['Home', 'Best Works', 'Events', 'Team'].map((link) => (
                <li key={link}>
                  <a
                    href={`#${link.toLowerCase()}`}
                    className="text-gray-600 dark:text-gray-400 hover:text-primary smooth-transition"
                  >
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Social Links */}
          <div>
            <h4 className="font-poppins font-semibold mb-4">Connect</h4>
            <div className="flex gap-4">
              {socialLinks.map((link) => {
                const Icon = link.icon;
                return (
                  <motion.a
                    key={link.name}
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ scale: 1.2, rotate: 10 }}
                    whileTap={{ scale: 0.9 }}
                    className="p-3 rounded-full bg-gradient-to-br from-primary to-secondary hover:shadow-lg smooth-transition text-white"
                    aria-label={link.name}
                  >
                    <Icon className="w-5 h-5" />
                  </motion.a>
                );
              })}
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-gray-200 dark:border-gray-800 pt-8">
          {/* Quote */}
          <p className="text-center text-sm text-gray-600 dark:text-gray-400 mb-4 italic">
            "Made with ☕, chaos & creativity by Authorcraft NMAMIT"
          </p>

          {/* Copyright */}
          <p className="text-center text-xs text-gray-500 dark:text-gray-500">
            © {currentYear} Authorcraft NMAMIT. All words are sacred. 🖋️
          </p>
        </div>
      </div>
    </footer>
  );
};
