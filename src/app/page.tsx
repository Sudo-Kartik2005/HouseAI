import BuildingPlanGenerator from '@/components/building-plan-generator';
import { Building2 } from 'lucide-react';

export default function Home() {
  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col">
      <header className="sticky top-0 z-10 w-full border-b bg-background/80 backdrop-blur-sm">
        <div className="container mx-auto flex h-16 items-center justify-between px-4 md:px-6">
          <div className="flex items-center gap-2">
            <Building2 className="h-8 w-8 text-primary" />
            <h1 className="font-headline text-2xl font-bold text-primary">
              HouseAI Blueprint
            </h1>
          </div>
        </div>
      </header>
      <main className="flex-grow container mx-auto px-4 py-8 md:px-6 md:py-12">
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="font-headline text-3xl font-bold tracking-tight md:text-4xl">
            Design Your Dream Home with AI
          </h2>

          <p className="mt-4 text-lg text-muted-foreground">
            Provide your land's dimensions, and our AI will generate a
            customized building plan, complete with room layouts and size
            recommendations.
          </p>
        </div>

        <BuildingPlanGenerator />
      </main>
      <footer className="border-t py-6">
        <div className="container mx-auto px-4 text-center text-sm text-muted-foreground md:px-6">
          <p>&copy; {new Date().getFullYear()} HouseAI Blueprint. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}
