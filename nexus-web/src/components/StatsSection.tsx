// src/components/StatsSection.tsx
"use client";
import React from "react";
import { useAccount, useConnect, useDisconnect } from 'wagmi'
const features = [
    {
        icon: "⚡",
        label: "交易效率",
        description: "高效的去中心化交易体验"
    },
    {
        icon: "🛡️",
        label: "安全保障",
        description: "多重安全机制，资金安全有保障"
    },
    {
        icon: "📈",
        label: "收益优化",
        description: "智能算法优化您的收益"
    },
    {
        icon: "⭐",
        label: "社区支持",
        description: "强大的社区支持与NEXUS生态"
    },
];

const protocols = [
    {
        icon: "A",
        name: "Aave"
    },
    {
        icon: "C",
        name: "Compound"
    },
    {
        icon: "M",
        name: "MakerDAO"
    },
    {
        icon: "U",
        name: "Uniswap"
    },
];



export default function StatsSection() {
    const account = useAccount()
    const { connectors, connect, status, error } = useConnect()
    const { disconnect } = useDisconnect()

    const connectWallet = () => {
        // 使用wagmi链接钱包
        if (!account.address) {
            const connector = connectors[0] // 选择第一个连接器（通常是MetaMask）
            connect({ connector })
        } else {
            disconnect()
        }
    }
    const disconnectWallet = () => {
        // 使用wagmi断开钱包
        disconnect()
    }
    return (
        <div className="w-full max-w-6xl mx-auto px-4 py-20">
            <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                {/* Total Value Locked Card */}
                <div className="bg-gray-900/50 backdrop-blur-sm border border-gray-700/50 hover:shadow-[0_10px_30px_#00d4ff33] rounded-xl p-6 hover:border-cyan-500/30 transition-all duration-300 transform hover:scale-105">
                    <div className="flex flex-col items-center text-center">
                        <div className="w-12 h-12 bg-gradient-to-br from-cyan-500 to-blue-500 rounded-full flex items-center justify-center mb-4">
                            <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
                            </svg>
                        </div>
                        <p className="text-sm text-gray-400 mb-2">总锁仓价值</p>
                        <p className="text-3xl font-bold text-[#00d4ff]">$2.8B</p>
                        <p className=" text-green-400 mt-1">+12.5%</p>
                    </div>
                </div>

                {/* Active Users Card */}
                <div className="bg-gray-900/50 backdrop-blur-sm border border-gray-700/50 hover:shadow-[0_10px_30px_#00d4ff33] rounded-xl p-6 hover:border-cyan-500/30 transition-all duration-300 transform hover:scale-105">
                    <div className="flex flex-col items-center text-center">
                        <div className="w-12 h-12 bg-gradient-to-br from-cyan-500 to-blue-500 rounded-full flex items-center justify-center mb-4">
                            <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0" />
                            </svg>
                        </div>
                        <p className="text-sm text-gray-400 mb-2">活跃用户</p>
                        <p className="text-3xl font-bold text-[#00d4ff]">156K</p>
                        <p className=" text-green-400 mt-1">+8.2%</p>
                    </div>
                </div>

                {/* Protocol Count Card */}
                <div className="bg-gray-900/50 backdrop-blur-sm border border-gray-700/50 hover:shadow-[0_10px_30px_#00d4ff33] rounded-xl p-6 hover:border-cyan-500/30 transition-all duration-300 transform hover:scale-105">
                    <div className="flex flex-col items-center text-center">
                        <div className="w-12 h-12 bg-gradient-to-br from-cyan-500 to-blue-500 rounded-full flex items-center justify-center mb-4">
                            <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                            </svg>
                        </div>
                        <p className="text-sm text-gray-400 mb-2">协议数量</p>
                        <p className="text-3xl font-bold text-[#00d4ff]">12</p>
                        <p className=" text-green-400 mt-1">+2</p>
                    </div>
                </div>

                {/* Average APY Card */}
                <div className="bg-gray-900/50 backdrop-blur-sm border border-gray-700/50 hover:shadow-[0_10px_30px_#00d4ff33] rounded-xl p-6 hover:border-cyan-500/30 transition-all duration-300 transform hover:scale-105">
                    <div className="flex flex-col items-center text-center">
                        <div className="w-12 h-12 bg-gradient-to-br from-cyan-500 to-blue-500 rounded-full flex items-center justify-center mb-4">
                            <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0l-8-8m8 8l-8 8m0 0H6m0 0l8 8m-8-8v12" />
                            </svg>
                        </div>
                        <p className="text-sm text-gray-400 mb-2">平均APY</p>
                        <p className="text-3xl font-bold text-[#00d4ff]">8.5%</p>
                        <p className=" text-green-400 mt-1">+0.3%</p>
                    </div>
                </div>
            </section>
            <section>
                <div className="max-w-3xl mx-auto mt-20 text-center mb-10">
                    <h2 className="text-3xl md:text-4xl font-bold text-center mb-4">
                        <span className="bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
                            核心特性
                        </span>
                    </h2>
                    <span className="text-gray-500">通过先进的技术和创新的设计，为您提供最佳的DeFi体验</span>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {
                        features.map((feature, index) => {
                            return (<div key={index} className="bg-gray-900/50 hover:shadow-[0_10px_30px_#00d4ff33] backdrop-blur-sm border border-gray-700/50 rounded-xl p-6 hover:border-cyan-500/30 transition-all duration-300 transform hover:scale-105">
                                <div className="flex flex-col items-center text-center">
                                    <div className="w-16 h-16 bg-gradient-to-br from-cyan-500 to-blue-500 rounded-full flex items-center justify-center mb-6 text-2xl group-hover:animate-pulse">
                                        {feature.icon}
                                    </div>
                                    <h3 className="text-xl font-bold text-white mb-3">
                                        {feature.label}
                                    </h3>
                                    <p className="text-gray-400 text-sm">
                                        {feature.description}
                                    </p>
                                </div>
                            </div>)
                        })
                    }
                </div>
            </section>

            <section>
                <div className="max-w-3xl mx-auto mt-20 text-center mb-10">
                    <h2 className="text-3xl md:text-4xl font-bold text-center mb-4">
                        <span className="bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
                            支持的协议
                        </span>
                    </h2>
                    <span className="text-gray-500">集成主流DeFi协议，为您提供最全面的选择</span>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {
                        protocols.map((protocol, index) => {
                            // hover时，box-shadow: 0 10px 30px #00d4ff33;
                            return (<div key={index} className="bg-gray-900/50 backdrop-blur-sm border border-gray-700/50 rounded-xl p-6 hover:shadow-[0_10px_30px_#00d4ff33] hover:border-cyan-500/30 transition-all duration-300 transform hover:scale-105">
                                <div className="flex flex-col items-center text-center">
                                    <div className="w-16 h-16 bg-gradient-to-br from-cyan-500 to-blue-500 rounded-full flex items-center justify-center mb-6 text-2xl group-hover:animate-pulse">
                                        {protocol.icon}
                                    </div>
                                    <h3 className="text-xl font-bold text-white mb-3">
                                        {protocol.name}
                                    </h3>
                                </div>
                            </div>)
                        })
                    }
                </div>
            </section>

            {/* 这是还有一部分代码 */}

            <section className="mt-20 flex items-center justify-center bg-black px-4">
                <div className="relative max-w-md w-full mx-auto">
                    {/* Outer glow effect */}
                    <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/20 to-blue-500/20 rounded-2xl blur-xl animate-pulse"></div>

                    {/* Main card */}
                    <div className="relative bg-gray-900/80 backdrop-blur-sm border border-cyan-500/30 rounded-2xl p-12 shadow-2xl">
                        <div className="text-center">
                            {/* Title */}
                            <h1 className="text-2xl md:text-3xl font-bold text-[#00d4ff] mb-4">
                                开始您的DeFi之旅
                            </h1>

                            {/* Subtitle */}
                            <p className="text-gray-400 text-sm mb-8">
                                立即连接钱包，体验最优的借贷利率和个性化的信用评分服务
                            </p>

                            {/* Connect Wallet Button */}
                            {!account.address &&<button
                                className="w-full bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white px-8 py-4 rounded-lg shadow-lg hover:shadow-2xl transform hover:scale-105 transition-all duration-300 flex items-center justify-center space-x-2"
                                onClick={()=>connectWallet()}
                            >
                                <span>连接钱包开始</span>
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                </svg>
                            </button>}
                            {account.address &&<button
                                className="w-full bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white px-8 py-4 rounded-lg shadow-lg hover:shadow-2xl transform hover:scale-105 transition-all duration-300 flex items-center justify-center space-x-2"
                                onClick={()=>disconnectWallet()}
                            >
                                <span>断开钱包连接</span>
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                </svg>
                            </button>}
                        </div>
                    </div>
                </div>

                {/* Footer */}
            </section>
        </div>
    );
}