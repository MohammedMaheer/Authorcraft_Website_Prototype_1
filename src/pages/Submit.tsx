import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Upload, Zap } from 'lucide-react';

const Submit: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    workType: 'Poem',
    title: '',
    content: '',
  });

  const [submitted, setSubmitted] = useState(false);

  const workTypes = ['Poem', 'Story', 'Script', 'Microfiction', 'Essay', 'Other'];

  const promptOfWeek = {
    title: 'Prompt of the Week',
    content: '"Write about a moment where silence said more than words ever could."',
    dueDate: 'Every Sunday',
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Submission:', formData);
    setSubmitted(true);
    setTimeout(() => {
      setFormData({
        name: '',
        email: '',
        workType: 'Poem',
        title: '',
        content: '',
      });
      setSubmitted(false);
    }, 3000);
  };

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
            Share Your <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">Creative Works</span>
          </h1>
          <p className="text-xl font-poppins font-medium text-gray-700 dark:text-gray-200 mb-4">
            Submit your poetry, stories, scripts, and more to the Authorcraft community
          </p>
        </motion.div>
      </section>

      <div className="px-4 max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-3 gap-8 mb-12">
          {/* Prompt of the Week */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="lg:col-span-1"
          >
            <div className="sticky top-24 p-10 rounded-2xl bg-gradient-to-br from-light to-gray-100 dark:from-gray-900 dark:to-gray-800 border border-primary/20 shadow-lg">
              <div className="flex items-center gap-3 mb-6">
                <motion.div animate={{ rotate: [0, 360] }} transition={{ duration: 4, repeat: Infinity }}>
                  <Zap className="w-8 h-8 text-primary" />
                </motion.div>
                <h3 className="text-2xl font-grotesk font-black bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                  {promptOfWeek.title}
                </h3>
              </div>
              <blockquote className="font-poppins font-medium mb-6 border-l-4 border-primary/40 pl-4 text-lg leading-relaxed text-gray-800 dark:text-gray-100 bg-primary/5 py-4 rounded">
                {promptOfWeek.content}
              </blockquote>
              <p className="text-base font-poppins font-medium mb-6 text-gray-700 dark:text-gray-200">
                📅 Due: <span className="text-primary font-bold">{promptOfWeek.dueDate}</span>
              </p>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="w-full px-6 py-3 rounded-lg bg-gradient-to-r from-primary to-secondary text-white font-poppins font-bold text-base smooth-transition hover:shadow-lg"
              >
                Respond to Prompt
              </motion.button>
            </div>
          </motion.div>

          {/* Submission Form */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="lg:col-span-2 p-10 rounded-2xl bg-gradient-to-br from-light to-gray-100 dark:from-gray-900 dark:to-gray-800 border border-primary/20 shadow-lg"
          >
            <div className="flex items-center gap-3 mb-8">
              <Upload className="w-8 h-8 text-primary" />
              <h2 className="text-4xl font-grotesk font-black bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                Submit Your Work
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
                <h3 className="text-3xl font-grotesk font-black mb-4 bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                  Submission Received!
                </h3>
                <p className="text-gray-700 dark:text-gray-200 font-poppins font-medium text-lg">
                  Thank you for sharing your work. We'll review it soon!
                </p>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Name */}
                <div>
                  <label className="block text-lg font-poppins font-bold mb-2 text-primary">Your Name</label>
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

                {/* Work Type */}
                <div>
                  <label className="block text-lg font-poppins font-bold mb-2 text-primary">
                    Work Type
                  </label>
                  <select
                    name="workType"
                    value={formData.workType}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-lg bg-light dark:bg-dark border-2 border-primary/30 hover:border-primary/50 focus:border-primary focus:outline-none smooth-transition font-poppins"
                  >
                    {workTypes.map((type) => (
                      <option key={type} value={type}>
                        {type}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Title */}
                <div>
                  <label className="block text-lg font-poppins font-bold mb-2 text-primary">
                    Title of Your Work
                  </label>
                  <input
                    type="text"
                    name="title"
                    value={formData.title}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 rounded-lg bg-light dark:bg-dark border-2 border-primary/30 hover:border-primary/50 focus:border-primary focus:outline-none smooth-transition font-poppins"
                    placeholder="Give your work a title"
                  />
                </div>

                {/* Content */}
                <div>
                  <label className="block text-lg font-poppins font-bold mb-2 text-primary">
                    Your Work
                  </label>
                  <textarea
                    name="content"
                    value={formData.content}
                    onChange={handleChange}
                    required
                    rows={8}
                    className="w-full px-4 py-3 rounded-lg bg-light dark:bg-dark border-2 border-primary/30 hover:border-primary/50 focus:border-primary focus:outline-none smooth-transition font-poppins resize-none"
                    placeholder="Paste your poem, story, script, or creative work here... (up to 5000 characters)"
                  />
                  <p className="text-sm font-poppins font-medium text-primary mt-2">
                    {formData.content.length}/5000 characters
                  </p>
                </div>

                {/* Checkbox */}
                <div className="flex items-center gap-3 p-4 rounded-lg bg-primary/5 border border-primary/20">
                  <input
                    type="checkbox"
                    id="consent"
                    required
                    className="w-5 h-5 rounded accent-primary cursor-pointer"
                  />
                  <label htmlFor="consent" className="text-base font-poppins font-medium text-gray-800 dark:text-gray-100 cursor-pointer">
                    I agree to Authorcraft using my work for publication and promotion
                  </label>
                </div>

                {/* Submit Button */}
                <motion.button
                  type="submit"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="w-full px-8 py-3 rounded-lg bg-gradient-to-r from-primary to-secondary text-white font-poppins font-bold text-lg smooth-transition hover:shadow-lg"
                >
                  Submit Your Work
                </motion.button>
              </form>
            )}
          </motion.div>
        </div>

        {/* Guidelines */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="p-10 rounded-2xl bg-gradient-to-br from-light to-gray-100 dark:from-gray-900 dark:to-gray-800 border border-primary/20 shadow-lg"
        >
          <h3 className="text-4xl font-grotesk font-black mb-8 flex items-center gap-3 bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
            📋 Submission Guidelines
          </h3>
          <div className="grid md:grid-cols-2 gap-8">
            <div className="space-y-4">
              <p className="flex items-center gap-3 text-gray-800 dark:text-gray-100 font-poppins font-medium text-base p-3 bg-primary/5 rounded-lg border-l-4 border-primary">
                <span className="text-xl font-bold text-primary">✓</span> Original work only (no plagiarism)
              </p>
              <p className="flex items-center gap-3 text-gray-800 dark:text-gray-100 font-poppins font-medium text-base p-3 bg-primary/5 rounded-lg border-l-4 border-primary">
                <span className="text-xl font-bold text-primary">✓</span> Maximum 5000 characters per submission
              </p>
              <p className="flex items-center gap-3 text-gray-800 dark:text-gray-100 font-poppins font-medium text-base p-3 bg-primary/5 rounded-lg border-l-4 border-primary">
                <span className="text-xl font-bold text-primary">✓</span> All genres and styles welcome
              </p>
            </div>
            <div className="space-y-4">
              <p className="flex items-center gap-3 text-gray-800 dark:text-gray-100 font-poppins font-medium text-base p-3 bg-primary/5 rounded-lg border-l-4 border-primary">
                <span className="text-xl font-bold text-primary">✓</span> Submissions reviewed within 7 days
              </p>
              <p className="flex items-center gap-3 text-gray-800 dark:text-gray-100 font-poppins font-medium text-base p-3 bg-primary/5 rounded-lg border-l-4 border-primary">
                <span className="text-xl font-bold text-primary">✓</span> Best works featured on gallery & Instagram
              </p>
              <p className="flex items-center gap-3 text-gray-800 dark:text-gray-100 font-poppins font-medium text-base p-3 bg-primary/5 rounded-lg border-l-4 border-primary">
                <span className="text-xl font-bold text-primary">✓</span> Multiple submissions allowed
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Submit;
