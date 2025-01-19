'use client';

import { useAppKitAccount } from '@reown/appkit/react';
import Balance from '../wallet/Balance';
import TransferForm from '../wallet/TransferForm';

export default function RightSidebar() {
  const { status } = useAppKitAccount();

  return (
    <aside className="fixed right-0 top-16 h-[calc(100vh-4rem)] w-80 bg-white shadow-sm overflow-y-auto">
      <div className="px-4 py-6 space-y-6">
        <Balance />
        {status === 'connected' && <TransferForm />}
      </div>
    </aside>
  );
}
