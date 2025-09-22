import { ethers } from "hardhat";

async function main() {
	const Factory = await ethers.getContractFactory("LendingAggregator");
	const aggregator = await Factory.deploy();
	await aggregator.deployed();
	console.log('LendingAggregator deployed at:', aggregator.address);
}

main().catch((e) => { console.error(e); process.exit(1); });
