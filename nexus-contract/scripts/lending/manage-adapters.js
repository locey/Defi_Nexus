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

async function main() {
    console.log("🔧 LendingAggregator 适配器管理工具");
    console.log("=====================================");

    // 获取操作账户
    const [deployer] = await ethers.getSigners();
    console.log("操作账户:", deployer.address);

    // 从部署记录中读取 LendingAggregator 地址
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

    // 检查权限
    const owner = await lendingAggregator.owner();
    if (owner.toLowerCase() !== deployer.address.toLowerCase()) {
        throw new Error("当前账户不是合约所有者，无法执行此操作");
    }

    // 显示当前状态
    console.log("\n📋 当前适配器配置:");
    for (const [protocolName, protocolId] of Object.entries(PROTOCOL_IDS)) {
        const adapterAddress = await lendingAggregator.adapters(protocolId);
        const status = adapterAddress === ethers.ZeroAddress ? "❌ 未设置" : "✅ 已设置";
        console.log(`├─ 协议 ID ${protocolId} (${protocolName}): ${adapterAddress} ${status}`);
    }

    // 从命令行参数获取操作指令
    const args = process.argv.slice(2);
    if (args.length === 0) {
        console.log("\n💡 使用方法:");
        console.log("设置适配器: node manage-adapters.js set <protocol_id> <adapter_address>");
        console.log("查看状态: node manage-adapters.js status");
        console.log("重置适配器: node manage-adapters.js reset <protocol_id>");
        console.log("\n支持的协议:");
        for (const [protocolName, protocolId] of Object.entries(PROTOCOL_IDS)) {
            console.log(`  ${protocolId}: ${protocolName}`);
        }
        return;
    }

    const command = args[0];
    const protocolId = parseInt(args[1]);
    const adapterAddress = args[2];

    switch (command) {
        case 'set':
            if (!protocolId || !adapterAddress) {
                console.error("❌ 参数错误: 需要协议ID和适配器地址");
                console.log("示例: node manage-adapters.js set 1 0x1234...");
                return;
            }
            await setAdapter(lendingAggregator, protocolId, adapterAddress);
            break;

        case 'reset':
            if (!protocolId) {
                console.error("❌ 参数错误: 需要协议ID");
                console.log("示例: node manage-adapters.js reset 1");
                return;
            }
            await resetAdapter(lendingAggregator, protocolId);
            break;

        case 'status':
            // 状态已经在上面显示了
            break;

        default:
            console.error("❌ 未知命令:", command);
            console.log("支持的命令: set, reset, status");
    }
}

async function setAdapter(lendingAggregator, protocolId, adapterAddress) {
    const protocolName = PROTOCOL_NAMES[protocolId] || `协议${protocolId}`;
    
    console.log(`\n🚀 设置 ${protocolName} 适配器...`);
    
    // 验证地址格式
    if (!ethers.isAddress(adapterAddress)) {
        throw new Error("无效的适配器地址");
    }

    // 检查当前状态
    const currentAdapter = await lendingAggregator.adapters(protocolId);
    if (currentAdapter.toLowerCase() === adapterAddress.toLowerCase()) {
        console.log("✅ 适配器已经设置为此地址，无需重复操作");
        return;
    }

    try {
        const setAdapterTx = await lendingAggregator.setAdapter(protocolId, adapterAddress);
        console.log("交易已发送:", setAdapterTx.hash);
        
        const receipt = await setAdapterTx.wait();
        console.log("✅ 适配器设置成功！");
        console.log("区块高度:", receipt.blockNumber);
        
        // 验证设置
        const updatedAdapter = await lendingAggregator.adapters(protocolId);
        console.log("验证结果:", updatedAdapter === adapterAddress ? "✅ 成功" : "❌ 失败");

        // 记录操作
        await recordOperation('set', protocolId, adapterAddress, setAdapterTx.hash, receipt.blockNumber);

    } catch (error) {
        console.error("❌ 设置适配器失败:", error.message);
        throw error;
    }
}

async function resetAdapter(lendingAggregator, protocolId) {
    const protocolName = PROTOCOL_NAMES[protocolId] || `协议${protocolId}`;
    
    console.log(`\n🔄 重置 ${protocolName} 适配器...`);
    
    try {
        // 设置为零地址来重置
        const resetTx = await lendingAggregator.setAdapter(protocolId, ethers.ZeroAddress);
        console.log("交易已发送:", resetTx.hash);
        
        const receipt = await resetTx.wait();
        console.log("✅ 适配器重置成功！");
        console.log("区块高度:", receipt.blockNumber);

        // 记录操作
        await recordOperation('reset', protocolId, ethers.ZeroAddress, resetTx.hash, receipt.blockNumber);

    } catch (error) {
        console.error("❌ 重置适配器失败:", error.message);
        throw error;
    }
}

async function recordOperation(operation, protocolId, adapterAddress, txHash, blockNumber) {
    const operationInfo = {
        timestamp: new Date().toISOString(),
        operation: operation,
        protocolId: protocolId,
        protocolName: PROTOCOL_NAMES[protocolId] || `协议${protocolId}`,
        adapterAddress: adapterAddress,
        transactionHash: txHash,
        blockNumber: blockNumber
    };

    const deploymentsDir = path.join(__dirname, '../../deployments');
    const operationFile = path.join(deploymentsDir, `adapter-operation-${Date.now()}.json`);
    fs.writeFileSync(operationFile, JSON.stringify(operationInfo, null, 2));
    console.log("操作记录已保存到:", operationFile);
}

// 如果直接运行此脚本
if (require.main === module) {
    main()
        .then(() => process.exit(0))
        .catch((error) => {
            console.error("操作失败:", error);
            process.exit(1);
        });
}

module.exports = main;
