const yields = [
    { protocol: "Aave", asset: "USDC", apy: "5.2%", tvl: "$1.2B" },
    { protocol: "Compound", asset: "DAI", apy: "4.8%", tvl: "$800M" },
    { protocol: "Uniswap", asset: "ETH/USDT", apy: "6.1%", tvl: "$500M" },
    { protocol: "Curve", asset: "3Pool", apy: "3.9%", tvl: "$2B" },
];

export default function YieldTable() {
    return (
        <section className="py-12 px-6">
            <h2 className="text-3xl font-bold mb-6 text-center">Top Yields</h2>
            <div className="overflow-x-auto">
                <table className="min-w-full bg-gray-800 rounded-lg overflow-hidden">
                    <thead>
                        <tr className="bg-gray-700">
                            <th className="px-6 py-3 text-left">Protocol</th>
                            <th className="px-6 py-3 text-left">Asset</th>
                            <th className="px-6 py-3 text-left">APY</th>
                            <th className="px-6 py-3 text-left">TVL</th>
                        </tr>
                    </thead>
                    <tbody>
                        {yields.map((item, index) => (
                            <tr key={index} className="border-t border-gray-700">
                                <td className="px-6 py-4">{item.protocol}</td>
                                <td className="px-6 py-4">{item.asset}</td>
                                <td className="px-6 py-4 text-green-400">{item.apy}</td>
                                <td className="px-6 py-4">{item.tvl}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </section>
    );
}