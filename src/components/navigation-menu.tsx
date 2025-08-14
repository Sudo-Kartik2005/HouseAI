'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Home, Search, Bot, MapPin, Phone, Menu, X } from 'lucide-react';
import { Button } from './ui/button';
import { cn } from '@/lib/utils';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from './ui/dropdown-menu';

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
         <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button
                variant="ghost"
                size="icon"
                aria-label="Toggle menu"
                >
                <Menu className="h-6 w-6" />
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
                {menuItems.map((item) => (
                    <DropdownMenuItem key={item.name} asChild>
                        <Link href={item.href}>
                            <item.icon className="mr-2 h-4 w-4" />
                            {item.name}
                        </Link>
                    </DropdownMenuItem>
                ))}
            </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </>
  );
}
