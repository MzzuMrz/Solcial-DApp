'use client';

import { useAppKit, useAppKitAccount } from '@reown/appkit/react';
import type { MouseEvent } from 'react';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

export default function Home() {
  const { open } = useAppKit();
  const { status } = useAppKitAccount();
  const router = useRouter();
  
  useEffect(() => {
    if (status === 'connected') {
      router.push('/feed');
    }
  }, [status, router]);
  
  const handleOpen = (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    open();
  };
  
  const handleCreateNFT = (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    open({ view: 'Connect' });
  };

  // Si está conectado, no renderizamos nada mientras se realiza la redirección
  if (status === 'connected') {
    return null;
  }

  return (
    <main className="min-h-screen p-8">
      <h1 className="text-2xl font-bold mb-4">ReOwn App en Solana</h1>
      
      <div className="space-y-4">
        <button 
          onClick={handleOpen}
          className="w-full md:w-auto px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors duration-300"
        >
          Conectar Wallet
        </button>
      
      </div>
    </main>
  );
}