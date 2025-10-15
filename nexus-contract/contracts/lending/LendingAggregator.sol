// SPDX-License-Identifier: MIT
pragma solidity ^0.8.28;

interface ILendingAdapter {
	function supply(address asset, uint256 amount, address onBehalfOf) external;
	function withdraw(address asset, uint256 amount, address to) external returns (uint256);
	function borrow(address asset, uint256 amount, uint256 interestRateMode, address onBehalfOf) external;
	function repay(address asset, uint256 amount, uint256 interestRateMode, address onBehalfOf) external returns (uint256);
	function getReserveData(address asset) external view returns (uint256 totalSupply, uint256 totalDebt, uint256 availableLiquidity);
	function getRates(address asset) external view returns (uint256 supplyApyRay, uint256 variableBorrowApyRay, uint256 stableBorrowApyRay);
}

contract LendingAggregator {
	// protocol id: 1 = Aave, 2 = Compound
	mapping(uint256 => address) public adapters;
	address public owner;

	event AdapterUpdated(uint256 indexed protocolId, address indexed adapter);

	modifier onlyOwner() {
		require(msg.sender == owner, "ONLY_OWNER");
		_;
	}

	constructor() {
		owner = msg.sender;
	}

	function setAdapter(uint256 protocolId, address adapter) external onlyOwner {
		adapters[protocolId] = adapter;
		emit AdapterUpdated(protocolId, adapter);
	}

	function supply(uint256 protocolId, address asset, uint256 amount, address onBehalfOf) external {
		ILendingAdapter(adapters[protocolId]).supply(asset, amount, onBehalfOf);
	}

	function withdraw(uint256 protocolId, address asset, uint256 amount, address to) external returns (uint256) {
		return ILendingAdapter(adapters[protocolId]).withdraw(asset, amount, to);
	}

	function borrow(uint256 protocolId, address asset, uint256 amount, uint256 interestRateMode, address onBehalfOf) external {
		ILendingAdapter(adapters[protocolId]).borrow(asset, amount, interestRateMode, onBehalfOf);
	}

	function repay(uint256 protocolId, address asset, uint256 amount, uint256 interestRateMode, address onBehalfOf) external returns (uint256) {
		return ILendingAdapter(adapters[protocolId]).repay(asset, amount, interestRateMode, onBehalfOf);
	}

	function getReserveDataAll(address asset) external view returns (
		uint256 totalSupplySum,
		uint256 totalDebtSum,
		uint256 availableLiquiditySum
	) {
		for (uint256 i = 1; i <= 2; i++) {
			address adapter = adapters[i];
			if (adapter == address(0)) continue;
			(
				uint256 totalSupply,
				uint256 totalDebt,
				uint256 availableLiquidity
			) = ILendingAdapter(adapter).getReserveData(asset);
			totalSupplySum += totalSupply;
			totalDebtSum += totalDebt;
			availableLiquiditySum += availableLiquidity;
		}
	}

	function getBestRates(address asset) external view returns (
		uint256 bestSupplyApyRay,
		uint256 bestSupplyProtocolId,
		uint256 bestBorrowApyRay,
		uint256 bestBorrowProtocolId
	) {
		for (uint256 i = 1; i <= 2; i++) {
			address adapter = adapters[i];
			if (adapter == address(0)) continue;
			(
				uint256 supplyApyRay,
				uint256 variableBorrowApyRay,
				uint256 _stableBorrowApyRay
			) = ILendingAdapter(adapter).getRates(asset);
			if (supplyApyRay > bestSupplyApyRay) {
				bestSupplyApyRay = supplyApyRay;
				bestSupplyProtocolId = i;
			}
			// 对借贷利率取最低
			if (bestBorrowApyRay == 0 || variableBorrowApyRay < bestBorrowApyRay) {
				bestBorrowApyRay = variableBorrowApyRay;
				bestBorrowProtocolId = i;
			}
		}
	}
}
