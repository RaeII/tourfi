import { Request, Response } from 'express';

import { getErrorMessage, getSuccessMessage } from '@/helpers/response_collection';
import Controller from './Controller';
import BookingService from '@/services/Booking.service';
import Database from '@/database/Database';
import { FlyBookingData } from '@/interfaces/types/booking.type';

class BookingController extends Controller {
	private service: BookingService;

	constructor() {
		super();
		this.service = new BookingService();
	}

	async createFlyBooking(req: Request, res: Response) {
		
		try {
			const bookingData: FlyBookingData = {
				selectedPrice: req.body.selectedPrice,
				selectedClass: req.body.selectedClass,
				origin: req.body.origin,
				destination: req.body.destination,
				departure: req.body.departure,
				arrival: req.body.arrival,
				duration: req.body.duration,
				airline: req.body.airline,
				airlineCode: req.body.airlineCode,
				flightNumber: req.body.flightNumber,
				aircraft: req.body.aircraft,
				walletAddress: req.body.walletAddress,
				paymentMethod: req.body.paymentMethod
			};

			await Database.startTransaction();
			const bookingId = await this.service.createFlyBooking(bookingData);
			await Database.commit();
			
			return this.sendSuccessResponse(res, { 
				content: bookingId , 
				message: getSuccessMessage('create', 'Reserva de voo') 
			});
		} catch (err) {
			await Database.rollback().catch(console.log);
			console.log(err);
			return await this.sendErrorMessage(res, err);
		}
	}

	async fetchFlyBooking(req: Request, res: Response) {
		try {
			const bookingId: number = Number(req.params.id);

			const booking = await this.service.fetchFlyBooking(bookingId);
			if (!booking) throw Error(getErrorMessage('registryNotFound', 'Reserva de voo'));

			return this.sendSuccessResponse(res, { content: booking });
		} catch (err) {
			return await this.sendErrorMessage(res, err);
		}
	}

	async fetchAllFlyBookings(req: Request, res: Response) {
		try {
			const bookings = await this.service.fetchAllFlyBookings();
			return this.sendSuccessResponse(res, { content: bookings });
		} catch (err) {
			return await this.sendErrorMessage(res, err);
		}
	}


}

export default BookingController; 