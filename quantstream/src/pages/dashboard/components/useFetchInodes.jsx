import { useState, useEffect } from 'react';
import { fetchInodes } from '@/lib/emnetRestApi';

export const useFetchInodes = (cityId) => {
  const [inodes, setInodes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await fetchInodes(cityId);
        console.log("data", data);
        setInodes(data);
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    if (cityId) {
      fetchData();
    }
  }, [cityId]);

  return { inodes, loading, error };
};