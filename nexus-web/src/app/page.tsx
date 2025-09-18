import Header from "@/components/Header";
import StatsSection from "@/components/StatsSection";
import ActionButtons from "@/components/ActionButtons";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-between bg-black">
      <Header />

      {/* Hero Section */}
      <div className="flex-1 flex flex-col items-center justify-center px-4 py-20 text-center">
        <h1 className="text-5xl md:text-6xl font-bold mb-6 leading-tight">
          <span className="bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">DeFi</span>
          <span className="ml-2 text-white">Nexus</span>
        </h1>

        <p className="text-lg md:text-xl text-gray-300 mb-10 max-w-2xl mx-auto">
          聚合多个DeFi协议，提供最优借贷利率和个性化信用评分
        </p>
        <ActionButtons />
      </div>
      <StatsSection />
      <Footer />
    </main>
  );
}