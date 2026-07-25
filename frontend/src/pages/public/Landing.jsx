import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Button } from '../../components/ui/Button';
import { FiTrendingUp, FiUsers, FiShield, FiCheckCircle } from 'react-icons/fi';

export const Landing = () => {
  return (
    <div className="flex flex-col w-full">
      {/* Hero Section */}
      <section className="relative pt-32 pb-20 lg:pt-40 lg:pb-28 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-blue-50 to-white -z-10" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-5xl md:text-6xl font-bold tracking-tight text-secondary mb-6"
          >
            The CRM built for <br className="hidden md:block" />
            <span className="text-primary text-transparent bg-clip-text bg-gradient-to-r from-primary to-blue-400">Digital Heroes</span>
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="mt-4 text-xl text-slate-600 max-w-2xl mx-auto mb-10"
          >
            Manage leads, track activities, and close deals faster with our intuitive and modern CRM platform designed for scale.
          </motion.p>
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="flex flex-col sm:flex-row justify-center gap-4"
          >
            <Link to="/login">
              <Button size="lg" className="w-full sm:w-auto">Start Free Trial</Button>
            </Link>
            <Link to="#features">
              <Button variant="outline" size="lg" className="w-full sm:w-auto">View Features</Button>
            </Link>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.5 }}
            className="mt-20 pt-10 border-t border-slate-200 grid grid-cols-2 md:grid-cols-4 gap-4 text-slate-500"
          >
            <div>
              <div className="text-3xl font-bold text-secondary">99%</div>
              <div className="text-sm">Customer Satisfaction</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-secondary">2M+</div>
              <div className="text-sm">Leads Managed</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-secondary">24/7</div>
              <div className="text-sm">Priority Support</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-secondary">150+</div>
              <div className="text-sm">Integrations</div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-secondary mb-4">Why Choose LeadFlow?</h2>
            <p className="text-lg text-slate-600 max-w-2xl mx-auto">Everything you need to manage your sales pipeline efficiently.</p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {[
              { icon: FiTrendingUp, title: 'Boost Sales', desc: 'Track every interaction and never miss a follow-up opportunity.' },
              { icon: FiUsers, title: 'Team Collaboration', desc: 'Assign leads, share notes, and work together seamlessly.' },
              { icon: FiShield, title: 'Enterprise Security', desc: 'Your data is encrypted and securely stored with role-based access.' }
            ].map((feature, idx) => (
              <motion.div 
                key={idx}
                whileHover={{ y: -5 }}
                className="p-8 rounded-2xl border border-slate-100 bg-slate-50 hover:shadow-lg transition-all"
              >
                <div className="w-14 h-14 bg-blue-100 text-primary rounded-xl flex items-center justify-center mb-6">
                  <feature.icon size={28} />
                </div>
                <h3 className="text-xl font-semibold text-secondary mb-3">{feature.title}</h3>
                <p className="text-slate-600">{feature.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-secondary relative overflow-hidden">
        <div className="absolute top-0 right-0 -translate-y-12 translate-x-1/3 w-[600px] h-[600px] bg-primary/20 rounded-full blur-3xl" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          <h2 className="text-4xl font-bold text-white mb-6">Ready to transform your sales process?</h2>
          <p className="text-xl text-slate-300 mb-10 max-w-2xl mx-auto">Join thousands of companies using LeadFlow to grow their business.</p>
          <Link to="/login">
            <Button size="lg" className="bg-white text-secondary hover:bg-slate-100">Get Started Today</Button>
          </Link>
        </div>
      </section>
    </div>
  );
};
