import React, { useState, useContext } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Button } from '../components/ui/button';
import CreditCardOffer from '../components/ui/CreditCardOffer';
import { 
  Plane, 
  MapPin, 
  Calendar, 
  Users, 
  CreditCard,
  Bitcoin,
  Sparkles,
  CheckCircle,
  ArrowLeft,
  Clock,
  Shield,
  Zap
} from 'lucide-react';
import { createFlyBooking } from '../api/order';
import { MetamaskContext } from '../context/Metamask'
import {showError} from '../lib/toast';
import { OnChainContext } from '../context/onChain';

const Booking = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [paymentMethod, setPaymentMethod] = useState('crypto');
  const [isProcessing, setIsProcessing] = useState(false);
  const [bookingComplete, setBookingComplete] = useState(false);
  const [showCardOffer, setShowCardOffer] = useState(true);
  const { walletAddress } = useContext(MetamaskContext);
  const { payBooking } = useContext(OnChainContext);
  const { flight, searchParams } = location.state || {};

  if (!flight) {
    navigate('/');
    return null;
  }

  // Função para salvar os dados do voo no localStorage
  const saveFlightDataToCache = (bookingData, transactionData = null) => {
    try {
      // Criar objeto com os dados da reserva
      const bookingCache = {
        bookingId: bookingData.bookingId,
        flightInfo: {
          selectedPrice: flight.selectedPrice,
          origin: flight.origin,
          destination: flight.destination,
          departure: flight.departure,
          arrival: flight.arrival,
          duration: flight.duration,
          airline: flight.airline,
          airlineCode: flight.airlineCode,
          flightNumber: flight.flightNumber,
          aircraft: flight.aircraft,
          selectedClass: flight.selectedClass,
        },
        passengers: searchParams.passengers,
        paymentMethod: paymentMethod,
        bookingDate: new Date().toISOString(),
        walletAddress: walletAddress || null
      };

      // Se for pagamento em cripto e tiver dados da transação, adiciona essas informações
      if (paymentMethod === 'crypto' && transactionData) {
        bookingCache.transaction = {
          hash: transactionData.hash,
          blockNumber: transactionData.blockNumber,
          timestamp: new Date().toISOString()
        };
      }

      // Obter reservas anteriores ou iniciar um array vazio
      const existingBookings = JSON.parse(localStorage.getItem('tourfi_bookings') || '[]');
      
      // Adicionar a nova reserva
      existingBookings.push(bookingCache);
      
      // Salvar no localStorage
      localStorage.setItem('tourfi_bookings', JSON.stringify(existingBookings));
      
    } catch (error) {
      console.error('Erro ao salvar dados da reserva no cache:', error);
    }
  };

  const handlePayment = async () => {
    try {
      setIsProcessing(true);

      if (paymentMethod === 'crypto') {
        if (!walletAddress) {
          showError("Por favor, conecte sua carteira para efetuar o pagamento");
          setIsProcessing(false);
          return;
        }

        if (!payBooking) {
          showError("Serviço de pagamento não disponível. Tente novamente mais tarde.");
          console.error("Função payBooking não encontrada no contexto");
          setIsProcessing(false);
          return;
        }

        const response = await createFlyBooking({
          selectedPrice: flight.selectedPrice,
          origin: flight.origin,
          selectedClass: flight.selectedClass,
          destination: flight.destination,
          departure: flight.departure,
          arrival: flight.arrival,
          duration: flight.duration,
          airline: flight.airline,
          airlineCode: flight.airlineCode,
          flightNumber: flight.flightNumber,
          aircraft: flight.aircraft,
          passengers: searchParams.passengers,
          walletAddress: walletAddress,
          paymentMethod: paymentMethod
        });

        console.log('Resposta da API de reserva:', response);

        if (!response || !response.bookingId) {
          showError("Dados de reserva inválidos");
          console.error("Resposta de reserva inválida:", response);
          setIsProcessing(false);
          return;
        }

        let transactionData = null;
        
        if (paymentMethod === 'crypto') {
          if (!response.signature || !response.amountWei) {
            showError("Dados de pagamento em cripto inválidos");
            setIsProcessing(false);
            return;
          }

          try {
            // Pagamento onchain com cripto
            const responsePay = await payBooking(response.bookingId, response.signature, response.amountWei);
            console.log('Resposta do pagamento em cripto:', responsePay);
            
            if (responsePay) {
              transactionData = {
                hash: responsePay.hash,
                blockNumber: responsePay.blockNumber,
                timestamp: new Date().toISOString()
              };
              
              // Log detalhado da transação para debug
              console.log('Dados da transação que serão salvos:', {
                hash: responsePay.hash,
                blockNumber: responsePay.blockNumber
              });
              
              // Verificar se há informações completas sobre a transação
              if (!responsePay.hash) {
                console.warn('Hash da transação não encontrado na resposta');
                
                // Tentar extrair dados de transactionHash se disponível
                if (responsePay.transactionHash) {
                  transactionData.hash = responsePay.transactionHash;
                  console.log('Usando transactionHash como alternativa:', responsePay.transactionHash);
                }
              }
            } else {
              console.warn('Resposta do pagamento está vazia ou inválida');
            }
          } catch (error) {
            console.error("Erro no pagamento em cripto:", error);
            showError("Falha no pagamento em cripto. Tente novamente.");
            setIsProcessing(false);
            return;
          }
        }
        
        // Salvar dados no cache com informações da transação
        saveFlightDataToCache(response, transactionData);
      } else {
        // Pagamento com cartão (método normal)
        const response = await createFlyBooking({
          selectedPrice: flight.selectedPrice,
          origin: flight.origin,
          selectedClass: flight.selectedClass,
          destination: flight.destination,
          departure: flight.departure,
          arrival: flight.arrival,
          duration: flight.duration,
          airline: flight.airline,
          airlineCode: flight.airlineCode,
          flightNumber: flight.flightNumber,
          aircraft: flight.aircraft,
          passengers: searchParams.passengers,
          paymentMethod: 'card'
        });
        
        // Salvar dados no cache sem informações de transação blockchain
        if (response && response.bookingId) {
          saveFlightDataToCache(response);
        } else {
          showError("Falha ao processar pagamento com cartão");
          setIsProcessing(false);
          return;
        }
      }

      setIsProcessing(false);
      setBookingComplete(true);
      
    } catch (error) {
      setIsProcessing(false);
      showError("Erro ao processar o pagamento");
      console.error("Erro no pagamento:", error);
    }
  };

  const handleRequestCard = () => {
    // Navigate to the card application page
    navigate('/card-application');
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      weekday: 'long', 
      year: 'numeric',
      month: 'long', 
      day: 'numeric' 
    });
  };

  if (bookingComplete) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center p-4">
        <div className="max-w-2xl mx-auto">
          {/* Booking Confirmation */}
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-xl p-8 text-center mb-6">
            <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
              Booking Confirmed!
            </h2>
            <p className="text-gray-600 dark:text-gray-400 mb-6">
              Your flight has been successfully booked. You'll receive a confirmation email shortly.
            </p>
            <div className="bg-green-50 dark:bg-green-900/20 rounded-lg p-4 mb-6">
              <div className="text-sm text-green-800 dark:text-green-200">
                <Sparkles className="w-4 h-4 inline mr-1" />
                Crypto cashback of ${flight.selectedPrice.cashback} will be credited to your wallet within 24 hours!
              </div>
            </div>
          </div>

          {/* Credit Card Offer */}
          {showCardOffer && (
            <CreditCardOffer 
              onRequestCard={handleRequestCard}
              onDismiss={() => setShowCardOffer(false)}
            />
          )}

          {showCardOffer && (
            <div className="text-center mt-6">
              <Button 
                onClick={() => navigate('/')}
                variant="outline"
                className="border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800"
              >
                Back to Home
              </Button>
            </div>
          )}
        </div>
      </div>
    );
  }

  if (isProcessing) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-yellow-500 dark:border-blue-500 mx-auto mb-4"></div>
          <p className="text-gray-600 dark:text-gray-400">Processing your payment...</p>
          <p className="text-sm text-gray-500 dark:text-gray-500 mt-2">This may take a few moments</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-8">
      <div className="container mx-auto px-4 max-w-4xl">
        {/* Header */}
        <div className="flex items-center mb-6">
          <Button 
            variant="ghost" 
            onClick={() => navigate(-1)}
            className="mr-4"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Results
          </Button>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
            Complete Your Booking
          </h1>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Flight Details */}
          <div className="lg:col-span-2">
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6 mb-6">
              <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                Flight Details
              </h2>
              
              {/* Flight Info */}
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-gray-100 dark:bg-gray-700 rounded-full flex items-center justify-center">
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
                <div className="text-right">
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200">
                    {flight.selectedClass.split('_').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')}
                  </span>
                </div>
              </div>

              {/* Route */}
              <div className="flex items-center justify-between mb-4">
                <div className="text-center">
                  <div className="text-xl font-bold text-gray-900 dark:text-white">
                    {flight.departure.time}
                  </div>
                  <div className="text-sm text-gray-500 dark:text-gray-400">
                    {flight.origin.code}
                  </div>
                  <div className="text-xs text-gray-400 dark:text-gray-500">
                    {flight.origin.city}
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
                  <div className="text-xl font-bold text-gray-900 dark:text-white">
                    {flight.arrival.time}
                  </div>
                  <div className="text-sm text-gray-500 dark:text-gray-400">
                    {flight.destination.code}
                  </div>
                  <div className="text-xs text-gray-400 dark:text-gray-500">
                    {flight.destination.city}
                  </div>
                </div>
              </div>

              {/* Date and Passengers */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-4 border-t border-gray-200 dark:border-gray-700">
                <div className="flex items-center space-x-2">
                  <Calendar className="w-5 h-5 text-gray-400" />
                  <span className="text-gray-700 dark:text-gray-300">
                    {formatDate(flight.departure.date)}
                  </span>
                </div>
                <div className="flex items-center space-x-2">
                  <Users className="w-5 h-5 text-gray-400" />
                  <span className="text-gray-700 dark:text-gray-300">
                    {searchParams.passengers?.adults + searchParams.passengers?.children + searchParams.passengers?.infants || 2} passengers
                  </span>
                </div>
              </div>
            </div>

            {/* Payment Method */}
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6">
              <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                Payment Method
              </h2>
              
              <div className="space-y-3">
                {/* Crypto Payment */}
                <div 
                  className={`border rounded-lg p-4 cursor-pointer transition-colors ${
                    paymentMethod === 'crypto' 
                      ? 'border-yellow-400 dark:border-blue-500 bg-yellow-50 dark:bg-blue-900/20' 
                      : 'border-gray-200 dark:border-gray-600 hover:border-gray-300 dark:hover:border-gray-500'
                  }`}
                  onClick={() => setPaymentMethod('crypto')}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <Bitcoin className="w-6 h-6 text-yellow-500 dark:text-blue-400" />
                      <div>
                        <div className="font-medium text-gray-900 dark:text-white">
                          Pay with Cryptocurrency
                        </div>
                        <div className="text-sm text-gray-500 dark:text-gray-400">
                          Bitcoin, Ethereum, BNB and more
                        </div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-sm font-medium text-green-600 dark:text-green-400">
                        <Sparkles className="w-4 h-4 inline mr-1" />
                        5% Cashback
                      </div>
                      <div className="text-xs text-gray-500 dark:text-gray-400">
                        ${flight.selectedPrice.cashback}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Credit Card Payment */}
                <div 
                  className={`border rounded-lg p-4 cursor-pointer transition-colors ${
                    paymentMethod === 'card' 
                      ? 'border-yellow-400 dark:border-blue-500 bg-yellow-50 dark:bg-blue-900/20' 
                      : 'border-gray-200 dark:border-gray-600 hover:border-gray-300 dark:hover:border-gray-500'
                  }`}
                  onClick={() => setPaymentMethod('card')}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <CreditCard className="w-6 h-6 text-gray-400" />
                      <div>
                        <div className="font-medium text-gray-900 dark:text-white">
                          Credit/Debit Card
                        </div>
                        <div className="text-sm text-gray-500 dark:text-gray-400">
                          Visa, Mastercard, American Express
                        </div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-sm text-gray-500 dark:text-gray-400">
                        Standard rates apply
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Security Notice */}
              <div className="mt-4 p-3 bg-gray-50 dark:bg-gray-700/50 rounded-lg">
                <div className="flex items-center space-x-2 text-sm text-gray-600 dark:text-gray-400">
                  <Shield className="w-4 h-4" />
                  <span>Your payment is secured with 256-bit SSL encryption</span>
                </div>
              </div>
            </div>
          </div>

          {/* Price Summary */}
          <div className="lg:col-span-1">
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6 sticky top-8">
              <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                Price Summary
              </h2>
              
              <div className="space-y-3 mb-4">
                <div className="flex justify-between">
                  <span className="text-gray-600 dark:text-gray-400">Base fare</span>
                  <span className="text-gray-900 dark:text-white">${flight.selectedPrice.price}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600 dark:text-gray-400">Taxes & fees</span>
                  <span className="text-gray-900 dark:text-white">$0</span>
                </div>
                {paymentMethod === 'crypto' && (
                  <div className="flex justify-between text-green-600 dark:text-green-400">
                    <span>Crypto cashback</span>
                    <span>-${flight.selectedPrice.cashback}</span>
                  </div>
                )}
              </div>
              
              <div className="border-t border-gray-200 dark:border-gray-700 pt-3 mb-4">
                <div className="flex justify-between text-lg font-semibold">
                  <span className="text-gray-900 dark:text-white">Total</span>
                  <span className="text-gray-900 dark:text-white">
                    ${paymentMethod === 'crypto' 
                      ? flight.selectedPrice.price - flight.selectedPrice.cashback 
                      : flight.selectedPrice.price}
                  </span>
                </div>
                {paymentMethod === 'crypto' && (
                  <div className="text-lg text-gray-500 dark:text-gray-400 mt-1">
                    ≈ {flight.selectedPrice.cryptoPrice} {flight.selectedPrice.cryptoCurrency}
                  </div>
                )}
              </div>

              {/* Benefits */}
              <div className="space-y-2 mb-6">
                <div className="flex items-center space-x-2 text-sm text-gray-600 dark:text-gray-400">
                  <CheckCircle className="w-4 h-4 text-green-500" />
                  <span>Free cancellation within 24h</span>
                </div>
                <div className="flex items-center space-x-2 text-sm text-gray-600 dark:text-gray-400">
                  <CheckCircle className="w-4 h-4 text-green-500" />
                  <span>No hidden fees</span>
                </div>
                <div className="flex items-center space-x-2 text-sm text-gray-600 dark:text-gray-400">
                  <Zap className="w-4 h-4 text-yellow-500 dark:text-blue-400" />
                  <span>Instant confirmation</span>
                </div>
              </div>

              <Button 
                onClick={handlePayment}
                className="w-full bg-gradient-to-r from-yellow-400 to-yellow-600 hover:from-yellow-500 hover:to-yellow-700 dark:from-blue-500 dark:to-blue-700 dark:hover:from-blue-600 dark:hover:to-blue-800 text-white font-medium py-3"
              >
                {paymentMethod === 'crypto' ? (
                  <>
                    <Bitcoin className="w-5 h-5 mr-2" />
                    Pay with Crypto
                  </>
                ) : (
                  <>
                    <CreditCard className="w-5 h-5 mr-2" />
                    Pay with Card
                  </>
                )}
              </Button>

              {paymentMethod === 'crypto' && (
                <div className="mt-3 p-3 bg-yellow-50 dark:bg-blue-900/20 rounded-lg">
                  <div className="text-xs text-yellow-700 dark:text-blue-300 text-center">
                    <Sparkles className="w-3 h-3 inline mr-1" />
                    Save ${flight.selectedPrice.cashback} with crypto payment!
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Booking; 