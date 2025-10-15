const { ethers } = require("hardhat");
const fs = require('fs');
const path = require('path');

// 协议映射
const PROTOCOL_IDS = {
    AAVE: 1,
    COMPOUND: 2
};

const PROTOCOL_NAMES = {
    1: "Aave",
    2: "Compound"
};

// 常用资产地址（Sepolia测试网）
const ASSETS = {
    WETH: "0x7b79995e5f793A07Bc00c21412e50Ecae098E7f9",
    USDC: "0x94a9D9AC8a22534E3FaCa9F4e7F2E2cf85d5E4C8", 
    USDT: "0x7169D38820dfd117C3FA1f22a697dBA58d90BA06",
    WBTC: "0x2260FAC5E5542a773Aa44fBCfeDf7C193bc2C599"
};

const ASSET_NAMES = {
    "0x7b79995e5f793A07Bc00c21412e50Ecae098E7f9": "WETH",
    "0x94a9D9AC8a22534E3FaCa9F4e7F2E2cf85d5E4C8": "USDC",
    "0x7169D38820dfd117C3FA1f22a697dBA58d90BA06": "USDT", 
    "0x2260FAC5E5542a773Aa44fBCfeDf7C193bc2C599": "WBTC"
};

// 格式化大数值
function formatTokenAmount(amount, decimals = 18) {
    const formatted = ethers.formatUnits(amount, decimals);
    const num = parseFloat(formatted);
    
    if (num >= 1000000) {
        return (num / 1000000).toFixed(2) + "M";
    } else if (num >= 1000) {
        return (num / 1000).toFixed(2) + "K";
    } else {
        return num.toFixed(4);
    }
}

// 格式化APY（从Ray转换为百分比）
function formatAPY(rayValue) {
    // Ray = 1e27, 转换为百分比需要除以1e25
    const apy = parseFloat(ethers.formatUnits(rayValue, 25));
    return apy.toFixed(4) + "%";
}

// 计算利用率
function calculateUtilization(totalSupply, totalDebt) {
    if (totalSupply === 0n) return "0.0000%";
    
    const utilization = (totalDebt * 10000n) / totalSupply; // 保留4位小数
    const utilizationFloat = parseFloat(utilization.toString()) / 100;
    return utilizationFloat.toFixed(4) + "%";
}

