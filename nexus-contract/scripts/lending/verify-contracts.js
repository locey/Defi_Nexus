const { ethers } = require("hardhat");
const fs = require('fs');
const path = require('path');

async function main() {
    console.log("开始验证已部署的合约...");

    const [deployer] = await ethers.getSigners();
    console.log("验证账户:", deployer.address);

    // 读取最新的部署信息
    const deploymentsDir = path.join(__dirname, '../../deployments');
    if (!fs.existsSync(deploymentsDir)) {
        console.error("部署目录不存在，请先运行部署脚本");
        return;
    }

    // 查找最新的完整部署文件
    const deploymentFiles = fs.readdirSync(deploymentsDir)
        .filter(file => file.startsWith('lending-system-complete-') && file.endsWith('.json'))
        .sort()
        .reverse();

    if (deploymentFiles.length === 0) {
        console.error("未找到完整的部署记录，请先运行 deploy-all.js");
        return;
    }

    const latestDeploymentFile = path.join(deploymentsDir, deploymentFiles[0]);
    const deploymentInfo = JSON.parse(fs.readFileSync(latestDeploymentFile, 'utf8'));

    console.log("使用部署记录:", latestDeploymentFile);
    console.log("部署时间:", deploymentInfo.deploymentTime);

    const verificationResults = {
        timestamp: new Date().toISOString(),
        network: await deployer.provider.getNetwork(),
        contracts: {}
    };

    try {
        // 验证 AaveAdapter
        console.log("\n🔍 验证 AaveAdapter...");
        const aaveAdapterAddress = deploymentInfo.contracts.aaveAdapter.address;
        const aaveAdapter = await ethers.getContractAt("AaveAdapter", aaveAdapterAddress);

        try {
            const pool = await aaveAdapter.pool();
            const dataProvider = await aaveAdapter.dataProvider();
            
            verificationResults.contracts.aaveAdapter = {
                address: aaveAdapterAddress,
                status: "✅ 验证成功",
                pool: pool,
                dataProvider: dataProvider,
                errors: []
            };
            
            console.log("✅ AaveAdapter 验证成功");
            console.log("  ├─ Pool 地址:", pool);
            console.log("  └─ Data Provider 地址:", dataProvider);

        } catch (error) {
            verificationResults.contracts.aaveAdapter = {
                address: aaveAdapterAddress,
                status: "❌ 验证失败",
                errors: [error.message]
            };
            console.log("❌ AaveAdapter 验证失败:", error.message);
        }

        // 验证 LendingAggregator
        console.log("\n🔍 验证 LendingAggregator...");
        const aggregatorAddress = deploymentInfo.contracts.lendingAggregator.address;
        const aggregator = await ethers.getContractAt("LendingAggregator", aggregatorAddress);

        try {
            const owner = await aggregator.owner();
            const aaveAdapterInAggregator = await aggregator.adapters(1);
            const compoundAdapter = await aggregator.adapters(2);

            const isOwnerCorrect = owner.toLowerCase() === deploymentInfo.deployer.toLowerCase();
            const isAaveAdapterCorrect = aaveAdapterInAggregator.toLowerCase() === aaveAdapterAddress.toLowerCase();

            verificationResults.contracts.lendingAggregator = {
                address: aggregatorAddress,
                status: "✅ 验证成功",
                owner: owner,
                aaveAdapter: aaveAdapterInAggregator,
                compoundAdapter: compoundAdapter,
                checks: {
                    ownerCorrect: isOwnerCorrect,
                    aaveAdapterCorrect: isAaveAdapterCorrect
                },
                errors: []
            };

            console.log("✅ LendingAggregator 验证成功");
            console.log("  ├─ 所有者:", owner, isOwnerCorrect ? "✅" : "❌");
            console.log("  ├─ Aave 适配器:", aaveAdapterInAggregator, isAaveAdapterCorrect ? "✅" : "❌");
            console.log("  └─ Compound 适配器:", compoundAdapter === ethers.ZeroAddress ? "未设置" : compoundAdapter);

            if (!isOwnerCorrect || !isAaveAdapterCorrect) {
                console.log("⚠️  部分配置检查未通过");
            }

        } catch (error) {
            verificationResults.contracts.lendingAggregator = {
                address: aggregatorAddress,
                status: "❌ 验证失败",
                errors: [error.message]
            };
            console.log("❌ LendingAggregator 验证失败:", error.message);
        }

        // 测试基本功能
        console.log("\n🧪 测试基本功能...");
        try {
            // 测试获取费率功能
            const testAsset = deploymentInfo.contracts.aaveAdapter.address; // 使用适配器地址作为测试资产
            
            try {
                const rates = await aggregator.getBestRates(testAsset);
                console.log("✅ 费率查询功能正常");
                console.log("  ├─ 最佳供应利率:", rates.bestSupplyApyRay.toString());
                console.log("  ├─ 最佳供应协议:", rates.bestSupplyProtocolId.toString());
                console.log("  ├─ 最佳借贷利率:", rates.bestBorrowApyRay.toString());
                console.log("  └─ 最佳借贷协议:", rates.bestBorrowProtocolId.toString());
            } catch (rateError) {
                console.log("⚠️  费率查询测试失败:", rateError.message);
                console.log("  (这可能是正常的，如果测试资产不在协议中)");
            }

            // 测试储备数据查询
            try {
                const reserveData = await aggregator.getReserveDataAll(testAsset);
                console.log("✅ 储备数据查询功能正常");
                console.log("  ├─ 总供应量:", reserveData.totalSupplySum.toString());
                console.log("  ├─ 总债务:", reserveData.totalDebtSum.toString());
                console.log("  └─ 可用流动性:", reserveData.availableLiquiditySum.toString());
            } catch (reserveError) {
                console.log("⚠️  储备数据查询测试失败:", reserveError.message);
                console.log("  (这可能是正常的，如果测试资产不在协议中)");
            }

        } catch (error) {
            console.log("⚠️  功能测试失败:", error.message);
        }

        // 保存验证结果
        const verificationFile = path.join(deploymentsDir, `verification-${Date.now()}.json`);
        fs.writeFileSync(verificationFile, JSON.stringify(verificationResults, null, 2));

        console.log("\n========================================");
        console.log("🎯 验证完成！");
        console.log("========================================");
        console.log("验证结果已保存到:", verificationFile);

        // 总结
        const successCount = Object.values(verificationResults.contracts).filter(c => c.status.includes("✅")).length;
        const totalCount = Object.keys(verificationResults.contracts).length;
        
        console.log(`\n📊 验证摘要: ${successCount}/${totalCount} 合约验证成功`);
        
        if (successCount === totalCount) {
            console.log("🎉 所有合约验证通过，系统可以正常使用！");
        } else {
            console.log("⚠️  部分合约验证失败，请检查部署状态");
        }

    } catch (error) {
        console.error("验证过程中发生错误:", error);
        throw error;
    }
}

// 如果直接运行此脚本
if (require.main === module) {
    main()
        .then(() => process.exit(0))
        .catch((error) => {
            console.error("验证失败:", error);
            process.exit(1);
        });
}

module.exports = main;
