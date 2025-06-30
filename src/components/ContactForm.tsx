import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Send, Check, Mail } from 'lucide-react';
import { useAnalytics } from '../hooks/useAnalytics';

const ContactForm: React.FC = () => {
  const [formState, setFormState] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });
  
  const [isSubmitted, setIsSubmitted] = useState(false);

  const { trackEvent } = useAnalytics();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormState({
      ...formState,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate form
    if (!formState.name || !formState.email || !formState.subject || !formState.message) {
      alert('Please fill in all fields');
      return;
    }

    // Create email body with form details
    const emailBody = `
Hello NULLBOTS Team,

Name: ${formState.name}
Email: ${formState.email}
Subject: ${formState.subject}

Message:
${formState.message}

---
This message was sent from the NULLBOTS contact form.
    `.trim();

    // Create Gmail URL with pre-filled data
    const gmailUrl = `https://mail.google.com/mail/?view=cm&fs=1&to=nullbots.tech@gmail.com&su=${encodeURIComponent(formState.subject)}&body=${encodeURIComponent(emailBody)}`;
    
    // Open Gmail in a new tab
    window.open(gmailUrl, '_blank');
    
    // Show success message
    setIsSubmitted(true);
    
    // Reset form
    setFormState({
      name: '',
      email: '',
      subject: '',
      message: '',
    });
    
    // Track successful form submission
    trackEvent('contact_form_submit');
  };

  const inputVariants = {
    focus: { scale: 1.01, borderColor: '#0ea5e9' },
    blur: { scale: 1, borderColor: '#1f2937' },
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
    >
      <div className="bg-gray-900 rounded-xl p-6 md:p-8 border border-gray-800">
        {isSubmitted ? (
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-center py-8"
          >
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
              className="mx-auto flex items-center justify-center w-16 h-16 rounded-full bg-green-500/20 text-green-500 mb-4"
            >
              <Mail size={32} />
            </motion.div>
            <h3 className="text-2xl font-bold text-white mb-2">Gmail Opened!</h3>
            <p className="text-gray-400 mb-6">
              Your email client should have opened with your message pre-filled. Please send the email to complete your inquiry.
            </p>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setIsSubmitted(false)}
              className="bg-cyan-500 hover:bg-cyan-600 text-black font-medium px-6 py-2 rounded-md"
            >
              Send Another Message
            </motion.button>
          </motion.div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.3 }}
              >
                <label htmlFor="name" className="block text-sm font-medium text-gray-300 mb-2">
                  Your Name *
                </label>
                <motion.input
                  whileFocus="focus"
                  animate="blur"
                  variants={inputVariants}
                  type="text"
                  id="name"
                  name="name"
                  value={formState.name}
                  onChange={handleChange}
                  required
                  className="w-full bg-gray-800 border border-gray-700 rounded-md px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-cyan-500"
                  placeholder="Enter your full name"
                />
              </motion.div>
              
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.3, delay: 0.1 }}
              >
                <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-2">
                  Your Email *
                </label>
                <motion.input
                  whileFocus="focus"
                  animate="blur"
                  variants={inputVariants}
                  type="email"
                  id="email"
                  name="email"
                  value={formState.email}
                  onChange={handleChange}
                  required
                  className="w-full bg-gray-800 border border-gray-700 rounded-md px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-cyan-500"
                  placeholder="Enter your email address"
                />
              </motion.div>
            </div>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.3, delay: 0.2 }}
            >
              <label htmlFor="subject" className="block text-sm font-medium text-gray-300 mb-2">
                Subject *
              </label>
              <motion.input
                whileFocus="focus"
                animate="blur"
                variants={inputVariants}
                type="text"
                id="subject"
                name="subject"
                value={formState.subject}
                onChange={handleChange}
                required
                className="w-full bg-gray-800 border border-gray-700 rounded-md px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-cyan-500"
                placeholder="What's this about?"
              />
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.3, delay: 0.3 }}
            >
              <label htmlFor="message" className="block text-sm font-medium text-gray-300 mb-2">
                Message *
              </label>
              <motion.textarea
                whileFocus="focus"
                animate="blur"
                variants={inputVariants}
                id="message"
                name="message"
                value={formState.message}
                onChange={handleChange}
                required
                rows={5}
                className="w-full bg-gray-800 border border-gray-700 rounded-md px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-cyan-500"
                placeholder="Tell us about your project or inquiry..."
              />
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.3, delay: 0.4 }}
            >
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                type="submit"
                className="flex items-center justify-center w-full md:w-auto px-8 py-3 rounded-md font-medium bg-cyan-500 hover:bg-cyan-600 text-black transition-colors"
              >
                Send Message
                <Send size={16} className="ml-2" />
              </motion.button>
              
              <p className="text-xs text-gray-500 mt-2">
                * This will open Gmail with your message pre-filled
              </p>
            </motion.div>
          </form>
        )}
      </div>
    </motion.div>
  );
};

export default ContactForm;