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
        if (!account.address) {
            const connector = connectors[0]
            connect({ connector })
        } else {
            disconnect()
        }
    }

    const disconnectWallet = () => {
        disconnect()
    }

    return (
        <div className="w-full max-w-6xl mx-auto px-4 py-20 ">
            <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                {/* Total Value Locked Card */}
                <div className="bg-gradient-to-br from-cyan-900/40 to-blue-800/30 backdrop-blur-lg border border-cyan-400/30 hover:shadow-[0_10px_30px_#00d4ff66] rounded-xl p-6 hover:border-cyan-300/50 transition-all duration-300 transform hover:scale-105 relative overflow-hidden">
                    <div className="absolute inset-0 bg-[linear-gradient(120deg,transparent_0%,rgba(255,255,255,0.1)_50%,transparent_100%)] opacity-0 hover:opacity-100 transition-opacity duration-300"></div>
                    <div className="flex flex-col items-center text-center">
                        <div className="w-12 h-12 bg-gradient-to-br from-cyan-400 to-blue-500 rounded-full flex items-center justify-center mb-4">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-6">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v12m-3-2.818.879.659c1.171.879 3.07.879 4.242 0 1.172-.879 1.172-2.303 0-3.182C13.536 12.219 12.768 12 12 12c-.725 0-1.45-.22-2.003-.659-1.106-.879-1.106-2.303 0-3.182s2.9-.879 4.006 0l.415.33M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                            </svg>
                        </div>
                        <p className="text-sm text-cyan-200 mb-2">总锁仓价值</p>
                        <p className="text-3xl font-bold text-cyan-300">$2.8B</p>
                        <p className="text-green-300 mt-1">+12.5%</p>
                    </div>
                </div>

                {/* Active Users Card */}
                <div className="bg-gradient-to-br from-purple-900/40 to-pink-800/30 backdrop-blur-lg border border-purple-400/30 hover:shadow-[0_10px_30px_#d400ff66] rounded-xl p-6 hover:border-purple-300/50 transition-all duration-300 transform hover:scale-105 relative overflow-hidden">
                    <div className="absolute inset-0 bg-[linear-gradient(120deg,transparent_0%,rgba(255,255,255,0.1)_50%,transparent_100%)] opacity-0 hover:opacity-100 transition-opacity duration-300"></div>
                    <div className="flex flex-col items-center text-center">
                        <div className="w-12 h-12 bg-gradient-to-br from-purple-400 to-pink-500 rounded-full flex items-center justify-center mb-4">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-6">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M18 18.72a9.094 9.094 0 0 0 3.741-.479 3 3 0 0 0-4.682-2.72m.94 3.198.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0 1 12 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 0 1 6 18.719m12 0a5.971 5.971 0 0 0-.941-3.197m0 0A5.995 5.995 0 0 0 12 12.75a5.995 5.995 0 0 0-5.058 2.772m0 0a3 3 0 0 0-4.681 2.72 8.986 8.986 0 0 0 3.74.477m.94-3.197a5.971 5.971 0 0 0-.94 3.197M15 6.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Zm6 3a2.25 2.25 0 1 1-4.5 0 2.25 2.25 0 0 1 4.5 0Zm-13.5 0a2.25 2.25 0 1 1-4.5 0 2.25 2.25 0 0 1 4.5 0Z" />
                            </svg>
                        </div>
                        <p className="text-sm text-purple-200 mb-2">活跃用户</p>
                        <p className="text-3xl font-bold text-purple-300">156K</p>
                        <p className="text-green-300 mt-1">+8.2%</p>
                    </div>
                </div>

                {/* Protocol Count Card */}
                <div className="bg-gradient-to-br from-green-900/40 to-teal-800/30 backdrop-blur-lg border border-green-400/30 hover:shadow-[0_10px_30px_#00ff9d66] rounded-xl p-6 hover:border-green-300/50 transition-all duration-300 transform hover:scale-105 relative overflow-hidden">
                    <div className="absolute inset-0 bg-[linear-gradient(120deg,transparent_0%,rgba(255,255,255,0.1)_50%,transparent_100%)] opacity-0 hover:opacity-100 transition-opacity duration-300"></div>
                    <div className="flex flex-col items-center text-center">
                        <div className="w-12 h-12 bg-gradient-to-br from-green-400 to-teal-500 rounded-full flex items-center justify-center mb-4">
                            <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                            </svg>
                        </div>
                        <p className="text-sm text-green-200 mb-2">协议数量</p>
                        <p className="text-3xl font-bold text-green-300">12</p>
                        <p className="text-green-300 mt-1">+2</p>
                    </div>
                </div>

                {/* Average APY Card */}
                <div className="bg-gradient-to-br from-amber-900/40 to-orange-800/30 backdrop-blur-lg border border-amber-400/30 hover:shadow-[0_10px_30px_#ffd40066] rounded-xl p-6 hover:border-amber-300/50 transition-all duration-300 transform hover:scale-105 relative overflow-hidden">
                    <div className="absolute inset-0 bg-[linear-gradient(120deg,transparent_0%,rgba(255,255,255,0.1)_50%,transparent_100%)] opacity-0 hover:opacity-100 transition-opacity duration-300"></div>
                    <div className="flex flex-col items-center text-center">
                        <div className="w-12 h-12 bg-gradient-to-br from-amber-400 to-orange-500 rounded-full flex items-center justify-center mb-4">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-6">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M4.26 10.147a60.438 60.438 0 0 0-.491 6.347A48.62 48.62 0 0 1 12 20.904a48.62 48.62 0 0 1 8.232-4.41 60.46 60.46 0 0 0-.491-6.347m-15.482 0a50.636 50.636 0 0 0-2.658-.813A59.906 59.906 0 0 1 12 3.493a59.903 59.903 0 0 1 10.399 5.84c-.896.248-1.783.52-2.658.814m-15.482 0A50.717 50.717 0 0 1 12 13.489a50.702 50.702 0 0 1 7.74-3.342M6.75 15a.75.75 0 1 0 0-1.5.75.75 0 0 0 0 1.5Zm0 0v-3.675A55.378 55.378 0 0 1 12 8.443m-7.007 11.55A5.981 5.981 0 0 0 6.75 15.75v-1.5" />
                            </svg>
                        </div>
                        <p className="text-sm text-amber-200 mb-2">平均APY</p>
                        <p className="text-3xl font-bold text-amber-300">8.5%</p>
                        <p className="text-green-300 mt-1">+0.3%</p>
                    </div>
                </div>
            </section>

            <section>
                <div className="max-w-3xl mx-auto mt-20 text-center mb-10">
                    <h2 className="text-3xl md:text-4xl font-bold text-center mb-4">
                        <span className="bg-gradient-to-r from-cyan-300 via-blue-300 to-indigo-300 bg-clip-text text-transparent">
                            核心特性
                        </span>
                    </h2>
                    <span className="text-gray-300">通过先进的技术和创新的设计，为您提供最佳的DeFi体验</span>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {
                        features.map((feature, index) => {
                            // Different gradient for each feature card
                            const gradients = [
                                "from-cyan-900/50 to-blue-800/40",
                                "from-purple-900/50 to-pink-800/40",
                                "from-green-900/50 to-teal-800/40",
                                "from-amber-900/50 to-orange-800/40"
                            ];

                            const borders = [
                                "border-cyan-400/40 hover:border-cyan-300/60",
                                "border-purple-400/40 hover:border-purple-300/60",
                                "border-green-400/40 hover:border-green-300/60",
                                "border-amber-400/40 hover:border-amber-300/60"
                            ];

                            const icons = [
                                "from-cyan-400 to-blue-500",
                                "from-purple-400 to-pink-500",
                                "from-green-400 to-teal-500",
                                "from-amber-400 to-orange-500"
                            ];

                            const shadows = [
                                "hover:shadow-[0_10px_30px_#00d4ff66]",
                                "hover:shadow-[0_10px_30px_#d400ff66]",
                                "hover:shadow-[0_10px_30px_#00ff9d66]",
                                "hover:shadow-[0_10px_30px_#ffd40066]"
                            ];

                            return (
                                <div
                                    key={index}
                                    className={`bg-gradient-to-br ${gradients[index]} backdrop-blur-lg border ${borders[index]} rounded-xl p-6 transition-all duration-300 transform hover:scale-105 ${shadows[index]} relative overflow-hidden`}
                                >
                                    <div className="absolute inset-0 bg-[linear-gradient(120deg,transparent_0%,rgba(255,255,255,0.1)_50%,transparent_100%)] opacity-0 hover:opacity-100 transition-opacity duration-300"></div>
                                    <div className="flex flex-col items-center text-center">
                                        <div className={`w-16 h-16 bg-gradient-to-br ${icons[index]} rounded-full flex items-center justify-center mb-6 text-2xl`}>
                                            {feature.icon}
                                        </div>
                                        <h3 className="text-xl font-bold text-white mb-3">
                                            {feature.label}
                                        </h3>
                                        <p className="text-gray-300 text-sm">
                                            {feature.description}
                                        </p>
                                    </div>
                                </div>
                            )
                        })
                    }
                </div>
            </section>

            <section>
                <div className="max-w-3xl mx-auto mt-20 text-center mb-10">
                    <h2 className="text-3xl md:text-4xl font-bold text-center mb-4">
                        <span className="bg-gradient-to-r from-purple-300 via-pink-300 to-rose-300 bg-clip-text text-transparent">
                            支持的协议
                        </span>
                    </h2>
                    <span className="text-gray-300">集成主流DeFi协议，为您提供最全面的选择</span>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {
                        protocols.map((protocol, index) => {
                            // Different styling for each protocol card
                            const protocolStyles = [
                                { bg: "from-blue-900/50 to-indigo-800/40", border: "border-blue-400/40", icon: "from-blue-400 to-indigo-500", shadow: "hover:shadow-[0_10px_30px_#6366f166]" },
                                { bg: "from-emerald-900/50 to-teal-800/40", border: "border-emerald-400/40", icon: "from-emerald-400 to-teal-500", shadow: "hover:shadow-[0_10px_30px_#10b98166]" },
                                { bg: "from-rose-900/50 to-pink-800/40", border: "border-rose-400/40", icon: "from-rose-400 to-pink-500", shadow: "hover:shadow-[0_10px_30px_#f43f5e66]" },
                                { bg: "from-amber-900/50 to-orange-800/40", border: "border-amber-400/40", icon: "from-amber-400 to-orange-500", shadow: "hover:shadow-[0_10px_30px_#f59e0b66]" }
                            ];

                            const style = protocolStyles[index % protocolStyles.length];

                            return (
                                <div
                                    key={index}
                                    className={`bg-gradient-to-br ${style.bg} backdrop-blur-lg border ${style.border} rounded-xl p-6 transition-all duration-300 transform hover:scale-105 ${style.shadow} relative overflow-hidden`}
                                >
                                    <div className="absolute inset-0 bg-[linear-gradient(120deg,transparent_0%,rgba(255,255,255,0.1)_50%,transparent_100%)] opacity-0 hover:opacity-100 transition-opacity duration-300"></div>
                                    <div className="flex flex-col items-center text-center">
                                        <div className={`w-16 h-16 bg-gradient-to-br ${style.icon} rounded-full flex items-center justify-center mb-6 text-2xl`}>
                                            {protocol.icon}
                                        </div>
                                        <h3 className="text-xl font-bold text-white mb-3">
                                            {protocol.name}
                                        </h3>
                                    </div>
                                </div>
                            )
                        })
                    }
                </div>
            </section>

            <section className="mt-20 flex items-center justify-center px-4">
                <div className="relative max-w-md w-full mx-auto">
                    {/* Outer glow effect */}
                    <div className="absolute inset-0 bg-gradient-to-r from-cyan-400/30 via-purple-500/30 to-pink-500/30 rounded-2xl blur-xl animate-pulse"></div>

                    {/* Main card */}
                    <div className="relative bg-gradient-to-br from-gray-900/80 to-gray-800/60 backdrop-blur-lg border border-cyan-400/40 rounded-2xl p-12 shadow-2xl overflow-hidden">
                        <div className="absolute inset-0 bg-[linear-gradient(120deg,transparent_0%,rgba(255,255,255,0.1)_50%,transparent_100%)] opacity-0 hover:opacity-100 transition-opacity duration-300 rounded-2xl"></div>
                        <div className="text-center">
                            {/* Title */}
                            <h1 className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-cyan-300 via-purple-300 to-pink-300 bg-clip-text text-transparent mb-4">
                                开始您的DeFi之旅
                            </h1>

                            {/* Subtitle */}
                            <p className="text-gray-300 text-sm mb-8">
                                立即连接钱包，体验最优的借贷利率和个性化的信用评分服务
                            </p>

                            {/* Connect Wallet Button */}
                            {!account.address && (
                                <button
                                    className="w-full bg-gradient-to-r from-cyan-500 to-purple-600 hover:from-cyan-600 hover:to-purple-700 text-white px-8 py-4 rounded-lg shadow-lg hover:shadow-2xl transform hover:scale-105 transition-all duration-300 flex items-center justify-center space-x-2 relative overflow-hidden"
                                    onClick={() => connectWallet()}
                                >
                                    <div className="absolute inset-0 bg-[linear-gradient(120deg,transparent_0%,rgba(255,255,255,0.2)_50%,transparent_100%)] opacity-0 hover:opacity-100 transition-opacity duration-300 rounded-lg"></div>
                                    <span>连接钱包开始</span>
                                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                    </svg>
                                </button>
                            )}

                            {account.address && (
                                <button
                                    className="w-full bg-gradient-to-r from-rose-500 to-pink-600 hover:from-rose-600 hover:to-pink-700 text-white px-8 py-4 rounded-lg shadow-lg hover:shadow-2xl transform hover:scale-105 transition-all duration-300 flex items-center justify-center space-x-2 relative overflow-hidden"
                                    onClick={() => disconnectWallet()}
                                >
                                    <div className="absolute inset-0 bg-[linear-gradient(120deg,transparent_0%,rgba(255,255,255,0.2)_50%,transparent_100%)] opacity-0 hover:opacity-100 transition-opacity duration-300 rounded-lg"></div>
                                    <span>断开钱包连接</span>
                                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                    </svg>
                                </button>
                            )}
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}