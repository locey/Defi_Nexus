// src/app/airdrop/page.tsx
"use client";
import Header from "@/components/Header";

const Airdrop = () => {
  // Mock data for airdrop statistics
  const stats = [
    {
      icon: "🎯",
      title: "总奖励池",
      value: "10M NEXUS",
      subtitle: "价值 $2.5M"
    },
    {
      icon: "🎁",
      title: "已获得奖励",
      value: "1,250 NEXUS",
      subtitle: "+150 本周"
    },
    {
      icon: "🎯",
      title: "完成任务",
      value: "8/12",
      subtitle: "66.7% 完成率"
    },
    {
      icon: "👑",
      title: "排行榜",
      value: "#156",
      subtitle: "前 1% 用户"
    }
  ];

  // Mock data for tasks
  const tasks = [
    {
      id: 1,
      title: "首次借贷",
      description: "完成您的第一次借贷操作",
      reward: "100 NEXUS",
      status: "completed",
      progress: 100,
      deadline: "2024-12-31",
      type: "simple"
    },
    {
      id: 2,
      title: "连续供应30天",
      description: "连续30天在平台上供应资产",
      reward: "500 NEXUS",
      status: "in-progress",
      progress: 50,
      deadline: "2024-10-15",
      type: "medium"
    },
    {
      id: 3,
      title: "推荐好友",
      description: "邀请3位好友注册并完成首次交易",
      reward: "200 NEXUS",
      status: "in-progress",
      progress: 33,
      deadline: "2024-11-30",
      type: "medium"
    },
    {
      id: 4,
      title: "交易量达标",
      description: "累计交易额达到 $10,000",
      reward: "300 NEXUS",
      status: "in-progress",
      progress: 25,
      deadline: "2024-12-15",
      type: "hard"
    },
    {
      id: 5,
      title: "多协议体验",
      description: "在Aave和Compound上都完成借贷",
      reward: "150 NEXUS",
      status: "in-progress",
      progress: 10,
      deadline: "2024-11-15",
      type: "medium"
    },
    {
      id: 6,
      title: "社交媒体分享",
      description: "在Twitter上分享您的DeFi体验",
      reward: "50 NEXUS",
      status: "pending",
      progress: 0,
      deadline: "2024-10-31",
      type: "simple"
    }
  ];

  // Mock data for leaderboard
  const leaderboard = [
    { rank: 1, address: "0x1234...5678", points: 2450, badge: "🥇" },
    { rank: 2, address: "0x2345...6789", points: 2100, badge: "🥈" },
    { rank: 3, address: "0x3456...7890", points: 1850, badge: "🥉" },
    { rank: 4, address: "0x4567...8901", points: 1650, badge: "⭐" },
    { rank: 5, address: "0x5678...9012", points: 1400, badge: "⭐" }
  ];

  // Mock data for rewards summary
  const rewardsSummary = {
    completedTasks: 8,
    completedRewards: 1250,
    ongoingTasks: 4,
    expectedRewards: 1150
  };

  return (
    <div className="bg-black min-h-screen bg-gradient-to-br from-indigo-900/30 via-purple-900/20 to-pink-800/30 animate-gradient-bg">
      <Header />

      {/* Page Header */}
      <div className="max-w-6xl mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold bg-gradient-to-r from-cyan-300 via-blue-300 to-indigo-300 bg-clip-text text-transparent mb-2">
            空投任务
          </h1>
          <p className="text-gray-300 text-sm">完成任务获得NEXUS代币奖励，参与生态建设，享受专属权益</p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat, index) => {
            // Different gradient for each stat card
            const gradients = [
              "from-cyan-900/50 to-blue-800/40",
              "from-purple-900/50 to-pink-800/40",
              "from-green-900/50 to-teal-800/40",
              "from-amber-900/50 to-orange-800/40"
            ];

            const borders = [
              "border-cyan-400/40",
              "border-purple-400/40",
              "border-green-400/40",
              "border-amber-400/40"
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
                className={`bg-gradient-to-br ${gradients[index]} backdrop-blur-lg rounded-xl p-6 border ${borders[index]} transition-all duration-300 transform hover:scale-105 ${shadows[index]}`}
              >
                <div className="flex flex-col items-center justify-center h-full">
                  <div className="w-12 h-12 flex items-center justify-center rounded-full bg-gradient-to-br from-gray-800/50 to-gray-700/40 mb-4">
                    <span className="text-xl">{stat.icon}</span>
                  </div>
                  <div className="text-center">
                    <div className="text-lg font-bold bg-gradient-to-r from-white to-gray-200 bg-clip-text text-transparent">{stat.value}</div>
                    <div className="text-gray-300 text-sm">{stat.subtitle}</div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Task Filters */}
        <div className="bg-gradient-to-br from-gray-900/50 to-gray-800/40 backdrop-blur-lg rounded-xl p-4 border border-gray-700/50 mb-8">
          <div className="flex flex-wrap gap-2">
            <button className="px-4 py-2 bg-gradient-to-r from-cyan-600 to-blue-600 text-white rounded-md text-xs hover:from-cyan-700 hover:to-blue-700 transition-all duration-300 transform hover:scale-105">
              全部任务 (12)
            </button>
            <button className="px-4 py-2 bg-gradient-to-r from-gray-800/50 to-gray-700/40 text-gray-300 rounded-md text-xs hover:from-gray-700/50 hover:to-gray-600/40 transition-all duration-300 border border-gray-700/50">
              简单任务 (5)
            </button>
            <button className="px-4 py-2 bg-gradient-to-r from-gray-800/50 to-gray-700/40 text-gray-300 rounded-md text-xs hover:from-gray-700/50 hover:to-gray-600/40 transition-all duration-300 border border-gray-700/50">
              中等任务 (4)
            </button>
            <button className="px-4 py-2 bg-gradient-to-r from-gray-800/50 to-gray-700/40 text-gray-300 rounded-md text-xs hover:from-gray-700/50 hover:to-gray-600/40 transition-all duration-300 border border-gray-700/50">
              困难任务 (3)
            </button>
          </div>
        </div>

        {/* Tasks Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          {tasks.map((task) => {
            // Different styling for each task card based on type
            const taskStyles = {
              simple: {
                bg: "from-green-900/50 to-emerald-800/40",
                border: "border-green-400/40",
                shadow: "hover:shadow-[0_10px_30px_#10b98166]",
                typeBg: "bg-gradient-to-r from-green-900/50 to-emerald-800/40 text-green-300",
                progressBar: "bg-gradient-to-r from-green-400 to-emerald-500",
                button: "from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700"
              },
              medium: {
                bg: "from-amber-900/50 to-orange-800/40",
                border: "border-amber-400/40",
                shadow: "hover:shadow-[0_10px_30px_#f59e0b66]",
                typeBg: "bg-gradient-to-r from-amber-900/50 to-orange-800/40 text-amber-300",
                progressBar: "bg-gradient-to-r from-amber-400 to-orange-500",
                button: "from-amber-600 to-orange-600 hover:from-amber-700 hover:to-orange-700"
              },
              hard: {
                bg: "from-rose-900/50 to-pink-800/40",
                border: "border-rose-400/40",
                shadow: "hover:shadow-[0_10px_30px_#f43f5e66]",
                typeBg: "bg-gradient-to-r from-rose-900/50 to-pink-800/40 text-rose-300",
                progressBar: "bg-gradient-to-r from-rose-400 to-pink-500",
                button: "from-rose-600 to-pink-600 hover:from-rose-700 hover:to-pink-700"
              }
            };

            const style = task.status === 'completed'
              ? taskStyles.simple
              : task.type === 'simple'
                ? taskStyles.simple
                : task.type === 'medium'
                  ? taskStyles.medium
                  : taskStyles.hard;

            return (
              <div
                key={task.id}
                className={`bg-gradient-to-br ${style.bg} backdrop-blur-lg rounded-xl p-6 border ${style.border} transition-all duration-300 transform hover:scale-105 ${style.shadow} relative`}
              >
                {/* Task Type Badge */}
                <div className={`absolute top-4 right-4 px-2 py-1 rounded-md text-xs ${style.typeBg} border ${style.border}`}>
                  {task.type === 'simple' ? '简单' : task.type === 'medium' ? '中等' : '困难'}
                </div>

                {/* Task Content */}
                <div className="flex flex-col h-full">
                  {/* Task Icon */}
                  <div className="flex items-center justify-center w-12 h-12 bg-gradient-to-br from-gray-800/50 to-gray-700/40 rounded-full mb-4">
                    <svg className="w-6 h-6 bg-gradient-to-r from-cyan-300 to-blue-300 bg-clip-text text-transparent" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                    </svg>
                  </div>

                  {/* Task Title and Description */}
                  <h3 className="font-bold bg-gradient-to-r from-white to-gray-200 bg-clip-text text-transparent text-sm mb-2">{task.title}</h3>
                  <p className="text-gray-300 text-xs mb-4">{task.description}</p>

                  {/* Reward */}
                  <div className="flex items-center mb-4">
                    <svg className="w-4 h-4 mr-1 bg-gradient-to-r from-cyan-300 to-blue-300 bg-clip-text text-transparent" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
                    </svg>
                    <span className="bg-gradient-to-r from-white to-gray-200 bg-clip-text text-transparent font-medium text-sm">{task.reward}</span>
                  </div>

                  {/* Progress Bar */}
                  <div className="mb-4">
                    <div className="flex justify-between text-xs text-gray-300 mb-1">
                      <span>进度</span>
                      <span>{task.progress}%</span>
                    </div>
                    <div className="w-full bg-gradient-to-r from-gray-700/50 to-gray-600/40 rounded-full h-2">
                      <div
                        className={`h-2 rounded-full transition-all duration-300 ${style.progressBar}`}
                        style={{ width: `${task.progress}%` }}
                      ></div>
                    </div>
                  </div>

                  {/* Deadline */}
                  <div className="flex items-center text-xs text-gray-300 mb-4">
                    <svg className="w-3 h-3 mr-1 bg-gradient-to-r from-cyan-300 to-blue-300 bg-clip-text text-transparent" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                    <span>截止: {task.deadline}</span>
                  </div>

                  {/* Action Button */}
                  <button
                    className={`w-full py-2 px-4 rounded-md text-sm font-medium transition-all duration-300 bg-gradient-to-r ${style.button} text-white transform hover:scale-105`}
                  >
                    {task.status === 'completed' ? '已完成' : task.status === 'in-progress' ? '继续任务' : '开始任务'}
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        {/* Leaderboard and Rewards Summary Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Leaderboard */}
          <div className="bg-gradient-to-br from-gray-900/50 to-gray-800/40 backdrop-blur-lg rounded-xl p-6 border border-gray-700/50 transition-all duration-300 transform hover:scale-105 hover:shadow-[0_10px_30px_#00d4ff66]">
            <h3 className="text-sm font-bold bg-gradient-to-r from-cyan-300 to-blue-300 bg-clip-text text-transparent mb-4">排行榜</h3>
            <div className="space-y-3">
              {leaderboard.map((user, index) => {
                // Different styling for each leaderboard position
                const positionStyles = [
                  "from-yellow-900/50 to-amber-800/40 border-yellow-400/40",
                  "from-gray-700/50 to-gray-600/40 border-gray-400/40",
                  "from-amber-900/50 to-orange-800/40 border-amber-400/40"
                ];

                const borderStyle = index < 3
                  ? positionStyles[index]
                  : "border-gray-700/50";

                return (
                  <div
                    key={index}
                    className={`flex items-center justify-between p-3 bg-gradient-to-br from-gray-800/50 to-gray-700/40 rounded-lg border ${borderStyle}`}
                  >
                    <div className="flex items-center space-x-3">
                      <span className="text-sm font-bold bg-gradient-to-r from-white to-gray-200 bg-clip-text text-transparent">{user.badge}</span>
                      <div>
                        <div className="text-sm font-medium bg-gradient-to-r from-white to-gray-200 bg-clip-text text-transparent">第 {user.rank} 名</div>
                        <div className="text-xs text-gray-300">{user.address}</div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-sm font-bold bg-gradient-to-r from-cyan-300 to-blue-300 bg-clip-text text-transparent">{user.points} NEXUS</div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Rewards Summary */}
          <div className="bg-gradient-to-br from-gray-900/50 to-gray-800/40 backdrop-blur-lg rounded-xl p-6 border border-gray-700/50 transition-all duration-300 transform hover:scale-105 hover:shadow-[0_10px_30px_#00d4ff66]">
            <h3 className="text-sm font-bold bg-gradient-to-r from-purple-300 to-pink-300 bg-clip-text text-transparent mb-4">奖励总览</h3>
            <div className="space-y-4">
              {/* Completed Tasks */}
              <div className="flex items-center justify-between p-3 bg-gradient-to-br from-green-900/50 to-emerald-800/40 rounded-lg border border-green-400/40">
                <div className="flex items-center space-x-2">
                  <div className="w-6 h-6 bg-gradient-to-br from-green-500 to-emerald-500 rounded-full flex items-center justify-center">
                    <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <div>
                    <div className="text-sm font-medium bg-gradient-to-r from-white to-gray-200 bg-clip-text text-transparent">已完成任务</div>
                    <div className="text-xs text-gray-300">{rewardsSummary.completedTasks}个任务</div>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-sm font-bold bg-gradient-to-r from-green-300 to-emerald-300 bg-clip-text text-transparent">{rewardsSummary.completedRewards} NEXUS</div>
                </div>
              </div>

              {/* Ongoing Tasks */}
              <div className="flex items-center justify-between p-3 bg-gradient-to-br from-blue-900/50 to-indigo-800/40 rounded-lg border border-blue-400/40">
                <div className="flex items-center space-x-2">
                  <div className="w-6 h-6 bg-gradient-to-br from-blue-500 to-indigo-500 rounded-full flex items-center justify-center">
                    <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <div>
                    <div className="text-sm font-medium bg-gradient-to-r from-white to-gray-200 bg-clip-text text-transparent">进行中任务</div>
                    <div className="text-xs text-gray-300">{rewardsSummary.ongoingTasks}个任务</div>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-sm font-bold bg-gradient-to-r from-blue-300 to-indigo-300 bg-clip-text text-transparent">{rewardsSummary.expectedRewards} NEXUS</div>
                  <div className="text-xs text-gray-300">预期奖励</div>
                </div>
              </div>

              {/* Claim Rewards Button */}
              <button
                className="w-full mt-4 py-3 px-4 bg-gradient-to-r from-purple-600 to-indigo-600 text-white rounded-lg font-medium hover:from-purple-700 hover:to-indigo-700 transition-all duration-300 flex items-center justify-center space-x-2 transform hover:scale-105"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                </svg>
                <span>领取奖励</span>
              </button>
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

export default Airdrop;