import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, MapPin, MessageSquare, Instagram } from 'lucide-react';

const Contact: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });

  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
    setSubmitted(true);
    setTimeout(() => {
      setFormData({ name: '', email: '', message: '' });
      setSubmitted(false);
    }, 3000);
  };

  const contactInfo = [
    {
      icon: Mail,
      title: 'Email',
      content: 'authorcraft@nmamit.in',
      href: 'mailto:authorcraft@nmamit.in',
    },
    {
      icon: Instagram,
      title: 'Instagram',
      content: '@authorcraft_nmamit',
      href: 'https://www.instagram.com/authorcraft_nmamit/',
    },
    {
      icon: MapPin,
      title: 'Location',
      content: 'NMAMIT, Nitte, Karnataka',
      href: '#',
    },
  ];

  return (
    <div className="relative min-h-screen pt-20 pb-20">
      {/* Hero Section */}
      <section className="py-20 px-4 max-w-7xl mx-auto text-center mb-12">
        <motion.div
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h1 className="text-6xl md:text-8xl font-grotesk font-black mb-6">
            Get in <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">Touch</span>
          </h1>
          <p className="text-xl font-poppins font-medium text-gray-700 dark:text-gray-200 max-w-3xl mx-auto">
            Questions? Ideas? We'd love to hear from you. Reach out to the Authorcraft family!
          </p>
        </motion.div>
      </section>

      {/* Contact Info Cards */}
      <section className="px-4 max-w-7xl mx-auto mb-12">
        <div className="grid md:grid-cols-3 gap-8">
          {contactInfo.map((info, idx) => {
            const Icon = info.icon;
            return (
              <motion.a
                key={idx}
                href={info.href}
                target={info.href.startsWith('http') ? '_blank' : '_self'}
                rel="noopener noreferrer"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.2, duration: 0.6 }}
                whileHover={{ y: -10, scale: 1.05 }}
                className="group relative overflow-hidden rounded-2xl bg-gradient-to-br from-light to-gray-100 dark:from-gray-900 dark:to-gray-800 border border-primary/20 hover:border-primary/40 smooth-transition shadow-lg hover:shadow-xl p-8 text-center"
              >
                <motion.div 
                  className="inline-flex mb-6 p-4 rounded-xl bg-gradient-to-br from-primary to-secondary group-hover:shadow-lg smooth-transition"
                  whileHover={{ scale: 1.1 }}
                >
                  <Icon className="w-8 h-8 text-white" />
                </motion.div>
                <h3 className="text-2xl font-grotesk font-black mb-2 bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                  {info.title}
                </h3>
                <p className="text-gray-700 dark:text-gray-200 font-poppins font-medium">{info.content}</p>
              </motion.a>
            );
          })}
        </div>
      </section>

      {/* Contact Form */}
      <section className="px-4 max-w-2xl mx-auto mb-12">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8 }}
          className="rounded-2xl bg-gradient-to-br from-light to-gray-100 dark:from-gray-900 dark:to-gray-800 border border-primary/20 p-10 shadow-lg"
        >
          <div className="flex items-center gap-3 mb-8">
            <MessageSquare className="w-8 h-8 text-primary" />
            <h2 className="text-4xl font-grotesk font-black bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
              Send Us a Message
            </h2>
          </div>

          {submitted ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              className="text-center py-16"
            >
              <motion.div className="text-8xl mb-6" animate={{ scale: [1, 1.1, 1] }} transition={{ duration: 2, repeat: Infinity }}>
                💌
              </motion.div>
              <h3 className="text-4xl font-grotesk font-black mb-4 bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                Message Sent!
              </h3>
              <p className="text-gray-700 dark:text-gray-200 font-poppins font-medium text-lg">
                Thanks for reaching out. We'll get back to you soon!
              </p>
            </motion.div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Name */}
              <div>
                <label className="block text-lg font-poppins font-bold mb-2 text-primary">Name</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 rounded-lg bg-light dark:bg-dark border-2 border-primary/30 hover:border-primary/50 focus:border-primary focus:outline-none smooth-transition font-poppins"
                  placeholder="Your name"
                />
              </div>

              {/* Email */}
              <div>
                <label className="block text-lg font-poppins font-bold mb-2 text-primary">Email</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 rounded-lg bg-light dark:bg-dark border-2 border-primary/30 hover:border-primary/50 focus:border-primary focus:outline-none smooth-transition font-poppins"
                  placeholder="your@email.com"
                />
              </div>

              {/* Message */}
              <div>
                <label className="block text-lg font-poppins font-bold mb-2 text-primary">Message</label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows={5}
                  className="w-full px-4 py-3 rounded-lg bg-light dark:bg-dark border-2 border-primary/30 hover:border-primary/50 focus:border-primary focus:outline-none smooth-transition font-poppins resize-none"
                  placeholder="Your message..."
                />
              </div>

              {/* Submit Button */}
              <motion.button
                type="submit"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="w-full px-8 py-3 rounded-lg bg-gradient-to-r from-primary to-secondary text-white font-poppins font-bold text-lg smooth-transition hover:shadow-lg"
              >
                Send Message
              </motion.button>
            </form>
          )}
        </motion.div>
      </section>

      {/* Social CTA */}
      <section className="px-4 max-w-4xl mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <p className="text-gray-700 dark:text-gray-200 font-poppins font-medium mb-8 text-lg">
            Or connect with us on social media
          </p>
          <motion.a
            href="https://www.instagram.com/authorcraft_nmamit/"
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ scale: 1.08 }}
            whileTap={{ scale: 0.95 }}
            className="inline-flex items-center gap-3 px-10 py-3 rounded-lg bg-gradient-to-r from-primary to-secondary text-white font-poppins font-bold text-lg smooth-transition hover:shadow-lg"
          >
            <Instagram className="w-5 h-5" />
            Follow on Instagram
          </motion.a>
        </motion.div>
      </section>
    </div>
  );
};

export default Contact;
