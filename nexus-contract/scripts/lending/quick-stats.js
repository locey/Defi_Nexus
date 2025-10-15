const { ethers } = require("hardhat");
const fs = require('fs');
const path = require('path');

// 常用资产地址（Sepolia测试网）
const ASSETS = {
    WETH: "0x7b79995e5f793A07Bc00c21412e50Ecae098E7f9",
    USDC: "0x94a9D9AC8a22534E3FaCa9F4e7F2E2cf85d5E4C8", 
    USDT: "0x7169D38820dfd117C3FA1f22a697dBA58d90BA06",
    WBTC: "0x2260FAC5E5542a773Aa44fBCfeDf7C193bc2C599"
};

// 格式化数值
function formatAmount(amount) {
    const num = parseFloat(ethers.formatEther(amount));
    if (num >= 1000000) return (num / 1000000).toFixed(1) + "M";
    if (num >= 1000) return (num / 1000).toFixed(1) + "K";
    return num.toFixed(2);
}

// 格式化APY
function formatAPY(rayValue) {
    const apy = parseFloat(ethers.formatUnits(rayValue, 25));
    return apy.toFixed(2) + "%";
}

// 计算利用率
function getUtilization(totalSupply, totalDebt) {
    if (totalSupply === 0n) return "0.00%";
    const util = (totalDebt * 10000n) / totalSupply;
    return (parseFloat(util.toString()) / 100).toFixed(2) + "%";
}

async function main() {
    console.log("📊 Aave 核心指标快照");
    console.log("====================");

    // 获取部署记录
    const deploymentsDir = path.join(__dirname, '../../deployments');
    const aggregatorFiles = fs.readdirSync(deploymentsDir)
        .filter(file => file.startsWith('lending-aggregator-') && file.endsWith('.json'))
        .sort()
        .reverse();

    if (aggregatorFiles.length === 0) {
        throw new Error("未找到 LendingAggregator 部署记录");
    }

    const aggregatorInfo = JSON.parse(fs.readFileSync(
        path.join(deploymentsDir, aggregatorFiles[0]), 'utf8'
    ));

    const lendingAggregator = await ethers.getContractAt("LendingAggregator", aggregatorInfo.address);

    // 检查Aave适配器
    const aaveAdapter = await lendingAggregator.adapters(1);
    if (aaveAdapter === ethers.ZeroAddress) {
        console.log("❌ Aave 适配器未设置");
        return;
    }

    console.log(`时间: ${new Date().toLocaleString()}`);
    console.log(`网络: ${await ethers.provider.getNetwork().then(n => n.name)}`);
    console.log(`聚合器: ${aggregatorInfo.address}`);
    console.log(`Aave适配器: ${aaveAdapter}`);
    console.log("");

    // 查询所有资产
    const tableData = [];
    
    for (const [symbol, address] of Object.entries(ASSETS)) {
        try {
            // 获取储备数据
            const reserveData = await lendingAggregator.getReserveDataAll(address);
            
            // 获取最佳利率
            const bestRates = await lendingAggregator.getBestRates(address);
            
            const utilization = getUtilization(reserveData.totalSupplySum, reserveData.totalDebtSum);
            
            tableData.push({
                asset: symbol,
                totalSupply: formatAmount(reserveData.totalSupplySum),
                totalDebt: formatAmount(reserveData.totalDebtSum),
                availableLiquidity: formatAmount(reserveData.availableLiquiditySum),
                supplyAPY: formatAPY(bestRates.bestSupplyApyRay),
                borrowAPY: formatAPY(bestRates.bestBorrowApyRay),
                utilization: utilization
            });

        } catch (error) {
            tableData.push({
                asset: symbol,
                totalSupply: "N/A",
                totalDebt: "N/A", 
                availableLiquidity: "N/A",
                supplyAPY: "N/A",
                borrowAPY: "N/A",
                utilization: "N/A",
                error: error.message
            });
        }
    }

    // 显示表格
    console.log("┌────────┬────────────┬──────────┬──────────────────┬──────────┬───────────┬──────────┐");
    console.log("│ 资产   │ 总供应量   │ 总债务   │ 可用流动性       │ 供应APY  │ 借贷APY   │ 利用率   │");
    console.log("├────────┼────────────┼──────────┼──────────────────┼──────────┼───────────┼──────────┤");
    
    for (const data of tableData) {
        const asset = data.asset.padEnd(6);
        const supply = data.totalSupply.padStart(10);
        const debt = data.totalDebt.padStart(8);
        const liquidity = data.availableLiquidity.padStart(14);
        const supplyAPY = data.supplyAPY.padStart(8);
        const borrowAPY = data.borrowAPY.padStart(9);
        const utilization = data.utilization.padStart(8);
        
        console.log(`│ ${asset} │ ${supply} │ ${debt} │ ${liquidity} │ ${supplyAPY} │ ${borrowAPY} │ ${utilization} │`);
    }
    
    console.log("└────────┴────────────┴──────────┴──────────────────┴──────────┴───────────┴──────────┘");

    // 显示汇总
    const successful = tableData.filter(d => !d.error);
    console.log(`\n📈 数据概览: ${successful.length}/${tableData.length} 个资产查询成功`);
    
    if (successful.length > 0) {
        console.log("\n🎯 关键指标:");
        
        // 找到最高供应APY
        const maxSupplyAPY = successful.reduce((max, curr) => 
            parseFloat(curr.supplyAPY) > parseFloat(max.supplyAPY) ? curr : max
        );
        console.log(`最高供应APY: ${maxSupplyAPY.supplyAPY} (${maxSupplyAPY.asset})`);
        
        // 找到最低借贷APY
        const minBorrowAPY = successful.reduce((min, curr) => 
            parseFloat(curr.borrowAPY) < parseFloat(min.borrowAPY) ? curr : min
        );
        console.log(`最低借贷APY: ${minBorrowAPY.borrowAPY} (${minBorrowAPY.asset})`);
        
        // 找到最高利用率
        const maxUtilization = successful.reduce((max, curr) => 
            parseFloat(curr.utilization) > parseFloat(max.utilization) ? curr : max
        );
        console.log(`最高利用率: ${maxUtilization.utilization} (${maxUtilization.asset})`);
    }
}

// 如果直接运行此脚本
if (require.main === module) {
    main()
        .then(() => process.exit(0))
        .catch((error) => {
            console.error("查询失败:", error);
            process.exit(1);
        });
}

module.exports = main;
