import React, { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
import { Button } from './ui/Button';
import { Phone, LayoutDashboard } from 'lucide-react';
import { supabase } from '../services/supabaseClient';

export const Navigation: React.FC = () => {
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    // Check active session on mount
    supabase.auth.getSession().then(({ data: { session } }) => {
      setIsAdmin(!!session);
    });

    // Listen for auth changes (login/logout) to update UI immediately
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setIsAdmin(!!session);
    });

    return () => subscription.unsubscribe();
  }, []);

  return (
    <nav className="sticky top-0 z-40 w-full border-b border-border/40 bg-white/80 backdrop-blur-md">
      <div className="container mx-auto flex h-16 md:h-20 items-center justify-between px-4">
        <div className="flex items-center gap-2">
          <NavLink to="/" className="flex items-center gap-2">
            <div className="h-8 w-8 md:h-10 md:w-10 bg-primary rounded-lg flex items-center justify-center">
               <span className="text-white font-bold text-lg md:text-xl">R</span>
            </div>
            <div className="flex flex-col">
               <span className="font-heading font-bold text-base md:text-xl tracking-tight text-primary leading-none">RAMU CLINIC</span>
               <span className="text-[10px] md:text-xs text-muted-foreground font-medium">రాము క్లినిక్</span>
            </div>
          </NavLink>
        </div>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center gap-8">
          <NavLink 
            to="/" 
            className={({ isActive }) => 
              `text-sm font-medium hover:text-primary ${isActive ? 'text-primary font-bold' : 'text-muted-foreground'}`
            }
          >
            Home
          </NavLink>
          <NavLink 
            to="/about" 
            className={({ isActive }) => 
              `text-sm font-medium hover:text-primary ${isActive ? 'text-primary font-bold' : 'text-muted-foreground'}`
            }
          >
            About
          </NavLink>
          <NavLink 
            to="/services" 
            className={({ isActive }) => 
              `text-sm font-medium hover:text-primary ${isActive ? 'text-primary font-bold' : 'text-muted-foreground'}`
            }
          >
            Services
          </NavLink>
          <NavLink 
            to="/contact" 
            className={({ isActive }) => 
              `text-sm font-medium hover:text-primary ${isActive ? 'text-primary font-bold' : 'text-muted-foreground'}`
            }
          >
            Contact
          </NavLink>
          
          {/* Admin Dashboard Link - Only visible when logged in */}
          {isAdmin && (
            <NavLink 
              to="/admin" 
              className={({ isActive }) => 
                `flex items-center gap-1.5 text-sm font-bold text-accent hover:text-accent/80`
              }
            >
              <LayoutDashboard className="w-4 h-4" />
              Dashboard
            </NavLink>
          )}
        </div>

        {/* Desktop Actions */}
        <div className="hidden md:flex items-center gap-4">
            <a href="tel:09866629019" className="flex items-center gap-2 text-sm font-medium text-primary hover:text-primary/80">
                <Phone className="w-4 h-4" />
                <span>098666 29019</span>
            </a>
            <NavLink to="/contact">
              <Button size="sm" variant="primary">Book Appointment</Button>
            </NavLink>
        </div>

        {/* Mobile Actions */}
        <div className="flex md:hidden items-center gap-3">
             <NavLink to="/contact" className="no-underline">
                <Button size="sm" variant="primary" className="!text-white font-semibold text-xs px-3 h-8">Book Appointment</Button>
             </NavLink>
        </div>
      </div>
    </nav>
  );
};