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
    <div className="bg-black min-h-screen">
      <Header />

      {/* Page Header */}
      <div className="max-w-6xl mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-[#00d4ff] text-shadow-[0_0_10px_#00d4ff80] mb-2">空投任务</h1>
          <p className="text-gray-400 text-sm">完成任务获得NEXUS代币奖励，参与生态建设，享受专属权益</p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat, index) => (
            <div
              key={index}
              className="bg-gray-900 rounded-xl p-6 border border-gray-800 hover:shadow-[0_10px_30px_#00d4ff33] transition-shadow hover:transform hover:translate-y-[-2px]"
              style={{ boxShadow: "0 0 20px #00d4ff4d" }}
            >
              <div className="flex flex-col items-center justify-center h-full">
                <div className="w-12 h-12 flex items-center justify-center rounded-full bg-gray-800 mb-4">
                  <span className="text-xl">{stat.icon}</span>
                </div>
                <div className="text-center">
                  <div className="text-lg font-bold text-[#00d4ff]">{stat.value}</div>
                  <div className="text-gray-400 text-sm">{stat.subtitle}</div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Task Filters */}
        <div className="bg-gray-900 rounded-xl p-4 border border-gray-800 mb-8">
          <div className="flex flex-wrap gap-2">
            <button className="px-4 py-2 bg-blue-600 text-white rounded-md text-xs hover:bg-blue-700 transition-colors">
              全部任务 (12)
            </button>
            <button className="px-4 py-2 bg-gray-800 text-gray-400 rounded-md text-xs hover:bg-gray-700 transition-colors">
              简单任务 (5)
            </button>
            <button className="px-4 py-2 bg-gray-800 text-gray-400 rounded-md text-xs hover:bg-gray-700 transition-colors">
              中等任务 (4)
            </button>
            <button className="px-4 py-2 bg-gray-800 text-gray-400 rounded-md text-xs hover:bg-gray-700 transition-colors">
              困难任务 (3)
            </button>
          </div>
        </div>

        {/* Tasks Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          {tasks.map((task) => (
            <div
              key={task.id}
              className="bg-gray-900 rounded-xl p-6 border border-gray-800 hover:shadow-[0_10px_30px_#00d4ff33] transition-shadow hover:transform hover:translate-y-[-2px]"
              style={{ boxShadow: "0 0 20px #00d4ff4d" }}
            >
              {/* Task Type Badge */}
              <div className={`absolute top-4 right-4 px-2 py-1 rounded-md text-xs ${task.type === 'simple' ? 'bg-green-900/50 text-green-400' :
                  task.type === 'medium' ? 'bg-yellow-900/50 text-yellow-400' :
                    'bg-red-900/50 text-red-400'
                }`}>
                {task.type === 'simple' ? '简单' : task.type === 'medium' ? '中等' : '困难'}
              </div>

              {/* Task Content */}
              <div className="flex flex-col h-full">
                {/* Task Icon */}
                <div className="flex items-center justify-center w-12 h-12 bg-gray-800 rounded-full mb-4">
                  <svg className="w-6 h-6 text-[#00d4ff]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </div>

                {/* Task Title and Description */}
                <h3 className="font-bold text-[#00d4ff] text-sm mb-2">{task.title}</h3>
                <p className="text-gray-400 text-xs mb-4">{task.description}</p>

                {/* Reward */}
                <div className="flex items-center mb-4">
                  <svg className="w-4 h-4 mr-1 text-[#00d4ff]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
                  </svg>
                  <span className="text-[#00d4ff] font-medium text-sm">{task.reward}</span>
                </div>

                {/* Progress Bar */}
                <div className="mb-4">
                  <div className="flex justify-between text-xs text-gray-400 mb-1">
                    <span>进度</span>
                    <span>{task.progress}%</span>
                  </div>
                  <div className="w-full bg-gray-700 rounded-full h-2">
                    <div
                      className={`h-2 rounded-full transition-all duration-300 ${task.status === 'completed' ? 'bg-green-500' :
                          task.status === 'in-progress' ? 'bg-blue-500' : 'bg-gray-500'
                        }`}
                      style={{ width: `${task.progress}%` }}
                    ></div>
                  </div>
                </div>

                {/* Deadline */}
                <div className="flex items-center text-xs text-gray-400 mb-4">
                  <svg className="w-3 h-3 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                  <span>截止: {task.deadline}</span>
                </div>

                {/* Action Button */}
                <button
                  className={`w-full py-2 px-4 rounded-md text-sm font-medium transition-colors ${task.status === 'completed'
                      ? 'bg-green-600 text-white hover:bg-green-700'
                      : task.status === 'in-progress'
                        ? 'bg-purple-600 text-white hover:bg-purple-700'
                        : 'bg-orange-600 text-white hover:bg-orange-700'
                    }`}
                >
                  {task.status === 'completed' ? '已完成' : task.status === 'in-progress' ? '继续任务' : '开始任务'}
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Leaderboard and Rewards Summary Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Leaderboard */}
          <div className="bg-gray-900 rounded-xl p-6 border border-gray-800 hover:shadow-[0_10px_30px_#00d4ff33] transition-shadow hover:transform hover:translate-y-[-2px]"
            style={{ boxShadow: "0 0 20px #00d4ff4d" }}>
            <h3 className="text-sm font-bold text-[#00d4ff] mb-4">排行榜</h3>
            <div className="space-y-3">
              {leaderboard.map((user, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between p-3 bg-gray-800/50 rounded-lg"
                >
                  <div className="flex items-center space-x-3">
                    <span className="text-sm font-bold text-gray-400">{user.badge}</span>
                    <div>
                      <div className="text-sm font-medium text-white">{user.rank}</div>
                      <div className="text-xs text-gray-400">{user.address}</div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-sm font-bold text-[#00d4ff]">{user.points} NEXUS</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Rewards Summary */}
          <div className="bg-gray-900 rounded-xl p-6 border border-gray-800 hover:shadow-[0_10px_30px_#00d4ff33] transition-shadow hover:transform hover:translate-y-[-2px]"
            style={{ boxShadow: "0 0 20px #00d4ff4d" }}>
            <h3 className="text-sm font-bold text-[#00d4ff] mb-4">奖励总览</h3>
            <div className="space-y-4">
              {/* Completed Tasks */}
              <div className="flex items-center justify-between p-3 bg-gray-800/50 rounded-lg">
                <div className="flex items-center space-x-2">
                  <div className="w-6 h-6 bg-green-600 rounded-full flex items-center justify-center">
                    <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <div>
                    <div className="text-sm font-medium text-white">已完成任务</div>
                    <div className="text-xs text-gray-400">{rewardsSummary.completedTasks}个任务</div>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-sm font-bold text-green-400">{rewardsSummary.completedRewards} NEXUS</div>
                </div>
              </div>

              {/* Ongoing Tasks */}
              <div className="flex items-center justify-between p-3 bg-gray-800/50 rounded-lg">
                <div className="flex items-center space-x-2">
                  <div className="w-6 h-6 bg-blue-600 rounded-full flex items-center justify-center">
                    <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <div>
                    <div className="text-sm font-medium text-white">进行中任务</div>
                    <div className="text-xs text-gray-400">{rewardsSummary.ongoingTasks}个任务</div>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-sm font-bold text-blue-400">{rewardsSummary.expectedRewards} NEXUS</div>
                  <div className="text-xs text-gray-400">预期奖励</div>
                </div>
              </div>

              {/* Claim Rewards Button */}
              <button
                className="w-full mt-4 py-3 px-4 bg-gradient-to-r from-purple-600 to-indigo-600 text-white rounded-lg font-medium hover:from-purple-700 hover:to-indigo-700 transition-all duration-300 flex items-center justify-center space-x-2"
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
    </div>
  );
};

export default Airdrop;