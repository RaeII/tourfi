import React, { useEffect, useState, useRef } from 'react';
import { useTranslation } from 'react-i18next';
//import { useNavigate } from 'react-router-dom';
import { Button } from '../components/ui/button';
import { Globe, CreditCard, Search, Users, Plane, MapPin, Sparkles, ChevronRight, Trophy, Check, Award, Ticket, Smartphone, CalendarDays, Calendar, Bed, Coffee, X, ChevronLeft } from 'lucide-react';
import SearchSection from '../components/SearchSection';

// Preload critical images for App Preview section
const preloadImages = () => {
  const images = [
    '/images/grid-pattern.svg',
    '/images/world-map-dots.svg'
  ];
  
  images.forEach((src) => {
    const img = new Image();
    img.src = src;
  });
};

// Popular destinations data
const popularDestinations = [
  { name: 'Tokyo', country: 'Japan', image: '/images/tokyo.jpg' },
  { name: 'New York', country: 'USA', image: '/images/newyork.jpg' },
  { name: 'Paris', country: 'France', image: '/images/paris.jpg' },
  { name: 'Rio de Janeiro', country: 'Brazil', image: '/images/rio.jpg' },
  { name: 'Barcelona', country: 'Spain', image: '/images/barcelona.jpg' },
  { name: 'Dubai', country: 'UAE', image: '/images/dubai.jpg' },
];

