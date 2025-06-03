import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from './ui/button';
import { Globe, Users, Plane, MapPin, Sparkles, Calendar, Bed, X, ChevronLeft, ChevronRight, ArrowDownUp } from 'lucide-react';
import { AirportAutocomplete } from './ui/airport-autocomplete';

const SearchSection = () => {
  const navigate = useNavigate();
  const [searchType, setSearchType] = useState('flight');
  const [showPassengerModal, setShowPassengerModal] = useState(false);
  const [showCalendar, setShowCalendar] = useState(false);
  const [activeDateField, setActiveDateField] = useState(null);
  const calendarRef = useRef(null);
  const passengerModalRef = useRef(null);

  // Add passenger state
  const [passengers, setPassengers] = useState({
    adults: 1,
    children: 1,
    infants: 0
  });

  // Add class state
  const [selectedClass, setSelectedClass] = useState('business');

  const [selectedDates, setSelectedDates] = useState({
    departure: { day: 25, month: 5, year: 2025, dayName: 'Sunday' },
    return: { day: 26, month: 5, year: 2025, dayName: 'Monday' },
    checkin: { day: 27, month: 5, year: 2025, dayName: 'Tuesday' },
    checkout: { day: 28, month: 5, year: 2025, dayName: 'Wednesday' }
  });

  const [currentMonth, setCurrentMonth] = useState(() => {
    return { month: 5, year: 2025 };
  });

  const [selectedOrigin, setSelectedOrigin] = useState(null);
  const [selectedDestination, setSelectedDestination] = useState(null);

  // Click outside handlers
  useEffect(() => {
    function handleClickOutside(event) {
      if (calendarRef.current && !calendarRef.current.contains(event.target)) {
        setShowCalendar(false);
      }
      if (passengerModalRef.current && !passengerModalRef.current.contains(event.target)) {
        setShowPassengerModal(false);
      }
    }
    
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [calendarRef, passengerModalRef]);

  const handleSearchTypeChange = (type) => {
    setSearchType(type);
  };

  const openCalendar = (field) => {
    setActiveDateField(field);
    setShowCalendar(true);
  };

  const formatDateDisplay = (dateObj) => {
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    return `${dateObj.day} ${months[dateObj.month - 1]} ${dateObj.year}`;
  };

  // Calendar functions
  const changeMonth = (direction) => {
    setCurrentMonth(prev => {
      let newMonth = prev.month + direction;
      let newYear = prev.year;
      
      if (newMonth > 12) {
        newMonth = 1;
        newYear += 1;
      } else if (newMonth < 1) {
        newMonth = 12;
        newYear -= 1;
      }
      
      return { month: newMonth, year: newYear };
    });
  };

  const getDaysInMonth = (month, year) => {
    return new Date(year, month, 0).getDate();
  };

  const getDayName = (day, month, year) => {
    const date = new Date(year, month - 1, day);
    return date.toLocaleDateString('en-US', { weekday: 'long' });
  };

  const selectDate = (day) => {
    const dayName = getDayName(day, currentMonth.month, currentMonth.year);
    const newDate = {
      day,
      month: currentMonth.month,
      year: currentMonth.year,
      dayName
    };
    
    setSelectedDates(prev => ({
      ...prev,
      [activeDateField]: newDate
    }));
    
    if (activeDateField === 'departure') {
      setActiveDateField('return');
    } else if (activeDateField === 'checkin') {
      setActiveDateField('checkout');
    } else {
      setShowCalendar(false);
    }
  };

  const renderCalendar = () => {
    const daysInMonth = getDaysInMonth(currentMonth.month, currentMonth.year);
    const firstDayOfMonth = new Date(currentMonth.year, currentMonth.month - 1, 1).getDay();
    const monthName = new Date(currentMonth.year, currentMonth.month - 1, 1).toLocaleDateString('en-US', { month: 'long' });
    
    const days = [];
    const dayNames = ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'];
    
    // Add empty cells for days before the first day of the month
    for (let i = 0; i < firstDayOfMonth; i++) {
      days.push(<div key={`empty-${i}`} className="h-8 w-8"></div>);
    }
    
    // Add days of the month
    for (let day = 1; day <= daysInMonth; day++) {
      const isSelected = 
        (activeDateField === 'departure' || activeDateField === 'return') && 
        selectedDates[activeDateField].day === day && 
        selectedDates[activeDateField].month === currentMonth.month && 
        selectedDates[activeDateField].year === currentMonth.year;
      
      days.push(
        <div 
          key={`day-${day}`} 
          className={`h-8 w-8 rounded-full flex items-center justify-center cursor-pointer text-sm
            ${isSelected 
              ? 'bg-yellow-400 dark:bg-blue-600 text-white font-medium' 
              : 'hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-700 dark:text-gray-300'}`}
          onClick={() => selectDate(day)}
        >
          {day}
        </div>
      );
    }
    
    return (
      <div 
        ref={calendarRef}
        className="absolute top-full left-0 mt-2 bg-white dark:bg-gray-900 rounded-xl shadow-xl border border-gray-200 dark:border-gray-800 p-4 z-20 w-64"
      >
        {/* Calendar content */}
        <div className="flex justify-between items-center mb-4">
          <div className="font-medium text-gray-900 dark:text-white">
            {monthName} {currentMonth.year}
          </div>
          <div className="flex space-x-1">
            <button 
              onClick={() => changeMonth(-1)}
              className="p-1 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800"
            >
              <ChevronLeft size={16} className="text-gray-600 dark:text-gray-400" />
            </button>
            <button 
              onClick={() => changeMonth(1)}
              className="p-1 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800"
            >
              <ChevronRight size={16} className="text-gray-600 dark:text-gray-400" />
            </button>
          </div>
        </div>
        
        <div className="grid grid-cols-7 gap-1 mb-2">
          {dayNames.map(day => (
            <div key={day} className="h-8 w-8 flex items-center justify-center text-xs text-gray-500 dark:text-gray-400 font-medium">
              {day}
            </div>
          ))}
        </div>
        
        <div className="grid grid-cols-7 gap-1">
          {days}
        </div>
      </div>
    );
  };

  // Add passenger management functions
  const updatePassengerCount = (type, increment) => {
    setPassengers(prev => {
      const newCount = prev[type] + (increment ? 1 : -1);
      
      // Apply limits based on passenger type
      if (type === 'adults') {
        if (newCount < 1) return prev; // Minimum 1 adult
        if (newCount > 9) return prev; // Maximum 9 adults
      } else if (type === 'children') {
        if (newCount < 0) return prev; // Minimum 0 children
        if (newCount > 8) return prev; // Maximum 8 children
      } else if (type === 'infants') {
        if (newCount < 0) return prev; // Minimum 0 infants
        if (newCount > passengers.adults) return prev; // Maximum 1 infant per adult
      }
      
      return {
        ...prev,
        [type]: newCount
      };
    });
  };

  // Add total passenger count calculation
  const getTotalPassengers = () => {
    return passengers.adults + passengers.children + passengers.infants;
  };

  // Update the passenger display text
  const getPassengerDisplayText = () => {
    const total = getTotalPassengers();
    return `${total} ${total === 1 ? 'Passenger' : 'Passengers'}`;
  };

  // Handle search functionality
  const handleSearch = () => {
    if (searchType === 'flight') {
      // Validate required fields
      if (!selectedOrigin || !selectedDestination) {
        alert('Please select both origin and destination airports');
        return;
      }

      // Format dates for search
      const formatDateForSearch = (dateObj) => {
        return `${dateObj.year}-${String(dateObj.month).padStart(2, '0')}-${String(dateObj.day).padStart(2, '0')}`;
      };

      const searchParams = {
        origin: selectedOrigin,
        destination: selectedDestination,
        departureDate: formatDateForSearch(selectedDates.departure),
        returnDate: formatDateForSearch(selectedDates.return),
        passengers,
        selectedClass,
        searchType
      };

      // Navigate to search results page
      navigate('/search-results', { state: searchParams });
    } else {
      // Handle hotel search (placeholder for now)
      alert('Hotel search functionality coming soon!');
    }
  };

  return (
    <section className="py-16 bg-background relative z-10">
      <div className="container mx-auto px-4">
        <div className="text-center mb-8">
          <h2 className="text-3xl md:text-4xl font-bold mb-3 text-gray-900 dark:text-white">
            Find Your <span className="bg-clip-text text-transparent bg-gradient-to-r from-yellow-400 to-yellow-600 dark:from-blue-400 dark:to-blue-600">Perfect Trip</span>
          </h2>
          <p className="text-lg text-gray-700 dark:text-gray-300 max-w-2xl mx-auto">
            Search flights and hotels with <strong>zero fees</strong> and <strong>crypto cashback</strong> on every booking.
          </p>
        </div>
        
        <div className="max-w-6xl mx-auto bg-white dark:bg-gray-900/80 rounded-2xl shadow-xl border border-yellow-400/10 dark:border-blue-400/10">
          <div className="p-1">
            {/* Tabs */}
            <div className="flex">
              <button 
                className={`flex-1 py-3 px-4 font-medium rounded-tl-xl rounded-tr-xl flex items-center justify-center transition-colors ${
                  searchType === 'flight' 
                    ? 'bg-yellow-400 dark:bg-blue-600 text-black dark:text-white' 
                    : 'bg-white/80 dark:bg-gray-800/80 text-gray-700 dark:text-gray-300'
                }`}
                onClick={() => handleSearchTypeChange('flight')}
              >
                <Plane className="w-4 h-4 mr-2" />
                Flights
              </button>
              <button 
                className={`flex-1 py-3 px-4 font-medium rounded-tl-xl rounded-tr-xl flex items-center justify-center transition-colors ${
                  searchType === 'hotel' 
                    ? 'bg-yellow-400 dark:bg-blue-600 text-black dark:text-white' 
                    : 'bg-white/80 dark:bg-gray-800/80 text-gray-700 dark:text-gray-300'
                }`}
                onClick={() => handleSearchTypeChange('hotel')}
              >
                <Bed className="w-4 h-4 mr-2" />
                Hotels
              </button>
            </div>
            
            {/* Search Form */}
            <div className="p-6">
              {searchType === 'flight' ? (
                <>
                  {/* Flight Type Selection */}
                  <div className="mb-4 flex space-x-4">
                    <label className="inline-flex items-center">
                      <input 
                        type="radio" 
                        name="tripType" 
                        value="roundTrip" 
                        defaultChecked 
                        className="form-radio text-yellow-500 dark:text-blue-500 focus:ring-yellow-400 dark:focus:ring-blue-500"
                      />
                      <span className="ml-2 text-sm text-gray-700 dark:text-gray-300">Round trip</span>
                    </label>
                    <label className="inline-flex items-center">
                      <input 
                        type="radio" 
                        name="tripType" 
                        value="oneWay" 
                        className="form-radio text-yellow-500 dark:text-blue-500 focus:ring-yellow-400 dark:focus:ring-blue-500"
                      />
                      <span className="ml-2 text-sm text-gray-700 dark:text-gray-300">One way</span>
                    </label>
                  </div>

                  {/* Main Search Row */}
                  <div className="flex flex-col lg:flex-row lg:items-center lg:space-x-2">
                    {/* From */}
                    <div className="flex-1 mb-4 lg:mb-0">
                      <AirportAutocomplete
                        placeholder="Flying from"
                        icon={<Plane className="w-5 h-5 transform -rotate-45" />}
                        onSelect={setSelectedOrigin}
                        value={selectedOrigin}
                      />
                    </div>

                    {/* Swap Icon */}
                    <div className="hidden lg:flex items-center justify-center mb-4 lg:mb-0 p-2">
                      <ArrowDownUp className="w-5 h-5 text-gray-500 dark:text-gray-400 transform rotate-90" />
                    </div>

                    {/* To */}
                    <div className="flex-1 mb-4 lg:mb-0">
                      <AirportAutocomplete
                        placeholder="Flying to"
                        icon={<MapPin className="w-5 h-5" />}
                        onSelect={setSelectedDestination}
                        value={selectedDestination}
                      />
                    </div>

                    {/* Departure Date */}
                    <div className="flex-1 mb-4 lg:mb-0">
                      <div className="relative">
                        <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">
                          <Calendar className="w-5 h-5" />
                        </div>
                        <div 
                          className="w-full p-3 pl-12 bg-gray-100 dark:bg-gray-800 border-0 rounded-lg cursor-pointer flex flex-col"
                          onClick={() => openCalendar('departure')}
                        >
                          <span className="text-sm text-gray-700 dark:text-gray-300 font-medium">
                            {formatDateDisplay(selectedDates.departure)}
                          </span>
                          <span className="text-xs text-gray-500 dark:text-gray-400">
                            {selectedDates.departure.dayName}
                          </span>
                        </div>
                        
                        {showCalendar && activeDateField === 'departure' && renderCalendar()}
                      </div>
                    </div>

                    {/* Return Date */}
                    <div className="flex-1 mb-4 lg:mb-0">
                      <div className="relative">
                        <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">
                          <Calendar className="w-5 h-5" />
                        </div>
                        <div 
                          className="w-full p-3 pl-12 bg-gray-100 dark:bg-gray-800 border-0 rounded-lg cursor-pointer flex flex-col"
                          onClick={() => openCalendar('return')}
                        >
                          <span className="text-sm text-gray-700 dark:text-gray-300 font-medium">
                            {formatDateDisplay(selectedDates.return)}
                          </span>
                          <span className="text-xs text-gray-500 dark:text-gray-400">
                            {selectedDates.return.dayName}
                          </span>
                        </div>
                        
                        {showCalendar && activeDateField === 'return' && renderCalendar()}
                      </div>
                    </div>

                    {/* Passengers */}
                    <div className="flex-1 mb-4 lg:mb-0">
                      <div className="relative">
                        <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">
                          <Users className="w-5 h-5" />
                        </div>
                        <div 
                          className="w-full p-3 pl-12 bg-gray-100 dark:bg-gray-800 border-0 rounded-lg cursor-pointer flex flex-col"
                          onClick={() => setShowPassengerModal(true)}
                        >
                          <span className="text-sm text-gray-700 dark:text-gray-300 font-medium">{getPassengerDisplayText()}</span>
                          <span className="text-xs text-gray-500 dark:text-gray-400">
                            {selectedClass.split('_').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')}
                          </span>
                        </div>

                        {/* Passenger Modal */}
                        <div 
                          ref={passengerModalRef}
                          className={`${showPassengerModal ? '' : 'hidden'} mt-2 p-4 absolute z-20 bg-white dark:bg-gray-900 rounded-xl shadow-xl border border-gray-200 dark:border-gray-800 right-0 max-w-xs w-full`}
                          style={{ minWidth: '300px' }}
                        >
                          <button
                            className="absolute top-2 right-2 text-gray-400 hover:text-gray-700 dark:hover:text-white"
                            onClick={() => setShowPassengerModal(false)}
                            aria-label="Close"
                          >
                            <X className="w-5 h-5" />
                          </button>
                          <h4 className="font-medium text-lg mb-4 text-gray-900 dark:text-white">Passengers</h4>
                          
                          {/* Adult Row */}
                          <div className="flex items-center justify-between mb-3">
                            <div>
                              <div className="font-medium text-gray-900 dark:text-white">{passengers.adults} Adult{passengers.adults !== 1 ? 's' : ''}</div>
                              <div className="text-xs text-gray-500 dark:text-gray-400">(age: 12+)</div>
                            </div>
                            <div className="flex items-center">
                              <button 
                                className="w-8 h-8 rounded-full bg-gray-100 dark:bg-gray-800 flex items-center justify-center text-gray-700 dark:text-gray-300 disabled:opacity-50"
                                onClick={() => updatePassengerCount('adults', false)}
                                disabled={passengers.adults <= 1}
                              >
                                <span>-</span>
                              </button>
                              <span className="mx-3 text-gray-700 dark:text-gray-300">{passengers.adults}</span>
                              <button 
                                className="w-8 h-8 rounded-full bg-gray-100 dark:bg-gray-800 flex items-center justify-center text-gray-700 dark:text-gray-300 disabled:opacity-50"
                                onClick={() => updatePassengerCount('adults', true)}
                                disabled={passengers.adults >= 9}
                              >
                                <span>+</span>
                              </button>
                            </div>
                          </div>
                          
                          {/* Child Row */}
                          <div className="flex items-center justify-between mb-3">
                            <div>
                              <div className="font-medium text-gray-900 dark:text-white">{passengers.children} Child{passengers.children !== 1 ? 'ren' : ''}</div>
                              <div className="text-xs text-gray-500 dark:text-gray-400">(age: 2-11)</div>
                            </div>
                            <div className="flex items-center">
                              <button 
                                className="w-8 h-8 rounded-full bg-gray-100 dark:bg-gray-800 flex items-center justify-center text-gray-700 dark:text-gray-300 disabled:opacity-50"
                                onClick={() => updatePassengerCount('children', false)}
                                disabled={passengers.children <= 0}
                              >
                                <span>-</span>
                              </button>
                              <span className="mx-3 text-gray-700 dark:text-gray-300">{passengers.children}</span>
                              <button 
                                className="w-8 h-8 rounded-full bg-gray-100 dark:bg-gray-800 flex items-center justify-center text-gray-700 dark:text-gray-300 disabled:opacity-50"
                                onClick={() => updatePassengerCount('children', true)}
                                disabled={passengers.children >= 8}
                              >
                                <span>+</span>
                              </button>
                            </div>
                          </div>
                          
                          {/* Infant Row */}
                          <div className="flex items-center justify-between mb-6">
                            <div>
                              <div className="font-medium text-gray-900 dark:text-white">{passengers.infants} Infant{passengers.infants !== 1 ? 's' : ''}</div>
                              <div className="text-xs text-gray-500 dark:text-gray-400">(age: 0-1)</div>
                            </div>
                            <div className="flex items-center">
                              <button 
                                className="w-8 h-8 rounded-full bg-gray-100 dark:bg-gray-800 flex items-center justify-center text-gray-700 dark:text-gray-300 disabled:opacity-50"
                                onClick={() => updatePassengerCount('infants', false)}
                                disabled={passengers.infants <= 0}
                              >
                                <span>-</span>
                              </button>
                              <span className="mx-3 text-gray-700 dark:text-gray-300">{passengers.infants}</span>
                              <button 
                                className="w-8 h-8 rounded-full bg-gray-100 dark:bg-gray-800 flex items-center justify-center text-gray-700 dark:text-gray-300 disabled:opacity-50"
                                onClick={() => updatePassengerCount('infants', true)}
                                disabled={passengers.infants >= passengers.adults}
                              >
                                <span>+</span>
                              </button>
                            </div>
                          </div>
                          
                          {/* Class Selection */}
                          <div className="grid grid-cols-2 gap-2">
                            <button 
                              className={`border border-gray-200 dark:border-gray-700 rounded-lg p-2 text-center cursor-pointer transition-colors ${
                                selectedClass === 'economy' 
                                  ? 'bg-yellow-400 dark:bg-blue-600 text-white dark:text-white border-yellow-500 dark:border-blue-500' 
                                  : 'bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700'
                              }`}
                              onClick={() => setSelectedClass('economy')}
                            >
                              Economy
                            </button>
                            <button 
                              className={`border border-gray-200 dark:border-gray-700 rounded-lg p-2 text-center cursor-pointer transition-colors ${
                                selectedClass === 'premium_economy' 
                                  ? 'bg-yellow-400 dark:bg-blue-600 text-white dark:text-white border-yellow-500 dark:border-blue-500' 
                                  : 'bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700'
                              }`}
                              onClick={() => setSelectedClass('premium_economy')}
                            >
                              Premium economy
                            </button>
                            <button 
                              className={`border border-gray-200 dark:border-gray-700 rounded-lg p-2 text-center cursor-pointer transition-colors ${
                                selectedClass === 'business' 
                                  ? 'bg-yellow-400 dark:bg-blue-600 text-white dark:text-white border-yellow-500 dark:border-blue-500' 
                                  : 'bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700'
                              }`}
                              onClick={() => setSelectedClass('business')}
                            >
                              Business
                            </button>
                            <button 
                              className={`border border-gray-200 dark:border-gray-700 rounded-lg p-2 text-center cursor-pointer transition-colors ${
                                selectedClass === 'first_class' 
                                  ? 'bg-yellow-400 dark:bg-blue-600 text-white dark:text-white border-yellow-500 dark:border-blue-500' 
                                  : 'bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700'
                              }`}
                              onClick={() => setSelectedClass('first_class')}
                            >
                              First class
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Search Button */}
                    <div className="lg:w-auto">
                      <Button className="w-full lg:w-auto bg-gradient-to-r from-yellow-400 to-yellow-600 hover:from-yellow-500 hover:to-yellow-700 dark:from-blue-500 dark:to-blue-700 dark:hover:from-blue-600 dark:hover:to-blue-800 text-white font-medium py-3 px-6 rounded-lg h-full" onClick={handleSearch}>
                        SEARCH
                      </Button>
                    </div>
                  </div>
                </>
              ) : (
                <>
                  {/* Hotel Search - One Row */}
                  <div className="flex flex-col lg:flex-row lg:items-center lg:space-x-2">
                    {/* Destination */}
                    <div className="flex-1 mb-4 lg:mb-0">
                      <div className="relative">
                        <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">
                          <MapPin className="w-5 h-5" />
                        </div>
                        <input 
                          type="text" 
                          placeholder="Destination" 
                          defaultValue="Germany"
                          className="w-full p-3 pl-12 bg-gray-100 dark:bg-gray-800 border-0 rounded-lg focus:ring-2 focus:ring-yellow-400 dark:focus:ring-blue-500"
                        />
                        <button className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400">
                          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                          </svg>
                        </button>
                      </div>
                    </div>

                    {/* Check-in Date */}
                    <div className="flex-1 mb-4 lg:mb-0">
                      <div className="relative">
                        <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">
                          <Calendar className="w-5 h-5" />
                        </div>
                        <div 
                          className="w-full p-3 pl-12 bg-gray-100 dark:bg-gray-800 border-0 rounded-lg cursor-pointer flex flex-col"
                          onClick={() => openCalendar('checkin')}
                        >
                          <span className="text-sm text-gray-700 dark:text-gray-300 font-medium">
                            {formatDateDisplay(selectedDates.checkin)}
                          </span>
                          <span className="text-xs text-gray-500 dark:text-gray-400">
                            {selectedDates.checkin.dayName}
                          </span>
                        </div>
                        
                        {showCalendar && activeDateField === 'checkin' && renderCalendar()}
                      </div>
                    </div>

                    {/* Check-out Date */}
                    <div className="flex-1 mb-4 lg:mb-0">
                      <div className="relative">
                        <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">
                          <Calendar className="w-5 h-5" />
                        </div>
                        <div 
                          className="w-full p-3 pl-12 bg-gray-100 dark:bg-gray-800 border-0 rounded-lg cursor-pointer flex flex-col"
                          onClick={() => openCalendar('checkout')}
                        >
                          <span className="text-sm text-gray-700 dark:text-gray-300 font-medium">
                            {formatDateDisplay(selectedDates.checkout)}
                          </span>
                          <span className="text-xs text-gray-500 dark:text-gray-400">
                            {selectedDates.checkout.dayName}
                          </span>
                        </div>
                        
                        {showCalendar && activeDateField === 'checkout' && renderCalendar()}
                      </div>
                    </div>

                    {/* Rooms */}
                    <div className="flex-1 mb-4 lg:mb-0">
                      <div className="relative">
                        <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">
                          <Users className="w-5 h-5" />
                        </div>
                        <div className="w-full p-3 pl-12 bg-gray-100 dark:bg-gray-800 border-0 rounded-lg cursor-pointer flex flex-col">
                          <span className="text-sm text-gray-700 dark:text-gray-300 font-medium">2 Adults - 0 Child</span>
                          <span className="text-xs text-gray-500 dark:text-gray-400">1 room</span>
                        </div>
                      </div>
                    </div>

                    {/* Search Button */}
                    <div className="lg:w-auto">
                      <Button className="w-full lg:w-auto bg-gradient-to-r from-yellow-400 to-yellow-600 hover:from-yellow-500 hover:to-yellow-700 dark:from-blue-500 dark:to-blue-700 dark:hover:from-blue-600 dark:hover:to-blue-800 text-white font-medium py-3 px-6 rounded-lg h-full" onClick={handleSearch}>
                        SEARCH
                      </Button>
                    </div>
                  </div>
                </>
              )}
              
              {/* Crypto Payment Incentive */}
              <div className="mt-6 bg-yellow-50 dark:bg-blue-900/30 rounded-lg p-3 flex items-center text-xs text-yellow-700 dark:text-blue-300 border border-yellow-100 dark:border-blue-800/30">
                <Sparkles className="w-4 h-4 mr-2 text-yellow-500 dark:text-blue-400" />
                <span>Pay with crypto and get <strong>5% cashback</strong> on your booking!</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SearchSection; 