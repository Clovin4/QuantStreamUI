import { Header } from '@/components/ui/header';
import { Sidebar } from '@/components/ui/sidebar';
import { Card, CardHeader, CardContent } from '@/components/ui/card';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { Overview } from './components/overview';
import { RecentSales } from './components/recent-sales';
import { CityProvider } from '@/context/CityContext';
import { useCity } from '@/context/CityContext';

export default function DashboardPage() {
  const { selectedCity } = useCity();
  return (
    <>
      <Header />
      <div className="flex-1 space-y-4 p-8">
        <div className="flex items-center justify-between space-y-2">
          <h2 className="text-3xl font-bold">
            Dashboard <span className="text-sm font-normal text-muted-foreground">
            {selectedCity ? `${selectedCity.name} - ${selectedCity.id}` : ''}
            </span>
          </h2>
          <div className="flex items-center space-x-2">
            {/* Calendar and Download button */}
          </div>
        </div>

        <Tabs defaultValue="overview">
          <TabsList>
            <TabsTrigger value="overview">Inode Data</TabsTrigger>
            <TabsTrigger value="analytics" disabled>
              Analytics
            </TabsTrigger>
            <TabsTrigger value="reports" disabled>
              Reports
            </TabsTrigger>
            <TabsTrigger value="notifications" disabled>
              Notifications
            </TabsTrigger>
          </TabsList>
          <TabsContent value="overview">
            <Overview />
          </TabsContent>
        </Tabs>
      </div>
    </>
  );
}
