import React from 'react';

// Props interface kept for compatibility with existing usage, but animation props are ignored.
interface RevealProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  animation?: any;
  threshold?: number;
}

export const Reveal: React.FC<RevealProps> = ({ 
  children, 
  className = "" 
}) => {
  // Directly render children without any animation wrappers or intersection observers
  return (
    <div className={className}>
      {children}
    </div>
  );
};