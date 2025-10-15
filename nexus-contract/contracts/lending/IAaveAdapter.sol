// SPDX-License-Identifier: MIT
pragma solidity ^0.8.28;

interface IAaveAdapter {
	function supply(address asset, uint256 amount, address onBehalfOf) external;
	function withdraw(address asset, uint256 amount, address to) external returns (uint256);
	function borrow(address asset, uint256 amount, uint256 interestRateMode, address onBehalfOf) external;
	function repay(address asset, uint256 amount, uint256 interestRateMode, address onBehalfOf) external returns (uint256);

	function getReserveData(address asset) external view returns (
		uint256 totalSupply,
		uint256 totalDebt,
		uint256 availableLiquidity
	);

	function getRates(address asset) external view returns (
		uint256 supplyApyRay,
		uint256 variableBorrowApyRay,
		uint256 stableBorrowApyRay
	);
}
