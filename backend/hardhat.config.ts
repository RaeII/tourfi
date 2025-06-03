import { HardhatUserConfig } from 'hardhat/config';
import "tsconfig-paths/register";
import '@nomicfoundation/hardhat-ethers';
import '@nomicfoundation/hardhat-toolbox';
import 'hardhat-contract-sizer';
import "./scripts/run-deploy.ts"
import "scripts/estimate-gas-deploy.ts"
import "scripts/verify-contract.ts"

import env from './src/config/index.ts'

const accounts = env.PRIVATE_KEY !== undefined ? [ env.PRIVATE_KEY] : [];

const config: HardhatUserConfig = {
  solidity: {
    version: '0.8.24',
    
    settings: {
      optimizer: {
        enabled: true,
        runs: 200,
      },
      viaIR: true,
      //evmVersion: "london",
    },
  },
  mocha: {
    require: [
      "ts-node/register",
      "tsconfig-paths/register" 
    ],
    timeout: 40000
  },
  networks: {
    hardhat: {
      allowUnlimitedContractSize: true,
      // mining: {
      //   auto: false,
      //   interval: 5000
      // }
    },
    bsc: {
      url: process.env.URL_RPC_NETWORK || 'https://bsc-dataseed.bnbchain.org',
      chainId: 97,
      accounts: accounts,
      gasPrice: 3000000000,
    },
  },
  etherscan: {
    apiKey: {
      bsc_testnet: process.env.BSCSCAN_API_KEY || '',
      bsc: process.env.BSCSCAN_API_KEY || '',
    },
    customChains: [
      {
        network: 'bsc_testnet',
        chainId: 97,
        urls: {
          apiURL: 'https://api-testnet.bscscan.com/api',
          browserURL: 'https://testnet.bscscan.com/',
        },
      },
    ],
  },
};

export default config;
