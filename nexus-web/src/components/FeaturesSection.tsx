// src/components/FeaturesSection.tsx
import React from "react";

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

export default function FeaturesSection() {
    return (
        <section className="py-20 bg-gradient-to-b from-black to-gray-900">
            <div className="max-w-6xl mx-auto">
                <h2 className="text-3xl md:text-4xl font-bold text-center mb-16">
                    <span className="bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
                        核心特性
                    </span>
                </h2>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                    {features.map((feature, index) => (
                        <div 
                            key={index} 
                            className="bg-gray-900/50 backdrop-blur-sm border border-gray-700/50 rounded-xl p-6 hover:border-cyan-500/30 transition-all duration-300 transform hover:scale-105 group"
                        >
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
                            
                            {/* Decorative element */}
                            <div className="absolute -bottom-2 -right-2 w-8 h-8 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-full opacity-20 group-hover:opacity-100 transition-opacity duration-300"></div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}