const Home = () => {
  const { t } = useTranslation(['home', 'common']);
  //const navigate = useNavigate();
  const [imagesLoaded, setImagesLoaded] = useState(false);
  const destinationsRef = useRef(null);
  
  // Handle preloading images and setting loaded state
  useEffect(() => {
    preloadImages();
    
    // Set a short timeout to ensure styles are applied
    const timer = setTimeout(() => {
      setImagesLoaded(true);
    }, 300);
    
    return () => clearTimeout(timer);
  }, []);
  
  const handleGetStarted = () => {
    //navigate('/app');
  };

  const scrollDestinations = (direction) => {
    if (destinationsRef.current) {
      const scrollAmount = direction === 'left' ? -280 : 280;
      destinationsRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-[calc(100vh-4rem)] bg-background overflow-hidden">
      {/* Hero Section */}
      <section className="bg-backg dark:bg-primary/10 text-white py-16 md:py-24 relative overflow-hidden">
        {/* Floating travel elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-1/4 left-1/4 animate-float-slow">
            <Plane className="text-yellow-400/30 w-16 h-16" />
          </div>
          <div className="absolute top-2/3 right-1/4 animate-float">
            <Globe className="text-blue-400/30 w-24 h-24" />
          </div>
          <div className="absolute bottom-1/4 left-1/3 animate-float-slow-reverse">
            <MapPin className="text-red-400/30 w-12 h-12" />
          </div>
        </div>

        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center">
            <div className="md:w-3/5 mb-8 md:mb-0">
              <div className="inline-block mb-4 px-4 py-1 bg-yellow-400/20 dark:bg-yellow-400/10 rounded-full">
                <span className="text-white/90 font-medium flex items-center">
                  <span className="mr-2 p-1 bg-yellow-400 rounded-full">
                    <Sparkles className="w-3 h-3 text-white" />
                  </span>
                  {t('home:hero.subtitle')}
                </span>
              </div>
              
              <h1 className="text-4xl md:text-6xl font-bold leading-tight mb-6 text-white">
                <span className="bg-clip-text text-transparent bg-gradient-to-r from-yellow-400 via-yellow-300 to-yellow-500">
                  {t('home:hero.title')}
                </span>
              </h1>
              
              <p className="text-lg md:text-xl mb-8 text-white/80 max-w-2xl">
                {t('home:hero.description')}
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4">
                <Button 
                  className="relative overflow-hidden group bg-gradient-to-r from-yellow-400 to-yellow-600 hover:from-yellow-500 hover:to-yellow-700 border-0 text-black font-bold py-3 px-6 rounded-xl transition-all duration-300"
                  onClick={handleGetStarted}
                >
                  <span className="relative z-10 flex items-center">
                    {t('home:hero.getStarted')}
                    <ChevronRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
                  </span>
                  <span className="absolute top-0 left-0 w-full h-full bg-white/20 transform -translate-y-full group-hover:translate-y-0 transition-transform duration-300"></span>
                </Button>
              </div>
            </div>
            {/* Floating Card */}
            {/* <FloatingCard /> */}
          </div>
        </div>
      </section>

      {/* Transition between hero and features */}
      <div className="relative h-32 md:h-40 bg-backg dark:bg-primary/10">
        {/* Wave overlay */}
        <svg className="absolute bottom-0 left-0 w-full" 
          viewBox="0 0 1440 120" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M0 120L48 102C96 84 192 48 288 36C384 24 480 36 576 42C672 48 768 48 864 60C960 72 1056 96 1152 96C1248 96 1344 72 1392 60L1440 48V120H1392C1344 120 1248 120 1152 120C1056 120 960 120 864 120C768 120 672 120 576 120C480 120 384 120 288 120C192 120 96 120 48 120H0Z" 
          fill="background" className="fill-background dark:fill-background" />
        </svg>
        
        {/* Floating bubbles/dots animation */}
        <div className="absolute top-8 left-1/4 w-6 h-6 rounded-full bg-yellow-400/30 animate-float-slow"></div>
        <div className="absolute top-16 left-1/3 w-4 h-4 rounded-full bg-white/20 animate-float"></div>
        <div className="absolute top-4 left-2/3 w-8 h-8 rounded-full bg-yellow-400/20 animate-float-slow-reverse"></div>
        <div className="absolute top-20 left-3/4 w-5 h-5 rounded-full bg-white/30 animate-float"></div>
        
        {/* Center icon */}
        <div className="absolute left-1/2 bottom-8 transform -translate-x-1/2 z-10">
          <div className="relative">
            <div className="absolute inset-0 bg-yellow-400/20 rounded-full blur-xl transform scale-150 animate-pulse-slow"></div>
            <div className="relative z-10 bg-gradient-to-br from-yellow-400 to-yellow-600 p-3 rounded-full">
              <Plane className="w-7 h-7 text-white" />
            </div>
          </div>
        </div>
      </div>

      {/* Search Section */}
      <SearchSection />

      {/* Popular Destinations */}
      <div className="container mx-auto px-4">
        <div className="mt-12">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-xl font-bold text-gray-900 dark:text-white">Popular Destinations</h3>
            <div className="flex space-x-2">
              <button 
                onClick={() => scrollDestinations('left')}
                className="p-2 rounded-full bg-white dark:bg-gray-800 shadow-md hover:bg-yellow-50 dark:hover:bg-gray-700 transition-colors"
              >
                <ChevronRight className="w-5 h-5 text-gray-600 dark:text-gray-300 transform rotate-180" />
              </button>
              <button 
                onClick={() => scrollDestinations('right')}
                className="p-2 rounded-full bg-white dark:bg-gray-800 shadow-md hover:bg-yellow-50 dark:hover:bg-gray-700 transition-colors"
              >
                <ChevronRight className="w-5 h-5 text-gray-600 dark:text-gray-300" />
              </button>
            </div>
          </div>
          
          <div className="relative">
            <div 
              ref={destinationsRef}
              className="flex space-x-4 overflow-x-auto pb-4 hide-scrollbar"
              style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
            >
              {popularDestinations.map((destination, index) => (
                <div 
                  key={index}
                  className="flex-shrink-0 w-64 rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 bg-white dark:bg-gray-900/70 border border-yellow-400/10 dark:border-blue-400/10"
                >
                  <div className="relative h-36 bg-gradient-to-r from-yellow-400 to-yellow-600 dark:from-blue-500 dark:to-blue-700">
                    <div className="absolute inset-0 flex items-center justify-center text-white font-bold text-xl">
                      {destination.name}
                    </div>
                    <div className="absolute bottom-2 right-2 bg-black/30 text-white text-xs px-2 py-1 rounded-full">
                      {destination.country}
                    </div>
                  </div>
                  <div className="p-4">
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-sm text-gray-500 dark:text-gray-400">Best Deals</span>
                      <span className="text-xs font-medium text-yellow-600 dark:text-blue-400">Verified ✓</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <div>
                        <div className="text-xs text-gray-500 dark:text-gray-400">From</div>
                        <div className="text-lg font-bold text-gray-900 dark:text-white">$249</div>
                      </div>
                      <Button 
                        className="text-xs px-3 py-1 bg-yellow-400/10 dark:bg-blue-400/10 text-yellow-600 dark:text-blue-400 hover:bg-yellow-400/20 dark:hover:bg-blue-400/20"
                        onClick={() => {
      /*                     if (searchType === 'flight') {
                            // Could set destination in the search form
                          } */
                        }}
                      >
                        View Deals
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Add CSS for hiding scrollbar */}
      <style>{`
        .hide-scrollbar::-webkit-scrollbar {
          display: none;
        }
      `}</style>

      {/* Transition between Features and App Preview */}
      <div className="relative h-24 md:h-32 -mt-4 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-background to-yellow-400/5 dark:from-background dark:to-blue-700/20"></div>
        
        {/* Wave overlay */}
        <svg className="absolute bottom-0 left-0 w-full" 
          viewBox="0 0 1440 120" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M0 80C120 100 360 120 720 100C1080 80 1320 40 1440 60V120H0V80Z" fill="rgba(234, 179, 8, 0.05)" className="dark:fill-[rgba(30,64,175,0.2)]" />
        </svg>
        
        {/* Floating elements */}
        <div className="absolute top-6 left-1/3 w-3 h-3 rounded-full bg-yellow-400/20 dark:bg-blue-400/20 animate-float-slow"></div>
        <div className="absolute top-12 left-2/3 w-4 h-4 rounded-full bg-yellow-400/20 dark:bg-blue-400/20 animate-float"></div>
      </div>

      {/* App Preview Section - with optimized rendering */}
      <section 
        className={`py-20 bg-yellow-400/5 dark:bg-blue-700/20 relative ${imagesLoaded ? 'opacity-100' : 'opacity-0'}`} 
        style={{ 
          contentVisibility: 'auto',
          containIntrinsicSize: '1200px',
          transition: 'opacity 0.5s ease-in',
        }}
      >
        {/* Pre-rendered background layer */}
        <div className="absolute inset-0 bg-yellow-400/5 dark:bg-blue-700/20" style={{ transform: 'translateZ(0)' }}></div>
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center mb-16">
            <span className="inline-block px-4 py-1 bg-yellow-400/30 dark:bg-blue-400/30 text-yellow-600 dark:text-blue-300 rounded-full text-sm font-semibold mb-3">
              App Preview
            </span>
            <h2 className="text-3xl md:text-4xl font-bold mb-3 text-gray-900 dark:text-white">
              See Tourfi in Action
            </h2>
            <p className="text-lg max-w-2xl mx-auto text-gray-700 dark:text-white/80">
              Experience how our app makes travel planning and execution seamless and cost-effective.
            </p>
          </div>
          
          {/* Optimized card grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-6xl mx-auto">
            {/* Travel Search & Price Alerts Preview */}
            <div 
              className="bg-white dark:bg-gray-900/70 rounded-xl p-8 shadow-lg border border-yellow-400/10 dark:border-blue-400/10 transform transition-all duration-500 hover:-translate-y-1 hover:shadow-xl"
              style={{ 
                contain: 'content',
                backfaceVisibility: 'hidden'
              }}
            >
              <h3 className="text-xl font-bold mb-3 text-gray-900 dark:text-white flex items-center">
                <Search className="text-yellow-500 dark:text-blue-400 mr-2" size={20} />
                Smart Search & Price Alerts
              </h3>
              
              <div className="aspect-video bg-gradient-to-br from-yellow-400 to-yellow-600 dark:from-blue-400 dark:to-blue-600 rounded-lg shadow-lg flex items-center justify-center overflow-hidden will-change-transform" style={{ 
                transform: 'translateZ(0)',
                background: 'var(--card-gradient-primary, linear-gradient(to bottom right, rgb(234 179 8), rgb(217 119 6)))',
              }}>
                <div className="w-3/4 h-3/5 bg-black/10 rounded-xl backdrop-blur-sm flex items-center justify-center" style={{ willChange: 'auto' }}>
                  <div className="w-4/5 h-4/5 bg-white rounded-lg shadow-lg flex flex-col p-4 overflow-hidden">
                    <div className="flex items-center border-b pb-2 mb-2">
                      <Search className="text-yellow-500 dark:text-blue-500 mr-2" size={16} />
                      <span className="text-sm text-gray-700">Where do you want to go?</span>
                    </div>
                    <div className="text-xs text-left">
                      <div className="bg-gray-100 p-2 rounded mb-2">
                        <div className="font-bold text-primary">Paris → Tokyo</div>
                        <div className="text-primary/80">$750 (Best price in 6 months)</div>
                      </div>
                      <div className="bg-yellow-100 dark:bg-blue-100 p-2 rounded">
                        <div className="font-bold text-yellow-700 dark:text-blue-700">Price Alert!</div>
                        <div>-15% for your saved destination</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              
              <p className="mt-4 text-sm text-gray-600 dark:text-gray-300">
                Our AI constantly monitors prices and sends alerts when the best deals appear. Save up to 30% on your travel bookings with smart predictions and personalized recommendations.
              </p>
              
              <div className="mt-4 flex justify-end">
                <Button className="text-xs bg-yellow-400/10 dark:bg-blue-400/10 text-yellow-600 dark:text-blue-400 hover:bg-yellow-400/20 dark:hover:bg-blue-400/20 border-0">
                  Learn more <ChevronRight size={14} className="inline ml-1" />
                </Button>
              </div>
            </div>
            
            {/* Community Guide Preview */}
            <div 
              className="bg-white dark:bg-gray-900/70 rounded-xl p-8 shadow-lg border border-yellow-400/10 dark:border-blue-400/10 transform transition-all duration-500 hover:-translate-y-1 hover:shadow-xl"
              style={{ 
                contain: 'content',
                backfaceVisibility: 'hidden'
              }}
            >
              <h3 className="text-xl font-bold mb-3 text-gray-900 dark:text-white flex items-center">
                <Users className="text-yellow-500 dark:text-blue-400 mr-2" size={20} />
                Community Travel Guides
              </h3>
              
              <div className="aspect-video bg-gradient-to-br from-yellow-500 to-yellow-600 dark:from-blue-500 dark:to-blue-600 rounded-lg shadow-lg flex items-center justify-center overflow-hidden" style={{ transform: 'translateZ(0)' }}>
                <div className="w-3/4 h-3/5 bg-black/10 rounded-xl flex items-center justify-center">
                  <div className="w-4/5 h-4/5 bg-white rounded-lg shadow-lg flex flex-col p-4">
                    <div className="flex items-center mb-2">
                      <div className="w-8 h-8 rounded-full bg-yellow-100 dark:bg-blue-100 flex items-center justify-center mr-2">
                        <Users className="text-yellow-500 dark:text-blue-500 w-4 h-4" />
                      </div>
                      <div>
                        <div className="text-xs font-bold text-black">Travel Expert</div>
                        <div className="text-xs text-gray-500">Paris, France</div>
                      </div>
                      <div className="ml-auto text-xs bg-yellow-100 px-2 py-1 rounded text-yellow-700 dark:bg-blue-100 dark:text-blue-700">
                        1250 XP
                      </div>
                    </div>
                    <div className="text-xs text-left">
                      <p className="mb-2 text-primary">The hidden café on Rue Saint-Dominique has the best croissants in Paris! Don't miss it.</p>
                      <div className="flex">
                        <span className="text-green-500 mr-1">✓</span>
                        <span className="text-xs text-gray-500">Verified visit</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              
              <p className="mt-4 text-sm text-gray-600 dark:text-gray-300">
                Access authentic, blockchain-verified travel recommendations from real travelers. Earn XP and rewards for sharing your own experiences and building your travel reputation.
              </p>
              
              <div className="mt-4 flex justify-end">
                <Button className="text-xs bg-yellow-400/10 dark:bg-blue-400/10 text-yellow-600 dark:text-blue-400 hover:bg-yellow-400/20 dark:hover:bg-blue-400/20 border-0">
                  Learn more <ChevronRight size={14} className="inline ml-1" />
                </Button>
              </div>
            </div>
            
            {/* Web3 Card Preview - Optimized */}
            <div className="lg:col-span-2 bg-white dark:bg-gray-900/70 rounded-xl p-8 shadow-lg border border-yellow-400/10 dark:border-blue-400/10 transform transition-all duration-500 hover:-translate-y-1 hover:shadow-xl"
              style={{ 
                contain: 'content',
                backfaceVisibility: 'hidden'
              }}
            >
              <h3 className="text-xl font-bold mb-3 text-gray-900 dark:text-white flex items-center">
                <CreditCard className="text-yellow-500 dark:text-blue-400 mr-2" size={20} />
                Web3 International Payment Card
              </h3>
              
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <div className="aspect-video bg-gradient-to-br from-gray-800 to-gray-900 rounded-lg shadow-lg flex items-center justify-center relative overflow-hidden" style={{ transform: 'translateZ(0)' }}>
                  {/* Credit card - simplified for performance */}
                  <div className="relative w-4/6 h-3/5 bg-gradient-to-br from-black via-gray-900 to-black rounded-xl p-4 shadow-2xl border border-yellow-500/20 dark:border-blue-500/20">
                    <div className="h-full flex flex-col justify-between">
                      {/* Card chip */}
                      <div className="flex justify-between items-start">
                        <div className="w-8 h-6 bg-gradient-to-br from-yellow-300 to-yellow-600 dark:from-blue-300 dark:to-blue-600 rounded-md grid grid-cols-2 grid-rows-2 gap-0.5 p-0.5 overflow-hidden shadow-inner">
                          <div className="bg-black/20 rounded-sm"></div>
                          <div className="bg-black/10 rounded-sm"></div>
                          <div className="bg-black/10 rounded-sm"></div>
                          <div className="bg-black/20 rounded-sm"></div>
                        </div>
                        <div className="flex space-x-1">
                          <div className="w-4 h-4 rounded-full bg-yellow-500/20 dark:bg-blue-500/20"></div>
                          <div className="w-4 h-4 rounded-full bg-yellow-600/20 dark:bg-blue-600/20"></div>
                        </div>
                      </div>
                      
                      {/* Card number */}
                      <div className="grid grid-cols-4 gap-1 text-xs">
                        <div className="text-gray-400 font-mono text-center">
                          <span className="text-[8px] block mb-0.5 text-gray-500">BNB</span>
                          <span className="text-white">••••</span>
                        </div>
                        <div className="text-gray-400 font-mono text-center">
                          <span className="text-[8px] block mb-0.5 text-gray-500">CHAIN</span>
                          <span className="text-white">••••</span>
                        </div>
                        <div className="text-gray-400 font-mono text-center">
                          <span className="text-[8px] block mb-0.5 text-gray-500">WEB</span>
                          <span className="text-white">••••</span>
                        </div>
                        <div className="text-gray-400 font-mono text-center">
                          <span className="text-[8px] block mb-0.5 text-gray-500">3.0</span>
                          <span className="text-white">••••</span>
                        </div>
                      </div>
                      
                      {/* Card info */}
                      <div className="flex justify-between items-end text-xs">
                        <div>
                          <p className="text-gray-500 text-[8px] mb-0.5">CARD HOLDER</p>
                          <p className="text-white font-medium">TRAVEL PRO</p>
                        </div>
                        <div className="flex flex-col items-end">
                          <p className="text-gray-500 text-[8px] mb-0.5">EXPIRES</p>
                          <p className="text-white font-medium">∞/∞</p>
                        </div>
                      </div>
                      
                      {/* Card logo */}
                      <div className="absolute bottom-1 right-1 text-white font-bold text-xs">
                        <span className="bg-clip-text text-transparent bg-gradient-to-r from-yellow-400 to-yellow-600 dark:from-blue-400 dark:to-blue-600">TOURFI</span>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="flex flex-col justify-center">
                  <h4 className="text-lg font-semibold mb-4 text-gray-800 dark:text-white">Zero Fee International Payments</h4>
                  <ul className="space-y-3">
                    {["No IOF or international fees - save up to 8% per transaction", 
                      "Real-time crypto to local currency conversion at the best rates", 
                      "Integrated travel insurance with automatic coverage", 
                      "VAT refund automation for eligible purchases"].map((item, index) => (
                      <li key={index} className="flex items-start">
                        <div className="flex-shrink-0 w-6 h-6 bg-gradient-to-br from-yellow-400 to-yellow-600 dark:from-blue-400 dark:to-blue-600 rounded-full flex items-center justify-center mr-3">
                          <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                          </svg>
                        </div>
                        <span className="text-sm text-gray-700 dark:text-white/80">{item}</span>
                      </li>
                    ))}
                  </ul>
                  <div className="mt-6">
                    <Button className="bg-gradient-to-r from-yellow-400 to-yellow-600 hover:from-yellow-500 hover:to-yellow-700 dark:from-blue-500 dark:to-blue-700 dark:hover:from-blue-600 dark:hover:to-blue-800 text-white font-medium">
                      Get Your Card <ChevronRight size={16} className="ml-1" />
                    </Button>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Travel Insurance Preview - Lazy Loaded */}
            <div className="lg:col-span-2 bg-white dark:bg-gray-900/70 rounded-xl p-8 shadow-lg border border-yellow-400/10 dark:border-blue-400/10 transform transition-all duration-500 hover:-translate-y-1 hover:shadow-xl mt-8"
              style={{ 
                contain: 'content',
                backfaceVisibility: 'hidden'
              }}
              id="travel-insurance-section"
            >
              <h3 className="text-xl font-bold mb-3 text-gray-900 dark:text-white flex items-center">
                <Award className="text-yellow-500 dark:text-blue-400 mr-2" size={20} />
                Automatic Travel Insurance
              </h3>
              
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <div className="flex flex-col justify-center">
                  <h4 className="text-lg font-semibold mb-4 text-gray-800 dark:text-white">Travel with Complete Peace of Mind</h4>
                  <p className="text-sm text-gray-600 dark:text-gray-300 mb-6">
                    Your Tourfi card automatically includes comprehensive travel insurance with every international trip. No paperwork, no separate policies - just instant coverage.
                  </p>
                  
                  <ul className="space-y-3">
                    {["Medical emergencies coverage", 
                      "Trip cancellation/interruption reimbursement", 
                      "Baggage delay or loss compensation", 
                      "Automated blockchain-based claims processing"].map((item, index) => (
                      <li key={index} className="flex items-start">
                        <div className="flex-shrink-0 w-6 h-6 bg-gradient-to-br from-yellow-400 to-yellow-600 dark:from-blue-400 dark:to-blue-600 rounded-full flex items-center justify-center mr-3">
                          <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                          </svg>
                        </div>
                        <span className="text-sm text-gray-700 dark:text-white/80">{item}</span>
                      </li>
                    ))}
                  </ul>
                  
                  <div className="mt-6">
                    <Button className="bg-gradient-to-r from-yellow-400 to-yellow-600 hover:from-yellow-500 hover:to-yellow-700 dark:from-blue-500 dark:to-blue-700 dark:hover:from-blue-600 dark:hover:to-blue-800 text-white font-medium">
                      View Coverage Details <ChevronRight size={16} className="ml-1" />
                    </Button>
                  </div>
                </div>
                
                <div className="aspect-video bg-gradient-to-br from-teal-800 to-teal-900 rounded-lg shadow-lg flex items-center justify-center relative overflow-hidden" style={{ transform: 'translateZ(0)' }}>
                  {/* Insurance policy UI - simplified for performance */}
                  <div className="relative w-4/5 h-4/5 bg-white/10 rounded-xl p-5 shadow-2xl border border-white/20 flex flex-col">
                    <div className="flex justify-between items-center mb-4">
                      <div className="text-white text-sm font-semibold flex items-center">
                        <Award className="text-yellow-400 dark:text-blue-400 mr-2" size={16} />
                        Travel Insurance
                      </div>
                      <div className="bg-green-400/20 text-green-400 text-xs font-medium px-2 py-1 rounded">
                        Active
                      </div>
                    </div>
                    
                    <div className="flex mb-4 bg-white/5 rounded-lg p-3 border border-white/10">
                      <div className="flex-shrink-0 w-10 h-10 bg-teal-500/20 rounded-full flex items-center justify-center mr-3">
                        <Plane className="text-teal-400 w-5 h-5" />
                      </div>
                      <div>
                        <div className="text-white text-xs">Currently Protected Trip</div>
                        <div className="text-white font-medium">São Paulo → London</div>
                        <div className="text-xs text-white/60">May 15 - May 29, 2023</div>
                      </div>
                    </div>
                    
                    <div className="flex-1 space-y-2 overflow-hidden mb-4">
                      {/* Insurance coverage meters */}
                      <div>
                        <div className="flex justify-between text-xs">
                          <span className="text-white/70">Medical Coverage</span>
                          <span className="text-white">$100,000</span>
                        </div>
                        <div className="h-1 bg-white/10 rounded-full w-full">
                          <div className="h-1 bg-gradient-to-r from-green-400 to-green-500 rounded-full w-full"></div>
                        </div>
                      </div>
                      
                      <div>
                        <div className="flex justify-between text-xs">
                          <span className="text-white/70">Baggage Protection</span>
                          <span className="text-white">$2,500</span>
                        </div>
                        <div className="h-1 bg-white/10 rounded-full w-full">
                          <div className="h-1 bg-gradient-to-r from-green-400 to-green-500 rounded-full w-full"></div>
                        </div>
                      </div>
                      
                      <div>
                        <div className="flex justify-between text-xs">
                          <span className="text-white/70">Trip Cancellation</span>
                          <span className="text-white">$5,000</span>
                        </div>
                        <div className="h-1 bg-white/10 rounded-full w-full">
                          <div className="h-1 bg-gradient-to-r from-green-400 to-green-500 rounded-full w-full"></div>
                        </div>
                      </div>
                    </div>
                    
                    <div className="mt-auto bg-white/5 rounded-lg p-3 border border-white/10">
                      <div className="flex justify-between items-center">
                        <div className="text-white text-xs">Smart Contract Policy ID</div>
                        <div className="text-xs text-white/70 font-mono">0x7F..9B32</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Exchange Rate Preview - Lazy Loaded */}
            <div id="exchange-rates-section" className="lg:col-span-2 mt-8">
              <LazyLoadSection>
                <div className="bg-white dark:bg-gray-900/70 rounded-xl p-8 shadow-lg border border-yellow-400/10 dark:border-blue-400/10 transform transition-all duration-500 hover:-translate-y-1 hover:shadow-xl"
                  style={{ 
                    contain: 'content',
                    backfaceVisibility: 'hidden'
                  }}
                >
                  <h3 className="text-xl font-bold mb-3 text-gray-900 dark:text-white flex items-center">
                    <Globe className="text-yellow-500 dark:text-blue-400 mr-2" size={20} />
                    Real-Time Exchange Rate Comparison
                  </h3>
                  
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    <div className="aspect-video bg-gradient-to-br from-indigo-800 to-indigo-900 rounded-lg shadow-lg flex items-center justify-center relative overflow-hidden" style={{ transform: 'translateZ(0)' }}>
                      {/* Exchange rate UI - simplified for performance */}
                      <div className="relative w-4/5 bg-white/10 rounded-xl p-5 shadow-2xl border border-white/20">
                        <div className="flex justify-between items-center mb-4">
                          <div className="text-white text-sm font-semibold">Currency Exchange</div>
                          <div className="flex items-center">
                            <div className="w-2 h-2 bg-green-400 rounded-full mr-1"></div>
                            <div className="text-green-400 text-xs">Live Rates</div>
                          </div>
                        </div>
                        
                        <div className="grid grid-cols-2 gap-4 mb-4">
                          <div className="bg-white/5 rounded-lg p-3 border border-white/10">
                            <div className="text-xs text-white/60 mb-1">Traditional Bank</div>
                            <div className="text-white font-medium">1 USD = 5.05 BRL</div>
                            <div className="text-xs text-red-400 mt-1">+6.8% IOF • +2.5% Fee</div>
                          </div>
                          
                          <div className="bg-white/5 rounded-lg p-3 border border-white/10">
                            <div className="text-xs text-white/60 mb-1">Tourfi Rate</div>
                            <div className="text-white font-medium">1 USD = 5.52 BRL</div>
                            <div className="text-xs text-green-400 mt-1">+0% IOF • +0.5% Fee</div>
                          </div>
                        </div>
                        
                        <div className="bg-white/5 rounded-lg p-3 border border-white/10 mb-4">
                          <div className="flex justify-between items-center">
                            <div>
                              <div className="text-xs text-white/60 mb-1">You Save</div>
                              <div className="text-green-400 font-medium">~8.8% per transaction</div>
                            </div>
                            <div className="bg-green-400/20 text-green-400 text-xs font-medium px-2 py-1 rounded">
                              Best Rate
                            </div>
                          </div>
                        </div>
                        
                        <div className="text-center">
                          <div className="inline-block bg-gradient-to-r from-yellow-400 to-yellow-600 dark:from-blue-400 dark:to-blue-600 text-white text-xs font-medium px-3 py-1.5 rounded-full">
                            Convert & Spend Now
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex flex-col justify-center">
                      <h4 className="text-lg font-semibold mb-4 text-gray-800 dark:text-white">How Much Are You Losing on Exchange Rates?</h4>
                      <p className="text-sm text-gray-600 dark:text-gray-300 mb-6">
                        Traditional banks and credit cards hide fees in poor exchange rates, plus add IOF taxes on international transactions. Tourfi eliminates these hidden costs by using blockchain technology.
                      </p>
                      
                      <div className="space-y-4">
                        {/* Rate comparison items */}
                        <div className="flex items-center justify-between">
                          <div className="flex items-center">
                            <div className="w-8 h-8 mr-3 rounded-full bg-gradient-to-br from-yellow-400 to-yellow-600 dark:from-blue-400 dark:to-blue-600 flex items-center justify-center">
                              <span className="text-white text-sm font-bold">$</span>
                            </div>
                            <span className="text-sm text-gray-700 dark:text-white/80">Traditional Bank USD→BRL</span>
                          </div>
                          <span className="text-sm font-medium text-gray-900 dark:text-white">5.05 BRL</span>
                        </div>
                        
                        <div className="flex items-center justify-between">
                          <div className="flex items-center">
                            <div className="w-8 h-8 mr-3 rounded-full bg-gradient-to-br from-yellow-400 to-yellow-600 dark:from-blue-400 dark:to-blue-600 flex items-center justify-center">
                              <span className="text-white text-sm font-bold">₿</span>
                            </div>
                            <span className="text-sm text-gray-700 dark:text-white/80">Tourfi USD→BRL</span>
                          </div>
                          <span className="text-sm font-medium text-gray-900 dark:text-white">5.52 BRL</span>
                        </div>
                        
                        <div className="bg-yellow-50 dark:bg-blue-900/30 rounded-lg p-4 border border-yellow-100 dark:border-blue-800/30">
                          <div className="flex justify-between items-center">
                            <span className="text-sm font-medium text-gray-700 dark:text-white">On R$10,000 trip expenses:</span>
                            <span className="text-green-600 dark:text-green-400 font-bold">Save R$880</span>
                          </div>
                          <div className="text-xs text-gray-500 dark:text-white/60 mt-1">That's enough for an extra night in a 4-star hotel!</div>
                        </div>
                      </div>
                      
                      <div className="mt-6">
                        <Button className="bg-gradient-to-r from-yellow-400 to-yellow-600 hover:from-yellow-500 hover:to-yellow-700 dark:from-blue-500 dark:to-blue-700 dark:hover:from-blue-600 dark:hover:to-blue-800 text-white font-medium">
                          Calculate Your Savings <ChevronRight size={16} className="ml-1" />
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              </LazyLoadSection>
            </div>
          </div>
        </div>
      </section>

      {/* Transition between App Preview and CTA */}
      <div className="relative h-32 md:h-40 overflow-hidden">
        {/* Smooth wave overlay, matching previous transitions */}
        <svg className="absolute bottom-0 left-0 w-full" viewBox="0 0 1440 120" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M0 80C120 100 360 120 720 100C1080 80 1320 40 1440 60V120H0V80Z" fill="rgba(234, 179, 8, 0.05)" className="dark:fill-[rgba(30,64,175,0.2)]" />
        </svg>
        <div className="absolute inset-0 bg-gradient-to-b from-yellow-400/5 dark:from-blue-700/20 to-background"></div>
        {/* Floating elements */}
        <div className="absolute top-8 left-1/4 w-6 h-6 rounded-full bg-yellow-400/30 animate-float-slow"></div>
        <div className="absolute top-16 left-1/3 w-4 h-4 rounded-full bg-white/20 animate-float"></div>
        <div className="absolute top-4 left-2/3 w-8 h-8 rounded-full bg-yellow-400/20 animate-float-slow-reverse"></div>
        <div className="absolute top-20 left-3/4 w-5 h-5 rounded-full bg-white/30 animate-float"></div>
      </div>

      {/* CTA Section */}
      <section className="bg-yellow-400/5 dark:bg-blue-700/20 py-16">
        <div className="container mx-auto px-4">
          <div className="bg-white dark:bg-gray-900/70 rounded-2xl p-8 md:p-12 shadow-lg relative overflow-hidden backdrop-blur-sm border border-white/10 dark:border-white/5"
            style={{
              border: "1px solid rgb(234 179 8 / 10%)",
              borderColor: "rgb(234 179 8 / 10%)",
              backdropFilter: "blur(16px)"
            }}
          >
            {/* Background gradient */}
            <div className="absolute inset-0 bg-gradient-to-br from-yellow-400/5 via-transparent to-yellow-400/10 dark:from-blue-400/10 dark:via-transparent dark:to-blue-700/20"></div>
            
            {/* Decorative circles */}
            <div className="absolute -top-20 -right-20 w-64 h-64 bg-yellow-400/10 dark:bg-blue-400/10 rounded-full blur-3xl"></div>
            <div className="absolute -bottom-20 -left-20 w-80 h-80 bg-yellow-400/10 dark:bg-blue-400/10 rounded-full blur-3xl"></div>
            
            <div className="flex flex-col md:flex-row items-center justify-between relative z-10">
              <div className="mb-6 md:mb-0 md:w-2/3">
                <div className="inline-flex items-center px-3 py-1 bg-yellow-400/10 dark:bg-blue-400/10 rounded-full text-yellow-600 dark:text-blue-300 text-sm font-medium mb-3">
                  <Plane className="w-4 h-4 mr-2" /> Travel Revolution
                </div>
                <h2 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white mb-4">
                  {t('home:cta.title')}
                </h2>
                <p className="text-gray-700 dark:text-white/80">
                  {t('home:cta.description')}
                </p>
              </div>
              
              <div className="relative">
                <div className="absolute inset-0 bg-yellow-400/20 dark:bg-blue-400/20 rounded-full blur-xl transform scale-150 animate-pulse-slow"></div>
                <Button 
                  className="relative bg-gradient-to-r from-yellow-400 to-yellow-600 hover:from-yellow-500 hover:to-yellow-700 dark:from-blue-500 dark:to-blue-700 dark:hover:from-blue-600 dark:hover:to-blue-800 border-0 text-white font-medium py-3 px-6 rounded-lg flex items-center"
                  onClick={handleGetStarted}
                >
                  {t('home:cta.joinWaitlist')}
                  <ChevronRight size={16} className="ml-2" />
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 bg-yellow-400/5 dark:bg-blue-700/20 text-sm">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center gap-2 mb-4 md:mb-0">
              <Ticket size={20} className="text-yellow-500 dark:text-blue-400" />
              <span className="font-bold text-lg text-gray-900 dark:text-white">{t('common:appName')}</span>
            </div>
            
            <div className="text-center md:text-right">
              <p className="text-gray-700 dark:text-white/70">&copy; {new Date().getFullYear()} {t('common:appName')} - {t('common:footer.copyright', { year: new Date().getFullYear() })}</p>
              <p className="mt-1 text-gray-600 dark:text-white/60">Powered by BNB Network</p>
              
              <div className="mt-4 flex items-center justify-center md:justify-end gap-4">
                <div className="w-8 h-8 rounded-full bg-yellow-400/10 dark:bg-blue-400/10 flex items-center justify-center hover:bg-yellow-400/20 dark:hover:bg-blue-400/20 transition-colors cursor-pointer">
                  <CreditCard size={16} className="text-yellow-600 dark:text-blue-300" />
                </div>
                <div className="w-8 h-8 rounded-full bg-yellow-400/10 dark:bg-blue-400/10 flex items-center justify-center hover:bg-yellow-400/20 dark:hover:bg-blue-400/20 transition-colors cursor-pointer">
                  <Globe size={16} className="text-yellow-600 dark:text-blue-300" />
                </div>
                <div className="w-8 h-8 rounded-full bg-yellow-400/10 dark:bg-blue-400/10 flex items-center justify-center hover:bg-yellow-400/20 dark:hover:bg-blue-400/20 transition-colors cursor-pointer">
                  <Users size={16} className="text-yellow-600 dark:text-blue-300" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

function FeatureRow({ icon, title, description, details, position, number }) {
  return (
    <div className="relative grid grid-cols-5 md:grid-cols-5 mb-16 md:mb-0">
      {/* Connector to center line - visible only on desktop */}
      <div className="absolute left-1/2 top-1/2 w-10 h-1 bg-yellow-400 dark:bg-blue-500 transform -translate-x-1/2 -translate-y-1/2 hidden md:block"></div>
      
      {/* Card content based on position */}
      {position === 'left' ? (
        <>
          <div className="col-span-5 md:col-span-2 animate-fadeInLeft">
            <div className="bg-white dark:bg-gray-900/70 p-6 rounded-xl shadow-md hover:shadow-xl transition-all duration-500 border border-yellow-400/5 dark:border-blue-400/10 transform hover:-translate-y-2 group relative overflow-hidden">
              {/* Background decoration */}
              <div className="absolute -top-12 -right-12 w-24 h-24 rounded-full bg-yellow-400/10 dark:bg-blue-400/10 group-hover:bg-yellow-400/20 dark:group-hover:bg-blue-400/20 transition-all duration-500"></div>
              
              {/* Number indicator */}
              <div className="absolute top-4 right-4 font-bold text-4xl text-yellow-400/40 dark:text-blue-500/40 group-hover:text-yellow-400/60 dark:group-hover:text-blue-500/60 transition-all duration-500">
                {number}
              </div>
              
              <div className="p-3 rounded-full w-fit mb-4 relative z-10">
                {icon}
              </div>
              <h3 className="text-xl font-bold mb-3 relative z-10 text-gray-900 dark:text-white">{title}</h3>
              <p className="mb-5 relative z-10 text-gray-700 dark:text-white/80">{description}</p>
              
              {/* Feature details bullets */}
              <ul className="space-y-3 relative z-10">
                {details.map((detail, index) => (
                  <li key={index} className="flex items-start">
                    <div className="flex-shrink-0 w-6 h-6 bg-gradient-to-br from-yellow-400 to-yellow-600 dark:from-blue-400 dark:to-blue-600 rounded-full flex items-center justify-center mr-3">
                      <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <span className="text-sm text-gray-700 dark:text-white/80">{detail}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
          <div className="hidden md:block md:col-span-1"></div>
          <div className="hidden md:block md:col-span-2"></div>
        </>
      ) : (
        <>
          <div className="hidden md:block md:col-span-2"></div>
          <div className="hidden md:block md:col-span-1"></div>
          <div className="col-span-5 md:col-span-2 animate-fadeInRight">
            <div className="bg-white dark:bg-gray-900/70 p-6 rounded-xl shadow-md hover:shadow-xl transition-all duration-500 border border-yellow-400/5 dark:border-blue-400/10 transform hover:-translate-y-2 group relative overflow-hidden">
              {/* Background decoration */}
              <div className="absolute -top-12 -right-12 w-24 h-24 rounded-full bg-yellow-400/10 dark:bg-blue-400/10 group-hover:bg-yellow-400/20 dark:group-hover:bg-blue-400/20 transition-all duration-500"></div>
              
              {/* Number indicator */}
              <div className="absolute top-4 right-4 font-bold text-4xl text-yellow-400/40 dark:text-blue-500/40 group-hover:text-yellow-400/60 dark:group-hover:text-blue-500/60 transition-all duration-500">
                {number}
              </div>
              
              <div className="p-3 rounded-full w-fit mb-4 relative z-10">
                {icon}
              </div>
              <h3 className="text-xl font-bold mb-3 relative z-10 text-gray-900 dark:text-white">{title}</h3>
              <p className="mb-5 relative z-10 text-gray-700 dark:text-white/80">{description}</p>
              
              {/* Feature details bullets */}
              <ul className="space-y-3 relative z-10">
                {details.map((detail, index) => (
                  <li key={index} className="flex items-start">
                    <div className="flex-shrink-0 w-6 h-6 bg-gradient-to-br from-yellow-400 to-yellow-600 dark:from-blue-400 dark:to-blue-600 rounded-full flex items-center justify-center mr-3">
                      <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <span className="text-sm text-gray-700 dark:text-white/80">{detail}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </>
      )}
    </div>
  );
}

// Lazy loading component to improve performance 
function LazyLoadSection({ children }) {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = React.useRef(null);

  useEffect(() => {
    // Skip lazy loading for SSR
    if (typeof window === 'undefined') {
      setIsVisible(true);
      return;
    }
    
    // Use Intersection Observer to detect when component is visible
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { rootMargin: '100px' }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, []);

  return (
    <div ref={sectionRef} className="min-h-[300px]">
      {isVisible ? children : (
        <div className="bg-white/50 dark:bg-gray-900/50 rounded-xl h-full w-full animate-pulse">
          <div className="h-full flex items-center justify-center text-gray-400 dark:text-gray-600">
            <Plane className="w-12 h-12 animate-bounce opacity-30" />
          </div>
        </div>
      )}
    </div>
  );
}

export default Home;