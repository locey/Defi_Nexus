const { ethers } = require("hardhat");
const fs = require('fs');
const path = require('path');

// 导入单独的部署脚本
const deployAaveAdapter = require('./deploy-aave-adapter');
const deployLendingAggregator = require('./deploy-lending-aggregator');

async function main() {
    console.log("========================================");
    console.log("开始部署完整的 Lending 系统...");
    console.log("========================================");

    const [deployer] = await ethers.getSigners();
    console.log("部署账户:", deployer.address);
    console.log("网络:", await deployer.provider.getNetwork().then(n => n.name));

    const deploymentResults = {};

    try {
        // 步骤 1: 部署 AaveAdapter
        console.log("\n🚀 步骤 1: 部署 AaveAdapter...");
        const aaveAdapterResult = await deployAaveAdapter();
        deploymentResults.aaveAdapter = aaveAdapterResult;
        
        // 等待确认
        await aaveAdapterResult.contract.deploymentTransaction().wait(1);
        console.log("✅ AaveAdapter 部署完成");

        // 步骤 2: 部署 LendingAggregator
        console.log("\n🚀 步骤 2: 部署 LendingAggregator...");
        const aggregatorResult = await deployLendingAggregator();
        deploymentResults.lendingAggregator = aggregatorResult;
        
        // 等待确认
        await aggregatorResult.contract.deploymentTransaction().wait(1);
        console.log("✅ LendingAggregator 部署完成");

        // 步骤 3: 配置 LendingAggregator
        console.log("\n🔧 步骤 3: 配置 LendingAggregator...");
        const aggregator = aggregatorResult.contract;
        
        // 设置 Aave 适配器 (protocol ID = 1)
        console.log("设置 Aave 适配器...");
        const setAdapterTx = await aggregator.setAdapter(1, aaveAdapterResult.address);
        await setAdapterTx.wait(1);
        console.log("✅ Aave 适配器配置完成");

        // 验证配置
        console.log("\n🔍 验证配置...");
        const aaveAdapterAddress = await aggregator.adapters(1);
        console.log("Aave 适配器地址:", aaveAdapterAddress);
        
        if (aaveAdapterAddress.toLowerCase() === aaveAdapterResult.address.toLowerCase()) {
            console.log("✅ 配置验证成功");
        } else {
            throw new Error("配置验证失败");
        }

        // 保存完整的部署信息
        const completeDeploymentInfo = {
            network: await deployer.provider.getNetwork(),
            deployer: deployer.address,
            deploymentTime: new Date().toISOString(),
            contracts: {
                aaveAdapter: {
                    name: "AaveAdapter",
                    address: aaveAdapterResult.address,
                    transactionHash: aaveAdapterResult.contract.deploymentTransaction().hash
                },
                lendingAggregator: {
                    name: "LendingAggregator", 
                    address: aggregatorResult.address,
                    transactionHash: aggregatorResult.contract.deploymentTransaction().hash
                }
            },
            configuration: {
                protocolMappings: {
                    1: aaveAdapterResult.address // Aave
                    // 2: "待设置" // Compound
                }
            }
        };

        // 保存到部署记录文件
        const deploymentsDir = path.join(__dirname, '../../deployments');
        if (!fs.existsSync(deploymentsDir)) {
            fs.mkdirSync(deploymentsDir, { recursive: true });
        }

        const completeDeploymentFile = path.join(deploymentsDir, `lending-system-complete-${Date.now()}.json`);
        fs.writeFileSync(completeDeploymentFile, JSON.stringify(completeDeploymentInfo, null, 2));

        console.log("\n========================================");
        console.log("🎉 部署完成！");
        console.log("========================================");
        console.log("📋 部署摘要:");
        console.log("├─ AaveAdapter:", aaveAdapterResult.address);
        console.log("├─ LendingAggregator:", aggregatorResult.address);
        console.log("└─ 完整部署信息:", completeDeploymentFile);
        
        console.log("\n📖 使用说明:");
        console.log("1. LendingAggregator 是主要的交互合约");
        console.log("2. 协议 ID 1 = Aave");
        console.log("3. 协议 ID 2 = Compound (待实现)");
        console.log("4. 使用 LendingAggregator 的 supply/withdraw/borrow/repay 方法");

        return deploymentResults;

    } catch (error) {
        console.error("\n❌ 部署过程中发生错误:", error);
        
        // 保存错误信息
        const errorInfo = {
            error: error.message,
            stack: error.stack,
            deploymentTime: new Date().toISOString(),
            partialResults: deploymentResults
        };

        const errorFile = path.join(__dirname, '../../deployments', `deployment-error-${Date.now()}.json`);
        fs.writeFileSync(errorFile, JSON.stringify(errorInfo, null, 2));
        console.log("错误信息已保存到:", errorFile);
        
        throw error;
    }
}

// 如果直接运行此脚本
if (require.main === module) {
    main()
        .then(() => process.exit(0))
        .catch((error) => {
            console.error("部署失败:", error);
            process.exit(1);
        });
}

module.exports = main;
