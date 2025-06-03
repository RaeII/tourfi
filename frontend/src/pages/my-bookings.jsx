import React, { useEffect, useState, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '../components/ui/button';
import { 
  Plane, 
  Calendar, 
  Users, 
  CreditCard,
  Bitcoin,
  CheckCircle,
  ArrowLeft,
  ExternalLink,
  Clock
} from 'lucide-react';
import { MetamaskContext } from '../context/Metamask';

// Obter URL do explorador de blocos da variável de ambiente
const BLOCK_EXPLORER_URL = import.meta.env.VITE_BLOCK_EXPLORER_URL || 'https://testnet.bscscan.com';

const MyBookings = () => {
  const navigate = useNavigate();
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const { walletAddress } = useContext(MetamaskContext);

  useEffect(() => {
    // Carregar reservas do localStorage
    const loadBookings = () => {
      try {
        setLoading(true);
        const savedBookings = JSON.parse(localStorage.getItem('tourfi_bookings') || '[]');
        
        // Filtrar por endereço da carteira se estiver conectado
        const filteredBookings = walletAddress 
          ? savedBookings.filter(booking => booking.walletAddress === walletAddress)
          : savedBookings;
        
        console.log('Reservas carregadas:', filteredBookings);
        setBookings(filteredBookings);
      } catch (error) {
        console.error('Erro ao carregar reservas:', error);
        setBookings([]);
      } finally {
        setLoading(false);
      }
    };

    loadBookings();
  }, [walletAddress]);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('pt-BR', { 
      weekday: 'long', 
      year: 'numeric',
      month: 'long', 
      day: 'numeric' 
    });
  };

  // Função para formatar o ID da reserva de forma segura
  const formatBookingId = (bookingId) => {
    if (typeof bookingId === 'string' && bookingId.length > 0) {
      return bookingId.substring(0, 8);
    }
    return 'ID-' + Math.random().toString(36).substring(2, 8).toUpperCase();
  };

  // Função para abrir o link da transação no explorer
  const openTransactionExplorer = (txHash) => {
    if (!txHash) return;
    const explorerUrl = `${BLOCK_EXPLORER_URL}/tx/${txHash}`;
    window.open(explorerUrl, '_blank');
  };

  // Função para abrir o link do endereço no explorer
  const openAddressExplorer = (address) => {
    if (!address) return;
    const explorerUrl = `${BLOCK_EXPLORER_URL}/address/${address}`;
    window.open(explorerUrl, '_blank');
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-yellow-500 dark:border-blue-500 mx-auto mb-4"></div>
          <p className="text-gray-600 dark:text-gray-400">Carregando suas reservas...</p>
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
            onClick={() => navigate('/')}
            className="mr-4"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Voltar
          </Button>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
            Minhas Reservas
          </h1>
        </div>

        {/* No bookings message */}
        {bookings.length === 0 && (
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-8 text-center">
            <div className="text-gray-500 dark:text-gray-400 mb-4">
              Você ainda não tem reservas.
            </div>
            <Button 
              onClick={() => navigate('/')}
              className="bg-gradient-to-r from-yellow-400 to-yellow-600 hover:from-yellow-500 hover:to-yellow-700 dark:from-blue-500 dark:to-blue-700 text-white"
            >
              Buscar Voos
            </Button>
          </div>
        )}

        {/* Bookings list */}
        {bookings.length > 0 && (
          <div className="space-y-6">
            {bookings.map((booking, index) => (
              <div key={index} className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6">
                {/* Booking header */}
                <div className="flex justify-between items-center mb-4">
                  <div className="flex items-center space-x-2">
                    <CheckCircle className="w-5 h-5 text-green-500" />
                    <span className="font-medium text-gray-900 dark:text-white">
                      Reserva #{formatBookingId(booking.bookingId)}
                    </span>
                  </div>
                  <div>
                    {booking.flightInfo && booking.flightInfo.selectedClass && (
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200">
                        {booking.flightInfo.selectedClass.split('_').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')}
                      </span>
                    )}
                  </div>
                </div>

                {booking.flightInfo && (
                  <>
                    {/* Flight Info */}
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center space-x-3">
                        <div className="w-10 h-10 bg-gray-100 dark:bg-gray-700 rounded-full flex items-center justify-center">
                          <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                            {booking.flightInfo.airlineCode || 'AA'}
                          </span>
                        </div>
                        <div>
                          <div className="font-medium text-gray-900 dark:text-white">
                            {booking.flightInfo.airline || 'Airline'}
                          </div>
                          <div className="text-sm text-gray-500 dark:text-gray-400">
                            {booking.flightInfo.flightNumber || 'FL000'} • {booking.flightInfo.aircraft || 'Aircraft'}
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Route */}
                    <div className="flex items-center justify-between mb-4">
                      <div className="text-center">
                        <div className="text-xl font-bold text-gray-900 dark:text-white">
                          {booking.flightInfo.departure?.time || '00:00'}
                        </div>
                        <div className="text-sm text-gray-500 dark:text-gray-400">
                          {booking.flightInfo.origin?.code || 'ORG'}
                        </div>
                        <div className="text-xs text-gray-400 dark:text-gray-500">
                          {booking.flightInfo.origin?.city || 'Origin City'}
                        </div>
                      </div>
                      
                      <div className="flex-1 mx-8">
                        <div className="flex items-center justify-center">
                          <div className="flex-1 border-t border-gray-300 dark:border-gray-600"></div>
                          <div className="mx-4 text-center">
                            <Plane className="w-5 h-5 text-gray-400 mx-auto mb-1" />
                            <div className="text-xs text-gray-500 dark:text-gray-400">
                              {booking.flightInfo.duration || '0h 0m'}
                            </div>
                          </div>
                          <div className="flex-1 border-t border-gray-300 dark:border-gray-600"></div>
                        </div>
                      </div>
                      
                      <div className="text-center">
                        <div className="text-xl font-bold text-gray-900 dark:text-white">
                          {booking.flightInfo.arrival?.time || '00:00'}
                        </div>
                        <div className="text-sm text-gray-500 dark:text-gray-400">
                          {booking.flightInfo.destination?.code || 'DST'}
                        </div>
                        <div className="text-xs text-gray-400 dark:text-gray-500">
                          {booking.flightInfo.destination?.city || 'Destination City'}
                        </div>
                      </div>
                    </div>

                    {/* Date and Passengers */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-4 border-t border-gray-200 dark:border-gray-700">
                      <div className="flex items-center space-x-2">
                        <Calendar className="w-5 h-5 text-gray-400" />
                        <span className="text-gray-700 dark:text-gray-300">
                          {booking.flightInfo.departure?.date ? formatDate(booking.flightInfo.departure.date) : 'Data não disponível'}
                        </span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Users className="w-5 h-5 text-gray-400" />
                        <span className="text-gray-700 dark:text-gray-300">
                          {booking.passengers ? 
                            (booking.passengers.adults + booking.passengers.children + booking.passengers.infants) : 1} passageiros
                        </span>
                      </div>
                    </div>

                    {/* Payment Info */}
                    <div className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-700">
                      <div className="flex justify-between items-center">
                        <div className="flex items-center space-x-2">
                          {booking.paymentMethod === 'crypto' ? (
                            <>
                              <Bitcoin className="w-5 h-5 text-yellow-500 dark:text-blue-400" />
                              <span className="text-gray-700 dark:text-gray-300">
                                Pago com Criptomoeda
                              </span>
                            </>
                          ) : (
                            <>
                              <CreditCard className="w-5 h-5 text-gray-400" />
                              <span className="text-gray-700 dark:text-gray-300">
                                Pago com Cartão
                              </span>
                            </>
                          )}
                        </div>
                        <div className="text-right">
                          <div className="font-medium text-gray-900 dark:text-white">
                            ${booking.flightInfo.selectedPrice?.price || '0.00'}
                          </div>
                          <div className="text-sm text-gray-500 dark:text-gray-400">
                            {booking.paymentMethod === 'crypto' && booking.flightInfo.selectedPrice?.cryptoPrice && 
                              `≈ ${booking.flightInfo.selectedPrice.cryptoPrice} ${booking.flightInfo.selectedPrice.cryptoCurrency || 'BNB'}`
                            }
                          </div>
                        </div>
                      </div>

                      {/* Wallet Address */}
                      {booking.paymentMethod === 'crypto' && booking.walletAddress && (
                        <div className="mt-3 flex items-center text-sm text-gray-500 dark:text-gray-400">
                          <span className="mr-2">Carteira:</span>
                          <span className="font-mono">{booking.walletAddress.substring(0, 8)}...{booking.walletAddress.substring(booking.walletAddress.length - 6)}</span>
                          <Button
                            variant="default"
                            size="sm"
                            className="text-xs ml-2 p-1 h-auto"
                            onClick={() => openAddressExplorer(booking.walletAddress)}
                          >
                            <ExternalLink className="w-3 h-3 text-white" />
                          </Button>
                        </div>
                      )}

                      {/* Transaction details for crypto payments - adicionar verificação mais robusta */}
                      {booking.paymentMethod === 'crypto' && (
                        <div className="mt-3 pt-3 border-t border-gray-200 dark:border-gray-700">
                          <div className="flex justify-between items-center">
                            <div className="text-sm text-gray-500 dark:text-gray-400">
                              <Clock className="w-4 h-4 inline mr-1" />
                              {booking.transaction && booking.transaction.timestamp ? 
                                new Date(booking.transaction.timestamp).toLocaleString('pt-BR') : 
                                new Date(booking.bookingDate || new Date()).toLocaleString('pt-BR')}
                            </div>
                            {booking.transaction && booking.transaction.hash ? (
                              <Button
                                variant="secondary"
                                size="sm"
                                className="text-xs text-white"
                                onClick={() => openTransactionExplorer(booking.transaction.hash)}
                              >
                                <ExternalLink className="w-3 h-3 mr-1 text-white" />
                                Ver Transação
                              </Button>
                            ) : null}
                          </div>
                        </div>
                      )}
                    </div>
                  </>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default MyBookings; 