'use client';

import { useState } from 'react';
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
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
} from '@/components/ui/table';
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { useToast } from "@/hooks/use-toast"
import { Loader2, AlertCircle } from 'lucide-react';
import Image from 'next/image';
import type { GenerateBuildingPlanOutput } from '@/ai/flows/generate-building-plan';
import { generateBuildingPlanAction } from '@/app/actions';

const formSchema = z.object({
  landLength: z.coerce.number().positive({ message: 'Length must be a positive number.' }).min(10, 'Length must be at least 10 feet.'),
  landWidth: z.coerce.number().positive({ message: 'Width must be a positive number.' }).min(10, 'Width must be at least 10 feet.'),
});

export default function BuildingPlanGenerator() {
  const [plan, setPlan] = useState<GenerateBuildingPlanOutput | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      landLength: 100,
      landWidth: 50,
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsLoading(true);
    setPlan(null);

    try {
      const result = await generateBuildingPlanAction(values);
      setPlan(result);
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

  return (
    <div className="mt-12">
      <Card className="mx-auto max-w-3xl shadow-lg">
        <CardHeader>
          <CardTitle className="font-headline text-2xl">Get Started</CardTitle>
          <CardDescription>Enter your land dimensions below.</CardDescription>
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
        <Card className="mx-auto mt-8 max-w-3xl shadow-lg">
          <CardHeader>
            <CardTitle className="font-headline text-2xl">Your Custom Building Plan</CardTitle>
            <CardDescription>
              Based on your land dimensions, here is our AI-powered recommendation.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div>
              <h3 className="font-headline text-lg font-semibold">Summary</h3>
              <p className="text-muted-foreground">Recommended number of rooms: <span className="font-bold text-foreground">{plan.recommendedNumberOfRooms}</span></p>
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
      )}
    </div>
  );
}
