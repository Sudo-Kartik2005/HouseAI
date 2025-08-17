'use client';

import { useState } from 'react';
import Header from '@/components/header';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { MapPin, ShoppingCart, Stethoscope, Utensils, Loader2, Building, Soup, Shell, LocateFixed } from 'lucide-react';
import type { FindNearbyShopsOutput } from '@/ai/flows/find-nearby-shops';
import { findNearbyShopsAction } from '../actions';
import { useToast } from '@/hooks/use-toast';

const shopCategories = [
    { name: 'Groceries', icon: ShoppingCart, color: 'text-green-500' },
    { name: 'Restaurants', icon: Utensils, color: 'text-orange-500' },
    { name: 'Pharmacies', icon: Stethoscope, color: 'text-blue-500' },
]

const categoryIcons: { [key: string]: React.ElementType } = {
    Grocery: ShoppingCart,
    Restaurant: Soup,
    Pharmacy: Stethoscope,
    Cafe: Shell,
    default: Building,
};


export default function NearbyShopsPage() {
    const [address, setAddress] = useState('');
    const [shops, setShops] = useState<FindNearbyShopsOutput['shops'] | null>(null);
    const [isLoading, setIsLoading] = useState(false);
    const [isLocating, setIsLocating] = useState(false);
    const { toast } = useToast();

    const handleSearch = async (searchAddress: string) => {
        setIsLoading(true);
        setShops(null);

        try {
            const result = await findNearbyShopsAction({ address: searchAddress });
            setShops(result.shops);
        } catch (error) {
            console.error(error);
            toast({
                variant: 'destructive',
                title: 'Error finding shops',
                description: 'Could not fetch nearby shops. Please try again later.',
            });
        } finally {
            setIsLoading(false);
        }
    };
    
    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!address.trim()) {
            toast({
                variant: 'destructive',
                title: 'Address is required',
                description: 'Please enter an address to find nearby shops.',
            });
            return;
        }
        handleSearch(address);
    }

    const handleUseMyLocation = () => {
        setIsLocating(true);
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    const { latitude, longitude } = position.coords;
                    const locationString = `Latitude: ${latitude}, Longitude: ${longitude}`;
                    setAddress(locationString);
                    setIsLocating(false);
                    handleSearch(locationString);
                },
                (error) => {
                    console.error("Geolocation error:", error);
                    toast({
                        variant: 'destructive',
                        title: 'Location Error',
                        description: 'Could not get your location. Please ensure location services are enabled or enter an address manually.',
                    });
                    setIsLocating(false);
                }
            );
        } else {
            toast({
                variant: 'destructive',
                title: 'Location Not Supported',
                description: 'Your browser does not support geolocation.',
            });
            setIsLocating(false);
        }
    };


  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col">
      <Header />
      <main className="flex-grow container mx-auto px-4 py-8 md:px-6 md:py-12">
        <div className="mx-auto max-w-4xl text-center">
          <h2 className="font-headline text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl">
            Explore Your Neighborhood
          </h2>
          <p className="mt-4 text-lg text-muted-foreground md:text-xl">
            Find essential shops and services near your location.
          </p>
        </div>
        
        <Card className="mt-8 md:mt-12 mx-auto max-w-4xl shadow-lg border-2 border-primary/10">
            <CardHeader>
                <CardTitle className="flex items-center gap-3 font-headline text-2xl sm:text-3xl">
                    <MapPin className="text-primary h-8 w-8" />
                    Find Nearby Shops
                </CardTitle>
            </CardHeader>
            <CardContent>
                 <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-4">
                    <div className="flex-grow relative">
                        <Input 
                            placeholder="Enter your address or zip code" 
                            className="text-base pr-12"
                            value={address}
                            onChange={(e) => setAddress(e.target.value)}
                            disabled={isLoading || isLocating}
                        />
                        <Button 
                            type="button" 
                            variant="ghost" 
                            size="icon"
                            className="absolute right-1 top-1/2 -translate-y-1/2 h-8 w-8 text-muted-foreground hover:text-primary"
                            onClick={handleUseMyLocation}
                            disabled={isLoading || isLocating}
                            aria-label="Use my location"
                        >
                            {isLocating ? <Loader2 className="h-5 w-5 animate-spin" /> : <LocateFixed className="h-5 w-5" />}
                        </Button>
                    </div>
                    <Button type="submit" size="lg" className="bg-primary hover:bg-primary/90 text-primary-foreground font-bold" disabled={isLoading || isLocating}>
                        {isLoading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : 'Find Shops'}
                    </Button>
                </form>

                 {isLoading && (
                    <div className="mt-8 space-y-4">
                        {[...Array(3)].map((_, i) => (
                             <div key={i} className="p-4 border rounded-lg animate-pulse flex items-center gap-4">
                                <div className="h-10 w-10 bg-muted rounded-full"></div>
                                <div className="flex-grow space-y-2">
                                    <div className="h-4 bg-muted rounded w-3/4"></div>
                                    <div className="h-4 bg-muted rounded w-1/2"></div>
                                </div>
                            </div>
                        ))}
                    </div>
                 )}

                {shops && shops.length > 0 && (
                    <div className="mt-8 pt-6 border-t">
                        <h3 className="font-headline text-xl font-semibold mb-4">Shops Near You</h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            {shops.map((shop, index) => {
                                const Icon = categoryIcons[shop.category] || categoryIcons.default;
                                return (
                                    <Card key={index} className="flex items-center p-4 gap-4">
                                        <div className="p-3 bg-accent/20 rounded-full">
                                            <Icon className="h-6 w-6 text-primary" />
                                        </div>
                                        <div>
                                            <p className="font-bold">{shop.name}</p>
                                            <p className="text-sm text-muted-foreground">{shop.category}</p>
                                            <p className="text-sm">{shop.address}</p>
                                        </div>
                                    </Card>
                                )
                            })}
                        </div>
                    </div>
                )}
                
                {shops && shops.length === 0 && !isLoading &&(
                    <div className="mt-8 text-center text-muted-foreground">
                        <p>No shops found for this address. Try a different location.</p>
                    </div>
                )}


                {!shops && !isLoading && (
                  <div className="mt-8 pt-6 border-t">
                      <h3 className="text-center font-headline text-xl font-semibold">Or browse by category</h3>
                      <div className="mt-6 grid grid-cols-1 sm:grid-cols-3 gap-4">
                          {shopCategories.map((category) => (
                              <Button key={category.name} variant="outline" className={`h-24 flex flex-col gap-2 items-center justify-center text-lg font-medium hover:bg-accent/50 ${category.color}`}>
                                  <category.icon className="h-8 w-8" />
                                  <span>{category.name}</span>
                              </Button>
                          ))}
                      </div>
                  </div>
                )}
            </CardContent>
        </Card>

      </main>
      <footer className="border-t py-6">
        <div className="container mx-auto px-4 text-center text-sm text-muted-foreground md:px-6">
          <p>&copy; {new Date().getFullYear()} HouseAI Blueprint. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}
