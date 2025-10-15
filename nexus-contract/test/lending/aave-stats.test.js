const { expect } = require('chai');
const fs = require('fs');
const path = require('path');
const { ethers } = require('hardhat');

const ABI = [
	"function getReserveData(address asset) view returns (uint256 totalSupply, uint256 totalDebt, uint256 availableLiquidity)",
	"function getRates(address asset) view returns (uint256 supplyApyRay, uint256 variableBorrowApyRay, uint256 stableBorrowApyRay)"
];

function rayToPercent(ray) { return Number(ray) / 1e25; }
function bnToNumber(x, decimals = 18) { return Number(x) / 10 ** decimals; }

describe('AaveAdapter Stats (Sepolia)', function () {
	let adapter;
	let cfg;

	before(async () => {
		const cfgPath = path.join(__dirname, '../../scripts/config.sepolia.json');
		cfg = JSON.parse(fs.readFileSync(cfgPath, 'utf8'));
		const adapterAddr = process.env.AAVE_ADAPTER_ADDRESS || cfg.AAVE_ADAPTER_ADDRESS;
		if (!adapterAddr) this.skip();
		const [signer] = await ethers.getSigners();
		adapter = new ethers.Contract(adapterAddr, ABI, signer);
	});

	['WETH','USDC','USDT','WBTC'].forEach((symbol) => {
		it(`prints ${symbol} supply/apy/utilization`, async function () {
			if (!adapter) return this.skip();
			const asset = cfg.ASSETS[symbol];
			if (!asset) return this.skip();
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
			// 只做基础断言，确保函数可调用
			expect(totalSupply).to.be.a('object');
			expect(totalDebt).to.be.a('object');
			expect(available).to.be.a('object');
		});
	});
});
