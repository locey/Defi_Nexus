"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { useAccount, useConnect, useDisconnect } from 'wagmi'
export default function Header() {
    const pathname = usePathname()
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
        <header className="sticky top-0 z-50 backdrop-filter backdrop-blur-lg via-gray-900 to-black text-white py-4 px-6 flex justify-between items-center relative w-full border-b border-gray-800">
            <div className="flex items-center space-x-3 group">
                <div className="relative bg-gradient-to-br from-cyan-400 to-purple-600 p-2 rounded-lg shadow-lg transform transition-all duration-300 hover:scale-105 hover:shadow-2xl">
                    <span className="text-xl font-bold text-white">DN</span>
                    <div className="absolute inset-0 bg-gradient-to-br from-transparent via-transparent to-cyan-400/30 rounded-lg blur-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </div>
                <div className="flex flex-col hidden lg:flex">
                    <h1 className="text-2xl font-extrabold bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600 bg-clip-text text-transparent drop-shadow-[0_0_10px_rgba(0,191,255,0.7)] transform transition-transform duration-300 hover:scale-105">
                        DeFi Nexus
                    </h1>
                    <span className="text-xs text-gray-300 animate-pulse">汇聚财富 智能</span>
                </div>
            </div>

            <nav className="flex items-center space-x-8 height-full">
                <Link
                    href='/'
                    className={`pr-3 pl-3 pb-3 mr-3 ml-3  transition-all duration-300 font-medium relative group ${pathname === '/' ? 'text-[#00d4ff]' : 'hover:text-[#00d4ff]'
                        }`}
                >
                    首页
                    <span className={`absolute bottom-0 left-0 h-0.5 bg-cyan-400 transition-all duration-300 ${pathname === '/' ? 'w-full' : 'w-0 group-hover:w-full'
                        }`}></span>
                </Link>
                <Link
                    href='/borrow'
                    className={`pr-3 pl-3 pb-3 mr-3 ml-3 transition-all duration-300 font-medium relative group ${pathname === '/borrow' ? 'text-[#00d4ff]' : 'hover:text-[#00d4ff]'
                        }`}
                >
                    借贷
                    <span className={`absolute bottom-0 left-0 h-0.5 bg-cyan-400 transition-all duration-300 ${pathname === '/borrow' ? 'w-full' : 'w-0 group-hover:w-full'
                        }`}></span>
                </Link>
                <Link
                    href='/credit'
                    className={`pr-3 pl-3 pb-3 mr-3 ml-3 transition-all duration-300 font-medium relative group ${pathname === '/credit' ? 'text-[#00d4ff]' : 'hover:text-[#00d4ff]'
                        }`}
                >
                    信用
                    <span className={`absolute bottom-0 left-0 h-0.5 bg-cyan-400 transition-all duration-300 ${pathname === '/credit' ? 'w-full' : 'w-0 group-hover:w-full'
                        }`}></span>
                </Link>
                <Link
                    href='/airdrop'
                    className={`pr-3 pl-3 pb-3 mr-3 ml-3 transition-all duration-300 font-medium relative group ${pathname === '/airdrop' ? 'text-[#00d4ff]' : 'hover:text-[#00d4ff]'
                        }`}
                >
                    空投
                    <span className={`absolute bottom-0 left-0 h-0.5 bg-cyan-400 transition-all duration-300 ${pathname === '/airdrop' ? 'w-full' : 'w-0 group-hover:w-full'
                        }`}></span>
                </Link>
            </nav>
            {!account.address &&(<button className="relative bg-gradient-to-r from-purple-600 via-indigo-600 to-blue-600 text-white px-2 py-2 rounded-lg shadow-lg hover:shadow-2xl hover:scale-105 transition-all duration-300 transform hover:-translate-y-1 border border-purple-500/30 group" onClick={connectWallet}>
                <span className="relative z-10">连接钱包</span>
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-transparent to-cyan-400/30 rounded-lg blur-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-transparent to-purple-400/30 rounded-lg blur-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            </button>)}
            {account.address && (account.address ? (
                <>
                    <span className="text-sm text-gray-400 mr-4 hidden md:inline-block">已连接: {account.address.substring(0, 6)}...{account.address.substring(account.address.length - 4)}</span>
                    <button className="relative bg-gradient-to-r from-purple-600 via-indigo-600 to-blue-600 text-white px-2 py-2 rounded-lg shadow-lg hover:shadow-2xl hover:scale-105 transition-all duration-300 transform hover:-translate-y-1 border border-purple-500/30 group" onClick={disconnectWallet}>
                        <span className="relative z-10">断开连接</span>
                        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-transparent to-cyan-400/30 rounded-lg blur-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    </button>
                </>
                
            ) : (
                <button className="relative bg-gradient-to-r from-purple-600 via-indigo-600 to-blue-600 text-white px-2 py-2 rounded-lg shadow-lg hover:shadow-2xl hover:scale-105 transition-all duration-300 transform hover:-translate-y-1 border border-purple-500/30 group" onClick={connectWallet}>
                    <span className="relative z-10">连接钱包</span>
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-transparent to-cyan-400/30 rounded-lg blur-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </button>
            ))}

            <div className="absolute left-0 top-0 h-full w-16 bg-gradient-to-b from-cyan-400/20 to-transparent opacity-50 animate-pulse"></div>
            <div className="absolute right-0 top-0 h-full w-16 bg-gradient-to-b from-purple-600/20 to-transparent opacity-50 animate-pulse"></div>

            <div className="absolute inset-0 pointer-events-none">
                {[...Array(5)].map((_, i) => (
                    <div
                        key={i}
                        className="absolute w-1 h-1 bg-cyan-400 rounded-full animate-ping"
                        style={{
                            left: `${Math.random() * 100}%`,
                            top: `${Math.random() * 100}%`,
                            animationDelay: `${Math.random() * 3}s`,
                            animationDuration: `${2 + Math.random() * 3}s`
                        }}
                    ></div>
                ))}
            </div>
        </header>
    )
}