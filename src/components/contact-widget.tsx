
'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import {
  ArrowRight,
  ChevronRight,
  HelpCircle,
  Home,
  MessageSquare,
  Search,
  X,
  Bot,
} from 'lucide-react';
import { AnimatePresence, motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import { useIsMobile } from '@/hooks/use-mobile';
import { useToast } from '@/hooks/use-toast';

export default function ContactWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const isMobile = useIsMobile();
  const { toast } = useToast();

  const handleFeatureNotImplemented = () => {
    toast({
      title: 'Coming Soon!',
      description: 'This feature is not yet implemented.',
    });
  };

  const helpTopics = [
    'RentCast Property Data API',
    'Changing or Cancelling Your Subscription',
    'About Data Storage and Protection',
    'How to View Property Rent Estimates and Comps',
  ];

  const widgetVariants = {
    hidden: { opacity: 0, y: 50, scale: 0.9 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: { type: 'spring', stiffness: 300, damping: 30 },
    },
    exit: {
      opacity: 0,
      y: 50,
      scale: 0.9,
      transition: { duration: 0.2 },
    },
  };

  const mobileOverlayVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
    exit: { opacity: 0 },
  };

  return (
    <>
      <div className="fixed bottom-4 right-4 z-50">
        <AnimatePresence>
          {!isOpen && (
            <motion.div
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0 }}
              transition={{ duration: 0.3 }}
            >
              <Button
                size="icon"
                className="rounded-full h-16 w-16 bg-primary text-primary-foreground shadow-lg hover:bg-primary/90"
                onClick={() => setIsOpen(true)}
              >
                <Bot className="h-8 w-8" />
              </Button>
            </motion.div>
          )}
        </AnimatePresence>

        <AnimatePresence>
          {isOpen && (
            <>
              {isMobile && (
                <motion.div
                  className="fixed inset-0 bg-black/60"
                  variants={mobileOverlayVariants}
                  initial="hidden"
                  animate="visible"
                  exit="exit"
                  onClick={() => setIsOpen(false)}
                />
              )}
              <motion.div
                className={cn(
                    "fixed bottom-0 right-0 z-50 w-full max-w-sm overflow-hidden font-sans text-foreground shadow-2xl",
                    isMobile ? "rounded-t-2xl" : "bottom-4 right-4 rounded-2xl"
                )}
                variants={widgetVariants}
                initial="hidden"
                animate="visible"
                exit="exit"
              >
                <div className="bg-background rounded-2xl">
                   <header className="bg-gradient-to-br from-primary/90 to-accent/90 p-4 text-white rounded-t-2xl">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
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
                        <span className="text-xl font-bold">HouseAI</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Avatar className="h-8 w-8 border-2 border-white/80">
                          <AvatarImage src="https://placehold.co/40x40.png" alt="User" data-ai-hint="woman smiling"/>
                          <AvatarFallback>U</AvatarFallback>
                        </Avatar>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-8 w-8"
                          onClick={() => setIsOpen(false)}
                        >
                          <X className="h-5 w-5 text-white" />
                        </Button>
                      </div>
                    </div>
                    <div className="mt-3">
                      <h1 className="text-xl font-bold">
                        Hi there! <span className="inline-block animate-wave">👋</span>
                      </h1>
                      <p className="mt-0.5 text-sm font-semibold">How can we help?</p>
                    </div>
                  </header>

                  <main className="-mt-4 px-3 pb-3">
                    <Link href="/contact" passHref>
                        <Card as="a" className="shadow-md hover:bg-muted/50 transition-colors">
                            <CardContent className="p-3">
                                <div className="flex items-center justify-between">
                                <div className="flex items-center gap-3">
                                    <MessageSquare className="h-5 w-5 text-primary" />
                                    <div>
                                        <p className="font-semibold text-sm">Send us a message</p>
                                        <p className="text-xs text-muted-foreground">
                                        We&apos;ll be back online later today
                                        </p>
                                    </div>
                                </div>
                                <Button variant="ghost" size="icon" className="text-muted-foreground h-8 w-8" asChild>
                                    <div><ChevronRight className="h-4 w-4" /></div>
                                </Button>
                                </div>
                            </CardContent>
                        </Card>
                    </Link>

                    <Card className="mt-3 shadow-md">
                      <CardContent className="p-3">
                        <Link href="/contact" className="relative block">
                          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                          <Input placeholder="Search for help" className="pl-9 h-9 text-sm" readOnly />
                        </Link>
                        <div className="mt-3 space-y-0.5">
                          {helpTopics.map((topic) => (
                            <Link
                              key={topic}
                              href="/contact"
                              className="flex items-center justify-between rounded-md p-2 text-xs font-medium hover:bg-muted"
                            >
                              <span>{topic}</span>
                              <ChevronRight className="h-4 w-4 text-muted-foreground" />
                            </Link>
                          ))}
                        </div>
                      </CardContent>
                    </Card>
                     <Card className="mt-3 shadow-md hover:bg-muted/50 transition-colors">
                        <Link href="/contact" className="block">
                            <CardContent className="flex items-center justify-between p-3">
                                <div className="flex items-center gap-3">
                                    <Bot className="h-5 w-5 text-primary" />
                                    <p className="font-semibold text-sm">Learn More About Our API</p>
                                </div>
                                <ChevronRight className="h-4 w-4 text-muted-foreground" />
                            </CardContent>
                        </Link>
                    </Card>
                  </main>

                  <footer className="flex items-center justify-around border-t bg-background py-1.5 rounded-b-2xl">
                     <Link href="/" passHref>
                        <Button
                            variant="ghost"
                            className="flex flex-col items-center gap-1 h-auto text-primary px-4 py-1"
                            asChild
                        >
                           <div>
                                <Home className="h-5 w-5" />
                                <span className="text-xs font-semibold">Home</span>
                           </div>
                        </Button>
                     </Link>
                    <Button
                      variant="ghost"
                      className="relative flex flex-col items-center gap-1 h-auto text-muted-foreground px-4 py-1"
                      onClick={handleFeatureNotImplemented}
                    >
                      <MessageSquare className="h-5 w-5" />
                      <span className="text-xs font-semibold">Messages</span>
                      <span className="absolute right-2 top-0 flex h-4 w-4 items-center justify-center rounded-full bg-red-500 text-xs font-bold text-white">
                        2
                      </span>
                    </Button>
                    <Link href="/contact" passHref>
                        <Button
                        variant="ghost"
                        className="flex flex-col items-center gap-1 h-auto text-muted-foreground px-4 py-1"
                        asChild
                        >
                        <div>
                            <HelpCircle className="h-5 w-5" />
                            <span className="text-xs font-semibold">Help</span>
                        </div>
                        </Button>
                    </Link>
                  </footer>
                </div>
              </motion.div>
            </>
          )}
        </AnimatePresence>
      </div>

      <style jsx global>{`
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
      `}</style>
    </>
  );
}
