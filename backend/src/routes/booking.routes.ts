import express, { Request, Response } from 'express';

import Controller from '@/controllers/Booking.controller';
import jwtMiddleware from '@/middlewares/jwt.middleware';

const router = express.Router();

router.post('/fly', [
	jwtMiddleware.validJWTNeeded,
	async (req: Request, res: Response): Promise<void> => {
		const controller = new Controller();
		await controller.createFlyBooking(req, res);
	}
]);

router.get('/fly/all', [
	jwtMiddleware.validJWTNeeded,
	async (req: Request, res: Response): Promise<void> => {
		const controller = new Controller();
		await controller.fetchAllFlyBookings(req, res);
	}
]);

router.get('/:id', [
	jwtMiddleware.validJWTNeeded,
	async (req: Request, res: Response): Promise<void> => {
		const controller = new Controller();
		await controller.fetchFlyBooking(req, res);
	}
]);

export default router; 