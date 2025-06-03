import { task } from 'hardhat/config';

task("deploy", "Deploy contracts")
  .addParam("contract", "Identificador do contrato")
  .setAction(async (taskArgs, env) => {

    console.log("network ->",env.network.name,"\n")
 
    const contractDeploy = new Map<string, (...args: any[]) => Promise<any>>();

    const { deployTourFI } = await import("./deploy/deploy");
    contractDeploy.set("tourfi", deployTourFI);

    const runDeploy = contractDeploy.get(taskArgs.contract);

    if (!runDeploy) {
      throw new Error(`Contract deploy not found: ${taskArgs.contract}`);
    }

    await runDeploy();
  });
