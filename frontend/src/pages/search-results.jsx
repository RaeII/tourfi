import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Button } from '../components/ui/button';
import { 
  Plane, 
  Clock, 
  MapPin, 
  Users, 
  Wifi, 
  Monitor, 
  Utensils, 
  Zap,
  ArrowRight,
  Bitcoin,
  Sparkles,
  Luggage,
  ChevronDown,
  ChevronUp
} from 'lucide-react';
import { getFlightResults } from '../data/mock-flights';

const SearchResults = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [flights, setFlights] = useState([]);
  const [loading, setLoading] = useState(true);
  const [expandedFlights, setExpandedFlights] = useState(new Set());
  
  // Get search parameters from location state
  const searchParams = location.state || {};
  const { 
    origin, 
    destination, 
    departureDate, 
    returnDate, 
    passengers, 
    selectedClass 
  } = searchParams;

  useEffect(() => {
    // Simulate loading delay
    setTimeout(() => {
      const results = getFlightResults(origin, destination, departureDate, returnDate, passengers, selectedClass);
      setFlights(results);
      setLoading(false);
    }, 1500);
  }, [origin, destination, departureDate, returnDate, passengers, selectedClass]);

  const handleSelectFlight = (flight, classType) => {
    const selectedFlightData = {
      ...flight,
      selectedClass: classType,
      selectedPrice: flight.prices[classType],
      searchParams
    };
    
    // Navigate to booking page
    navigate('/booking', { 
      state: { 
        flight: selectedFlightData,
        searchParams 
      } 
    });
  };

  const getAmenityIcon = (amenity) => {
    switch (amenity.toLowerCase()) {
      case 'wifi': return <Wifi className="w-4 h-4" />;
      case 'entertainment': return <Monitor className="w-4 h-4" />;
      case 'meals': 
      case 'premium meals': return <Utensils className="w-4 h-4" />;
      case 'power outlets': return <Zap className="w-4 h-4" />;
      default: return <Sparkles className="w-4 h-4" />;
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      weekday: 'short', 
      month: 'short', 
      day: 'numeric' 
    });
  };

  const toggleFlightExpanded = (flightId) => {
    setExpandedFlights(prev => {
      const newSet = new Set(prev);
      if (newSet.has(flightId)) {
        newSet.delete(flightId);
      } else {
        newSet.add(flightId);
      }
      return newSet;
    });
  };

  const getMinPrice = (prices) => {
    return Math.min(...Object.values(prices).map(p => p.price));
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-yellow-500 dark:border-blue-500 mx-auto mb-4"></div>
          <p className="text-gray-600 dark:text-gray-400">Searching for the best flights...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-8">
      <div className="container mx-auto px-4">
        {/* Search Summary */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6 mb-6">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between">
            <div className="flex items-center space-x-4 mb-4 md:mb-0">
              <div className="flex items-center space-x-2">
                <MapPin className="w-5 h-5 text-gray-500" />
                <span className="font-medium text-gray-900 dark:text-white">
                  {origin?.city || 'Origin'} → {destination?.city || 'Destination'}
                </span>
              </div>
              <div className="flex items-center space-x-2">
                <Users className="w-5 h-5 text-gray-500" />
                <span className="text-gray-600 dark:text-gray-400">
                  {passengers?.adults + passengers?.children + passengers?.infants || 2} passengers
                </span>
              </div>
            </div>
            <div className="text-sm text-gray-500 dark:text-gray-400">
              {formatDate(departureDate)} • {selectedClass?.replace('_', ' ') || 'Business'} class
            </div>
          </div>
        </div>

        {/* Results Header */}
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
            {flights.length} flights found
          </h1>
          <div className="flex items-center space-x-2 text-sm text-yellow-600 dark:text-blue-400">
            <Bitcoin className="w-4 h-4" />
            <span>Pay with crypto for 5% cashback</span>
          </div>
        </div>

        {/* Flight Results */}
        <div className="space-y-4">
          {flights.map((flight) => {
            const isExpanded = expandedFlights.has(flight.id);
            const minPrice = getMinPrice(flight.prices);
            
            return (
            <div key={flight.id} className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden">
              {/* Flight Header */}
              <div 
                className="p-6 border-b border-gray-200 dark:border-gray-700 cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-750"
                onClick={() => toggleFlightExpanded(flight.id)}
              >
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-gray-100 dark:bg-gray-700 rounded-full flex items-center justify-center">
                      <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                        {flight.airlineCode}
                      </span>
                    </div>
                    <div>
                      <div className="font-medium text-gray-900 dark:text-white">
                        {flight.airline}
                      </div>
                      <div className="text-sm text-gray-500 dark:text-gray-400">
                        {flight.flightNumber} • {flight.aircraft}
                      </div>
                    </div>
                  </div>
                  <div className="text-right flex items-center space-x-4">
                    <div>
                      <div className="text-sm text-gray-500 dark:text-gray-400 mb-1">
                        A partir de ${minPrice} por pax
                      </div>
                    </div>
                    {isExpanded ? (
                      <ChevronUp className="w-5 h-5 text-gray-400" />
                    ) : (
                      <ChevronDown className="w-5 h-5 text-gray-400" />
                    )}
                  </div>
                </div>

                {/* Flight Route */}
                <div className="flex items-center justify-between">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-gray-900 dark:text-white">
                      {flight.departure.time}
                    </div>
                    <div className="text-sm text-gray-500 dark:text-gray-400">
                      {flight.origin.code}
                    </div>
                    <div className="text-xs text-gray-400 dark:text-gray-500">
                      {flight.departure.terminal}
                    </div>
                  </div>
                  
                  <div className="flex-1 mx-8">
                    <div className="flex items-center justify-center">
                      <div className="flex-1 border-t border-gray-300 dark:border-gray-600"></div>
                      <div className="mx-4 text-center">
                        <Plane className="w-5 h-5 text-gray-400 mx-auto mb-1" />
                        <div className="text-xs text-gray-500 dark:text-gray-400">
                          {flight.duration}
                        </div>
                      </div>
                      <div className="flex-1 border-t border-gray-300 dark:border-gray-600"></div>
                    </div>
                  </div>
                  
                  <div className="text-center">
                    <div className="text-2xl font-bold text-gray-900 dark:text-white">
                      {flight.arrival.time}
                    </div>
                    <div className="text-sm text-gray-500 dark:text-gray-400">
                      {flight.destination.code}
                    </div>
                    <div className="text-xs text-gray-400 dark:text-gray-500">
                      {flight.arrival.terminal}
                    </div>
                  </div>
                </div>

                {/* Stopover Info */}
                {flight.stopover && (
                  <div className="mt-4 p-3 bg-yellow-50 dark:bg-yellow-900/20 rounded-lg">
                    <div className="text-sm text-yellow-800 dark:text-yellow-200">
                      <Clock className="w-4 h-4 inline mr-1" />
                      Stopover in {flight.stopover.city} ({flight.stopover.airport}) - {flight.stopover.duration}
                    </div>
                  </div>
                )}

                {/* Amenities */}
                <div className="mt-4 flex flex-wrap gap-2">
                  {flight.amenities.map((amenity, index) => (
                    <div key={index} className="flex items-center space-x-1 text-xs text-gray-600 dark:text-gray-400 bg-gray-100 dark:bg-gray-700 px-2 py-1 rounded">
                      {getAmenityIcon(amenity)}
                      <span>{amenity}</span>
                    </div>
                  ))}
                  <div className="flex items-center space-x-1 text-xs text-gray-600 dark:text-gray-400 bg-gray-100 dark:bg-gray-700 px-2 py-1 rounded">
                    <Luggage className="w-4 h-4" />
                    <span>{flight.baggage.carry_on} carry-on, {flight.baggage.checked} checked</span>
                  </div>
                </div>
              </div>

              {/* Price Options - Now conditionally rendered */}
              {isExpanded && (
                <div className="p-6 bg-gray-50 dark:bg-gray-750">
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                    {Object.entries(flight.prices).map(([classType, priceInfo]) => (
                      <div key={classType} className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-600 rounded-lg p-4 hover:border-yellow-400 dark:hover:border-blue-500 transition-colors">
                        <div className="text-center">
                          <div className="text-sm font-medium text-gray-900 dark:text-white mb-2">
                            {classType.split('_').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')}
                          </div>
                          <div className="text-2xl font-bold text-gray-900 dark:text-white mb-1">
                            ${priceInfo.price}
                          </div>
                          <div className="text-sm text-gray-500 dark:text-gray-400 mb-2">
                            {priceInfo.cryptoPrice} {priceInfo.cryptoCurrency}
                          </div>
                          <div className="text-xs text-green-600 dark:text-green-400 mb-3">
                            <Sparkles className="w-3 h-3 inline mr-1" />
                            ${priceInfo.cashback} cashback
                          </div>
                          <Button 
                            onClick={() => handleSelectFlight(flight, classType)}
                            className="w-full bg-gradient-to-r from-yellow-400 to-yellow-600 hover:from-yellow-500 hover:to-yellow-700 dark:from-blue-500 dark:to-blue-700 dark:hover:from-blue-600 dark:hover:to-blue-800 text-white"
                          >
                            Select
                            <ArrowRight className="w-4 h-4 ml-2" />
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )})}
        </div>
      </div>
    </div>
  );
};

export default SearchResults; 