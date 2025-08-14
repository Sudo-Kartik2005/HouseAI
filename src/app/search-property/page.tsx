import Header from '@/components/header';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Search } from 'lucide-react';

export default function SearchPropertyPage() {
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
            <form className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Input placeholder="City or Zip Code" />
              <Input placeholder="Min Price (INR)" type="number" />
              <Input placeholder="Max Price (INR)" type="number" />
              <Button className="md:col-span-3 bg-primary hover:bg-primary/90 text-primary-foreground">Search Properties</Button>
            </form>
            <div className="mt-8 text-center text-muted-foreground">
                <p>(Search functionality coming soon)</p>
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
