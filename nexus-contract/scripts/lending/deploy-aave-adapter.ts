import { ethers } from "hardhat";
import fs from 'fs';
import path from 'path';

async function main() {
	const cfgPath = path.join(__dirname, 'config.sepolia.json');
	const cfg = JSON.parse(fs.readFileSync(cfgPath, 'utf8'));

	const pool = process.env.AAVE_POOL_ADDRESS || cfg.AAVE_POOL_ADDRESS;
	const dataProvider = process.env.AAVE_DATA_PROVIDER_ADDRESS || cfg.AAVE_DATA_PROVIDER_ADDRESS;
	if (!pool || !dataProvider) throw new Error('Missing Aave addresses: AAVE_POOL_ADDRESS / AAVE_DATA_PROVIDER_ADDRESS');

	const Factory = await ethers.getContractFactory("AaveAdapter");
	const adapter = await Factory.deploy(pool, dataProvider);
	await adapter.deployed();
	console.log('AaveAdapter deployed at:', adapter.address);
}

main().catch((e) => {
	console.error(e);
	process.exit(1);
});
