const { ethers } = require("hardhat");
const fs = require('fs');
const path = require('path');

async function main() {
    console.log("开始部署 AaveAdapter 合约...");

    // 获取部署者账户
    const [deployer] = await ethers.getSigners();
    console.log("部署账户:", deployer.address);
    console.log("账户余额:", ethers.formatEther(await deployer.provider.getBalance(deployer.address)), "ETH");

    // 读取配置文件
    const configPath = path.join(__dirname, '../../scripts/config.sepolia.json');
    const config = JSON.parse(fs.readFileSync(configPath, 'utf8'));

    // 验证配置
    if (!config.AAVE_POOL_ADDRESS || !config.AAVE_DATA_PROVIDER_ADDRESS) {
        throw new Error("请在 config.sepolia.json 中配置 AAVE_POOL_ADDRESS 和 AAVE_DATA_PROVIDER_ADDRESS");
    }

    console.log("Aave Pool 地址:", config.AAVE_POOL_ADDRESS);
    console.log("Aave Data Provider 地址:", config.AAVE_DATA_PROVIDER_ADDRESS);

    // 部署 AaveAdapter 合约
    const AaveAdapter = await ethers.getContractFactory("AaveAdapter");
    const aaveAdapter = await AaveAdapter.deploy(
        config.AAVE_POOL_ADDRESS,
        config.AAVE_DATA_PROVIDER_ADDRESS
    );

    await aaveAdapter.waitForDeployment();
    const aaveAdapterAddress = await aaveAdapter.getAddress();

    console.log("AaveAdapter 合约已部署到:", aaveAdapterAddress);

    // 保存部署信息
    const deploymentInfo = {
        contractName: "AaveAdapter",
        address: aaveAdapterAddress,
        deployer: deployer.address,
        network: await deployer.provider.getNetwork(),
        constructorArgs: {
            pool: config.AAVE_POOL_ADDRESS,
            dataProvider: config.AAVE_DATA_PROVIDER_ADDRESS
        },
        deploymentTime: new Date().toISOString(),
        transactionHash: aaveAdapter.deploymentTransaction().hash
    };

    // 保存到部署记录文件
    const deploymentsDir = path.join(__dirname, '../../deployments');
    if (!fs.existsSync(deploymentsDir)) {
        fs.mkdirSync(deploymentsDir, { recursive: true });
    }

    const deploymentFile = path.join(deploymentsDir, `aave-adapter-${Date.now()}.json`);
    fs.writeFileSync(deploymentFile, JSON.stringify(deploymentInfo, null, 2));

    console.log("部署信息已保存到:", deploymentFile);

    // 验证部署
    console.log("\n验证部署...");
    try {
        const pool = await aaveAdapter.pool();
        const dataProvider = await aaveAdapter.dataProvider();
        console.log("✓ Pool 地址验证成功:", pool);
        console.log("✓ Data Provider 地址验证成功:", dataProvider);
    } catch (error) {
        console.error("✗ 部署验证失败:", error.message);
    }

    console.log("\nAaveAdapter 部署完成！");
    console.log("合约地址:", aaveAdapterAddress);
    
    return {
        address: aaveAdapterAddress,
        contract: aaveAdapter
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
