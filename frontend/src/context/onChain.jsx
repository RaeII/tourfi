/* eslint-disable react-refresh/only-export-components */
/* eslint-disable no-unused-vars */

import { useEffect, useState, createContext, useContext, useCallback } from "react";
import { ethers } from "ethers";
import { MetamaskContext } from './Metamask'
import tourfi from '../Contract/TourFI.json'

export const OnChainContext = createContext();
const TOURFI_CONTRACT_ADDRESS = import.meta.env.VITE_TOURFI_CONTRACT_ADDRESS;


export const OnChainProvider = ({children}) => {

  const {
    isBSCNetwork,
    walletAddress,
  } = useContext(MetamaskContext);


  const [provider, setProvider] = useState(null);
  const [tourfiContract, setTourfiContract] = useState(null); 
  const [transactionHash, setTransactionHash] = useState(null);
  
  // Inicializa o provider
  const initializeProvider = useCallback(async () => {
    if (!window?.ethereum) return null;
    const providerOnChain = new ethers.providers.Web3Provider(window.ethereum);
    setProvider(providerOnChain);
    return providerOnChain;
  }, []);

  // Inicializa o contrato
  const initializeContract = useCallback(async (providerInstance) => {
    if (!providerInstance) return null;
    const signer = await providerInstance.getSigner();
    const contract = new ethers.Contract(
      TOURFI_CONTRACT_ADDRESS,
      tourfi.abi,
      signer
    );
    setTourfiContract(contract);
    return contract;
  }, []);

  const payBooking = async (bookingId, signature, amountWei) => {
    try {

      // Verificar se os parâmetros são válidos
      if (!bookingId || !signature || !amountWei) {
        throw new Error("Parâmetros inválidos para pagamento da reserva");
      }

      // Verificar se o contrato está inicializado
      if (!tourfiContract) {
        const providerInstance = await initializeProvider();
        if (!providerInstance) {
          throw new Error("Não foi possível inicializar o provider");
        }
        
        const contractInstance = await initializeContract(providerInstance);
        if (!contractInstance) {
          throw new Error("Não foi possível inicializar o contrato");
        }
      }

      // Verificar novamente se o contrato está inicializado
      if (!tourfiContract) {
        throw new Error("O contrato não está inicializado após tentativa de inicialização");
      }

      // Verificar se a rede está correta
      if (!isBSCNetwork) {
        throw new Error("Por favor, conecte-se à rede BNB Chain para continuar");
      }
   
      const tx = await tourfiContract.payBooking(
        bookingId,
        signature,
        {value: amountWei}
      );
      
      console.log("Transação enviada:", tx);
      
      if (tx) {
        // Aguardar a confirmação da transação
        const transaction = await tx.wait();

        console.log("Transação confirmada:", transaction);

        // Salvar o hash da transação no localStorage
        localStorage.setItem(`${walletAddress}${TOURFI_CONTRACT_ADDRESS}`, transaction.hash);
        setTransactionHash(transaction.hash);

        await initializeData();
        
        // Retornar um objeto estruturado com os dados da transação
        return {
          hash: transaction.transactionHash || transaction.hash,
          blockNumber: transaction.blockNumber,
          blockHash: transaction.blockHash,
          from: transaction.from,
          to: transaction.to,
          timestamp: new Date().toISOString(),
          status: transaction.status === 1 ? 'success' : 'failed',
          gasUsed: transaction.gasUsed?.toString(),
          confirmations: transaction.confirmations,
          chainId: transaction.chainId,
          // Incluir o objeto original para debug se necessário
          _original: transaction
        };
      } else {
        throw new Error("Erro na execução da transação");
      }

    } catch (e) {
      if(e.code === 'ACTION_REJECTED') {
        console.log('Ação rejeitada pelo usuário.');
      } else if(e.code === -32603){
        console.log('Falha ao completar a operação');
      }

      console.error("Erro completo na transação:", e);
      throw e;
    }
  }

  const decodeError = (errorData) => {
    try {
      if (!tourfiContract) {
        console.error("Contrato não está inicializado para decodificar o erro");
        return null;
      }
      
      // Mapeamento de erros comuns pelo seu seletor de erro (primeiros 4 bytes)
      const commonErrors = {
        '0x3ee5aeb5': 'ReentrancyGuardReentrantCall - Tentativa de chamar uma função protegida por nonReentrant durante uma chamada já em andamento',
        '0x9e87fac8': 'BookingAlreadyPaid - A reserva já foi paga',
        '0xbd56bf67': 'InvalidSignature - A assinatura fornecida é inválida',
        '0x025dbdd4': 'InsufficientPayment - O pagamento fornecido é insuficiente',
        '0x49a19977': 'WithdrawalFailed - Falha ao retirar fundos'
      };

      // Verifica se é um dos erros comuns conhecidos
      if (commonErrors[errorData]) {
        console.log("Erro conhecido:", commonErrors[errorData]);
        return { name: commonErrors[errorData], args: [] };
      }
      
      // Tenta usar a interface do contrato para decodificar
      const decodedError = tourfiContract.interface.parseError(errorData);
      console.log("Erro decodificado:", decodedError);
      return decodedError;
    } catch (decodeError) {
      console.error("Não foi possível decodificar o erro:", decodeError);
      return null;
    }
  };

    // Função que inicializa todos os dados
    const initializeData = useCallback(async () => {
      if(!isBSCNetwork) return;

      try {
        const providerInstance = await initializeProvider();
        if (!providerInstance || !walletAddress) return;

        const contractInstance = await initializeContract(providerInstance);
        if (!contractInstance) return;

        console.log("Contrato inicializado com sucesso:", contractInstance);
      } catch (error) {
        console.error("Error initializing data:", error);
      }
    }, [initializeContract, initializeProvider, walletAddress, isBSCNetwork]);
  
    useEffect(() => {
      initializeData();
    }, [initializeData, walletAddress, isBSCNetwork]);
  

  return (
    <OnChainContext.Provider value={{
      payBooking,
      decodeError
    }}>
        {children}
    </OnChainContext.Provider>
  )
}