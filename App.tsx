import React, { useState } from 'react';
import { HashRouter, Routes, Route, useLocation, Navigate, Link } from 'react-router-dom';
import { Navigation } from './components/Navigation';
import { MobileNav } from './components/MobileNav';
import { Home } from './pages/Home';
import { About } from './pages/About';
import { Services } from './pages/Services';
import { Contact } from './pages/Contact';
import { Login } from './pages/Login';
import { Admin } from './pages/Admin';
import { Toaster } from 'sonner';
import { MessageCircle, Phone, ShieldCheck } from 'lucide-react';

const ScrollToTop = () => {
  const { pathname } = useLocation();

  React.useEffect(() => {
    // Force instant scroll to top on route change
    window.scrollTo({ top: 0, behavior: 'instant' });
  }, [pathname]);

  return null;
};

const FloatingActions = () => {
  // Hide on admin routes
  const { pathname } = useLocation();
  if (pathname.includes('/admin') || pathname.includes('/login')) return null;

  return (
    <div className="fixed bottom-20 right-4 md:bottom-8 md:right-8 flex flex-col gap-4 z-50">
      <a
        href="https://wa.me/919866629019"
        target="_blank"
        rel="noopener noreferrer"
        className="bg-[#25D366] text-white p-3 md:p-4 rounded-full shadow-lg flex items-center justify-center"
        aria-label="Chat on WhatsApp"
      >
        <MessageCircle className="w-6 h-6" />
      </a>
      <a
        href="tel:09866629019"
        className="bg-accent text-white p-3 md:p-4 rounded-full shadow-lg flex items-center justify-center"
        aria-label="Emergency Call"
      >
        <Phone className="w-6 h-6" />
      </a>
    </div>
  );
};

const App: React.FC = () => {
  return (
    <HashRouter>
      <ScrollToTop />
      <div className="min-h-screen bg-background flex flex-col font-sans">
        <Navigation />
        
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/services" element={<Services />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/login" element={<Login />} />
            <Route path="/admin" element={<Admin />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </main>

        <FloatingActions />
        <MobileNav />
        <Toaster position="top-center" richColors />
        
        {/* Footer - Visible on all devices, with bottom padding for mobile nav */}
        <footer className="bg-primary text-white py-12 pb-28 md:pb-12">
          <div className="container mx-auto px-4 grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <h3 className="font-heading font-bold text-2xl mb-4">Ramu Clinic</h3>
              <p className="text-secondary/80">
                Your trusted partner in health and wellness. Serving the community with care and compassion.
              </p>
            </div>
            <div>
              <h4 className="font-heading font-bold text-lg mb-4">Quick Links</h4>
              <ul className="space-y-2 text-secondary/80">
                <li><Link to="/" className="hover:text-accent transition-colors">Home</Link></li>
                <li><Link to="/about" className="hover:text-accent transition-colors">About Us</Link></li>
                <li><Link to="/services" className="hover:text-accent transition-colors">Services</Link></li>
                <li><Link to="/contact" className="hover:text-accent transition-colors">Contact</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-heading font-bold text-lg mb-4">Contact</h4>
              <ul className="space-y-2 text-secondary/80">
                <li>Grampanchayat, Balaji Nagar Rd</li>
                <li>Balaji Nagar, Badangpet</li>
                <li>Telangana 500112</li>
                <li>098666 29019</li>
              </ul>
            </div>
            <div>
              <h4 className="font-heading font-bold text-lg mb-4">Hours</h4>
              <ul className="space-y-2 text-secondary/80">
                <li>Mon - Sat: 9:00 AM - 11:00 PM</li>
                <li>Sunday: 10:00 AM - 2:00 PM</li>
              </ul>
            </div>
          </div>
          <div className="container mx-auto px-4 mt-8 pt-8 border-t border-white/10 text-center text-secondary/60 text-sm flex flex-col md:flex-row items-center justify-center gap-2">
            <span>© {new Date().getFullYear()} Ramu Clinic. All rights reserved.</span>
            <span className="hidden md:inline mx-2">|</span>
            <Link to="/login" className="hover:text-white text-secondary/60 transition-colors flex items-center gap-2 hover:underline underline-offset-4">
              <ShieldCheck className="w-4 h-4" /> Admin Login
            </Link>
          </div>
        </footer>
      </div>
    </HashRouter>
  );
};

export default App;