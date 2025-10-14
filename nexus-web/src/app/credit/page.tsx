// src/app/credit/page.tsx
"use client";

import { useState, useEffect, useRef } from "react";
import * as echarts from 'echarts';
import Header from "@/components/Header";

const CreditScore = () => {
  const [timeRange, setTimeRange] = useState("6个月");
  const chartRef = useRef<HTMLDivElement>(null);
  const chartInstanceRef = useRef<any>(null);

  // 模拟数据
  const creditData = {
    score: 750,
    maxScore: 850,
    level: "优秀",
    totalBorrowCount: 24,
    onTimeRepaymentRate: 100,
    averageLoanAmount: 12500,
    creditHistoryMonths: 18
  };

  // 趋势数据
  const trendData = [
    { month: "1月", score: 680 },
    { month: "2月", score: 695 },
    { month: "3月", score: 710 },
    { month: "4月", score: 725 },
    { month: "5月", score: 740 },
    { month: "6月", score: 750 }
  ];

  const getScoreColor = (score: number): string => {
    if (score >= 700) return "#00d4ff";
    if (score >= 600) return "#00cfff";
    if (score >= 500) return "#ffa500";
    return "#ff0000";
  };

  const initChart = () => {
    if (!chartRef.current) return;

    // 如果已有实例，先销毁
    if (chartInstanceRef.current) {
      echarts.dispose(chartInstanceRef.current);
    }

    // 初始化新的实例
    chartInstanceRef.current = echarts.init(chartRef.current);

    const option = {
      tooltip: {
        trigger: 'axis',
        axisPointer: {
          type: 'shadow'
        }
      },
      xAxis: {
        type: 'category',
        data: trendData.map(d => d.month),
        axisLabel: {
          color: '#fff'
        }
      },
      yAxis: {
        type: 'value',
        min: 600,
        max: 850,
        axisLabel: {
          color: '#fff'
        }
      },
      series: [{
        name: '信用评分',
        type: 'line',
        smooth: true,
        lineStyle: {
          color: '#00d4ff'
        },
        areaStyle: {
          color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
            { offset: 0, color: '#00d4ff' },
            { offset: 1, color: '#00d4ff' }
          ])
        },
        emphasis: {
          focus: 'series'
        },
        data: trendData.map(d => d.score)
      }]
    };

    chartInstanceRef.current.setOption(option);
  };

  useEffect(() => {
    // 只在客户端执行
    if (typeof window !== 'undefined') {
      initChart();
    }

    // 组件卸载时销毁图表实例
    return () => {
      if (chartInstanceRef.current) {
        echarts.dispose(chartInstanceRef.current);
      }
    };
  }, [timeRange]);

  // 处理窗口大小变化
  useEffect(() => {
    const handleResize = () => {
      if (chartInstanceRef.current) {
        chartInstanceRef.current.resize();
      }
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <div className="bg-black min-h-screen bg-gradient-to-br from-cyan-800/50 via-purple-800/40 to-pink-700/50 animate-gradient-bg">
      <Header />
      <div className="max-w-6xl mx-auto px-4 py-8">
        {/* Page Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold bg-gradient-to-r from-cyan-300 via-blue-400 to-indigo-500 bg-clip-text text-transparent mb-2 animate-gradient">信用评分</h1>
          <p className="text-gray-100 text-sm">基于区块链数据的去中心化信用评分系统，享受个性化的借贷服务</p>
        </div>

        {/* Main Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-5 gap-6 mb-8">
          {/* Credit Score Card */}
          <div className="md:col-span-2 bg-gradient-to-br from-gray-900/90 via-gray-800/80 to-gray-900/90 backdrop-blur-xl rounded-xl p-6 border-2 border-cyan-400/80 hover:shadow-[0_0_30px_#00ffffaa] transition-all duration-300 hover:scale-[1.03] relative overflow-hidden">
            <div className="absolute inset-0 bg-[linear-gradient(120deg,transparent_0%,rgba(255,255,255,0.2)_50%,transparent_100%)] opacity-0 hover:opacity-100 transition-opacity duration-500 rounded-xl"></div>
            <div className="flex flex-col items-center justify-center h-full">
              <div className="w-32 h-32 relative mb-4">
                <svg width="120" height="120" viewBox="0 0 120 120">
                  <circle
                    cx="60"
                    cy="60"
                    r="50"
                    fill="none"
                    stroke="#333"
                    strokeWidth="10"
                  />

                  <circle
                    cx="60"
                    cy="60"
                    r="50"
                    fill="none"
                    stroke={getScoreColor(creditData.score)}
                    strokeWidth="10"
                    strokeDasharray={`${(creditData.score / creditData.maxScore) * 314.16} 314.16`}
                    strokeLinecap="round"
                    transform="rotate(-90 60 60)"
                  />
                  <text x="60" y="65" textAnchor="middle" fill="#fff" fontSize="24" fontWeight="bold">
                    {creditData.score}
                  </text>
                  <text x="60" y="85" textAnchor="middle" fill="#ccc" fontSize="12">
                    / {creditData.maxScore}
                  </text>
                </svg>
              </div>
              <div className="text-center">
                <div className="text-cyan-300 font-bold text-xl">{creditData.level}</div>
                <div className="text-gray-200 text-sm">信用等级</div>
              </div>
            </div>
          </div>
          <div className="md:col-span-3 grid grid-cols-2 gap-6">
            {/* Other Metrics Cards */}
            <div className="bg-gradient-to-br from-gray-900/90 via-gray-800/80 to-gray-900/90 backdrop-blur-xl rounded-xl p-6 border-2 border-cyan-400/80 hover:shadow-[0_0_30px_#00ffffaa] transition-all duration-300 hover:scale-[1.03] relative overflow-hidden">
              <div className="absolute inset-0 bg-[linear-gradient(120deg,transparent_0%,rgba(255,255,255,0.2)_50%,transparent_100%)] opacity-0 hover:opacity-100 transition-opacity duration-500 rounded-xl"></div>
              <div className="flex items-center justify-center w-10 h-10 bg-gradient-to-br from-cyan-600 to-blue-600 rounded-full mb-4 shadow-lg">
                <svg className="w-5 h-5 bg-gradient-to-r from-white to-cyan-200 bg-clip-text text-transparent" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 13h2v-2H3v2zM3 21h2v-2H3v2zM3 7h2V5H3v2zM5 3h2v2H5V3zM7 3h2v2H7V3zM9 3h2v2H9V3zM9 7h2v2H9V7zM" />
                </svg>
              </div>
              <p className="text-gray-100 mb-1">总借贷次数</p>
              <p className="text-2xl font-bold bg-gradient-to-r from-cyan-300 to-blue-300 bg-clip-text text-transparent">{creditData.totalBorrowCount}</p>
              <p className="text-green-300 text-sm">+3 本月</p>
            </div>

            <div className="bg-gradient-to-br from-gray-900/90 via-gray-800/80 to-gray-900/90 backdrop-blur-xl rounded-xl p-6 border-2 border-blue-400/80 hover:shadow-[0_0_30px_#6366f1aa] transition-all duration-300 hover:scale-[1.03] relative overflow-hidden">
              <div className="absolute inset-0 bg-[linear-gradient(120deg,transparent_0%,rgba(255,255,255,0.2)_50%,transparent_100%)] opacity-0 hover:opacity-100 transition-opacity duration-500 rounded-xl"></div>
              <div className="flex items-center justify-center w-10 h-10 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-full mb-4 shadow-lg">
                <svg className="w-5 h-5 bg-gradient-to-r from-white to-blue-200 bg-clip-text text-transparent" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
              </div>
              <p className="text-gray-100 mb-1">按时还款率</p>
              <p className="text-2xl font-bold bg-gradient-to-r from-blue-300 to-indigo-300 bg-clip-text text-transparent">{creditData.onTimeRepaymentRate}%</p>
              <p className="text-green-300 text-sm">连续12个月</p>
            </div>

            <div className="bg-gradient-to-br from-gray-900/90 via-gray-800/80 to-gray-900/90 backdrop-blur-xl rounded-xl p-6 border-2 border-purple-400/80 hover:shadow-[0_0_30px_#9d4eddAA] transition-all duration-300 hover:scale-[1.03] relative overflow-hidden">
              <div className="absolute inset-0 bg-[linear-gradient(120deg,transparent_0%,rgba(255,255,255,0.2)_50%,transparent_100%)] opacity-0 hover:opacity-100 transition-opacity duration-500 rounded-xl"></div>
              <div className="flex items-center justify-center w-10 h-10 bg-gradient-to-br from-purple-600 to-pink-600 rounded-full mb-4 shadow-lg">
                <svg className="w-5 h-5 bg-gradient-to-r from-white to-purple-200 bg-clip-text text-transparent" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
                </svg>
              </div>
              <p className="text-gray-100 mb-1">平均借贷金额</p>
              <p className="text-2xl font-bold bg-gradient-to-r from-purple-300 to-pink-300 bg-clip-text text-transparent">${creditData.averageLoanAmount.toLocaleString()}</p>
              <p className="text-green-300 text-sm">+15% 较上月</p>
            </div>

            <div className="bg-gradient-to-br from-gray-900/90 via-gray-800/80 to-gray-900/90 backdrop-blur-xl rounded-xl p-6 border-2 border-amber-400/80 hover:shadow-[0_0_30px_#f59e0baa] transition-all duration-300 hover:scale-[1.03] relative overflow-hidden">
              <div className="absolute inset-0 bg-[linear-gradient(120deg,transparent_0%,rgba(255,255,255,0.2)_50%,transparent_100%)] opacity-0 hover:opacity-100 transition-opacity duration-500 rounded-xl"></div>
              <div className="flex items-center justify-center w-10 h-10 bg-gradient-to-br from-amber-600 to-orange-600 rounded-full mb-4 shadow-lg">
                <svg className="w-5 h-5 bg-gradient-to-r from-white to-amber-200 bg-clip-text text-transparent" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <p className="text-gray-100 mb-1">信用历史</p>
              <p className="text-2xl font-bold bg-gradient-to-r from-amber-300 to-orange-300 bg-clip-text text-transparent">{creditData.creditHistoryMonths}个月</p>
              <p className="text-green-300 text-sm">持续增长</p>
            </div>
          </div>
        </div>

        {/* Trend Chart */}
        <div className="bg-gradient-to-br from-gray-900/90 via-gray-800/80 to-gray-900/90 backdrop-blur-xl rounded-xl p-6 border-2 border-cyan-400/80 hover:shadow-[0_0_30px_#00ffffaa] transition-all duration-300 relative overflow-hidden">
          <div className="absolute inset-0 bg-[linear-gradient(120deg,transparent_0%,rgba(255,255,255,0.2)_50%,transparent_100%)] opacity-0 hover:opacity-100 transition-opacity duration-500 rounded-xl"></div>
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-sm font-bold bg-gradient-to-r from-cyan-300 to-blue-300 bg-clip-text text-transparent">信用评分趋势</h3>
            <div className="flex space-x-2">
              <button
                onClick={() => setTimeRange("3个月")}
                className={`px-3 py-1 rounded-md text-xs transition-all duration-300 font-bold relative overflow-hidden ${timeRange === "3个月"
                  ? "bg-gradient-to-r from-cyan-500 to-blue-500 text-white shadow-lg shadow-cyan-500/40"
                  : "bg-gradient-to-r from-gray-800/90 to-gray-700/80 text-gray-200 hover:from-gray-700/90 hover:to-gray-600/80"}`}
              >
                <div className="absolute inset-0 bg-[linear-gradient(120deg,transparent_0%,rgba(255,255,255,0.3)_50%,transparent_100%)] opacity-0 hover:opacity-100 transition-opacity duration-300 rounded-md"></div>
                <span className="relative">3个月</span>
              </button>
              <button
                onClick={() => setTimeRange("6个月")}
                className={`px-3 py-1 rounded-md text-xs transition-all duration-300 font-bold relative overflow-hidden ${timeRange === "6个月"
                  ? "bg-gradient-to-r from-cyan-500 to-blue-500 text-white shadow-lg shadow-cyan-500/40"
                  : "bg-gradient-to-r from-gray-800/90 to-gray-700/80 text-gray-200 hover:from-gray-700/90 hover:to-gray-600/80"}`}
              >
                <div className="absolute inset-0 bg-[linear-gradient(120deg,transparent_0%,rgba(255,255,255,0.3)_50%,transparent_100%)] opacity-0 hover:opacity-100 transition-opacity duration-300 rounded-md"></div>
                <span className="relative">6个月</span>
              </button>
              <button
                onClick={() => setTimeRange("1年")}
                className={`px-3 py-1 rounded-md text-xs transition-all duration-300 font-bold relative overflow-hidden ${timeRange === "1年"
                  ? "bg-gradient-to-r from-cyan-500 to-blue-500 text-white shadow-lg shadow-cyan-500/40"
                  : "bg-gradient-to-r from-gray-800/90 to-gray-700/80 text-gray-200 hover:from-gray-700/90 hover:to-gray-600/80"}`}
              >
                <div className="absolute inset-0 bg-[linear-gradient(120deg,transparent_0%,rgba(255,255,255,0.3)_50%,transparent_100%)] opacity-0 hover:opacity-100 transition-opacity duration-300 rounded-md"></div>
                <span className="relative">1年</span>
              </button>
            </div>
          </div>
          <div className="w-full h-64">
            <div ref={chartRef} style={{ width: '100%', height: '300px' }}></div>
          </div>
        </div>

        {/* Credit Score Factors */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8 mt-8">
          {/* Credit Score Factors */}
          <div className="bg-gradient-to-br from-gray-900/90 via-gray-800/80 to-gray-900/90 backdrop-blur-xl rounded-xl p-6 border-2 border-green-400/80 hover:shadow-[0_0_30px_#10b981aa] transition-all duration-300 relative overflow-hidden">
            <div className="absolute inset-0 bg-[linear-gradient(120deg,transparent_0%,rgba(255,255,255,0.2)_50%,transparent_100%)] opacity-0 hover:opacity-100 transition-opacity duration-500 rounded-xl"></div>
            <h3 className="text-sm font-bold bg-gradient-to-r from-green-300 to-emerald-300 bg-clip-text text-transparent mb-4">信用评分因子</h3>
            <div className="space-y-3">
              {[
                { label: '还款记录', color: '#00d4ff', value: 35 },
                { label: '借贷历史', color: '#00cfff', value: 25 },
                { label: '借贷频率', color: '#a500ff', value: 20 },
                { label: '资产多样性', color: '#ffa500', value: 15 },
                { label: '其他因素', color: '#ff0000', value: 5 }
              ].map((factor, index) => (
                <div key={index} className="flex items-center justify-between relative overflow-hidden">
                  <div className="absolute inset-0 bg-[linear-gradient(120deg,transparent_0%,rgba(255,255,255,0.2)_50%,transparent_100%)] opacity-0 hover:opacity-100 transition-opacity duration-300 rounded"></div>
                  <div className="flex items-center space-x-2">
                    <div
                      className="w-3 h-3 rounded-full shadow-md"
                      style={{ backgroundColor: factor.color }}
                    ></div>
                    <span className="text-gray-100 text-sm">{factor.label}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="w-24 bg-gradient-to-r from-gray-700/60 to-gray-600/50 rounded-full h-2 shadow-inner">
                      <div
                        className="bg-current rounded-full h-2 shadow-md"
                        style={{ width: `${factor.value}%`, backgroundColor: factor.color }}
                      ></div>
                    </div>
                    <span className="text-gray-100 text-xs font-bold">{factor.value}%</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Credit Level Benefits */}
          <div className="bg-gradient-to-br from-gray-900/90 via-gray-800/80 to-gray-900/90 backdrop-blur-xl rounded-xl p-6 border-2 border-purple-400/80 hover:shadow-[0_0_30px_#9d4eddAA] transition-all duration-300 relative overflow-hidden">
            <div className="absolute inset-0 bg-[linear-gradient(120deg,transparent_0%,rgba(255,255,255,0.2)_50%,transparent_100%)] opacity-0 hover:opacity-100 transition-opacity duration-500 rounded-xl"></div>
            <h3 className="text-sm font-bold bg-gradient-to-r from-purple-300 to-pink-300 bg-clip-text text-transparent mb-4">信用等级权益</h3>
            <div className="space-y-4">
              {[
                {
                  title: '优秀 (750+)',
                  color: '#00d4ff',
                  benefits: [
                    '最低借贷利率',
                    '最高借贷额度',
                    '优先客服支持',
                    '专属空投奖励'
                  ]
                },
                {
                  title: '良好 (650-749)',
                  color: '#00cfff',
                  benefits: [
                    '较低借贷利率',
                    '标准借贷额度',
                    '常规客服支持',
                    '标准空投奖励'
                  ]
                },
                {
                  title: '一般 (550-649)',
                  color: '#ffa500',
                  benefits: [
                    '标准借贷利率',
                    '基础借贷额度',
                    '基础客服支持',
                    '基础空投奖励'
                  ]
                }
              ].map((level, index) => (
                <div
                  key={index}
                  className="bg-gradient-to-br from-gray-800/70 to-gray-700/60 rounded-lg p-4 border-2 relative overflow-hidden shadow-lg"
                  style={{ borderColor: level.color }}
                >
                  <div className="absolute inset-0 bg-[linear-gradient(120deg,transparent_0%,rgba(255,255,255,0.2)_50%,transparent_100%)] opacity-0 hover:opacity-100 transition-opacity duration-300 rounded-lg"></div>
                  <h4 className="font-bold text-sm bg-clip-text text-transparent" style={{
                    backgroundImage: `linear-gradient(to right, ${level.color}, ${level.color})`
                  }}>
                    {level.title}
                  </h4>
                  <ul className="mt-2 space-y-1">
                    {level.benefits.map((benefit, i) => (
                      <li key={i} className="flex items-center text-gray-200 text-sm relative overflow-hidden">
                        <div className="absolute inset-0 bg-[linear-gradient(120deg,transparent_0%,rgba(255,255,255,0.2)_50%,transparent_100%)] opacity-0 hover:opacity-100 transition-opacity duration-300 rounded"></div>
                        <svg className="w-3 h-3 mr-1 bg-gradient-to-r from-cyan-300 to-blue-300 bg-clip-text text-transparent" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                        <span className="relative">{benefit}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Borrowing History */}
        <div className="bg-gradient-to-br from-gray-900/90 via-gray-800/80 to-gray-900/90 backdrop-blur-xl rounded-xl p-6 border-2 border-cyan-400/80 hover:shadow-[0_0_30px_#00ffffaa] transition-all duration-300 relative overflow-hidden">
          <div className="absolute inset-0 bg-[linear-gradient(120deg,transparent_0%,rgba(255,255,255,0.2)_50%,transparent_100%)] opacity-0 hover:opacity-100 transition-opacity duration-500 rounded-xl"></div>
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-sm font-bold bg-gradient-to-r from-cyan-300 to-blue-300 bg-clip-text text-transparent">借贷历史</h3>
            <button className="px-3 py-1 bg-gradient-to-r from-purple-600 to-indigo-600 text-white rounded-md text-xs hover:from-purple-700 hover:to-indigo-700 transition-all duration-300 font-bold flex items-center relative overflow-hidden shadow-lg">
              <div className="absolute inset-0 bg-[linear-gradient(120deg,transparent_0%,rgba(255,255,255,0.3)_50%,transparent_100%)] opacity-0 hover:opacity-100 transition-opacity duration-300 rounded-md"></div>
              <svg className="w-3 h-3 mr-1 bg-gradient-to-r from-white to-gray-200 bg-clip-text text-transparent" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <span className="relative">查看全部</span>
            </button>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="border-b border-gray-600">
                  <th className="py-3 px-4 text-gray-100 text-xs font-bold">日期</th>
                  <th className="py-3 px-4 text-gray-100 text-xs font-bold">协议</th>
                  <th className="py-3 px-4 text-gray-100 text-xs font-bold">操作</th>
                  <th className="py-3 px-4 text-gray-100 text-xs font-bold">资产</th>
                  <th className="py-3 px-4 text-gray-100 text-xs font-bold">金额</th>
                  <th className="py-3 px-4 text-gray-100 text-xs font-bold">APY</th>
                  <th className="py-3 px-4 text-gray-100 text-xs font-bold">状态</th>
                </tr>
              </thead>
              <tbody>
                {[
                  { date: '2024-09-15', protocol: 'Aave', action: '供应', asset: 'USDC', amount: 10000, apy: '4.62%', status: '进行中' },
                  { date: '2024-09-10', protocol: 'Compound', action: '借贷', asset: 'ETH', amount: 5.5, apy: '2.37%', status: '已还款' },
                  { date: '2024-09-05', protocol: 'Aave', action: '供应', asset: 'USDT', amount: 25000, apy: '7.56%', status: '已完成' },
                  { date: '2024-08-28', protocol: 'Compound', action: '借贷', asset: 'USDC', amount: 8000, apy: '6.13%', status: '已还款' }
                ].map((item, index) => (
                  <tr key={index} className="border-b border-gray-600 hover:bg-gradient-to-r from-cyan-900/20 via-blue-900/20 to-indigo-900/20 transition-all duration-300 relative overflow-hidden">
                    <div className="absolute inset-0 bg-[linear-gradient(120deg,transparent_0%,rgba(255,255,255,0.2)_50%,transparent_100%)] opacity-0 hover:opacity-100 transition-opacity duration-300"></div>
                    <td className="py-3 px-4 text-gray-100 text-sm">{item.date}</td>
                    <td className="py-3 px-4 text-gray-100 text-sm">{item.protocol}</td>
                    <td className="py-3 px-4">
                      <span className={`inline-block px-2 py-1 rounded-md text-xs font-bold relative overflow-hidden shadow-md ${item.action === '供应'
                          ? 'bg-gradient-to-r from-green-600 to-emerald-600 text-white'
                          : 'bg-gradient-to-r from-orange-600 to-amber-600 text-white'
                        }`}>
                        <div className="absolute inset-0 bg-[linear-gradient(120deg,transparent_0%,rgba(255,255,255,0.3)_50%,transparent_100%)] opacity-0 hover:opacity-100 transition-opacity duration-300 rounded-md"></div>
                        <span className="relative">{item.action}</span>
                      </span>
                    </td>
                    <td className="py-3 px-4 text-gray-100 text-sm">{item.asset}</td>
                    <td className="py-3 px-4 text-gray-100 text-sm">{item.amount.toLocaleString()}</td>
                    <td className="py-3 px-4 text-cyan-300 text-sm font-bold">{item.apy}</td>
                    <td className="py-3 px-4">
                      <span className={`inline-block px-2 py-1 rounded-md text-xs font-bold relative overflow-hidden shadow-md ${item.status === '进行中'
                          ? 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white'
                          : item.status === '已完成'
                            ? 'bg-gradient-to-r from-gray-600 to-gray-700 text-white'
                            : 'bg-gradient-to-r from-green-600 to-emerald-600 text-white'
                        }`}>
                        <div className="absolute inset-0 bg-[linear-gradient(120deg,transparent_0%,rgba(255,255,255,0.3)_50%,transparent_100%)] opacity-0 hover:opacity-100 transition-opacity duration-300 rounded-md"></div>
                        <span className="relative">{item.status}</span>
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
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

export default CreditScore;