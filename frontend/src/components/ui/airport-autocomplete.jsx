import React, { useState, useRef, useEffect } from 'react';
import { useAirports } from '../../hooks/useAirports';
import { Plane, Loader2 } from 'lucide-react';

export const AirportAutocomplete = ({ 
  placeholder, 
  icon = <Plane className="w-5 h-5" />,
  onSelect,
  value,
  className = ""
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const { loading, error, filterAirports } = useAirports();
  const dropdownRef = useRef(null);
  const inputRef = useRef(null);

  const suggestions = filterAirports(searchTerm);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  useEffect(() => {
    if (value && typeof value === 'object') {
      const location = formatLocation(value);
      setSearchTerm(`${value.code} - ${location}`);
    }
  }, [value]);

  const handleInputChange = (e) => {
    const value = e.target.value;
    setSearchTerm(value);
    setIsOpen(true);
    if (onSelect) onSelect(null);
  };

  const formatLocation = (airport) => {
    const parts = [airport.city, airport.state].filter(Boolean);
    return parts.join(', ');
  };

  const handleSelectAirport = (airport) => {
    const location = formatLocation(airport);
    setSearchTerm(`${airport.code} - ${location}`);
    setIsOpen(false);
    if (onSelect) onSelect(airport);
  };

  return (
    <div className="relative" ref={dropdownRef}>
      <div className="relative">
        <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">
          {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : icon}
        </div>
        <input
          ref={inputRef}
          type="text"
          value={searchTerm}
          onChange={handleInputChange}
          onFocus={() => setIsOpen(true)}
          placeholder={placeholder}
          className={`w-full p-3 pl-12 bg-gray-100 dark:bg-gray-800 border-0 rounded-lg focus:ring-2 focus:ring-yellow-400 dark:focus:ring-blue-500 ${className}`}
        />
      </div>

      {isOpen && suggestions.length > 0 && (
        <div className="absolute z-50 w-[200%] mt-1 bg-white dark:bg-gray-900 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700 max-h-80 overflow-auto">
          {suggestions.map((airport) => (
            <div
              key={airport.id}
              className="px-6 py-3 hover:bg-gray-100 dark:hover:bg-gray-800 cursor-pointer"
              onClick={() => handleSelectAirport(airport)}
            >
              <div className="flex items-center space-x-4">
                <span className="text-lg font-medium text-gray-900 dark:text-white min-w-[60px]">
                  {airport.code}
                </span>
                <span className="text-base text-gray-600 dark:text-gray-300">
                  {formatLocation(airport)}
                </span>
              </div>
            </div>
          ))}
        </div>
      )}

      {error && (
        <div className="mt-1 text-sm text-red-500">
          Error loading airports: {error}
        </div>
      )}
    </div>
  );
}; 