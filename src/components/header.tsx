
'use client';

import { useState, useEffect } from 'react';
import { Building2 } from 'lucide-react';
import Link from 'next/link';
import { NavigationMenu } from './navigation-menu';
import { ThemeToggle } from './theme-toggle';
import { Button } from './ui/button';

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header
      className={`sticky top-0 z-50 transition-all duration-300 ${
        isScrolled ? 'shadow-md' : ''
      }`}
    >
      <div className="absolute inset-0 h-full w-full bg-gradient-to-r from-purple-500/10 to-blue-500/10 glass-effect"></div>
      <div className="container mx-auto flex h-20 items-center justify-between px-4 md:px-6 relative z-10">
        <Link href="/" className="flex items-center gap-2 group">
          <Building2 className="h-8 w-8 text-primary transition-transform duration-300 group-hover:rotate-[-15deg]" />
          <h1 className="font-headline text-2xl font-bold text-primary transition-colors duration-300 group-hover:text-accent">
            HouseAI Blueprint
          </h1>
        </Link>
        <div className="flex items-center gap-4">
            <NavigationMenu />
            <div className="hidden md:flex items-center gap-2">
                 <Button className="rounded-full shadow-lg transition-transform duration-300 hover:scale-105 hover:shadow-primary/50">
                    Build My House
                </Button>
                <ThemeToggle />
            </div>
        </div>
      </div>
    </header>
  );
}
