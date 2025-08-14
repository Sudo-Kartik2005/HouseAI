import Header from '@/components/header';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { MapPin } from 'lucide-react';

export default function NearbyShopsPage() {
  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col">
      <Header />
      <main className="flex-grow container mx-auto px-4 py-8 md:px-6 md:py-12">
        <div className="mx-auto max-w-4xl text-center">
          <h2 className="font-headline text-3xl font-bold tracking-tight md:text-4xl">
            Explore Your Neighborhood
          </h2>
          <p className="mt-4 text-lg text-muted-foreground">
            Find essential shops and services near your location.
          </p>
        </div>
        
        <Card className="mt-12 mx-auto max-w-4xl shadow-lg">
            <CardHeader>
                <CardTitle className="flex items-center gap-2 font-headline text-2xl">
                    <MapPin />
                    Find Nearby Shops
                </CardTitle>
            </CardHeader>
            <CardContent>
                 <form className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <Input placeholder="Enter your address or zip code" className="md:col-span-2" />
                    <Button className="bg-primary hover:bg-primary/90 text-primary-foreground">Find Shops</Button>
                </form>
                 <div className="mt-8 text-center text-muted-foreground">
                    <p>(Nearby shops functionality coming soon)</p>
                </div>
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
