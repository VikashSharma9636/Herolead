import React from 'react';
import { motion } from 'framer-motion';
import { FiMail, FiPhone, FiMapPin } from 'react-icons/fi';
import { Button } from '../../components/ui/Button';
import { Input } from '../../components/ui/Input';

export const Contact = () => {
  return (
    <div className="flex flex-col w-full bg-slate-50 min-h-screen">
      <div className="pt-24 pb-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        
        <div className="text-center mb-16">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-5xl font-bold text-secondary mb-6"
          >
            Get in <span className="text-primary">Touch</span>
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-lg text-slate-600 max-w-2xl mx-auto"
          >
            Whether you have a question about features, pricing, or need a demo, our team is ready to answer all your questions.
          </motion.p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 lg:gap-8 items-start max-w-5xl mx-auto">
          {/* Contact Info */}
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="flex flex-col gap-6"
          >
            <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm flex items-start gap-4">
              <div className="w-12 h-12 bg-blue-50 text-primary rounded-xl flex items-center justify-center shrink-0">
                <FiMail size={24} />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-secondary mb-1">Chat to sales</h3>
                <p className="text-slate-500 text-sm mb-2">Speak to our friendly team.</p>
                <a href="mailto:sales@leadflow.com" className="text-primary font-medium">sales@leadflow.com</a>
              </div>
            </div>

            <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm flex items-start gap-4">
              <div className="w-12 h-12 bg-blue-50 text-primary rounded-xl flex items-center justify-center shrink-0">
                <FiPhone size={24} />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-secondary mb-1">Call us</h3>
                <p className="text-slate-500 text-sm mb-2">Mon-Fri from 8am to 5pm.</p>
                <a href="tel:+1234567890" className="text-primary font-medium">+1 (555) 123-4567</a>
              </div>
            </div>

            <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm flex items-start gap-4">
              <div className="w-12 h-12 bg-blue-50 text-primary rounded-xl flex items-center justify-center shrink-0">
                <FiMapPin size={24} />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-secondary mb-1">Visit us</h3>
                <p className="text-slate-500 text-sm mb-2">Visit our office HQ.</p>
                <p className="text-slate-700 font-medium">100 Innovation Way<br/>San Francisco, CA 94105</p>
              </div>
            </div>
          </motion.div>

          {/* Contact Form */}
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
            className="bg-white p-8 rounded-2xl border border-slate-100 shadow-sm"
          >
            <h3 className="text-2xl font-bold text-secondary mb-6">Send us a message</h3>
            <form className="space-y-5" onSubmit={(e) => e.preventDefault()}>
              <div className="grid grid-cols-2 gap-4">
                <Input label="First Name" placeholder="John" />
                <Input label="Last Name" placeholder="Doe" />
              </div>
              <Input label="Email" type="email" placeholder="john@company.com" />
              <Input label="Company" placeholder="Company Inc." />
              
              <div className="flex flex-col gap-1">
                <label className="text-sm font-medium text-slate-700">Message</label>
                <textarea 
                  className="w-full px-4 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all resize-none h-32"
                  placeholder="How can we help you?"
                ></textarea>
              </div>
              
              <Button className="w-full mt-2" size="lg">Send Message</Button>
            </form>
          </motion.div>
        </div>

      </div>
    </div>
  );
};
