import { getErrorMessage } from '@/helpers/response_collection';
import OrderDatabase from '@/database/Booking.database';
import UserService from './User.service';
import ProductService from './Product.service';
import { provider, wallet } from '@/loaders/provider';
import ContractService from './Contract.service';
import { ethers } from 'ethers';
import { FlyBookingCreate, FlyBookingData, FlyBookingResponse } from '@/interfaces/types/booking.type';

class OrderService {
	private database: OrderDatabase;
	private userService: UserService;

	constructor() {
		this.database = new OrderDatabase();
		this.userService = new UserService();
	}

	async createFlyBooking(data: FlyBookingData): Promise<any> {
		// Validações básicas
		if (!data.selectedPrice) throw Error(getErrorMessage('missingField', 'Preço selecionado'));
		if (!data.origin) throw Error(getErrorMessage('missingField', 'Origem'));
		if (!data.destination) throw Error(getErrorMessage('missingField', 'Destino'));
		if (!data.departure) throw Error(getErrorMessage('missingField', 'Dados de partida'));
		if (!data.arrival) throw Error(getErrorMessage('missingField', 'Dados de chegada'));
		if (!data.paymentMethod) throw Error(getErrorMessage('missingField', 'Método de pagamento'));

		if (data.paymentMethod === 'crypto') {
			if (!data.walletAddress) throw Error(getErrorMessage('missingField', 'Carteira'));
		}
		
		// Criar o registro da reserva
		const bookingData: FlyBookingCreate = {
			data: JSON.stringify(data),
			register_date: new Date()
		};
		
		const result: any = await this.database.createFlyBooking(bookingData);
		const bookingId = result[0].insertId;

		if (data.paymentMethod !== 'crypto') return {bookingId};
		
		return this.createPaymentSignature(bookingId, data.selectedPrice.cryptoPrice.toString(), data.walletAddress);
	}

	async fetchFlyBooking(id: number): Promise<FlyBookingResponse | null> {
		if (!id) throw Error(getErrorMessage('missingField', 'Id da reserva'));
		
		return await this.database.fetchFlyBooking(id);
	}

	async fetchAllFlyBookings(): Promise<Array<FlyBookingResponse>> {
		return await this.database.fetchAllFlyBookings();
	}

	/**
	 * Cria uma assinatura para pagamento de reserva
	 * @param bookingId - ID da reserva
	 * @param amount - Valor do pagamento (em wei)
	 * @param walletAddress - Endereço da carteira do usuário
	 * @returns Objeto com o hash e a assinatura
	 */
	async createPaymentSignature(bookingId: number, amount: string, walletAddress: string) {
		if (!bookingId) throw Error(getErrorMessage('missingField', 'ID da reserva'));
		if (!amount) throw Error(getErrorMessage('missingField', 'Valor do pagamento'));
		if (!walletAddress) throw Error(getErrorMessage('missingField', 'Endereço da carteira'));
		
		try {
			// Verificar se a reserva existe
			const booking = await this.fetchFlyBooking(bookingId);
			
			if (!booking) throw Error(getErrorMessage('notFound', 'Reserva'));

			const amountWei = ethers.parseEther(amount);
			
			// Criar o hash usando solidityPackedKeccak256
			const messageHash = ethers.solidityPackedKeccak256(
				['uint256', 'uint256', 'address'],
				[bookingId, amountWei, walletAddress]
			);
			
			// Assinar o hash com a carteira do backend
			const messageHashBytes = ethers.getBytes(messageHash);
			const signature = await wallet.signMessage(messageHashBytes);

			console.log({bookingId, amountWei, walletAddress});
			
			return {
				bookingId,
				amountWei: amountWei.toString(),
				walletAddress,
				signature
			};
		} catch (error) {
			console.error('Erro ao criar assinatura:', error);
			throw Error(getErrorMessage('generic', 'Erro ao criar assinatura para pagamento'));
		}
	}
}

export default OrderService; 

