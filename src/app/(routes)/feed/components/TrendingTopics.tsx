'use client';

export default function TrendingTopics() {
  const trends = [
    { id: 1, tag: '#Solana', posts: 1234 },
    { id: 2, tag: '#Crypto', posts: 987 },
    { id: 3, tag: '#Web3', posts: 765 },
    { id: 4, tag: '#NFT', posts: 543 },
  ];

  return (
    <div className="bg-white rounded-lg shadow-sm p-4">
      <h2 className="font-bold text-xl mb-4">Tendencias</h2>
      <div className="space-y-4">
        {trends.map(trend => (
          <div key={trend.id} className="flex justify-between items-center">
            <span className="text-purple-600 hover:underline cursor-pointer">
              {trend.tag}
            </span>
            <span className="text-sm text-gray-500">{trend.posts} posts</span>
          </div>
        ))}
      </div>
    </div>
  );
}