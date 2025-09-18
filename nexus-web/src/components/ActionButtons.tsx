// src/components/ActionButtons.tsx
import React from "react";

export default function ActionButtons() {
    return (
        <div className="flex flex-col sm:flex-row gap-4 justify-center mt-8">
            <button
                className="px-8 py-4 bg-gradient-to-r from-purple-600 to-indigo-600 text-white rounded-lg shadow-lg hover:shadow-2xl transform hover:scale-105 transition-all duration-300 border border-purple-500/30"
            >
                <div className="flex items-center justify-center">
                    <span>开始使用</span>
                    <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                </div>
            </button>

            <button
                className="px-8 py-4 bg-gradient-to-r from-green-500 to-emerald-500 text-white rounded-lg shadow-lg hover:shadow-2xl transform hover:scale-105 transition-all duration-300 border border-green-400/30"
            >
                了解更多信息
            </button>
        </div>
    );
}