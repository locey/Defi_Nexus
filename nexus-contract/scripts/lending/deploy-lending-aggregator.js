const { ethers } = require("hardhat");
const fs = require('fs');
const path = require('path');

async function main() {
    console.log("开始部署 LendingAggregator 合约...");

    // 获取部署者账户
    const [deployer] = await ethers.getSigners();
    console.log("部署账户:", deployer.address);
    console.log("账户余额:", ethers.formatEther(await deployer.provider.getBalance(deployer.address)), "ETH");

    // 部署 LendingAggregator 合约
    const LendingAggregator = await ethers.getContractFactory("LendingAggregator");
    const lendingAggregator = await LendingAggregator.deploy();

    await lendingAggregator.waitForDeployment();
    const lendingAggregatorAddress = await lendingAggregator.getAddress();

    console.log("LendingAggregator 合约已部署到:", lendingAggregatorAddress);

    // 保存部署信息
    const deploymentInfo = {
        contractName: "LendingAggregator",
        address: lendingAggregatorAddress,
        deployer: deployer.address,
        owner: deployer.address,
        network: await deployer.provider.getNetwork(),
        constructorArgs: {},
        deploymentTime: new Date().toISOString(),
        transactionHash: lendingAggregator.deploymentTransaction().hash
    };

    // 保存到部署记录文件
    const deploymentsDir = path.join(__dirname, '../../deployments');
    if (!fs.existsSync(deploymentsDir)) {
        fs.mkdirSync(deploymentsDir, { recursive: true });
    }

    const deploymentFile = path.join(deploymentsDir, `lending-aggregator-${Date.now()}.json`);
    fs.writeFileSync(deploymentFile, JSON.stringify(deploymentInfo, null, 2));

    console.log("部署信息已保存到:", deploymentFile);

    // 验证部署
    console.log("\n验证部署...");
    try {
        const owner = await lendingAggregator.owner();
        console.log("✓ 合约所有者验证成功:", owner);
        
        // 检查初始适配器状态
        const aaveAdapter = await lendingAggregator.adapters(1);
        const compoundAdapter = await lendingAggregator.adapters(2);
        console.log("✓ Aave 适配器地址:", aaveAdapter === ethers.ZeroAddress ? "未设置" : aaveAdapter);
        console.log("✓ Compound 适配器地址:", compoundAdapter === ethers.ZeroAddress ? "未设置" : compoundAdapter);
    } catch (error) {
        console.error("✗ 部署验证失败:", error.message);
    }

    console.log("\nLendingAggregator 部署完成！");
    console.log("合约地址:", lendingAggregatorAddress);
    
    return {
        address: lendingAggregatorAddress,
        contract: lendingAggregator
    };
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
