
'use client';

import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import {
  ArrowRight,
  ChevronRight,
  HelpCircle,
  Home,
  MessageSquare,
  Search,
  X,
} from 'lucide-react';

export default function ContactPage() {
  const helpTopics = [
    'RentCast Property Data API',
    'Changing or Cancelling Your Subscription',
    'About Data Storage and Protection',
    'How to View Property Rent Estimates and Comps',
  ];

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-muted/40 p-4">
      <div className="w-full max-w-sm overflow-hidden rounded-2xl bg-background font-sans text-foreground shadow-2xl">
        <header className="bg-blue-600 p-4 text-white">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="h-7 w-7"
              >
                <path
                  d="M12 2L12 5"
                  stroke="white"
                  strokeWidth="2"
                  strokeLinecap="round"
                ></path>
                <path
                  d="M12 19L12 22"
                  stroke="white"
                  strokeWidth="2"
                  strokeLinecap="round"
                ></path>
                <path
                  d="M18.5 4L18.5 5"
                  stroke="white"
                  strokeWidth="2"
                  strokeLinecap="round"
                ></path>
                <path
                  d="M18.5 19L18.5 20"
                  stroke="white"
                  strokeWidth="2"
                  strokeLinecap="round"
                ></path>
                <path
                  d="M5.5 4L5.5 5"
                  stroke="white"
                  strokeWidth="2"
                  strokeLinecap="round"
                ></path>
                <path
                  d="M5.5 19L5.5 20"
                  stroke="white"
                  strokeWidth="2"
                  strokeLinecap="round"
                ></path>
                <path
                  d="M12 5C15.5899 5 18.5 5.89543 18.5 7.5C18.5 9.10457 15.5899 10 12 10C8.41015 10 5.5 9.10457 5.5 7.5C5.5 5.89543 8.41015 5 12 5Z"
                  stroke="white"
                  strokeWidth="2"
                  strokeLinecap="round"
                ></path>
                <path
                  d="M12 19C15.5899 19 18.5 18.1046 18.5 16.5C18.5 14.8954 15.5899 14 12 14C8.41015 14 5.5 14.8954 5.5 16.5C5.5 18.1046 8.41015 19 12 19Z"
                  stroke="white"
                  strokeWidth="2"
                  strokeLinecap="round"
                ></path>
                <path
                  d="M5.5 7.5L5.5 16.5"
                  stroke="white"
                  strokeWidth="2"
                  strokeLinecap="round"
                ></path>
                <path
                  d="M18.5 7.5L18.5 16.5"
                  stroke="white"
                  strokeWidth="2"
                  strokeLinecap="round"
                ></path>
              </svg>
              <span className="text-lg font-bold">HouseAI</span>
            </div>
            <div className="flex items-center gap-3">
              <Avatar className="h-8 w-8 border-2 border-white/80">
                <AvatarImage src="https://placehold.co/40x40.png" alt="User" data-ai-hint="woman smiling" />
                <AvatarFallback>U</AvatarFallback>
              </Avatar>
              <Button variant="ghost" size="icon" className="h-8 w-8">
                <X className="h-5 w-5 text-white" />
              </Button>
            </div>
          </div>
          <div className="mt-4">
            <h1 className="text-3xl font-bold">
              Hi there! <span className="inline-block animate-wave">👋</span>
            </h1>
            <p className="mt-1 text-2xl font-semibold">How can we help?</p>
          </div>
        </header>

        <main className="-mt-8 px-3">
          <Card className="shadow-lg">
            <CardContent className="p-3">
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-semibold">Send us a message</p>
                  <p className="text-sm text-muted-foreground">
                    We&apos;ll be back online later today
                  </p>
                </div>
                <Button variant="ghost" size="icon">
                  <ArrowRight className="h-5 w-5 text-blue-600" />
                </Button>
              </div>
            </CardContent>
          </Card>

          <Card className="mt-4 shadow-lg">
            <CardContent className="p-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground" />
                <Input
                  placeholder="Search for help"
                  className="pl-10"
                />
              </div>
              <div className="mt-4 space-y-2">
                {helpTopics.map((topic) => (
                  <a
                    key={topic}
                    href="#"
                    className="flex items-center justify-between rounded-lg p-2 text-sm font-medium hover:bg-muted"
                  >
                    <span>{topic}</span>
                    <ChevronRight className="h-5 w-5 text-muted-foreground" />
                  </a>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card className="my-4 shadow-lg">
            <CardContent className="flex items-center justify-between p-3">
              <p className="font-semibold">Learn More About Our API</p>
              <ChevronRight className="h-5 w-5 text-muted-foreground" />
            </CardContent>
          </Card>
        </main>

        <footer className="flex items-center justify-around border-t bg-background py-2">
          <Button
            variant="ghost"
            className="flex flex-col items-center gap-1 h-auto text-blue-600"
          >
            <Home />
            <span className="text-xs font-semibold">Home</span>
          </Button>
          <Button
            variant="ghost"
            className="relative flex flex-col items-center gap-1 h-auto"
          >
            <MessageSquare />
            <span className="text-xs font-semibold text-muted-foreground">
              Messages
            </span>
            <span className="absolute right-2 top-0 flex h-4 w-4 items-center justify-center rounded-full bg-red-500 text-xs font-bold text-white">
              2
            </span>
          </Button>
          <Button
            variant="ghost"
            className="flex flex-col items-center gap-1 h-auto text-muted-foreground"
          >
            <HelpCircle />
            <span className="text-xs font-semibold">Help</span>
          </Button>
        </footer>
      </div>
    </div>
  );
}

// Add animation for the waving hand
const style = document.createElement('style');
style.innerHTML = `
  @keyframes wave {
    0%, 100% { transform: rotate(0deg); }
    20%, 60% { transform: rotate(-25deg); }
    40%, 80% { transform: rotate(10deg); }
  }
  .animate-wave {
    animation: wave 2.5s infinite;
    transform-origin: 70% 70%;
    display: inline-block;
  }
`;
if (typeof window !== 'undefined') {
  document.head.appendChild(style);
}
