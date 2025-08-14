'use client';

import { useState, useRef, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
} from '@/components/ui/table';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { useToast } from "@/hooks/use-toast"
import { DollarSign, Loader2, Send, CornerDownLeft, Bot, User } from 'lucide-react';
import Image from 'next/image';
import type { GenerateBuildingPlanOutput } from '@/ai/flows/generate-building-plan';
import { generateBuildingPlanAction, refineBuildingPlanAction } from '@/app/actions';
import { Textarea } from './ui/textarea';
import { ScrollArea } from './ui/scroll-area';
import { cn } from '@/lib/utils';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';


const formSchema = z.object({
  landLength: z.coerce.number().positive({ message: 'Length must be a positive number.' }).min(10, 'Length must be at least 10 feet.'),
  landWidth: z.coerce.number().positive({ message: 'Width must be a positive number.' }).min(10, 'Width must be at least 10 feet.'),
  architecturalStyle: z.string({
    required_error: "Please select an architectural style.",
  }),
});

const architecturalStyles = ["Modern", "Contemporary", "Traditional", "Minimalist", "Industrial"];

type Message = {
    role: 'user' | 'assistant';
    content: string;
};

export default function BuildingPlanGenerator() {
  const [plan, setPlan] = useState<GenerateBuildingPlanOutput | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isRefining, setIsRefining] = useState(false);
  const [chatMessages, setChatMessages] = useState<Message[]>([]);
  const [chatInput, setChatInput] = useState('');
  const chatScrollAreaRef = useRef<HTMLDivElement>(null);

  const { toast } = useToast();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      landLength: 100,
      landWidth: 50,
      architecturalStyle: "Modern",
    },
  });
  
  useEffect(() => {
    if (chatScrollAreaRef.current) {
        chatScrollAreaRef.current.scrollTo({
            top: chatScrollAreaRef.current.scrollHeight,
            behavior: 'smooth',
        });
    }
  }, [chatMessages]);

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsLoading(true);
    setPlan(null);
    setChatMessages([]);

    try {
      const result = await generateBuildingPlanAction(values);
      setPlan(result);
      setChatMessages([
        { role: 'assistant', content: "I've generated a new plan for you. How can I refine it?" }
      ]);
    } catch (e) {
      toast({
        variant: "destructive",
        title: "Error Generating Plan",
        description: "An unexpected error occurred. Please try again later.",
      })
      console.error(e);
    } finally {
      setIsLoading(false);
    }
  }

  async function handleChatSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!chatInput.trim() || !plan || isRefining) return;

    const newMessages: Message[] = [...chatMessages, { role: 'user', content: chatInput }];
    setChatMessages(newMessages);
    const userRequest = chatInput;
    setChatInput('');
    setIsRefining(true);

    try {
        const result = await refineBuildingPlanAction({
            currentPlan: plan,
            userRequest: userRequest,
        });
        setPlan(result);
        setChatMessages([...newMessages, { role: 'assistant', content: "Here is the updated plan. What else can I change for you?" }]);
    } catch (error) {
        toast({
            variant: "destructive",
            title: "Error Refining Plan",
            description: "I was unable to refine the plan. Please try a different request.",
        });
        setChatMessages([...newMessages, { role: 'assistant', content: "Sorry, I couldn't make that change. Could you try rephrasing your request?" }]);
        console.error(error);
    } finally {
        setIsRefining(false);
    }
  }


  return (
    <div className="mt-12">
      <Card className="mx-auto max-w-3xl shadow-lg">
        <CardHeader>
          <CardTitle className="font-headline text-2xl">Get Started</CardTitle>
          <CardDescription>Enter your land dimensions and desired style below.</CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                <FormField
                  control={form.control}
                  name="landLength"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Land Length (feet)</FormLabel>
                      <FormControl>
                        <Input type="number" placeholder="e.g., 100" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="landWidth"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Land Width (feet)</FormLabel>
                      <FormControl>
                        <Input type="number" placeholder="e.g., 50" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
               <FormField
                  control={form.control}
                  name="architecturalStyle"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Architectural Style</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select a style" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {architecturalStyles.map(style => (
                            <SelectItem key={style} value={style}>{style}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              <Button type="submit" className="w-full bg-primary hover:bg-primary/90 text-primary-foreground" disabled={isLoading}>
                {isLoading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Generating Plan...
                  </>
                ) : (
                  'Generate Building Plan'
                )}
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>

      {isLoading && !plan && (
        <div className="mt-8">
            <Card className="mx-auto max-w-3xl shadow-lg animate-pulse">
                <CardHeader>
                    <div className="h-8 bg-muted rounded w-3/4"></div>
                    <div className="h-4 bg-muted rounded w-1/2 mt-2"></div>
                </CardHeader>
                <CardContent className="space-y-6">
                    <div className="h-6 bg-muted rounded w-1/4"></div>
                    <div className="h-20 bg-muted rounded"></div>
                    <div className="h-6 bg-muted rounded w-1/4 mt-4"></div>
                    <div className="h-40 bg-muted rounded"></div>
                    <div className="h-6 bg-muted rounded w-1/4 mt-4"></div>
                    <div className="h-40 bg-muted rounded"></div>
                </CardContent>
            </Card>
        </div>
      )}

      {plan && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mt-8 max-w-7xl mx-auto">
            <Card className="shadow-lg">
                <CardHeader>
                    <CardTitle className="font-headline text-2xl">Your Custom Building Plan</CardTitle>
                    <CardDescription>
                    Based on your land dimensions, here is our AI-powered recommendation.
                    </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                    <div className="space-y-4">
                    <div className="flex items-center justify-between rounded-lg bg-secondary p-4">
                        <div>
                        <p className="text-sm text-muted-foreground">Recommended Rooms</p>
                        <p className="text-2xl font-bold">{plan.recommendedNumberOfRooms}</p>
                        </div>
                        <div>
                        <p className="text-sm text-muted-foreground text-right">Estimated Cost</p>
                        <p className="text-2xl font-bold flex items-center justify-end">
                            <DollarSign className="mr-1 h-6 w-6" />
                            {plan.estimatedCost.toLocaleString()}
                        </p>
                        </div>
                    </div>
                    </div>

                    <div>
                    <h3 className="font-headline text-lg font-semibold">Room Details</h3>
                    <div className="mt-2 rounded-md border">
                        <Table>
                        <TableHeader>
                            <TableRow>
                            <TableHead className="font-semibold">Room Type</TableHead>
                            <TableHead className="font-semibold">Recommended Size</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {plan.roomDetails.map((room, index) => (
                            <TableRow key={index}>
                                <TableCell className="font-medium">{room.type}</TableCell>
                                <TableCell>{room.size}</TableCell>
                            </TableRow>
                            ))}
                        </TableBody>
                        </Table>
                    </div>
                    </div>

                    <div>
                    <h3 className="font-headline text-lg font-semibold">Floor Plan Layout</h3>
                    <p className="mt-2 text-muted-foreground leading-relaxed">
                        {plan.floorPlanLayoutDescription}
                    </p>
                    </div>
                    
                    {plan.planImageUri && (
                        <div>
                            <h3 className="font-headline text-lg font-semibold">Floor Plan Visualization</h3>
                            <div className="mt-2 relative aspect-video w-full overflow-hidden rounded-lg border">
                                <Image src={plan.planImageUri} alt="Floor Plan" layout="fill" objectFit="contain" data-ai-hint="floor plan architecture" />
                            </div>
                        </div>
                    )}
                </CardContent>
            </Card>

            <Card className="shadow-lg flex flex-col">
                <CardHeader>
                    <CardTitle className="font-headline text-2xl">Refine Your Plan</CardTitle>
                    <CardDescription>
                        Use the chat below to make changes to your plan.
                    </CardDescription>
                </CardHeader>
                <CardContent className="flex-grow flex flex-col">
                   <ScrollArea className="flex-grow pr-4 -mr-4" ref={chatScrollAreaRef}>
                        <div className="space-y-4">
                            {chatMessages.map((message, index) => (
                                <div key={index} className={cn("flex items-start gap-3", message.role === 'user' ? 'justify-end' : '')}>
                                    {message.role === 'assistant' && (
                                        <Avatar className="h-8 w-8">
                                            <AvatarFallback><Bot size={20}/></AvatarFallback>
                                        </Avatar>
                                    )}
                                    <div className={cn("max-w-xs rounded-lg px-4 py-2 text-sm", message.role === 'user' ? "bg-primary text-primary-foreground" : "bg-muted")}>
                                        <p>{message.content}</p>
                                    </div>
                                    {message.role === 'user' && (
                                        <Avatar className="h-8 w-8">
                                             <AvatarFallback><User size={20}/></AvatarFallback>
                                        </Avatar>
                                    )}
                                </div>
                            ))}
                            {isRefining && (
                                <div className="flex items-start gap-3">
                                     <Avatar className="h-8 w-8">
                                        <AvatarFallback><Bot size={20}/></AvatarFallback>
                                    </Avatar>
                                    <div className="bg-muted rounded-lg px-4 py-3 text-sm flex items-center space-x-2">
                                        <Loader2 className="h-4 w-4 animate-spin"/>
                                        <span>Refining plan...</span>
                                    </div>
                                </div>
                            )}
                        </div>
                   </ScrollArea>
                </CardContent>
                <CardFooter className="pt-4 border-t">
                     <form onSubmit={handleChatSubmit} className="flex w-full items-center space-x-2">
                        <Input
                            id="message"
                            placeholder="e.g., Make the kitchen bigger"
                            className="flex-1"
                            autoComplete="off"
                            value={chatInput}
                            onChange={(e) => setChatInput(e.target.value)}
                            disabled={isRefining}
                        />
                        <Button type="submit" size="icon" disabled={isRefining || !chatInput.trim()}>
                            <Send className="h-4 w-4" />
                            <span className="sr-only">Send</span>
                        </Button>
                    </form>
                </CardFooter>
            </Card>
        </div>
      )}
    </div>
  );
}
