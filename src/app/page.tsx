import BuildingPlanGenerator from '@/components/building-plan-generator';
import Header from '@/components/header';

export default function Home() {
  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col">
      <Header />
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
