import { Request, Response } from 'express';

import { getErrorMessage, getSuccessMessage } from '@/helpers/response_collection';
import Controller from './Controller';
import ContractService from '@/services/Contract.service';
import Database from '@/database/Database';
import { TransferTokenPayload, TransferStablecoinPayload } from '@/types/transaction';

class ContractController extends Controller {
	private service: ContractService;

	constructor() {
		super();
		this.service = new ContractService();
	}

	async deployContract(req: Request, res: Response): Promise<void> {
		try {
			const { initialSupply } = req.body;
			
			await Database.startTransaction();
			const results = await this.service.deployContract();
			await Database.commit();
			
			return this.sendSuccessResponse(res, { 
				content: results, 
				message: getSuccessMessage('create', 'Contrato TourFI deployado com sucesso') 
			});
		} catch (err) {
			await Database.rollback().catch(console.log);
			return await this.sendErrorMessage(res, err);
		}
	}

}

export default ContractController; 