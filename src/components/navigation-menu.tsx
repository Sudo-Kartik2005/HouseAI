
'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Home, Search, Bot, MapPin, Menu } from 'lucide-react';
import { Button } from './ui/button';
import { cn } from '@/lib/utils';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from './ui/dropdown-menu';
import { ThemeToggle } from './theme-toggle';

const menuItems = [
  { name: 'Home', href: '/', icon: Home },
  { name: 'Search Property', href: '/search-property', icon: Search },
  { name: 'AI Building Plan', href: '/', icon: Bot },
  { name: 'Nearby Shops', href: '/nearby-shops', icon: MapPin },
];

export function NavigationMenu() {
  const pathname = usePathname();

  const NavLinks = () => (
    <>
      {menuItems.map((item) => {
        return (
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
        );
      })}
    </>
  );

  return (
    <>
      <nav className="hidden items-center gap-2 md:flex">
        <NavLinks />
         <div className="flex items-center gap-2">
            <Button asChild className="rounded-full shadow-lg transition-transform duration-300 hover:scale-105 hover:shadow-primary/50">
                <Link href="/">Build My House</Link>
            </Button>
            <ThemeToggle />
        </div>
      </nav>

      <div className="md:hidden flex items-center gap-2">
        <ThemeToggle />
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
                 <DropdownMenuItem asChild>
                    <Link href="/">
                        <Button className="w-full">
                            Build My House
                        </Button>
                    </Link>
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </>
  );
}
