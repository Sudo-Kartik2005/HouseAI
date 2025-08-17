'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import Image from 'next/image';
import Header from '@/components/header';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  CardFooter,
} from '@/components/ui/card';
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
import { Search, Loader2, Bed, Bath, AreaChart, IndianRupee } from 'lucide-react';
import type { SearchPropertyOutput } from '@/ai/flows/search-property';
import { searchPropertyAction } from '../actions';
import { useToast } from '@/hooks/use-toast';
import { Skeleton } from '@/components/ui/skeleton';

const formSchema = z.object({
  location: z.string().min(2, { message: 'Location must be at least 2 characters.' }),
  minPrice: z.coerce.number().optional(),
  maxPrice: z.coerce.number().optional(),
});

export default function SearchPropertyPage() {
  const [isLoading, setIsLoading] = useState(false);
  const [results, setResults] = useState<SearchPropertyOutput | null>(null);
  const { toast } = useToast();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      location: '',
      minPrice: 1000000,
      maxPrice: 5000000,
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsLoading(true);
    setResults(null);

    const input = {
      location: values.location,
      minPrice: values.minPrice || 0,
      maxPrice: values.maxPrice || 100000000, // Default to a high value if not provided
    };

    try {
      const searchResult = await searchPropertyAction(input);
      setResults(searchResult);
    } catch (error) {
      toast({
        variant: 'destructive',
        title: 'Search Failed',
        description: 'Could not fetch property listings. Please try again.',
      });
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col">
      <Header />
      <main className="flex-grow container mx-auto px-4 py-8 md:px-6 md:py-12">
        <div className="mx-auto max-w-4xl text-center">
          <h2 className="font-headline text-3xl font-bold tracking-tight md:text-4xl">
            Find Your Future Home Base
          </h2>
          <p className="mt-4 text-lg text-muted-foreground">
            Discover the perfect plot of land or property to build your dream on.
          </p>
        </div>

        <Card className="mt-12 mx-auto max-w-4xl shadow-lg">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 font-headline text-2xl">
              <Search />
              Advanced Property Search
            </CardTitle>
          </CardHeader>
          <CardContent>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <FormField
                  control={form.control}
                  name="location"
                  render={({ field }) => (
                    <FormItem className="md:col-span-3">
                      <FormLabel>Location</FormLabel>
                      <FormControl>
                        <Input placeholder="City or Zip Code" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                 <FormField
                  control={form.control}
                  name="minPrice"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Min Price (INR)</FormLabel>
                      <FormControl>
                        <Input type="number" placeholder="e.g., 10,00,000" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                 <FormField
                  control={form.control}
                  name="maxPrice"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Max Price (INR)</FormLabel>
                      <FormControl>
                        <Input type="number" placeholder="e.g., 50,00,000" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <Button type="submit" className="md:col-span-3 bg-primary hover:bg-primary/90 text-primary-foreground" disabled={isLoading}>
                  {isLoading ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Searching...
                    </>
                  ) : (
                    'Search Properties'
                  )}
                </Button>
              </form>
            </Form>
          </CardContent>
        </Card>

        <div className="mt-12 mx-auto max-w-7xl">
          {isLoading && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[...Array(3)].map((_, i) => (
                <Card key={i} className="overflow-hidden">
                  <Skeleton className="h-56 w-full" />
                  <CardHeader>
                    <Skeleton className="h-6 w-3/4" />
                    <Skeleton className="h-4 w-1/2 mt-2" />
                  </CardHeader>
                  <CardContent>
                    <div className="flex justify-between">
                       <Skeleton className="h-5 w-1/4" />
                       <Skeleton className="h-5 w-1/4" />
                       <Skeleton className="h-5 w-1/4" />
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
          {results && results.properties.length > 0 && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {results.properties.map((property, index) => (
                <Card key={index} className="overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300">
                  <div className="relative h-56 w-full">
                    <Image src={property.imageUrl} alt={`Image of ${property.address}`} layout="fill" objectFit="cover" data-ai-hint="house exterior" />
                  </div>
                  <CardHeader>
                    <CardTitle className="text-xl">{`₹ ${property.price.toLocaleString('en-IN')}`}</CardTitle>
                    <CardDescription>{property.address}</CardDescription>
                  </CardHeader>
                  <CardContent className="flex justify-between items-center text-muted-foreground">
                      <div className="flex items-center gap-2">
                          <Bed className="h-5 w-5"/>
                          <span>{property.bedrooms} Beds</span>
                      </div>
                      <div className="flex items-center gap-2">
                          <Bath className="h-5 w-5"/>
                          <span>{property.bathrooms} Baths</span>
                      </div>
                      <div className="flex items-center gap-2">
                          <AreaChart className="h-5 w-5"/>
                           <span>{property.area} sqft</span>
                      </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
           {results && results.properties.length === 0 && !isLoading && (
            <div className="mt-8 text-center text-muted-foreground">
              <p>No properties found matching your criteria. Try a different search.</p>
            </div>
          )}
        </div>
      </main>
      <footer className="border-t py-6 mt-12">
        <div className="container mx-auto px-4 text-center text-sm text-muted-foreground md:px-6">
          <p>&copy; {new Date().getFullYear()} HouseAI Blueprint. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}