async function main() {
    console.log("📊 获取核心指标数据");
    console.log("==================");

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

    const aggregatorAddress = aggregatorInfo.address;
    console.log("LendingAggregator 地址:", aggregatorAddress);

    // 连接到合约
    const lendingAggregator = await ethers.getContractAt("LendingAggregator", aggregatorAddress);

    // 检查适配器状态
    console.log("\n🔍 检查适配器状态...");
    const aaveAdapter = await lendingAggregator.adapters(PROTOCOL_IDS.AAVE);
    const compoundAdapter = await lendingAggregator.adapters(PROTOCOL_IDS.COMPOUND);

    console.log(`Aave 适配器 (协议 ${PROTOCOL_IDS.AAVE}):`, aaveAdapter === ethers.ZeroAddress ? "❌ 未设置" : "✅ 已设置");
    console.log(`Compound 适配器 (协议 ${PROTOCOL_IDS.COMPOUND}):`, compoundAdapter === ethers.ZeroAddress ? "❌ 未设置" : "✅ 已设置");

    if (aaveAdapter === ethers.ZeroAddress) {
        console.log("⚠️  Aave 适配器未设置，无法获取数据");
        return;
    }

    // 从命令行参数获取要查询的资产
    const args = process.argv.slice(2);
    let assetsToQuery = [];

    if (args.length === 0) {
        // 默认查询所有资产
        assetsToQuery = Object.values(ASSETS);
        console.log("\n📋 查询所有资产的数据...");
    } else {
        // 查询指定的资产
        for (const arg of args) {
            const upperArg = arg.toUpperCase();
            if (ASSETS[upperArg]) {
                assetsToQuery.push(ASSETS[upperArg]);
            } else if (ethers.isAddress(arg)) {
                assetsToQuery.push(arg);
            } else {
                console.log(`⚠️  跳过无效资产: ${arg}`);
            }
        }
        
        if (assetsToQuery.length === 0) {
            console.log("❌ 没有有效的资产地址");
            return;
        }
        
        console.log(`\n📋 查询 ${assetsToQuery.length} 个资产的数据...`);
    }

    const results = {
        timestamp: new Date().toISOString(),

        network: await ethers.provider.getNetwork(),
        aggregatorAddress: aggregatorAddress,
        aaveAdapterAddress: aaveAdapter,
        assets: {}
    };

    // 查询每个资产的数据
    for (const assetAddress of assetsToQuery) {
        const assetName = ASSET_NAMES[assetAddress] || assetAddress;
        console.log(`\n🔍 查询 ${assetName} (${assetAddress})...`);

        try {
            // 获取储备数据
            const reserveData = await lendingAggregator.getReserveDataAll(assetAddress);
            console.log("  ├─ 总供应量 (approx):", formatTokenAmount(reserveData.totalSupplySum));
            console.log("  ├─ 总债务:", formatTokenAmount(reserveData.totalDebtSum));
            console.log("  └─ 可用流动性:", formatTokenAmount(reserveData.availableLiquiditySum));

            // 获取最佳利率
            const bestRates = await lendingAggregator.getBestRates(assetAddress);
            console.log("  ├─ 最佳供应APY:", formatAPY(bestRates.bestSupplyApyRay));
            console.log("  ├─ 最佳供应协议:", PROTOCOL_NAMES[bestRates.bestSupplyProtocolId.toString()] || `协议${bestRates.bestSupplyProtocolId}`);
            console.log("  ├─ 最佳借贷APY:", formatAPY(bestRates.bestBorrowApyRay));
            console.log("  └─ 最佳借贷协议:", PROTOCOL_NAMES[bestRates.bestBorrowProtocolId.toString()] || `协议${bestRates.bestBorrowProtocolId}`);

            // 计算利用率
            const utilization = calculateUtilization(reserveData.totalSupplySum, reserveData.totalDebtSum);
            console.log("  └─ 利用率:", utilization);

            // 保存结果
            results.assets[assetAddress] = {
                name: assetName,
                reserveData: {
                    totalSupply: reserveData.totalSupplySum.toString(),
                    totalDebt: reserveData.totalDebtSum.toString(),
                    availableLiquidity: reserveData.availableLiquiditySum.toString(),
                    formatted: {
                        totalSupply: formatTokenAmount(reserveData.totalSupplySum),
                        totalDebt: formatTokenAmount(reserveData.totalDebtSum),
                        availableLiquidity: formatTokenAmount(reserveData.availableLiquiditySum),
                        utilization: utilization
                    }
                },
                bestRates: {
                    supplyAPY: bestRates.bestSupplyApyRay.toString(),
                    supplyProtocolId: bestRates.bestSupplyProtocolId.toString(),
                    supplyProtocolName: PROTOCOL_NAMES[bestRates.bestSupplyProtocolId.toString()] || `协议${bestRates.bestSupplyProtocolId}`,
                    borrowAPY: bestRates.bestBorrowApyRay.toString(),
                    borrowProtocolId: bestRates.bestBorrowProtocolId.toString(),
                    borrowProtocolName: PROTOCOL_NAMES[bestRates.bestBorrowProtocolId.toString()] || `协议${bestRates.bestBorrowProtocolId}`,
                    formatted: {
                        supplyAPY: formatAPY(bestRates.bestSupplyApyRay),
                        borrowAPY: formatAPY(bestRates.bestBorrowApyRay)
                    }
                }
            };

        } catch (error) {
            console.log(`  ❌ 查询失败: ${error.message}`);
            results.assets[assetAddress] = {
                name: assetName,
                error: error.message
            };
        }
    }

    // 保存结果到文件
    const resultsFile = path.join(deploymentsDir, `core-metrics-${Date.now()}.json`);
    fs.writeFileSync(resultsFile, JSON.stringify(results, null, 2));

    console.log("\n========================================");
    console.log("📊 核心指标查询完成！");
    console.log("========================================");
    console.log("详细结果已保存到:", resultsFile);

    // 显示汇总信息
    const successfulQueries = Object.values(results.assets).filter(asset => !asset.error);
    console.log(`\n📈 查询摘要: ${successfulQueries.length}/${assetsToQuery.length} 个资产查询成功`);

    if (successfulQueries.length > 0) {
        console.log("\n💰 资产概览:");
        for (const asset of successfulQueries) {
            console.log(`├─ ${asset.name}:`);
            console.log(`│  ├─ 总供应: ${asset.reserveData.formatted.totalSupply}`);
            console.log(`│  ├─ 总债务: ${asset.reserveData.formatted.totalDebt}`);
            console.log(`│  ├─ 利用率: ${asset.reserveData.formatted.utilization}`);
            console.log(`│  ├─ 供应APY: ${asset.bestRates.formatted.supplyAPY}`);
            console.log(`│  └─ 借贷APY: ${asset.bestRates.formatted.borrowAPY}`);
        }
    }

    return results;
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
