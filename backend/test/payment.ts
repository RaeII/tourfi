/* eslint-disable prefer-const */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { ethers } from "hardhat";
import { expect } from "chai";
import { HardhatEthersSigner } from "@nomicfoundation/hardhat-ethers/signers";
import PaymentService from "./services/payment.service";
import { TourFI, Payment } from "../typechain-types/contracts";
import { deployTourFI, deployPayment } from "./deploy/deploy";

describe("\n\n  == TOURFI PAYMENT TESTS == \n\n", function () {
  
  // Variáveis para contratos e endereços
  let paymentContract: Payment;
  let paymentAddress: string;
  let tourFIContract: TourFI;
  let tourFIAddress: string;
  
  // Signers para diferentes papéis
  let ownerSigner: HardhatEthersSigner;
  let backendSigner: HardhatEthersSigner;
  let traveler: HardhatEthersSigner;
  let treasury: HardhatEthersSigner;
  
  // Instâncias do contrato com diferentes signers
  let travelerTourFI: TourFI;
  
  // Constantes para teste
  const bookingId = 12345;
  const paymentAmount = ethers.parseEther("0.5"); // 0.5 BNB
  const metadataURI = "ipfs://QmXyZ123456789";

  before(async function () {
    // Obter signers da rede de teste
    [ownerSigner, backendSigner, traveler, treasury] = await ethers.getSigners() as HardhatEthersSigner[];

    console.log("Owner Address:", ownerSigner.address);
    console.log("Backend Signer:", backendSigner.address);
    console.log("Traveler Address:", traveler.address);
    console.log("Treasury Address:", treasury.address);

    // Deploy do contrato Payment
    paymentContract = await deployPayment(
      backendSigner.address,
      ownerSigner.address
    );
    paymentAddress = await paymentContract.getAddress();
    console.log("Payment implantado em:", paymentAddress);

    // Deploy do contrato TourFI
    tourFIContract = await deployTourFI(
      treasury.address,
      backendSigner.address,
      ownerSigner.address
    );
    tourFIAddress = await tourFIContract.getAddress();
    console.log("TourFI implantado em:", tourFIAddress);

    // Criar instâncias conectadas com diferentes signers
    travelerTourFI = tourFIContract.connect(traveler);
  });

  describe("Testes do Contrato de Pagamento", function() {
    it("Deve verificar o proprietário e endereço do assinante", async function() {
      const owner = await paymentContract.owner();
      const signer = await paymentContract.signerAddress();
      
      expect(owner).to.equal(ownerSigner.address);
      expect(signer).to.equal(backendSigner.address);
      
      console.log("✅ Proprietário e assinante configurados corretamente");
    });
    
    it("Deve atualizar o endereço do assinante", async function() {
      const tx = await paymentContract.updateSigner(traveler.address);
      await tx.wait();
      
      const newSigner = await paymentContract.signerAddress();
      expect(newSigner).to.equal(traveler.address);
      
      // Reverter para o assinante original para os próximos testes
      await paymentContract.updateSigner(backendSigner.address);
      
      console.log("✅ Endereço do assinante atualizado com sucesso");
    });
    
    it("Deve verificar corretamente uma assinatura válida", async function() {
      // Criar assinatura com o serviço de pagamento
      const signature = await PaymentService.signPayment(
        bookingId,
        paymentAmount,
        traveler.address,
        backendSigner
      );
      
      // Verificar se a assinatura é válida
      const isValid = await paymentContract.verifySignature(
        bookingId,
        paymentAmount,
        traveler.address,
        signature
      );
      
      expect(isValid).to.be.true;
      console.log("✅ Assinatura verificada com sucesso");
    });
    
    it("Deve processar um pagamento", async function() {
      // Obter saldo inicial do contrato
      const initialBalance = await ethers.provider.getBalance(paymentAddress);
      
      // Criar assinatura para o pagamento
      const signature = await PaymentService.signPayment(
        bookingId,
        paymentAmount,
        traveler.address,
        backendSigner
      );
      
      // Processar o pagamento
      const tx = await paymentContract.connect(traveler).processPayment(
        bookingId,
        signature,
        { value: paymentAmount }
      );
      await tx.wait();
      
      // Verificar se o pagamento foi registrado
      const isPaid = await paymentContract.isBookingPaid(bookingId);
      expect(isPaid).to.be.true;
      
      // Verificar se o saldo do contrato aumentou
      const newBalance = await ethers.provider.getBalance(paymentAddress);
      expect(newBalance).to.be.gt(initialBalance);
      
      console.log("✅ Pagamento processado com sucesso");
      console.log(`   Valor pago: ${ethers.formatEther(paymentAmount)} BNB`);
      console.log(`   Novo saldo do contrato: ${ethers.formatEther(newBalance)} BNB`);
    });
    
    it("Deve rejeitar pagamento duplicado", async function() {
      // Tentar pagar o mesmo booking novamente
      const signature = await PaymentService.signPayment(
        bookingId,
        paymentAmount,
        traveler.address,
        backendSigner
      );
      
      await expect(
        paymentContract.connect(traveler).processPayment(
          bookingId,
          signature,
          { value: paymentAmount }
        )
      ).to.be.revertedWithCustomError(paymentContract, "BookingAlreadyPaid");
      
      console.log("✅ Pagamento duplicado rejeitado corretamente");
    });
    
    it("Deve permitir saque de fundos pelo proprietário", async function() {
      // Obter saldo inicial do contrato
      const initialContractBalance = await ethers.provider.getBalance(paymentAddress);
      const initialOwnerBalance = await ethers.provider.getBalance(ownerSigner.address);
      
      // Valor a sacar (metade do saldo)
      const withdrawAmount = initialContractBalance / 2n;
      
      // Realizar o saque
      const tx = await paymentContract.withdrawFunds(
        ownerSigner.address,
        withdrawAmount
      );
      await tx.wait();
      
      // Verificar novo saldo do contrato
      const newContractBalance = await ethers.provider.getBalance(paymentAddress);
      expect(newContractBalance).to.be.closeTo(
        initialContractBalance - withdrawAmount,
        ethers.parseEther("0.01") // Margem para gas
      );
      
      console.log("✅ Saque realizado com sucesso");
      console.log(`   Valor sacado: ${ethers.formatEther(withdrawAmount)} BNB`);
    });
  });
  
  describe("Testes do Contrato TourFI", function() {
    const newBookingId = 67890;
    
    it("Deve verificar a configuração inicial", async function() {
      const treasuryAddress = await tourFIContract.treasury();
      expect(treasuryAddress).to.equal(treasury.address);
      
      console.log("✅ Tesouraria configurada corretamente");
    });
    
    it("Deve registrar uma nova reserva", async function() {
      // Registrar uma nova reserva
      const tx = await tourFIContract.registerBooking(
        newBookingId,
        traveler.address,
        paymentAmount,
        metadataURI
      );
      await tx.wait();
      
      // Verificar se a reserva foi registrada
      const booking = await tourFIContract.getBookingDetails(newBookingId);
      
      expect(booking.id).to.equal(newBookingId);
      expect(booking.traveler).to.equal(traveler.address);
      expect(booking.amount).to.equal(paymentAmount);
      expect(booking.isPaid).to.be.false;
      expect(booking.metadataURI).to.equal(metadataURI);
      
      console.log("✅ Reserva registrada com sucesso");
    });
    
    it("Deve efetuar pagamento de uma reserva", async function() {
      // Obter saldo inicial da tesouraria
      const initialTreasuryBalance = await ethers.provider.getBalance(treasury.address);
      
      // Criar assinatura para o pagamento
      const signature = await PaymentService.signPayment(
        newBookingId,
        paymentAmount,
        traveler.address,
        backendSigner
      );
      
      // Efetuar o pagamento da reserva
      const tx = await travelerTourFI.payBooking(
        newBookingId,
        signature,
        { value: paymentAmount }
      );
      await tx.wait();
      
      // Verificar se a reserva foi marcada como paga
      const paymentStatus = await tourFIContract.getBookingPaymentStatus(newBookingId);
      expect(paymentStatus.isPaid).to.be.true;
      
      // Verificar se o saldo da tesouraria aumentou
      const newTreasuryBalance = await ethers.provider.getBalance(treasury.address);
      expect(newTreasuryBalance).to.be.gt(initialTreasuryBalance);
      
      console.log("✅ Pagamento da reserva efetuado com sucesso");
      console.log(`   Valor pago: ${ethers.formatEther(paymentAmount)} BNB`);
      console.log(`   Novo saldo da tesouraria: ${ethers.formatEther(newTreasuryBalance)} BNB`);
    });
    
    it("Deve rejeitar pagamento de uma reserva já paga", async function() {
      // Criar assinatura para o pagamento
      const signature = await PaymentService.signPayment(
        newBookingId,
        paymentAmount,
        traveler.address,
        backendSigner
      );
      
      // Tentar pagar novamente
      await expect(
        travelerTourFI.payBooking(
          newBookingId,
          signature,
          { value: paymentAmount }
        )
      ).to.be.reverted; // Pode ser revertido por diferentes razões
      
      console.log("✅ Pagamento duplicado rejeitado corretamente");
    });
    
    it("Deve atualizar o endereço da tesouraria", async function() {
      // Atualizar tesouraria para outro endereço
      const tx = await tourFIContract.updateTreasury(traveler.address);
      await tx.wait();
      
      // Verificar se foi atualizado
      const newTreasuryAddress = await tourFIContract.treasury();
      expect(newTreasuryAddress).to.equal(traveler.address);
      
      // Restaurar tesouraria original para testes futuros
      await tourFIContract.updateTreasury(treasury.address);
      
      console.log("✅ Endereço da tesouraria atualizado com sucesso");
    });
  });
});
