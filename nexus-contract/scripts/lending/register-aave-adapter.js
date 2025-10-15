const { ethers } = require("hardhat");
const fs = require('fs');
const path = require('path');

async function main() {
    console.log("开始注册 Aave 适配器到 LendingAggregator...");

    // 获取部署者账户
    const [deployer] = await ethers.getSigners();
    console.log("操作账户:", deployer.address);
    console.log("账户余额:", ethers.formatEther(await deployer.provider.getBalance(deployer.address)), "ETH");

    // 从部署记录中读取合约地址
    const deploymentsDir = path.join(__dirname, '../../deployments');
    
    // 查找最新的部署记录
    const aaveAdapterFiles = fs.readdirSync(deploymentsDir)
        .filter(file => file.startsWith('aave-adapter-') && file.endsWith('.json'))
        .sort()
        .reverse();

    const aggregatorFiles = fs.readdirSync(deploymentsDir)
        .filter(file => file.startsWith('lending-aggregator-') && file.endsWith('.json'))
        .sort()
        .reverse();

    if (aaveAdapterFiles.length === 0 || aggregatorFiles.length === 0) {
        throw new Error("未找到部署记录，请先部署合约");
    }

    const aaveAdapterInfo = JSON.parse(fs.readFileSync(
        path.join(deploymentsDir, aaveAdapterFiles[0]), 'utf8'
    ));
    
    const aggregatorInfo = JSON.parse(fs.readFileSync(
        path.join(deploymentsDir, aggregatorFiles[0]), 'utf8'
    ));

    const aaveAdapterAddress = aaveAdapterInfo.address;
    const aggregatorAddress = aggregatorInfo.address;

    console.log("AaveAdapter 地址:", aaveAdapterAddress);
    console.log("LendingAggregator 地址:", aggregatorAddress);

    // 连接到已部署的合约
    const lendingAggregator = await ethers.getContractAt("LendingAggregator", aggregatorAddress);

    // 验证当前状态
    console.log("\n🔍 检查当前状态...");
    try {
        const owner = await lendingAggregator.owner();
        console.log("合约所有者:", owner);
        
        if (owner.toLowerCase() !== deployer.address.toLowerCase()) {
            throw new Error("当前账户不是合约所有者，无法执行此操作");
        }

        const currentAaveAdapter = await lendingAggregator.adapters(1);
        console.log("当前 Aave 适配器 (协议 ID 1):", currentAaveAdapter === ethers.ZeroAddress ? "未设置" : currentAaveAdapter);
        
        if (currentAaveAdapter.toLowerCase() === aaveAdapterAddress.toLowerCase()) {
            console.log("✅ Aave 适配器已经正确设置，无需重复注册");
            return;
        }

    } catch (error) {
        console.error("❌ 状态检查失败:", error.message);
        throw error;
    }

    // 注册 Aave 适配器
    console.log("\n🚀 开始注册 Aave 适配器...");
    try {
        // 协议 ID 1 = Aave
        const protocolId = 1;
        
        console.log(`设置协议 ID ${protocolId} 的适配器为: ${aaveAdapterAddress}`);
        
        const setAdapterTx = await lendingAggregator.setAdapter(protocolId, aaveAdapterAddress);
        console.log("交易已发送:", setAdapterTx.hash);
        
        console.log("等待交易确认...");
        const receipt = await setAdapterTx.wait();
        console.log("✅ 交易已确认，区块高度:", receipt.blockNumber);
        
        // 验证设置结果
        console.log("\n🔍 验证设置结果...");
        const updatedAaveAdapter = await lendingAggregator.adapters(protocolId);
        
        if (updatedAaveAdapter.toLowerCase() === aaveAdapterAddress.toLowerCase()) {
            console.log("✅ Aave 适配器注册成功！");
            console.log("协议 ID 1 (Aave) 适配器地址:", updatedAaveAdapter);
        } else {
            throw new Error("适配器地址设置验证失败");
        }

        // 保存注册信息
        const registrationInfo = {
            timestamp: new Date().toISOString(),
            operator: deployer.address,
            network: await deployer.provider.getNetwork(),
            lendingAggregator: {
                address: aggregatorAddress,
                transactionHash: setAdapterTx.hash,
                blockNumber: receipt.blockNumber
            },
            aaveAdapter: {
                address: aaveAdapterAddress,
                protocolId: protocolId
            },
            registration: {
                success: true,
                message: "Aave 适配器注册成功"
            }
        };

        const registrationFile = path.join(deploymentsDir, `aave-adapter-registration-${Date.now()}.json`);
        fs.writeFileSync(registrationFile, JSON.stringify(registrationInfo, null, 2));
        console.log("注册信息已保存到:", registrationFile);

        // 显示完整的配置状态
        console.log("\n📋 当前配置状态:");
        const aaveAdapter = await lendingAggregator.adapters(1);
        const compoundAdapter = await lendingAggregator.adapters(2);
        
        console.log("├─ 协议 ID 1 (Aave):", aaveAdapter === ethers.ZeroAddress ? "未设置" : aaveAdapter);
        console.log("└─ 协议 ID 2 (Compound):", compoundAdapter === ethers.ZeroAddress ? "未设置" : compoundAdapter);

        console.log("\n🎉 Aave 适配器注册完成！");
        console.log("现在可以使用 LendingAggregator 进行 Aave 协议的操作了。");

    } catch (error) {
        console.error("❌ 注册过程中发生错误:", error);
        
        // 保存错误信息
        const errorInfo = {
            timestamp: new Date().toISOString(),
            operator: deployer.address,
            error: error.message,
            stack: error.stack,
            lendingAggregatorAddress: aggregatorAddress,
            aaveAdapterAddress: aaveAdapterAddress
        };

        const errorFile = path.join(deploymentsDir, `registration-error-${Date.now()}.json`);
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
            console.error("注册失败:", error);
            process.exit(1);
        });
}

module.exports = main;
