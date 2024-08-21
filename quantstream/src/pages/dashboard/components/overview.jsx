import React from 'react';
import { Card, CardHeader, CardContent } from '@/components/ui/card';
import { useFetchInodes } from './useFetchInodes';
import { InodesTable } from './InodesTable';
import { useCity } from '@/context/CityContext';

export function Overview() {
  const { selectedCity } = useCity();
  const { inodes, loading, error } = useFetchInodes(selectedCity?.id);

  if (loading) {
    return <div>Select City...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <div>
      <Card>
        <CardHeader>
          <h2>Inodes</h2>
        </CardHeader>
        <CardContent>
            <div className="table-container">
                <InodesTable data={inodes} />
            </div>
        </CardContent>
      </Card>
      {/* Add more cards for other data as needed */}
    </div>
  );
}