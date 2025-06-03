import { ethers } from 'hardhat';
import { Payment, TourFI } from '../../typechain-types/contracts';

/**
 * Realiza o deploy do contrato Payment
 * @param signerAddress Endereço que será autorizado a assinar mensagens
 * @param initialOwner Endereço do proprietário inicial do contrato
 * @returns Instância do contrato Payment
 */
export async function deployPayment(
  signerAddress: string,
  initialOwner: string
): Promise<Payment> {
  const PaymentFactory = await ethers.getContractFactory('Payment');
  const payment = await PaymentFactory.deploy(signerAddress, initialOwner);
  await payment.waitForDeployment();
  return payment as unknown as Payment;
}

/**
 * Realiza o deploy do contrato TourFI
 * @param treasuryAddress Endereço da tesouraria
 * @param signerAddress Endereço que será autorizado a assinar mensagens
 * @param initialOwner Endereço do proprietário inicial do contrato
 * @returns Instância do contrato TourFI
 */
export async function deployTourFI(
  treasuryAddress: string,
  signerAddress: string,
  initialOwner: string
): Promise<TourFI> {
  const TourFIFactory = await ethers.getContractFactory('TourFI');
  const tourFI = await TourFIFactory.deploy(treasuryAddress, signerAddress, initialOwner);
  await tourFI.waitForDeployment();
  return tourFI as unknown as TourFI;
} 