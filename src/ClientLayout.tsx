'use client';

import { useAppKitAccount, useAppKit } from '@reown/appkit/react';
import { useEffect, useState } from 'react';
import Header from "@/app/components/layout/Header";
import Sidebar from "@/app/components/layout/Sidebar";

function ClientLayout({ children }: { children: React.ReactNode }) {
  const { status } = useAppKitAccount();
  const { open } = useAppKit();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoading(false);
  }, [status]);

  if (isLoading) {
    return <div className="min-h-screen bg-black" />;
  }

  if (status !== 'connected') {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center p-4">
        <div className="text-center space-y-6">
          <h1 className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-purple-400 to-pink-600 text-transparent bg-clip-text">
            Welcome to SolScial
          </h1>
          <p className="text-lg text-purple-300 max-w-2xl mx-auto">
            Connect your wallet to join the decentralized social network on Solana
          </p>
          <button
            onClick={() => open()}
            className="
              px-8
              py-4
              bg-purple-600
              text-white
              rounded-xl
              text-lg
              font-semibold
              hover:bg-purple-700
              transition-all
              duration-300
              hover:scale-105
              shadow-lg
              hover:shadow-purple-500/25
            "
          >
            Connect Wallet
          </button>
        </div>
      </div>
    );
  }

  return (
    <>
      <Header />
      <div className="pt-16 min-h-screen flex flex-col lg:flex-row">
        <Sidebar />
        <main className="flex-1 p-4 lg:ml-64 lg:mr-80 z-0 relative">
          {children}
        </main>
      </div>
    </>
  );
}

export default ClientLayout