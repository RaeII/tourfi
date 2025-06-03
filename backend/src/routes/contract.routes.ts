import express, { Request, Response } from 'express';

import Controller from '@/controllers/Contract.controller';
import jwtMiddleware from '@/middlewares/jwt.middleware';

const router = express.Router();

router.post('/deploy', [
	jwtMiddleware.validJWTNeeded,
	async (req: Request, res: Response): Promise<void> => {
		const controller = new Controller();

		controller.deployContract(req, res);
	}
]);

export default router; 