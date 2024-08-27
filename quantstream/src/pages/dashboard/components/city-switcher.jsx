// src/components/ui/cities-dropdown.jsx
import React, { useState, useEffect } from 'react';
import { Popover, PopoverTrigger, PopoverContent } from '@/components/ui/popover';
import { Command, CommandInput, CommandList, CommandItem } from '@/components/ui/command';
import { fetchCities } from '@/lib/emnetRestApi';
import { useCity } from '@/context/CityContext';

export function CitySwitcher() {
  const [cities, setCities] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const { selectedCity, setSelectedCity } = useCity();

  // Fetch cities from API
  useEffect(() => {
    fetchCities().then((data) => {
        console.log(data);
        setCities(data);
    });

    return () => {
        setCities([]);
    };
    }, []);
    

  const handleCitySelect = (city) => {
    setSelectedCity(city);
    setIsOpen(false); // Close the dropdown after selecting a city
    console.log('Selected city:', city);
  };

  return (
    <Popover open={isOpen} onOpenChange={setIsOpen}>
      <PopoverTrigger asChild>
        <button
          className="px-4 py-2 bg-white border rounded shadow"
          onClick={() => setIsOpen(!isOpen)}
        >
          {selectedCity ? selectedCity.name : 'Select a City'}
        </button>
      </PopoverTrigger>
      <PopoverContent className="p-0">
        <Command>
          <CommandInput placeholder="Search cities..." />
          <CommandList>
            {cities.length > 0 ? (
              cities.map((city) => (
                <CommandItem
                  key={city.id}
                  onSelect={() => handleCitySelect(city)}
                  className="cursor-pointer"
                >
                  {city.name}
                </CommandItem>
              ))
            ) : (
              <CommandItem>No cities found</CommandItem>
            )}
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
