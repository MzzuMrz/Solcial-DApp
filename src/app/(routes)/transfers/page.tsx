'use client';

import { useMemo } from 'react';

export default function TransfersPage() {
  const mockTransfers = [
    {
      id: '1',
      date: '2025-01-15T10:30:00Z',
      type: 'Sent',
      counterpart: '4f4c...be31',
      amount: 1.25,
      currency: 'SOL',
      status: 'Success',
    },
    {
      id: '2',
      date: '2025-01-12T08:15:00Z',
      type: 'Received',
      counterpart: 'ab91...cc44',
      amount: 0.5,
      currency: 'SOL',
      status: 'Success',
    },
    {
      id: '3',
      date: '2025-01-10T19:45:00Z',
      type: 'Sent',
      counterpart: 'c9d2...fe12',
      amount: 2.0,
      currency: 'SOL',
      status: 'Pending',
    },
  ];

  const formatDate = (dateString: string) => {
    return new Intl.DateTimeFormat('en-GB', {
      day: '2-digit',
      month: 'short',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    }).format(new Date(dateString));
  };

  const sortedTransfers = useMemo(() => {
    return mockTransfers.sort(
      (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
    );
  }, [mockTransfers]);

  return (
    <div className="h-full mx-60 my-12 bg-black text-white p-4 md:p-8">
      <h1 className="text-xl font-semibold text-purple-300 mb-6">Transfer History</h1>
      <div className="space-y-4">
        {sortedTransfers.map((transfer) => (
          <div
            key={transfer.id}
            className="
              bg-white/10
              backdrop-blur-md
              rounded-lg
              p-4
              border
              border-white/20
              shadow-sm
            "
          >
            <div className="flex items-center justify-between">
              <p className="font-bold text-purple-200">
                {transfer.type === 'Sent' ? 'Sent to' : 'Received from'}
              </p>
              <span
                className={`
                  px-2 py-1 text-xs rounded-full
                  ${
                    transfer.status === 'Success'
                      ? 'bg-green-700 text-white'
                      : 'bg-yellow-700 text-white'
                  }
                `}
              >
                {transfer.status}
              </span>
            </div>
            <p className="text-sm text-purple-400 mb-2">{transfer.counterpart}</p>
            <p className="text-white/90 mb-2">
              {transfer.amount} {transfer.currency}
            </p>
            <p className="text-xs text-white/50">
              {formatDate(transfer.date)}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
