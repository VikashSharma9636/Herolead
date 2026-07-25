import React from 'react';
import { motion } from 'framer-motion';
import { FiTarget, FiHeart, FiGlobe, FiAward } from 'react-icons/fi';

export const About = () => {
  const stats = [
    { label: 'Active Users', value: '10,000+' },
    { label: 'Leads Managed', value: '5M+' },
    { label: 'Countries', value: '120+' },
    { label: 'Team Members', value: '45' }
  ];

  const values = [
    { icon: FiTarget, title: 'Mission Driven', desc: 'We are obsessed with helping sales teams close more deals.' },
    { icon: FiHeart, title: 'Customer First', desc: 'Every feature we build starts with customer feedback.' },
    { icon: FiGlobe, title: 'Global Remote', desc: 'Our team is distributed across the world, working asynchronously.' },
    { icon: FiAward, title: 'Excellence', desc: 'We settle for nothing less than pixel-perfect products.' }
  ];

  return (
    <div className="flex flex-col w-full bg-white">
      {/* Hero Section */}
      <section className="relative pt-24 pb-16 overflow-hidden">
        <div className="absolute inset-0 bg-slate-50 -z-10" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-4xl md:text-5xl font-bold text-secondary mb-6"
          >
            Empowering Sales Teams to <br className="hidden md:block" />
            <span className="text-primary">Achieve the Impossible</span>
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-lg text-slate-600 max-w-2xl mx-auto"
          >
            LeadFlow was founded in 2024 with a simple belief: CRM software shouldn't be clunky, slow, or hard to use. We build tools that sales reps actually love using.
          </motion.p>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 border-y border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            {stats.map((stat, idx) => (
              <motion.div 
                key={idx}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.2 + (idx * 0.1) }}
                className="p-6"
              >
                <div className="text-4xl font-bold text-primary mb-2">{stat.value}</div>
                <div className="text-slate-500 font-medium">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-secondary mb-4">Our Core Values</h2>
            <p className="text-slate-600 max-w-2xl mx-auto">This is what drives us every single day to build the best CRM in the world.</p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((val, idx) => (
              <motion.div 
                key={idx}
                whileHover={{ y: -5 }}
                className="p-6 bg-slate-50 rounded-2xl border border-slate-100"
              >
                <div className="w-12 h-12 bg-white rounded-xl shadow-sm flex items-center justify-center text-primary mb-6">
                  <val.icon size={24} />
                </div>
                <h3 className="text-lg font-semibold text-secondary mb-2">{val.title}</h3>
                <p className="text-slate-600 text-sm leading-relaxed">{val.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};
