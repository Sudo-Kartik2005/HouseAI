'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Home, Search, Bot, MapPin, Phone, Menu, X } from 'lucide-react';
import { Button } from './ui/button';
import { cn } from '@/lib/utils';

const menuItems = [
  { name: 'Home', href: '/', icon: Home },
  { name: 'Search Property', href: '/search-property', icon: Search },
  { name: 'AI Building Plan', href: '/', icon: Bot },
  { name: 'Nearby Shops', href: '/nearby-shops', icon: MapPin },
  { name: 'Contact', href: 'mailto:contact@houseai.com', icon: Phone },
];

export function NavigationMenu() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);

  const NavLinks = () => (
    <>
      {menuItems.map((item) => (
        <Link
          key={item.name}
          href={item.href}
          className={cn(
            'flex items-center gap-2 rounded-full px-4 py-2 text-sm font-medium text-foreground transition-all duration-300 hover:bg-primary/10 hover:text-primary glowing-underline',
            pathname === item.href ? 'active' : ''
          )}
        >
          <item.icon className="h-4 w-4" />
          <span>{item.name}</span>
        </Link>
      ))}
    </>
  );

  return (
    <>
      <nav className="hidden items-center gap-2 md:flex">
        <NavLinks />
        <Button className="ml-4 rounded-full bg-accent px-6 py-3 font-bold text-accent-foreground shadow-lg transition-transform duration-300 hover:scale-105 hover:shadow-accent/50">
          Build My House
        </Button>
      </nav>

      <div className="md:hidden">
        <Button
          variant="ghost"
          size="icon"
          onClick={() => setIsOpen(!isOpen)}
          aria-label="Toggle menu"
        >
          {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </Button>
      </div>

      {isOpen && (
        <div
          className="fixed inset-0 top-20 z-40 bg-background/95 backdrop-blur-sm md:hidden"
          onClick={() => setIsOpen(false)}
        >
          <div
            className="mx-4 mt-4 flex flex-col items-center gap-4 rounded-lg border bg-card p-6 shadow-xl"
            onClick={(e) => e.stopPropagation()}
          >
            <NavLinks />
            <Button className="w-full rounded-full bg-accent px-6 py-3 font-bold text-accent-foreground shadow-lg">
              Build My House
            </Button>
          </div>
        </div>
      )}
    </>
  );
}
