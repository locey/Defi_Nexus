## 借贷聚合模块设计文档（Aave 优先，预留 Compound）

### 目标
- 提供统一的借贷操作与查询入口：供应、提款、借款、还款。
- 对接 Aave（当前）、预留 Compound（后续），并可聚合查询总供应/总借贷/可用流动性。
- 提供最佳利率查询：最高供应 APY、最低借贷利率。
- 提供清晰的部署与测试指南，便于落地验证。

### 目录结构
- `contracts/lending/`
  - `AaveAdapter.sol`：Aave V3 适配器（直接调用 Aave Pool/DataProvider）。
  - `IAaveAdapter.sol`：Aave 适配器接口（统一方法签名）。
  - `LendingAggregator.sol`：借贷聚合器（注册多个协议适配器并统一查询/操作）。
  - `README.md`：模块说明简述。
- `scripts/lending/`
  - `config.sepolia.json`：网络与资产地址配置（可用 env 覆盖）。
  - `deploy-aggregator.ts`：部署 `LendingAggregator`。
  - `deploy-aave-adapter.ts`：部署 `AaveAdapter`（需 Pool/DataProvider）。
  - `set-aggregator-aave.ts`：将 Aave 适配器注册到聚合器（protocolId=1）。
  - `aave-stats.ts`：只读打印 ETH/USDC/USDT/WBTC 的总供应/总借贷/可用/利率/利用率。
- `test/lending/`
  - `aggregator-set-aave.test.js`：验证 `setAdapter(1, addr)` 的行为。
  - `aave-stats.test.js`：在提供地址时读取并打印核心指标（只读）。

### 合约设计
- `AaveAdapter.sol`
  - 依赖：Aave V3 `Pool` 与 `ProtocolDataProvider` 地址。
  - 方法：
    - `supply(asset, amount, onBehalfOf)`
    - `withdraw(asset, amount, to) returns (uint256)`
    - `borrow(asset, amount, interestRateMode, onBehalfOf)`（`interestRateMode`：1=稳定，2=可变）
    - `repay(asset, amount, interestRateMode, onBehalfOf) returns (uint256)`
    - `getReserveData(asset) view returns (totalSupply, totalDebt, availableLiquidity)`
    - `getRates(asset) view returns (supplyApyRay, variableBorrowApyRay, stableBorrowApyRay)`
  - 说明：
    - `totalDebt = totalStableDebt + totalVariableDebt`
    - `totalSupply ≈ totalDebt + availableLiquidity`（按 Aave 的储备口径近似）
    - 利率单位为 ray（1e27）。

- `LendingAggregator.sol`
  - 用途：
    - 通过 `setAdapter(protocolId, adapter)` 注册协议适配器（1=Aave，2=Compound 预留）。
    - 对外统一操作：`supply/withdraw/borrow/repay`。
    - 聚合查询：`getReserveDataAll(asset)` 汇总各协议的供给/借贷/可用。
    - 最佳利率：`getBestRates(asset)` 返回最高供应 APY 和最低借贷 APY 及对应协议 id。

### 数据口径与公式
- 供应 APY（百分比）计算：`percent = rateRay * 100 / 1e27`（前端/脚本换算）。
- 利用率：`utilization = totalDebt / totalSupply`（当 `totalSupply==0` 时定义为 0）。

### 网络与地址配置
- `hardhat.config.js` 支持：`hardhat`、`sepolia`。
- 环境变量（可选，覆盖配置文件）：
  - `SEPOLIA_RPC_URL`、`PRIVATE_KEY`
  - `AAVE_POOL_ADDRESS`、`AAVE_DATA_PROVIDER_ADDRESS`
  - `AAVE_ADAPTER_ADDRESS`、`AGGREGATOR_ADDRESS`
- 配置文件：`scripts/lending/config.sepolia.json`
  - `AAVE_POOL_ADDRESS`
  - `AAVE_DATA_PROVIDER_ADDRESS`
  - `ASSETS`：`WETH/USDC/USDT/WBTC` 的地址（按目标网络填写）。

> 注：Aave 在部分测试网（如 Sepolia）未必有官方部署，请确认可用地址；否则建议切换至有 Aave V3 的网络（如主网/Polygon/Arbitrum 等），或仅演示部署与聚合逻辑。

### 部署步骤（以 Sepolia 为例）
1) 编译
```bash
npx hardhat compile
```
2) 部署聚合器
```bash
npx hardhat run scripts/lending/deploy-aggregator.ts --network sepolia
# 记录输出的 LendingAggregator 地址
```
3) 部署 Aave 适配器（需先填好 Pool/DataProvider）
```bash
npx hardhat run scripts/lending/deploy-aave-adapter.ts --network sepolia
# 记录输出的 AaveAdapter 地址
```
4) 在聚合器中注册 Aave 适配器
```bash
AGGREGATOR_ADDRESS=0x... AAVE_ADAPTER_ADDRESS=0x... npx hardhat run scripts/lending/set-aggregator-aave.ts --network sepolia
```

### 只读查询与验证
- 直接打印 Aave 四个资产核心指标：
```bash
AAVE_ADAPTER_ADDRESS=0x... npx hardhat run scripts/lending/aave-stats.ts --network sepolia
```
- 核心指标说明：
  - Total Supply（approx）：≈ 总供应量
  - Total Debt：总借贷量
  - Available Liquidity：可用流动性
  - Supply APY：供应年化利率（%）
  - Variable Borrow APY：可变年化借贷利率（%）
  - Utilization：利用率（%）

### 测试说明
- 聚合器行为（本地链即可）：
```bash
npx hardhat test test/lending/aggregator-set-aave.test.js
```
- Aave 只读查询（需要链上地址）：
```bash
AAVE_ADAPTER_ADDRESS=0x... npx hardhat test test/lending/aave-stats.test.js --network sepolia
```

### 与前端/后端集成要点
- 前端：
  - 通过聚合器暴露的读方法（`getReserveDataAll`、`getBestRates`）获取聚合数据与最佳利率。
  - 注意将 ray 转换为百分比展示，保留 2 位小数或按需格式化。
- 后端：
  - 可封装指标拉取与缓存，减少前端 RPC 频率。
  - 注意网络与地址的环境化配置，便于不同网络切换。

### 安全与边界
- 适配器 `supply/repay` 内部使用 `transferFrom + approve` 进行单次操作。
- 跨合约调用需确保 `asset` 为标准 ERC20，且调用方已授权或持有必要余额（只读不需要）。
- 由于 `totalSupply` 为近似值（`available + totalDebt`），如需与 Aave 官方 UI 完全对齐，建议引入更精确的储备口径数据源或对接官方 SDK。

### 后续工作（Compound 接入）
- 实现 `CompoundAdapter`，遵循与 `AaveAdapter` 相同的接口方法。
- 在 `LendingAggregator` 中通过 `setAdapter(2, compoundAdapter)` 注册。
- 不改动现有聚合与最佳利率逻辑，天然生效。
