"use client"
import Header from "@/components/Header";
import { useState } from "react";

const Borrow = () => {
  const [selectedProtocol, setSelectedProtocol] = useState("all");
  const [activeTab, setActiveTab] = useState("supply");

  // Mock data for assets
  const assets = [
    {
      symbol: "ETH",
      protocol: "Aave",
      totalSupply: "2.52M",
      supplyAPY: "1.67%",
      utilizationRate: "82.9%",
      icon: "ethereum"
    },
    {
      symbol: "USDT",
      protocol: "Aave",
      totalSupply: "6.85B",
      supplyAPY: "7.56%",
      utilizationRate: "93.3%",
      icon: "tether"
    },
    {
      symbol: "USDC",
      protocol: "Compound",
      totalSupply: "5.97B",
      supplyAPY: "4.62%",
      utilizationRate: "84.3%",
      icon: "usdc"
    },
    {
      symbol: "WBTC",
      protocol: "Aave",
      totalSupply: "45.47K",
      supplyAPY: "<0.01%",
      utilizationRate: "4.7%",
      icon: "bitcoin"
    }
  ];

  // Best supply rates
  const bestSupplyRates = [
    { symbol: "ETH", apy: "1.67%", protocol: "Aave" },
    { symbol: "USDT", apy: "7.56%", protocol: "Aave" },
    { symbol: "USDC", apy: "4.62%", protocol: "Compound" }
  ];

  // Best borrow rates
  const bestBorrowRates = [
    { symbol: "ETH", apy: "2.37%", protocol: "Aave" },
    { symbol: "USDT", apy: "9.07%", protocol: "Aave" },
    { symbol: "USDC", apy: "6.13%", protocol: "Compound" }
  ];

  return (
    <div className="bg-black min-h-screen">
      <Header />

      <div className="max-w-6xl mx-auto px-4 py-8">
        {/* Page Header */}
        <div className="text-center mb-8">
          {/* text-shadow: 0 0 10px #00d4ff80; */}
          <h1 className="text-3xl font-bold text-[#00d4ff] text-shadow-[0_0_10px_#00d4ff80] mb-2">借贷市场</h1>
          <p className="text-gray-400 text-sm">聚合Aave、Compound等协议，为您提供最优借贷利率和条件</p>
        </div>

        {/* Statistics Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-gray-900 rounded-xl p-6 border border-gray-800 hover:shadow-[0_10px_30px_#00d4ff33] transition-shadow hover:transform hover:translate-y-[-2px]"
            style={{ boxShadow: "0 0 20px #00d4ff4d" }}>
            <div className="flex items-center justify-center w-10 h-10 bg-cyan-900/50 rounded-full mb-4">
              <svg className="w-5 h-5 text-[#00d4ff] text-shadow-[0_0_10px_#00d4ff80]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 13h2v-2H3v2zM3 21h2v-2H3v2zM3 7h2V5H3v2zM5 3h2v2H5V3zM7 3h2v2H7V3zM9 3h2v2H9V3zM9 7h2v2H9V7zM" />
              </svg>
            </div>
            <p className="text-gray-400 mb-1">总供应量</p>
            <p className="text-2xl font-bold text-[#00d4ff] text-shadow-[0_0_10px_#00d4ff80]">$58.49B</p>
            <p className="text-green-400">+2.5%</p>
          </div>

          <div className="bg-gray-900 rounded-xl p-6 border border-gray-800 hover:shadow-[0_10px_30px_#00d4ff33] transition-shadow hover:transform hover:translate-y-[-2px]"
            style={{ boxShadow: "0 0 20px #00d4ff4d" }}>
            <div className="flex items-center justify-center w-10 h-10 bg-red-900/50 rounded-full mb-4">
              <svg className="w-5 h-5 text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 17h8m0 0l-8-8m8 8l-8 8m0 0H6" />
              </svg>
            </div>
            <p className="text-gray-400 mb-1">总借贷量</p>
            <p className="text-2xl font-bold text-[#00d4ff] text-shadow-[0_0_10px_#00d4ff80]">$24.51B</p>
            <p className="text-green-400">+1.8%</p>
          </div>

          <div className="bg-gray-900 rounded-xl p-6 border border-gray-800 hover:shadow-[0_10px_30px_#00d4ff33] transition-shadow hover:transform hover:translate-y-[-2px]"
            style={{ boxShadow: "0 0 20px #00d4ff4d" }}>
            <div className="flex items-center justify-center w-10 h-10 bg-blue-900/50 rounded-full mb-4">
              <svg className="w-5 h-5 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
              </svg>
            </div>
            <p className="text-gray-400 mb-1">可用流动性</p>
            <p className="text-2xl font-bold text-[#00d4ff] text-shadow-[0_0_10px_#00d4ff80]">$33.98B</p>
            <p className="text-green-400">+3.2%</p>
          </div>
        </div>

        {/* Protocol Selection */}
        <div className="bg-gray-900 rounded-xl p-4 mb-6 border border-gray-800 hover:shadow-[0_10px_30px_#00d4ff33] transition-shadow hover:transform hover:translate-y-[-2px]"
          style={{ boxShadow: "0 0 20px #00d4ff4d" }}>
          <div className="flex flex-wrap items-center justify-between gap-2">
            <div className="flex items-center space-x-2">
              <span className="text-gray-400">协议筛选:</span>
              <button
                onClick={() => setSelectedProtocol("all")}
                className={`px-3 py-1 rounded-md transition-colors ${selectedProtocol === "all"
                  ? "bg-[#00d4ff] text-black"
                  : "bg-gray-800 text-gray-400 hover:bg-gray-700"
                  }`}
              >
                全部协议
              </button>
              <button
                onClick={() => setSelectedProtocol("aave")}
                className={`px-3 py-1 rounded-md transition-colors ${selectedProtocol === "aave"
                  ? "bg-[#00d4ff] text-black"
                  : "bg-gray-800 text-gray-400 hover:bg-gray-700"
                  }`}
              >
                Aave
              </button>
              <button
                onClick={() => setSelectedProtocol("compound")}
                className={`px-3 py-1 rounded-md transition-colors ${selectedProtocol === "compound"
                  ? "bg-[#00d4ff] text-black"
                  : "bg-gray-800 text-gray-400 hover:bg-gray-700"
                  }`}
              >
                Compound
              </button>
            </div>
            <button className="text-gray-400 hover:text-white transition-colors flex items-center space-x-1">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <span>实时数据</span>
            </button>
          </div>
        </div>

        {/* Tabs */}
        <div className="bg-gray-900 rounded-xl mb-6 border border-gray-800 hover:shadow-[0_10px_30px_#00d4ff33] transition-shadow hover:transform hover:translate-y-[-2px]"
          style={{ boxShadow: "0 0 20px #00d4ff4d" }}>
          <div className="flex border-b border-gray-800 wi">
            <button
              onClick={() => setActiveTab("supply")}
              className={`px-8 py-3 text-sm font-medium w-full transition-colors ${activeTab === "supply"
                ? " border-b-2  bg-[#00d4ff] text-shadow-[0_0_10px_#00d4ff80] border-[#00d4ff] text-black text-shadow-[0_0_10px_#00d4ff80]"
                : "text-gray-400 hover:text-white"
                }`}
            >
              供应资产
            </button>
            <button
              onClick={() => setActiveTab("borrow")}
              className={`px-8 py-3 text-sm font-medium w-full transition-colors ${activeTab === "borrow"
                ? " border-b-2  bg-[#00d4ff] text-shadow-[0_0_10px_#00d4ff80] border-[#00d4ff] text-black text-shadow-[0_0_10px_#00d4ff80]"
                : "text-gray-400 hover:text-white"
                }`}
            >
              借贷资产
            </button>
          </div>

          {/* Supply Assets Table */}
          {activeTab === "supply" && (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-gray-800">
                    <th className="text-left py-4 px-6 text-gray-400">资产</th>
                    <th className="text-left py-4 px-6 text-gray-400">总供应量</th>
                    <th className="text-left py-4 px-6 text-gray-400">供应APY</th>
                    <th className="text-left py-4 px-6 text-gray-400">利用率</th>
                    <th className="text-left py-4 px-6 text-gray-400">操作</th>
                  </tr>
                </thead>
                <tbody>
                  {assets.map((asset) => (
                    <tr key={asset.symbol} className="border-b border-gray-800 hover:bg-gray-900/50 transition-colors">
                      <td className="py-4 px-6">
                        <div className="flex items-center space-x-2">
                          <div className="w-6 h-6 rounded-full bg-gray-800 flex items-center justify-center">
                            <span className="text-xs">{asset.icon.charAt(0).toUpperCase()}</span>
                          </div>
                          <div>
                            <div className="font-medium text-white">{asset.symbol}</div>
                            <div className="text-gray-400">{asset.protocol}</div>
                          </div>
                        </div>
                      </td>
                      <td className="py-4 px-6 text-sm text-gray-300">
                        <div>{asset.totalSupply}</div>
                        <div className="text-gray-500">${asset.totalSupply.replace(/M/, '000').replace(/B/, '000000')}</div>
                      </td>
                      <td className="py-4 px-6">
                        <div className="text-sm font-medium text-green-400">{asset.supplyAPY}</div>
                      </td>
                      <td className="py-4 px-6 text-sm text-gray-300">{asset.utilizationRate}</td>
                      <td className="py-4 px-6">
                        <div className="flex space-x-2">
                          {/* 背景色background: linear-gradient(135deg, oklch(69.6% .17 162.48), #00a3ff); */}
                          <button className="px-5  text-white rounded-md hover:bg-green-700 transition-colors bg-gradient-to-r bg-green-700 via-green-600 to-green-400">
                            供应
                          </button>
                          {/* 背景色background: linear-gradient(135deg, #667eea, #764ba2); */}
                          <button className="px-5   text-white rounded-md hover:bg-purple-700 transition-colors bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600">
                            详情
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          {/* Borrow Assets Table */}
          {activeTab === "borrow" && (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-gray-800">
                    <th className="text-left py-4 px-6 text-gray-400">资产</th>
                    <th className="text-left py-4 px-6 text-gray-400">总借贷量</th>
                    <th className="text-left py-4 px-6 text-gray-400">借贷APY</th>
                    <th className="text-left py-4 px-6 text-gray-400">利用率</th>
                    <th className="text-left py-4 px-6 text-gray-400">操作</th>
                  </tr>
                </thead>
                <tbody>
                  {assets.map((asset) => (
                    <tr key={asset.symbol} className="border-b border-gray-800 hover:bg-gray-900/50 transition-colors">
                      <td className="py-4 px-6">
                        <div className="flex items-center space-x-2">
                          <div className="w-6 h-6 rounded-full bg-gray-800 flex items-center justify-center">
                            <span className="text-xs">{asset.icon.charAt(0).toUpperCase()}</span>
                          </div>
                          <div>
                            <div className="font-medium text-white">{asset.symbol}</div>
                            <div className="text-gray-400">{asset.protocol}</div>
                          </div>
                        </div>
                      </td>
                      <td className="py-4 px-6 text-sm text-gray-300">
                        <div>{asset.totalSupply}</div>
                        <div className="text-gray-500">${asset.totalSupply.replace(/M/, '000').replace(/B/, '000000')}</div>
                      </td>
                      <td className="py-4 px-6">
                        <div className="text-sm font-medium text-orange-400">8.5%</div>
                      </td>
                      <td className="py-4 px-6 text-sm text-gray-300">{asset.utilizationRate}</td>
                      <td className="py-4 px-6">
                        <div className="flex space-x-2">
                          <button className="px-3 py-1 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors">
                            借贷
                          </button>
                          <button className="px-3 py-1 bg-purple-600 text-white rounded-md hover:bg-purple-700 transition-colors">
                            详情
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>

        {/* Best Rates Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Best Supply Rates */}
          <div className="bg-gray-900 rounded-xl p-6 border border-gray-800 hover:shadow-[0_10px_30px_#00d4ff33] transition-shadow hover:transform hover:translate-y-[-2px]"
            style={{ boxShadow: "0 0 20px #00d4ff4d" }}>
            <h3 className="text-sm font-bold text-green-400 mb-4">最佳供应利率</h3>
            <div className="space-y-3">
              {bestSupplyRates.map((rate, index) => (
                <div key={index} className="flex items-center justify-between p-3 bg-gray-900/50 rounded-lg">
                  <div className="flex items-center space-x-3">
                    <div className="w-6 h-6 rounded-full bg-gray-800 flex items-center justify-center">
                      <span className="text-xs">{rate.symbol.charAt(0)}</span>
                    </div>
                    <div>
                      <div className="font-medium text-white">{rate.symbol}</div>
                      <div className="text-gray-400">{rate.protocol}</div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-sm font-medium text-green-400">{rate.apy}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Best Borrow Rates */}
          <div className="bg-gray-900 rounded-xl p-6 border border-gray-800 hover:shadow-[0_10px_30px_#00d4ff33] transition-shadow hover:transform hover:translate-y-[-2px]"
            style={{ boxShadow: "0 0 20px #00d4ff4d" }}>
            <h3 className="text-sm font-bold text-orange-400 mb-4">最低借贷利率</h3>
            <div className="space-y-3">
              {bestBorrowRates.map((rate, index) => (
                <div key={index} className="flex items-center justify-between p-3 bg-gray-900/50 rounded-lg">
                  <div className="flex items-center space-x-3">
                    <div className="w-6 h-6 rounded-full bg-gray-800 flex items-center justify-center">
                      <span className="text-xs">{rate.symbol.charAt(0)}</span>
                    </div>
                    <div>
                      <div className="font-medium text-white">{rate.symbol}</div>
                      <div className="text-gray-400">{rate.protocol}</div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-sm font-medium text-orange-400">{rate.apy}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Borrow;