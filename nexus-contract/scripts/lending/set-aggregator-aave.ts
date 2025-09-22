import { ethers } from "hardhat";

async function main() {
	const aggregatorAddr = process.env.AGGREGATOR_ADDRESS as string;
	const aaveAdapterAddr = process.env.AAVE_ADAPTER_ADDRESS as string;
	if (!aggregatorAddr || !aaveAdapterAddr) throw new Error('Missing AGGREGATOR_ADDRESS / AAVE_ADAPTER_ADDRESS');

	const aggregator = await ethers.getContractAt("LendingAggregator", aggregatorAddr);
	const tx = await aggregator.setAdapter(1, aaveAdapterAddr);
	await tx.wait();
	console.log('Adapter set: protocolId=1 Aave =>', aaveAdapterAddr);
}

main().catch((e) => { console.error(e); process.exit(1); });
