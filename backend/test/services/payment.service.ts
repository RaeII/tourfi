import { ethers } from 'hardhat';
import { HardhatEthersSigner } from '@nomicfoundation/hardhat-ethers/signers';

class PaymentService {
  /**
   * Assina uma mensagem para autorizar um pagamento
   * @param bookingId ID da reserva
   * @param amount Valor do pagamento em wei
   * @param walletAddress Endereço da carteira do pagador
   * @param signer Signer que irá assinar a mensagem (backend)
   * @returns Assinatura que será verificada pelo contrato
   */
  static async signPayment(
    bookingId: number,
    amount: bigint,
    walletAddress: string,
    signer: HardhatEthersSigner
  ): Promise<string> {
    // Criando o hash da mesma forma que o contrato
    // keccak256(abi.encodePacked(bookingId, amount, payer))
    const messageHash = ethers.solidityPackedKeccak256(
      ['uint256', 'uint256', 'address'],
      [bookingId, amount, walletAddress]
    );
    
    // Assinando o hash (o contrato espera uma assinatura no formato Ethereum Signed Message)
    const signature = await signer.signMessage(ethers.getBytes(messageHash));
    
    return signature;
  }
}

export default PaymentService; 