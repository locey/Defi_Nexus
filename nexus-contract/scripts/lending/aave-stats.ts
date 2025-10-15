import { ethers } from "hardhat";
import fs from 'fs';
import path from 'path';

const ABI = [
	"function getReserveData(address asset) view returns (uint256 totalSupply, uint256 totalDebt, uint256 availableLiquidity)",
	"function getRates(address asset) view returns (uint256 supplyApyRay, uint256 variableBorrowApyRay, uint256 stableBorrowApyRay)"
];

function rayToPercent(ray: any): number { return Number(ray) / 1e25; }
function bnToNumber(x: any, decimals = 18): number { return Number(x) / 10 ** decimals; }

async function main() {
	const cfgPath = path.join(__dirname, 'config.sepolia.json');
	const cfg = JSON.parse(fs.readFileSync(cfgPath, 'utf8'));
	const adapterAddr = process.env.AAVE_ADAPTER_ADDRESS || cfg.AAVE_ADAPTER_ADDRESS;
	if (!adapterAddr) throw new Error('Missing AAVE_ADAPTER_ADDRESS');

	const [signer] = await ethers.getSigners();
	const adapter = new ethers.Contract(adapterAddr, ABI, signer);

	for (const symbol of Object.keys(cfg.ASSETS)) {
		const asset = cfg.ASSETS[symbol];
		if (!asset) continue;
		const [totalSupply, totalDebt, available] = await adapter.getReserveData(asset);
		const [supplyApyRay, variableBorrowApyRay] = await adapter.getRates(asset);
		const utilization = Number(totalSupply) === 0 ? 0 : Number(totalDebt) / Number(totalSupply);
		console.log(`=== ${symbol} ===`);
		console.log(`Total Supply (approx): ${bnToNumber(totalSupply).toFixed(6)}`);
		console.log(`Total Debt:            ${bnToNumber(totalDebt).toFixed(6)}`);
		console.log(`Available Liquidity:   ${bnToNumber(available).toFixed(6)}`);
		console.log(`Supply APY:            ${rayToPercent(supplyApyRay).toFixed(2)}%`);
		console.log(`Variable Borrow APY:   ${rayToPercent(variableBorrowApyRay).toFixed(2)}%`);
		console.log(`Utilization:           ${(utilization * 100).toFixed(2)}%\n`);
	}
}

main().catch((e) => { console.error(e); process.exit(1); });
