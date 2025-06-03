export interface Price {
  price: number;
  currency: string;
  cryptoPrice: number;
  cryptoCurrency: string;
  cashback: number;
}

export interface Airport {
  code: string;
  name: string;
  city: string;
  country: string;
}

export interface FlightTime {
  time: string;
  date: string;
  terminal: string;
}

export interface FlyBookingData {
  selectedPrice: Price;
  selectedClass: string;
  origin: Airport;
  destination: Airport;
  departure: FlightTime;
  arrival: FlightTime;
  duration: string;
  airline: string;
  airlineCode: string;
  flightNumber: string;
  aircraft: string;
  walletAddress: string;
  paymentMethod: string;
  }

export interface FlyBookingCreate {
  data: string;
  register_date: Date;
}

export interface FlyBookingResponse {
  id: number;
  data: FlyBookingData;
  register_date: Date;
} 