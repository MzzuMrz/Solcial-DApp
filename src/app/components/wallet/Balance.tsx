'use client';

import { useAppKitAccount, useAppKit } from '@reown/appkit/react';
import { useWallet } from '@/app/hooks/useWallet';
import { useEffect } from 'react';

export default function Balance() {
  const { status, address } = useAppKitAccount();
  const { open } = useAppKit();
  const { balance, loading, fetchBalance } = useWallet();

  useEffect(() => {
    if (status === 'connected' && address) {
      fetchBalance(address);
    }
  }, [status, address, fetchBalance]);

  if (status !== 'connected') {
    return (
      <div className="bg-white rounded-lg shadow p-4">
        <h2 className="text-lg font-bold mb-2">Tu Balance</h2>
        <button
          onClick={() => open()}
          className="px-4 py-2 bg-purple-600 text-white rounded-md hover:bg-purple-700"
        >
          Conectar Wallet
        </button>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow p-4">
      <h2 className="text-lg font-bold mb-2">Tu Balance</h2>
      {loading ? (
        <p>Cargando...</p>
      ) : (
        <p className="text-2xl font-bold text-purple-600">{balance.toFixed(4)} SOL</p>
      )}
      <p className="text-sm text-gray-500 truncate">{address}</p>
    </div>
  );
}