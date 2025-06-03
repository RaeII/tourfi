/* eslint-disable @typescript-eslint/no-unused-vars */
import { ethers, run} from 'hardhat';
import env from '../../src/config/index';
import { isHardhatNetwork,delay } from '../utils';

export async function deployTourFI(addressFanToken: string = "", treasury: string = "") {
  console.log(`Deploying TourFI with params: fanToken=${addressFanToken}, treasury=${treasury}`);

  if(!addressFanToken && !treasury){
    treasury = env.TREASURY_ADDRESS;
  }
  
  const contractFactory = await ethers.getContractFactory('contracts/TourFI.sol:TourFI');

  
  // Se o treasury não for fornecido, use o endereço do deployer
  let finalTreasury = treasury;
  
  const args = [finalTreasury,finalTreasury,finalTreasury] as const;
  
  console.log(`Deploying TourFI...`);
  const contract = await contractFactory.deploy(...args);
  await contract.waitForDeployment();
  
  const address = await contract.getAddress();
  console.log(`TourFI deployed to: ${address}`);

  if(!isHardhatNetwork()) {

    console.log('Waiting 2 minutes before verifying contract...');
    await delay( 120000 ); 

    await run('verify:verify', {
      address: address,
      constructorArguments: args,
      contract: `contracts/TourFI.sol:TourFI`,
    });
  }
}

export async function deployERC20() {

  console.log(`Deploying ERC20...`);

  const contracts = ["BRL.sol:BRL","EURC.sol:EURC","USDC.sol:USDC"]
  const args = [1000000000000000] as const;

  for (const contract of contracts) { 

    const contractFactory = await ethers.getContractFactory(`contracts/ERC20/${contract}`);
      
    const deploy = await contractFactory.deploy(...args);
    await deploy.waitForDeployment();

    const contractAddress = await deploy.getAddress();
    console.log(`\n${contract} deployed to -> ${contractAddress}`)

    if(!isHardhatNetwork()) {

      console.log('Waiting 2 minutes before verifying contract...');
      await delay( 120000 );

      await run('verify:verify', {
        address: contractAddress,
        constructorArguments: args,
        contract: `contracts/ERC20/${contract}`,
      });
    }

  }
}


