export const mockFlights = [
  {
    id: 'FL001',
    airline: 'Lufthansa',
    airlineCode: 'LH',
    flightNumber: 'LH 441',
    aircraft: 'Airbus A350-900',
    origin: {
      code: 'ORIGIN',
      name: 'Origin Airport',
      city: 'Origin City',
      country: 'Origin Country'
    },
    destination: {
      code: 'DEST',
      name: 'Destination Airport', 
      city: 'Destination City',
      country: 'Destination Country'
    },
    departure: {
      time: '08:30',
      date: '2025-05-25',
      terminal: 'T1'
    },
    arrival: {
      time: '14:45',
      date: '2025-05-25',
      terminal: 'T2'
    },
    duration: '6h 15m',
    stops: 0,
    prices: {
      economy: {
        price: 450,
        currency: 'USD',
        cryptoPrice: "0.0000000001",
        cryptoCurrency: 'BNB',
        cashback: 22.5
      },
      premium_economy: {
        price: 750,
        currency: 'USD',
        cryptoPrice: "0.00000000020",
        cryptoCurrency: 'BNB',
        cashback: 37.5
      },
      business: {
        price: 1200,
        currency: 'USD',
        cryptoPrice: "0.00000000032",
        cryptoCurrency: 'BNB',
        cashback: 60
      },
      first_class: {
        price: 2500,
        currency: 'USD',
        cryptoPrice: "0.00000000067", 
        cryptoCurrency: 'BNB',
        cashback: 125
      }
    },
    amenities: ['WiFi', 'Entertainment', 'Meals', 'Power Outlets'],
    baggage: {
      carry_on: '8kg',
      checked: '23kg'
    }
  },
  {
    id: 'FL002',
    airline: 'Emirates',
    airlineCode: 'EK',
    flightNumber: 'EK 205',
    aircraft: 'Boeing 777-300ER',
    origin: {
      code: 'ORIGIN',
      name: 'Origin Airport',
      city: 'Origin City',
      country: 'Origin Country'
    },
    destination: {
      code: 'DEST',
      name: 'Destination Airport',
      city: 'Destination City', 
      country: 'Destination Country'
    },
    departure: {
      time: '15:20',
      date: '2025-05-25',
      terminal: 'T3'
    },
    arrival: {
      time: '23:10',
      date: '2025-05-25',
      terminal: 'T1'
    },
    duration: '7h 50m',
    stops: 1,
    stopover: {
      airport: 'DXB',
      city: 'Dubai',
      duration: '2h 30m'
    },
    prices: {
      economy: {
        price: 380,
        currency: 'USD',
        cryptoPrice: "0.00000000010",
        cryptoCurrency: 'BNB',
        cashback: 19
      },
      premium_economy: {
        price: 680,
        currency: 'USD',
        cryptoPrice: "0.00000000018",
        cryptoCurrency: 'BNB',
        cashback: 34
      },
      business: {
        price: 1450,
        currency: 'USD',
        cryptoPrice: "0.00000000039",
        cryptoCurrency: 'BNB',  
        cashback: 72.5
      },
      first_class: {
        price: 3200,
        currency: 'USD',
        cryptoPrice: "0.00000000086",
        cryptoCurrency: 'BNB',
        cashback: 160
      }
    },
    amenities: ['WiFi', 'Entertainment', 'Premium Meals', 'Lounge Access', 'Power Outlets'],
    baggage: {
      carry_on: '7kg',
      checked: '30kg'
    }
  },
  {
    id: 'FL003',
    airline: 'British Airways',
    airlineCode: 'BA',
    flightNumber: 'BA 117',
    aircraft: 'Boeing 787-9',
    origin: {
      code: 'ORIGIN',
      name: 'Origin Airport',
      city: 'Origin City',
      country: 'Origin Country'
    },
    destination: {
      code: 'DEST',
      name: 'Destination Airport',
      city: 'Destination City',
      country: 'Destination Country'
    },
    departure: {
      time: '11:45',
      date: '2025-05-25',
      terminal: 'T5'
    },
    arrival: {
      time: '18:30',
      date: '2025-05-25',
      terminal: 'T2'
    },
    duration: '6h 45m',
    stops: 0,
    prices: {
      economy: {
        price: 520,
        currency: 'USD',
        cryptoPrice: "0.00000000014",
        cryptoCurrency: 'BNB',
        cashback: 26
      },
      premium_economy: {
        price: 820,
        currency: 'USD',
        cryptoPrice: "0.00000000022",
        cryptoCurrency: 'BNB',
        cashback: 41
      },
      business: {
        price: 1350,
        currency: 'USD',
        cryptoPrice: "0.00000000036",
        cryptoCurrency: 'BNB',
        cashback: 67.5
      },
      first_class: {
        price: 2800,
        currency: 'USD',
        cryptoPrice: "0.00000000075",
        cryptoCurrency: 'BNB',
        cashback: 140
      }
    },
    amenities: ['WiFi', 'Entertainment', 'Meals', 'Power Outlets', 'Extra Legroom'],
    baggage: {
      carry_on: '8kg',
      checked: '23kg'
    }
  }
];

// eslint-disable-next-line no-unused-vars
export const getFlightResults = (origin, destination, departureDate, _returnDate, _passengers, _selectedClass) => {
  // Replace the mock origin and destination with user selected ones
  return mockFlights.map(flight => ({
    ...flight,
    origin: {
      ...flight.origin,
      code: origin?.code || flight.origin.code,
      name: origin?.name || flight.origin.name,
      city: origin?.city || flight.origin.city,
      country: origin?.country || flight.origin.country
    },
    destination: {
      ...flight.destination,
      code: destination?.code || flight.destination.code,
      name: destination?.name || flight.destination.name,
      city: destination?.city || flight.destination.city,
      country: destination?.country || flight.destination.country
    },
    departure: {
      ...flight.departure,
      date: departureDate || flight.departure.date
    }
  }));
}; 