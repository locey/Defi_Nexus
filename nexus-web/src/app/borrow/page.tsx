// src/app/borrow/page.tsx
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
    <div className="bg-black min-h-screen bg-gradient-to-br from-cyan-900/40 via-purple-900/30 to-pink-800/40 animate-gradient-bg">
      <Header />

      <div className="max-w-6xl mx-auto px-4 py-8">
        {/* Page Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold bg-gradient-to-r from-cyan-400 via-blue-500 to-indigo-600 bg-clip-text text-transparent mb-2 animate-gradient">借贷市场</h1>
          <p className="text-gray-200 text-sm">聚合Aave、Compound等协议，为您提供最优借贷利率和条件</p>
        </div>

        {/* Statistics Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-gradient-to-br from-cyan-900/80 via-blue-800/70 to-indigo-900/80 backdrop-blur-xl rounded-xl p-6 border-2 border-cyan-400/70 hover:shadow-[0_0_25px_#00ffff88] transition-all duration-300 hover:scale-[1.03] relative overflow-hidden">
            <div className="absolute inset-0 bg-[linear-gradient(120deg,transparent_0%,rgba(255,255,255,0.15)_50%,transparent_100%)] opacity-0 hover:opacity-100 transition-opacity duration-500"></div>
            <div className="flex items-center justify-center w-12 h-12 bg-gradient-to-br from-cyan-500 to-blue-600 rounded-full mb-4 shadow-lg">
              <svg className="w-6 h-6 bg-gradient-to-r from-white to-cyan-200 bg-clip-text text-transparent" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 13h2v-2H3v2zM3 21h2v-2H3v2zM3 7h2V5H3v2zM5 3h2v2H5V3zM7 3h2v2H7V3zM9 3h2v2H9V3zM9 7h2v2H9V7zM" />
              </svg>
            </div>
            <p className="text-gray-100 mb-1">总供应量</p>
            <p className="text-2xl font-bold bg-gradient-to-r from-cyan-300 via-blue-400 to-indigo-300 bg-clip-text text-transparent">$58.49B</p>
            <p className="text-green-300 font-bold">+2.5%</p>
          </div>

          <div className="bg-gradient-to-br from-rose-900/80 via-red-800/70 to-pink-900/80 backdrop-blur-xl rounded-xl p-6 border-2 border-rose-400/70 hover:shadow-[0_0_25px_#ff006688] transition-all duration-300 hover:scale-[1.03] relative overflow-hidden">
            <div className="absolute inset-0 bg-[linear-gradient(120deg,transparent_0%,rgba(255,255,255,0.15)_50%,transparent_100%)] opacity-0 hover:opacity-100 transition-opacity duration-500"></div>
            <div className="flex items-center justify-center w-12 h-12 bg-gradient-to-br from-rose-500 to-red-600 rounded-full mb-4 shadow-lg">
              <svg className="w-6 h-6 bg-gradient-to-r from-white to-rose-200 bg-clip-text text-transparent" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 17h8m0 0l-8-8m8 8l-8 8m0 0H6" />
              </svg>
            </div>
            <p className="text-gray-100 mb-1">总借贷量</p>
            <p className="text-2xl font-bold bg-gradient-to-r from-rose-300 via-red-400 to-pink-300 bg-clip-text text-transparent">$24.51B</p>
            <p className="text-green-300 font-bold">+1.8%</p>
          </div>

          <div className="bg-gradient-to-br from-emerald-900/80 via-green-800/70 to-teal-900/80 backdrop-blur-xl rounded-xl p-6 border-2 border-emerald-400/70 hover:shadow-[0_0_25px_#00ff9988] transition-all duration-300 hover:scale-[1.03] relative overflow-hidden">
            <div className="absolute inset-0 bg-[linear-gradient(120deg,transparent_0%,rgba(255,255,255,0.15)_50%,transparent_100%)] opacity-0 hover:opacity-100 transition-opacity duration-500"></div>
            <div className="flex items-center justify-center w-12 h-12 bg-gradient-to-br from-emerald-500 to-green-600 rounded-full mb-4 shadow-lg">
              <svg className="w-6 h-6 bg-gradient-to-r from-white to-emerald-200 bg-clip-text text-transparent" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
              </svg>
            </div>
            <p className="text-gray-100 mb-1">可用流动性</p>
            <p className="text-2xl font-bold bg-gradient-to-r from-emerald-300 via-green-400 to-teal-300 bg-clip-text text-transparent">$33.98B</p>
            <p className="text-green-300 font-bold">+3.2%</p>
          </div>
        </div>

        {/* Protocol Selection */}
        <div className="bg-gradient-to-r from-gray-900/90 via-gray-800/80 to-gray-900/90 backdrop-blur-xl rounded-xl p-4 mb-6 border-2 border-purple-500/60 hover:shadow-[0_0_25px_#9d4edd88] transition-all duration-300 relative overflow-hidden">
          <div className="absolute inset-0 bg-[linear-gradient(120deg,transparent_0%,rgba(255,255,255,0.1)_50%,transparent_100%)] opacity-0 hover:opacity-100 transition-opacity duration-500 rounded-xl"></div>
          <div className="flex flex-wrap items-center justify-between gap-2">
            <div className="flex items-center space-x-2">
              <span className="text-gray-100">协议筛选:</span>
              <button
                onClick={() => setSelectedProtocol("all")}
                className={`px-4 py-2 rounded-md transition-all duration-300 font-bold relative overflow-hidden ${selectedProtocol === "all"
                  ? "bg-gradient-to-r from-cyan-500 via-blue-600 to-indigo-700 text-white shadow-lg shadow-cyan-500/30"
                  : "bg-gradient-to-r from-gray-800/80 to-gray-700/70 text-gray-200 hover:from-gray-700/80 hover:to-gray-600/70"
                  }`}
              >
                <div className="absolute inset-0 bg-[linear-gradient(120deg,transparent_0%,rgba(255,255,255,0.2)_50%,transparent_100%)] opacity-0 hover:opacity-100 transition-opacity duration-300 rounded-md"></div>
                <span className="relative">全部协议</span>
              </button>
              <button
                onClick={() => setSelectedProtocol("aave")}
                className={`px-4 py-2 rounded-md transition-all duration-300 font-bold relative overflow-hidden ${selectedProtocol === "aave"
                  ? "bg-gradient-to-r from-cyan-500 via-blue-600 to-indigo-700 text-white shadow-lg shadow-cyan-500/30"
                  : "bg-gradient-to-r from-gray-800/80 to-gray-700/70 text-gray-200 hover:from-gray-700/80 hover:to-gray-600/70"
                  }`}
              >
                <div className="absolute inset-0 bg-[linear-gradient(120deg,transparent_0%,rgba(255,255,255,0.2)_50%,transparent_100%)] opacity-0 hover:opacity-100 transition-opacity duration-300 rounded-md"></div>
                <span className="relative">Aave</span>
              </button>
              <button
                onClick={() => setSelectedProtocol("compound")}
                className={`px-4 py-2 rounded-md transition-all duration-300 font-bold relative overflow-hidden ${selectedProtocol === "compound"
                  ? "bg-gradient-to-r from-cyan-500 via-blue-600 to-indigo-700 text-white shadow-lg shadow-cyan-500/30"
                  : "bg-gradient-to-r from-gray-800/80 to-gray-700/70 text-gray-200 hover:from-gray-700/80 hover:to-gray-600/70"
                  }`}
              >
                <div className="absolute inset-0 bg-[linear-gradient(120deg,transparent_0%,rgba(255,255,255,0.2)_50%,transparent_100%)] opacity-0 hover:opacity-100 transition-opacity duration-300 rounded-md"></div>
                <span className="relative">Compound</span>
              </button>
            </div>
            <button className="text-gray-100 hover:text-cyan-300 transition-colors flex items-center space-x-1 font-bold relative overflow-hidden">
              <div className="absolute inset-0 bg-[linear-gradient(120deg,transparent_0%,rgba(255,255,255,0.2)_50%,transparent_100%)] opacity-0 hover:opacity-100 transition-opacity duration-300 rounded"></div>
              <svg className="w-5 h-5 bg-gradient-to-r from-cyan-300 to-blue-300 bg-clip-text text-transparent" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <span className="relative">实时数据</span>
            </button>
          </div>
        </div>

        {/* Tabs */}
        <div className="bg-gradient-to-br from-gray-900/90 via-gray-800/80 to-gray-900/90 backdrop-blur-xl rounded-xl mb-6 border-2 border-purple-500/60 hover:shadow-[0_0_25px_#9d4edd88] transition-all duration-300 relative overflow-hidden">
          <div className="absolute inset-0 bg-[linear-gradient(120deg,transparent_0%,rgba(255,255,255,0.1)_50%,transparent_100%)] opacity-0 hover:opacity-100 transition-opacity duration-500 rounded-xl"></div>
          <div className="flex border-b-2 border-purple-500/60">
            <button
              onClick={() => setActiveTab("supply")}
              className={`px-8 py-4 text-base font-bold w-full transition-all duration-300 relative overflow-hidden ${activeTab === "supply"
                ? "bg-gradient-to-r from-cyan-600/50 via-blue-600/50 to-indigo-600/50 border-b-2 border-cyan-400 text-white"
                : "text-gray-300 hover:text-cyan-300"
                }`}
            >
              <div className="absolute inset-0 bg-[linear-gradient(120deg,transparent_0%,rgba(255,255,255,0.15)_50%,transparent_100%)] opacity-0 hover:opacity-100 transition-opacity duration-300"></div>
              <span className="relative">供应资产</span>
            </button>
            <button
              onClick={() => setActiveTab("borrow")}
              className={`px-8 py-4 text-base font-bold w-full transition-all duration-300 relative overflow-hidden ${activeTab === "borrow"
                ? "bg-gradient-to-r from-rose-600/50 via-red-600/50 to-pink-600/50 border-b-2 border-rose-400 text-white"
                : "text-gray-300 hover:text-rose-300"
                }`}
            >
              <div className="absolute inset-0 bg-[linear-gradient(120deg,transparent_0%,rgba(255,255,255,0.15)_50%,transparent_100%)] opacity-0 hover:opacity-100 transition-opacity duration-300"></div>
              <span className="relative">借贷资产</span>
            </button>
          </div>

          {/* Supply Assets Table */}
          {activeTab === "supply" && (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b-2 border-purple-500/60">
                    <th className="text-left py-4 px-6 text-gray-100 font-bold">资产</th>
                    <th className="text-left py-4 px-6 text-gray-100 font-bold">总供应量</th>
                    <th className="text-left py-4 px-6 text-gray-100 font-bold">供应APY</th>
                    <th className="text-left py-4 px-6 text-gray-100 font-bold">利用率</th>
                    <th className="text-left py-4 px-6 text-gray-100 font-bold">操作</th>
                  </tr>
                </thead>
                <tbody>
                  {assets.map((asset, index) => (
                    <tr key={asset.symbol} className="border-b border-gray-700/80 hover:bg-gradient-to-r from-cyan-900/20 via-blue-900/20 to-indigo-900/20 transition-all duration-300 relative overflow-hidden">
                      <div className="absolute inset-0 bg-[linear-gradient(120deg,transparent_0%,rgba(255,255,255,0.1)_50%,transparent_100%)] opacity-0 hover:opacity-100 transition-opacity duration-500"></div>
                      <td className="py-4 px-6">
                        <div className="flex items-center space-x-3">
                          <div className="w-8 h-8 rounded-full bg-gradient-to-br from-cyan-600 to-blue-700 flex items-center justify-center shadow-md">
                            <span className="text-sm font-bold text-white">{asset.icon.charAt(0).toUpperCase()}</span>
                          </div>
                          <div>
                            <div className="font-bold bg-gradient-to-r from-cyan-300 to-blue-300 bg-clip-text text-transparent">{asset.symbol}</div>
                            <div className="text-gray-300 text-sm">{asset.protocol}</div>
                          </div>
                        </div>
                      </td>
                      <td className="py-4 px-6 text-sm text-gray-100 font-bold">
                        <div>{asset.totalSupply}</div>
                        <div className="text-gray-400">${asset.totalSupply.replace(/M/, '000').replace(/B/, '000000')}</div>
                      </td>
                      <td className="py-4 px-6">
                        <div className="text-sm font-bold bg-gradient-to-r from-green-400 to-emerald-400 bg-clip-text text-transparent">{asset.supplyAPY}</div>
                      </td>
                      <td className="py-4 px-6 text-sm text-gray-100 font-bold">{asset.utilizationRate}</td>
                      <td className="py-4 px-6">
                        <div className="flex space-x-3">
                          <button className="px-5 py-2 bg-gradient-to-r from-green-500 to-emerald-600 text-white rounded-md hover:from-green-600 hover:to-emerald-700 transition-all duration-300 font-bold shadow-lg shadow-green-500/30 hover:scale-105 relative overflow-hidden">
                            <div className="absolute inset-0 bg-[linear-gradient(120deg,transparent_0%,rgba(255,255,255,0.2)_50%,transparent_100%)] opacity-0 hover:opacity-100 transition-opacity duration-300 rounded-md"></div>
                            <span className="relative">供应</span>
                          </button>
                          <button className="px-5 py-2 bg-gradient-to-r from-cyan-500 via-blue-500 to-purple-600 text-white rounded-md hover:from-cyan-600 hover:via-blue-600 hover:to-purple-700 transition-all duration-300 font-bold shadow-lg shadow-purple-500/30 hover:scale-105 relative overflow-hidden">
                            <div className="absolute inset-0 bg-[linear-gradient(120deg,transparent_0%,rgba(255,255,255,0.2)_50%,transparent_100%)] opacity-0 hover:opacity-100 transition-opacity duration-300 rounded-md"></div>
                            <span className="relative">详情</span>
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
                  <tr className="border-b-2 border-purple-500/60">
                    <th className="text-left py-4 px-6 text-gray-100 font-bold">资产</th>
                    <th className="text-left py-4 px-6 text-gray-100 font-bold">总借贷量</th>
                    <th className="text-left py-4 px-6 text-gray-100 font-bold">借贷APY</th>
                    <th className="text-left py-4 px-6 text-gray-100 font-bold">利用率</th>
                    <th className="text-left py-4 px-6 text-gray-100 font-bold">操作</th>
                  </tr>
                </thead>
                <tbody>
                  {assets.map((asset, index) => (
                    <tr key={asset.symbol} className="border-b border-gray-700/80 hover:bg-gradient-to-r from-rose-900/20 via-red-900/20 to-pink-900/20 transition-all duration-300 relative overflow-hidden">
                      <div className="absolute inset-0 bg-[linear-gradient(120deg,transparent_0%,rgba(255,255,255,0.1)_50%,transparent_100%)] opacity-0 hover:opacity-100 transition-opacity duration-500"></div>
                      <td className="py-4 px-6">
                        <div className="flex items-center space-x-3">
                          <div className="w-8 h-8 rounded-full bg-gradient-to-br from-rose-600 to-red-700 flex items-center justify-center shadow-md">
                            <span className="text-sm font-bold text-white">{asset.icon.charAt(0).toUpperCase()}</span>
                          </div>
                          <div>
                            <div className="font-bold bg-gradient-to-r from-rose-300 to-red-300 bg-clip-text text-transparent">{asset.symbol}</div>
                            <div className="text-gray-300 text-sm">{asset.protocol}</div>
                          </div>
                        </div>
                      </td>
                      <td className="py-4 px-6 text-sm text-gray-100 font-bold">
                        <div>{asset.totalSupply}</div>
                        <div className="text-gray-400">${asset.totalSupply.replace(/M/, '000').replace(/B/, '000000')}</div>
                      </td>
                      <td className="py-4 px-6">
                        <div className="text-sm font-bold bg-gradient-to-r from-amber-400 to-orange-400 bg-clip-text text-transparent">8.5%</div>
                      </td>
                      <td className="py-4 px-6 text-sm text-gray-100 font-bold">{asset.utilizationRate}</td>
                      <td className="py-4 px-6">
                        <div className="flex space-x-3">
                          <button className="px-5 py-2 bg-gradient-to-r from-blue-500 to-indigo-600 text-white rounded-md hover:from-blue-600 hover:to-indigo-700 transition-all duration-300 font-bold shadow-lg shadow-blue-500/30 hover:scale-105 relative overflow-hidden">
                            <div className="absolute inset-0 bg-[linear-gradient(120deg,transparent_0%,rgba(255,255,255,0.2)_50%,transparent_100%)] opacity-0 hover:opacity-100 transition-opacity duration-300 rounded-md"></div>
                            <span className="relative">借贷</span>
                          </button>
                          <button className="px-5 py-2 bg-gradient-to-r from-purple-500 to-indigo-600 text-white rounded-md hover:from-purple-600 hover:to-indigo-700 transition-all duration-300 font-bold shadow-lg shadow-purple-500/30 hover:scale-105 relative overflow-hidden">
                            <div className="absolute inset-0 bg-[linear-gradient(120deg,transparent_0%,rgba(255,255,255,0.2)_50%,transparent_100%)] opacity-0 hover:opacity-100 transition-opacity duration-300 rounded-md"></div>
                            <span className="relative">详情</span>
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
          <div className="bg-gradient-to-br from-gray-900/90 via-gray-800/80 to-gray-900/90 backdrop-blur-xl rounded-xl p-6 border-2 border-green-500/60 hover:shadow-[0_0_25px_#00ff9988] transition-all duration-300 relative overflow-hidden">
            <div className="absolute inset-0 bg-[linear-gradient(120deg,transparent_0%,rgba(255,255,255,0.1)_50%,transparent_100%)] opacity-0 hover:opacity-100 transition-opacity duration-500 rounded-xl"></div>
            <h3 className="text-lg font-bold bg-gradient-to-r from-green-400 to-emerald-400 bg-clip-text text-transparent mb-4">最佳供应利率</h3>
            <div className="space-y-4">
              {bestSupplyRates.map((rate, index) => (
                <div key={index} className="flex items-center justify-between p-4 bg-gradient-to-r from-gray-800/60 to-gray-700/50 rounded-xl border border-green-400/40 hover:from-gray-700/60 hover:to-gray-600/50 transition-all duration-300 relative overflow-hidden">
                  <div className="absolute inset-0 bg-[linear-gradient(120deg,transparent_0%,rgba(255,255,255,0.15)_50%,transparent_100%)] opacity-0 hover:opacity-100 transition-opacity duration-300 rounded-xl"></div>
                  <div className="flex items-center space-x-4">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-green-600 to-emerald-700 flex items-center justify-center shadow-md">
                      <span className="text-base font-bold text-white">{rate.symbol.charAt(0)}</span>
                    </div>
                    <div>
                      <div className="font-bold bg-gradient-to-r from-green-300 to-emerald-300 bg-clip-text text-transparent">{rate.symbol}</div>
                      <div className="text-gray-300 text-sm">{rate.protocol}</div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-base font-bold bg-gradient-to-r from-green-400 to-emerald-400 bg-clip-text text-transparent">{rate.apy}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Best Borrow Rates */}
          <div className="bg-gradient-to-br from-gray-900/90 via-gray-800/80 to-gray-900/90 backdrop-blur-xl rounded-xl p-6 border-2 border-amber-500/60 hover:shadow-[0_0_25px_#ffaa0088] transition-all duration-300 relative overflow-hidden">
            <div className="absolute inset-0 bg-[linear-gradient(120deg,transparent_0%,rgba(255,255,255,0.1)_50%,transparent_100%)] opacity-0 hover:opacity-100 transition-opacity duration-500 rounded-xl"></div>
            <h3 className="text-lg font-bold bg-gradient-to-r from-amber-400 to-orange-400 bg-clip-text text-transparent mb-4">最低借贷利率</h3>
            <div className="space-y-4">
              {bestBorrowRates.map((rate, index) => (
                <div key={index} className="flex items-center justify-between p-4 bg-gradient-to-r from-gray-800/60 to-gray-700/50 rounded-xl border border-amber-400/40 hover:from-gray-700/60 hover:to-gray-600/50 transition-all duration-300 relative overflow-hidden">
                  <div className="absolute inset-0 bg-[linear-gradient(120deg,transparent_0%,rgba(255,255,255,0.15)_50%,transparent_100%)] opacity-0 hover:opacity-100 transition-opacity duration-300 rounded-xl"></div>
                  <div className="flex items-center space-x-4">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-amber-600 to-orange-700 flex items-center justify-center shadow-md">
                      <span className="text-base font-bold text-white">{rate.symbol.charAt(0)}</span>
                    </div>
                    <div>
                      <div className="font-bold bg-gradient-to-r from-amber-300 to-orange-300 bg-clip-text text-transparent">{rate.symbol}</div>
                      <div className="text-gray-300 text-sm">{rate.protocol}</div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-base font-bold bg-gradient-to-r from-amber-400 to-orange-400 bg-clip-text text-transparent">{rate.apy}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Add custom animations */}
      <style jsx>{`
        @keyframes gradient {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
        
        @keyframes gradientBg {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
        
        .animate-gradient {
          background-size: 200% 200%;
          animation: gradient 3s ease infinite;
        }
        
        .animate-gradient-bg {
          background-size: 400% 400%;
          animation: gradientBg 15s ease infinite;
        }
      `}</style>
    </div>
  );
};

export default Borrow;