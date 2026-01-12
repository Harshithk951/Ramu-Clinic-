import React from 'react';
import { NavLink } from 'react-router-dom';
import { Home, Info, Stethoscope, Phone } from 'lucide-react';

export const MobileNav: React.FC = () => {
  const navItems = [
    { to: '/', icon: Home, label: 'Home' },
    { to: '/services', icon: Stethoscope, label: 'Services' },
    { to: '/about', icon: Info, label: 'About' },
    { to: '/contact', icon: Phone, label: 'Contact' },
  ];

  return (
    <div className="fixed bottom-0 left-0 z-50 w-full bg-white border-t border-border md:hidden pb-[env(safe-area-inset-bottom)]">
      <div className="grid h-16 grid-cols-4 mx-auto font-medium">
        {navItems.map((item) => (
          <NavLink
            key={item.to}
            to={item.to}
            className={({ isActive }) =>
              `inline-flex flex-col items-center justify-center px-5 hover:bg-gray-50 group ${
                isActive ? 'text-primary' : 'text-gray-500'
              }`
            }
          >
            <item.icon className="w-6 h-6 mb-1" />
            <span className="text-xs">{item.label}</span>
          </NavLink>
        ))}
      </div>
    </div>
  );
};