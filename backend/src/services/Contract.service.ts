import { wallet } from '@/loaders/provider';
import { exec } from 'child_process';
import { promisify } from 'util';

const execPromise = promisify(exec);

class ContractService {

	constructor() {

	}


	/**
	 * Executa uma transação com retry automático em caso de erro de nonce
	 * @param contractFunction Função de contrato a ser executada com parâmetros
	 */
	private async executeWithRetry(contractFunction: Function, ...params: any[]): Promise<any> {
		const maxRetries = 5;
		let lastError = null;
		
		for (let attempt = 0; attempt <= maxRetries; attempt++) {
			try {
				// Executar a função do contrato
				const tx = await contractFunction(...params);
				
				// Usar o provider para aguardar a conclusão da transação
				const receipt = await wallet.provider?.waitForTransaction(tx.hash);
				return receipt;
			} catch (error: any) {
				lastError = error;
				
				// Verificar se é um erro de nonce
				if (error.message && error.message.includes('nonce has already been used')) {
					console.log(`Erro de nonce detectado. Tentativa ${attempt + 1}/${maxRetries + 1}`);
					
					// Aguardar antes de tentar novamente
					await new Promise(resolve => setTimeout(resolve, 1000 * attempt));
					continue;
				}
				
				// Se não for erro de nonce, relançar
				throw error;
			}
		}
		
		// Se esgotou as tentativas
		throw lastError;
	}

	async deployContract() {
		try {
			// Executar os comandos de deploy dos contratos
			console.log('Iniciando deploy do contrato FanToken...');
			try {
				const { stdout: fanTokenOutput, stderr: fanTokenError } = await execPromise('export NODE_ENV=development && npx hardhat deploy --network localhost --contract tourfi');
				console.log('FanToken deploy output:', fanTokenOutput);
				if (fanTokenError) console.error('FanToken deploy error:', fanTokenError);
			} catch (error: any) {
				console.error('Erro ao executar deploy do FanToken:', error.message);
				throw new Error(`Falha ao fazer deploy do contrato FanToken: ${error.message}`);
			}

			
			
			return ;
		} catch (error: any) {
			console.error(`Erro ao configurar tokens para os clubes:`, error);
			throw error;
		}
	}


}

export default ContractService; 