const { expect } = require('chai');
const { ethers } = require('hardhat');

describe('LendingAggregator setAdapter', function () {
	it('sets Aave adapter for protocolId=1', async function () {
		const Aggregator = await ethers.getContractFactory('LendingAggregator');
		const aggregator = await Aggregator.deploy();
		await aggregator.deployed();

		// 如已有 AaveAdapter，可从 env 读取；否则用一个伪地址占位做接口注册测试
		const aaveAdapter = process.env.AAVE_ADAPTER_ADDRESS || '0x000000000000000000000000000000000000dEaD';
		const tx = await aggregator.setAdapter(1, aaveAdapter);
		await tx.wait();
		const stored = await aggregator.adapters(1);
		expect(stored).to.equal(aaveAdapter);
	});
});
