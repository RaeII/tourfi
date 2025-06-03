import { useEffect, useState, useCallback } from "react";
import { createContext } from "react";
import { showError, showSuccess, showWarning, showInfo } from "../lib/toast";

if (import.meta.env.MODE === 'development') {
  console.log('Estamos em desenvolvimento');
} else {
  console.log('Estamos em produção');
}

const NETWORK_ID_BSC = import.meta.env.VITE_NETWORK_ID_BSC;
console.log({NETWORK_ID_BSC});
const CHAIN_NAME= import.meta.env.VITE_CHAIN_NAME
const RPC_URL= import.meta.env.VITE_RPC_URL
const SYMBOL= import.meta.env.VITE_SYMBOL
const BLOCK_EXPLORER_URL= import.meta.env.VITE_BLOCK_EXPLORER_URL

const networkData = {
  chainId: NETWORK_ID_BSC,
  chainName: CHAIN_NAME,
  rpcUrls: [RPC_URL],
  nativeCurrency: {
    name: SYMBOL,
    symbol: SYMBOL,
    decimals: 18
  }
};

// eslint-disable-next-line react-refresh/only-export-components
export const MetamaskContext = createContext();

export const MetamaskProvider = ({ children }) => {
  const [walletAddress, setWalletAddress] = useState('');
  const [isBSCNetwork, setIsBSCNetwork] = useState(false);
  const [networkError, setNetworkError] = useState('');

  /**
   * CHECKA A REDE CONECTADA DA METAMASK
   */
  const checkNetwork = useCallback(async () => {
    if (!window.ethereum) return;

    const currentChainId = await window.ethereum.request({ method: 'eth_chainId' });
    //console.log({ currentChainId, NETWORK_ID_BSC });
    
    if (currentChainId !== NETWORK_ID_BSC) {
      try {
        await window.ethereum.request({
          method: 'wallet_addEthereumChain',
          params: [networkData]
        });
        setIsBSCNetwork(true);
        setNetworkError('');
      } catch (error) {
        console.error("Erro ao adicionar a rede BSC:", error);
        setIsBSCNetwork(false);
        const errorMsg = "Erro ao adicionar a rede. Verifique as configurações.";
        setNetworkError(errorMsg);
        showError(errorMsg);
      }
    } else {
      setIsBSCNetwork(true);
      setNetworkError('');
    }
  }, []);

  // Troca para a rede da BSC
  const switchNetwork = useCallback(async () => {
    try {
      await window.ethereum.request({
        method: 'wallet_switchEthereumChain',
        params: [{ chainId: NETWORK_ID_BSC }],
      });
      return true;
    } catch (error) {
      if (error.code === 4902) return false; // Usuário não tem a rede adicionada na carteira
      if (error.code === 4001) {
        const errorMsg = 'Request recusado pelo usuário';
        setNetworkError(errorMsg);
        showWarning(errorMsg);
        return true;
      }
      console.error("Erro ao trocar de rede:", error);
      return false;
    }
  }, []);

  // Evento do botão para adicionar a rede a carteira
  const addNetwork = useCallback(async () => {
    if (!window.ethereum) {
      const errorMsg = "MetaMask não está instalado";
      setNetworkError(errorMsg);
      showError(errorMsg);
      return;
    }

    const currentChainId = await window.ethereum.request({ method: 'eth_chainId' });
    
    if (currentChainId === NETWORK_ID_BSC) {
      setNetworkError('');
      return;
    }

    const network = await switchNetwork();
    if (network) return;

    

    if(BLOCK_EXPLORER_URL)networkData.blockExplorerUrls = [BLOCK_EXPLORER_URL]

    try {
      await window.ethereum.request({
        method: 'wallet_addEthereumChain',
        params: [networkData]
      });

      await window.ethereum.request({
        method: 'wallet_switchEthereumChain',
        params: [{ chainId: NETWORK_ID_BSC }]
      });
      
      setNetworkError('');
      setIsBSCNetwork(true);
      showSuccess("Rede adicionada com sucesso!");
    } catch (error) {
      if (error.code === 4001) {
        const errorMsg = 'Request recusado pelo usuário';
        setNetworkError(errorMsg);
        showWarning(errorMsg);
      } else {
        console.error("Erro ao adicionar a rede:", error);
        const errorMsg = "Erro ao adicionar a rede";
        setNetworkError(errorMsg);
        showError(errorMsg);
      }
    }
  }, [switchNetwork]);

  /**
   * CHECKA A CONEXÃO DA METAMASK
   */
  const checkIfWalletIsConnected = useCallback(async () => {
    try {
      const { ethereum } = window;
      if (!ethereum) return false;

      const accounts = await ethereum.request({ method: "eth_accounts" });
      if (accounts.length !== 0) {
        setWalletAddress(accounts[0]);
        await checkNetwork();
        return true;
      }
      return false;
    } catch (error) {
      console.error("Erro ao verificar conexão da carteira:", error);
      return false;
    }
  }, [checkNetwork]);

  /**
   * CLICK DO BOTÃO PARA CONECTAR METAMASK
   */
  const connectWalletAction = useCallback(async () => {
    try {
      const { ethereum } = window;
      if (!ethereum) {
        showError("MetaMask não está instalado. Por favor instale-o para continuar.");
        window.open('https://metamask.io/download/', '_blank', 'noopener,noreferrer');
        return;
      }

      const accounts = await ethereum.request({ method: "eth_requestAccounts" });
      setWalletAddress(accounts[0]);
      await checkNetwork();
      showSuccess("Carteira conectada com sucesso!");
    } catch (error) {
      console.error("Erro ao conectar carteira:", error);
      showError("Erro ao conectar carteira. Tente novamente.");
    }
  }, [checkNetwork]);

  /**
   * DESCONECTA A CARTEIRA
   */
  const disconnectWallet = useCallback(() => {
    setWalletAddress('');
    // Como a Metamask não tem um método API direto para desconectar,
    // apenas limpamos o estado local
    localStorage.removeItem('metamask_connected');
    
    // Se houver outros dados que precisam ser limpos, faça aqui
    showInfo("Carteira desconectada");
  }, []);

  /**
   * SE O USUÁRIO TROCAR DE CARTEIRA
   */
  const handleAccountsChanged = useCallback((accounts) => {
    if (accounts.length === 0) {
      setWalletAddress('');
      showInfo("Carteira desconectada");
    } else {
      setWalletAddress(accounts[0]);
      showInfo("Conta da carteira alterada");
    }
  }, []);

  const handleChainChanged = useCallback((chainId) => {
    if (chainId !== NETWORK_ID_BSC) {
      setIsBSCNetwork(false);
      const errorMsg = "Rede incorreta. Por favor, troque para a rede BSC.";
      setNetworkError(errorMsg);
      showWarning(errorMsg);
    } else {
      setIsBSCNetwork(true);
      setNetworkError('');
      showSuccess("Conectado à rede correta");
    }
  }, []);

  useEffect(() => {
    checkIfWalletIsConnected();

    if (window.ethereum) {
      window.ethereum.on('accountsChanged', handleAccountsChanged);
      window.ethereum.on('chainChanged', handleChainChanged);
    }

    return () => {
      if (window.ethereum) {
        window.ethereum.removeListener('accountsChanged', handleAccountsChanged);
        window.ethereum.removeListener('chainChanged', handleChainChanged);
      }
    };
  }, [checkIfWalletIsConnected, handleAccountsChanged, handleChainChanged]);

  return (
    <MetamaskContext.Provider value={{
      isBSCNetwork,
      checkIfWalletIsConnected,
      connectWalletAction,
      disconnectWallet,
      addNetwork,
      walletAddress,
      networkError
    }}>
      {children}
    </MetamaskContext.Provider>
  );
};