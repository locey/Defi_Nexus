// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

interface IAavePool {
	function supply(address asset, uint256 amount, address onBehalfOf, uint16 referralCode) external;
	function withdraw(address asset, uint256 amount, address to) external returns (uint256);
	function borrow(address asset, uint256 amount, uint256 interestRateMode, uint16 referralCode, address onBehalfOf) external;
	function repay(address asset, uint256 amount, uint256 interestRateMode, address onBehalfOf) external returns (uint256);
}

interface IAaveOracle {
	function getAssetPrice(address asset) external view returns (uint256);
}

interface IAaveDataProvider {
	struct ReserveData {
		uint256 availableLiquidity;
		uint256 totalStableDebt;
		uint256 totalVariableDebt;
		uint256 liquidityRate; // in ray
		uint256 variableBorrowRate; // in ray
		uint256 stableBorrowRate; // in ray
	}
	function getReserveData(address asset) external view returns (
		uint256 availableLiquidity,
		uint256 totalStableDebt,
		uint256 totalVariableDebt,
		uint256 liquidityRate,
		uint256 variableBorrowRate,
		uint256 stableBorrowRate
	);
}

interface IERC20 {
	function approve(address spender, uint256 value) external returns (bool);
	function transferFrom(address from, address to, uint256 value) external returns (bool);
}

contract AaveAdapter {
	IAavePool public immutable pool;
	IAaveDataProvider public immutable dataProvider;

	constructor(address pool_, address dataProvider_) {
		pool = IAavePool(pool_);
		dataProvider = IAaveDataProvider(dataProvider_);
	}

	function supply(address asset, uint256 amount, address onBehalfOf) external {
		require(IERC20(asset).transferFrom(msg.sender, address(this), amount), "TRANSFER_FAIL");
		require(IERC20(asset).approve(address(pool), amount), "APPROVE_FAIL");
		pool.supply(asset, amount, onBehalfOf, 0);
	}

	function withdraw(address asset, uint256 amount, address to) external returns (uint256) {
		uint256 withdrawn = pool.withdraw(asset, amount, to);
		return withdrawn;
	}

	function borrow(address asset, uint256 amount, uint256 interestRateMode, address onBehalfOf) external {
		pool.borrow(asset, amount, interestRateMode, 0, onBehalfOf);
	}

	function repay(address asset, uint256 amount, uint256 interestRateMode, address onBehalfOf) external returns (uint256) {
		require(IERC20(asset).transferFrom(msg.sender, address(this), amount), "TRANSFER_FAIL");
		require(IERC20(asset).approve(address(pool), amount), "APPROVE_FAIL");
		uint256 repaid = pool.repay(asset, amount, interestRateMode, onBehalfOf);
		return repaid;
	}

	function getReserveData(address asset) external view returns (
		uint256 totalSupply,
		uint256 totalDebt,
		uint256 availableLiquidity
	) {
		(
			uint256 available,
			uint256 totalStableDebt,
			uint256 totalVariableDebt,
			uint256 liquidityRate,
			uint256 variableBorrowRate,
			uint256 stableBorrowRate
		) = dataProvider.getReserveData(asset);
		availableLiquidity = available;
		totalDebt = totalStableDebt + totalVariableDebt;
		// Approximation: total supply = debt + available liquidity
		totalSupply = totalDebt + availableLiquidity;
	}

	function getRates(address asset) external view returns (
		uint256 supplyApyRay,
		uint256 variableBorrowApyRay,
		uint256 stableBorrowApyRay
	) {
		(
			uint256 available,
			uint256 totalStableDebt,
			uint256 totalVariableDebt,
			uint256 liquidityRate,
			uint256 variableBorrowRate,
			uint256 stableBorrowRate
		) = dataProvider.getReserveData(asset);
		supplyApyRay = liquidityRate;
		variableBorrowApyRay = variableBorrowRate;
		stableBorrowApyRay = stableBorrowRate;
	}
}
