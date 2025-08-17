import Header from '@/components/header';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { MapPin, ShoppingCart, Stethoscope, Utensils } from 'lucide-react';

const shopCategories = [
    { name: 'Groceries', icon: ShoppingCart, color: 'text-green-500' },
    { name: 'Restaurants', icon: Utensils, color: 'text-orange-500' },
    { name: 'Pharmacies', icon: Stethoscope, color: 'text-blue-500' },
]

export default function NearbyShopsPage() {
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
                 <form className="flex flex-col sm:flex-row gap-4">
                    <Input placeholder="Enter your address or zip code" className="flex-grow text-base" />
                    <Button size="lg" className="bg-primary hover:bg-primary/90 text-primary-foreground font-bold">
                        Find Shops
                    </Button>
                </form>

                 <div className="mt-8 text-center text-muted-foreground">
                    <p className="italic">(Nearby shops functionality coming soon)</p>
                </div>

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
