'use client';

import { useMemo } from 'react';

export default function NotificationsPage() {
  const mockNotifications = [
    {
      id: '1',
      date: '2025-01-16T14:22:00Z',
      title: 'New message from @john',
      content: 'Check your DMs for more details.',
      read: false,
    },
    {
      id: '2',
      date: '2025-01-15T09:50:00Z',
      title: 'You have 2 new followers',
      content: 'Mike and Sarah started following you.',
      read: true,
    },
    {
      id: '3',
      date: '2025-01-10T19:00:00Z',
      title: 'Security Alert',
      content: 'Someone tried to access your account from a new device.',
      read: false,
    },
  ];

  function formatDate(dateString: string) {
    return new Intl.DateTimeFormat('en-GB', {
      day: '2-digit',
      month: 'short',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    }).format(new Date(dateString));
  }

  const sortedNotifications = useMemo(() => {
    return mockNotifications.sort(
      (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
    );
  }, [mockNotifications]);

  return (
    <div className="h-full mx-60 my-12 bg-black text-white p-4 md:p-8">
      <h1 className="text-xl font-semibold text-purple-300 mb-6">Notifications</h1>
      <div className="space-y-4">
        {sortedNotifications.map((notif) => (
          <div
            key={notif.id}
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
            <div className="flex items-center justify-between mb-2">
              <p className="text-purple-200 font-bold">{notif.title}</p>
              <span
                className={`
                  px-2 py-1 text-xs rounded-full
                  ${
                    notif.read
                      ? 'bg-gray-700 text-white'
                      : 'bg-purple-700 text-white'
                  }
                `}
              >
                {notif.read ? 'Read' : 'Unread'}
              </span>
            </div>
            <p className="text-white/90 mb-2">{notif.content}</p>
            <p className="text-xs text-white/50">{formatDate(notif.date)}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
