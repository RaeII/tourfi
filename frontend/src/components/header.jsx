import { Link } from 'react-router-dom'
import { ThemeToggle } from './ui/theme-toggle'
import { LanguageSwitcher } from './LanguageSwitcher'
import { cn } from '../lib/utils'
import { Button } from './ui/button'
import { useContext, useState } from 'react'
import { MetamaskContext } from '../context/Metamask'
import { X, Ticket } from 'lucide-react'

export function Header({ className }) {
  // const navigate = useNavigate();
  // const location = useLocation();
  // const { 
  //   isAuthenticated, 
  // } = useWalletContext();
  
  // // Verifica se está na página app ou em subpáginas do app
  // const isAppRoute = location.pathname.startsWith('/app') || location.pathname.startsWith('/dashboard');

  // const handleAccessApp = () => {
  //   // Se o usuário estiver autenticado, redireciona para dashboard, caso contrário para app
  //   const destination = isAuthenticated ? '/dashboard' : '/app';
  //   navigate(destination);
  // };

  const { 
    connectWalletAction, 
    walletAddress, 
    isBSCNetwork, 
    addNetwork, 
    disconnectWallet
  } = useContext(MetamaskContext);
  const [showDisconnect, setShowDisconnect] = useState(false);

  const handleConnectWallet = () => {
    connectWalletAction();
  };

  const handleAddNetwork = () => {
    addNetwork();
  };

  const handleDisconnect = () => {
    disconnectWallet();
    setShowDisconnect(false);
  };

  // Função para formatar o endereço da carteira
  const formatWalletAddress = (address) => {
    if (!address) return '';
    return `${address.substring(0, 6)}...${address.substring(address.length - 4)}`;
  };

  return (
    <header className={cn("border-b border-secondary/10 dark:border-white/10 bg-background sticky top-0 z-50", className)}>
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        <Link to={'/'} className="flex items-center gap-2 text-primary dark:text-white">
          <span className="font-bold text-text-adaptive text-2xl bg-clip-text bg-gradient-to-r from-yellow-400 to-yellow-600">
            TourFi
          </span>
        </Link>
        
        {/* Navigation Links */}
        <nav className="hidden md:flex items-center space-x-6">
          <Link to="/" className="text-sm font-medium text-text-adaptive hover:text-yellow-500 transition-colors">
            Features
          </Link>
          <Link to="/community-guide" className="text-sm font-medium text-text-adaptive hover:text-yellow-500 transition-colors">
            Community Guides
          </Link>
          <Link to="/my-bookings" className="text-sm font-medium text-text-adaptive hover:text-yellow-500 transition-colors flex items-center">
            Minhas Reservas
          </Link>
          <Link to="/" className="text-sm font-medium text-text-adaptive hover:text-yellow-500 transition-colors">
            About
          </Link>
        </nav>
        
        <div className="flex items-center gap-4">
          {walletAddress ? (
            <div className="flex items-center gap-2">
              <div className="relative flex items-center">
                <div 
                  className="px-3 py-1.5 rounded-md bg-secondary/10 transition-colors w-[120px]"
                  onMouseEnter={() => setShowDisconnect(true)}
                  onMouseLeave={() => setShowDisconnect(false)}
                >
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium text-text-adaptive">
                      {formatWalletAddress(walletAddress)}
                    </span>
                    
                    {showDisconnect && (
                      <button 
                        onClick={handleDisconnect}
                        className="text-red-500 hover:text-red-600 transition-colors"
                        title="Desconectar carteira"
                      >
                        <X size={16} />
                      </button>
                    )}
                  </div>
                </div>
              </div>
              {!isBSCNetwork && (
                <Button 
                  variant="outline" 
                  size="sm" 
                  className="btn-outline-primary" 
                  onClick={handleAddNetwork}
                >
                  Trocar Rede
                </Button>
              )}
            </div>
          ) : (
            <Button 
              variant="outline" 
              size="sm" 
              className="btn-outline-primary"
              onClick={handleConnectWallet}
            >
              Conectar Carteira
            </Button>
          )}
          <div className="flex items-center gap-2">
            <LanguageSwitcher />
            <ThemeToggle />
          </div>
        </div>
      </div>
    </header>
  )
} 