import { useState, useEffect } from 'react';
import Papa from 'papaparse';

export const useAirports = () => {
  const [airports, setAirports] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Helper function to remove accents from text
  const normalizeText = (text) => {
    return text
      .normalize('NFD') // Normalize to decomposed form
      .replace(/[\u0300-\u036f]/g, '') // Remove combining diacritical marks
      .toLowerCase();
  };

  useEffect(() => {
    const fetchAirports = async () => {
      try {
        const response = await fetch('/files/airports.csv');
        const csvText = await response.text();
        
        Papa.parse(csvText, {
          header: false,
          complete: (results) => {
            const formattedAirports = results.data
              .slice(1) // Skip header row
              .filter(airport => airport[1]) // Filter out entries without code
              .map(airport => ({
                id: airport[0],
                code: airport[1],
                city: airport[3]?.replace(/['"]+/g, '') || '',
                state: airport[4]?.replace(/['"]+/g, '') || '',
                // Store normalized versions for searching
                normalizedCity: normalizeText(airport[3]?.replace(/['"]+/g, '') || ''),
                normalizedState: normalizeText(airport[4]?.replace(/['"]+/g, '') || '')
              }));
            setAirports(formattedAirports);
            setLoading(false);
          },
          error: (error) => {
            setError(error.message);
            setLoading(false);
          }
        });
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchAirports();
  }, []);

  const filterAirports = (searchTerm) => {
    if (!searchTerm) return [];
    
    const normalizedSearch = normalizeText(searchTerm);
    return airports
      .filter(airport => 
        airport.code.toLowerCase().includes(normalizedSearch) ||
        airport.normalizedCity.includes(normalizedSearch) ||
        airport.normalizedState.includes(normalizedSearch)
      )
      .slice(0, 10); // Limit to 10 results
  };

  return { airports, loading, error, filterAirports };
}; 