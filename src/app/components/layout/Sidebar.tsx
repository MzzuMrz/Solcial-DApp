'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Home, User, Send, Bell, Settings } from 'lucide-react';
import Balance from '../wallet/Balance';

const navigation = [
  { name: 'Home', href: '/feed', icon: Home },
  { name: 'Profile', href: '/profile', icon: User },
  { name: 'Transfers', href: '/transfers', icon: Send },
  { name: 'Notifications', href: '/notifications', icon: Bell },
  { name: 'Settings', href: '/settings', icon: Settings },
];

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <>
      {/* SIDEBAR (visible on large screens) */}
      <aside
        className="
          hidden
          lg:block
          lg:fixed
          lg:left-0
          lg:top-16
          lg:h-[calc(100vh-4rem)]
          lg:w-64
          bg-black
          border-r border-white/20
          shadow-sm
        "
      >
        <nav className="px-4 py-6">
          <ul className="space-y-2">
            {navigation.map((item) => {
              const Icon = item.icon;
              const isActive = pathname === item.href;
              return (
                <li key={item.name}>
                  <Link
                    href={item.href}
                    className={`
                      flex items-center px-4 py-2 rounded-lg transition-colors
                      ${
                        isActive
                          ? 'bg-purple-900 text-purple-400'
                          : 'text-white hover:bg-black/50 hover:text-purple-400'
                      }
                    `}
                  >
                    <Icon className="w-5 h-5 mr-3" />
                    {item.name}
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>
      </aside>

      {/* BOTTOM NAV (visible on mobile) */}
      <nav
        className="
          fixed
          bottom-0
          left-0
          right-0
          flex
          justify-around
          px-4
          py-2
          lg:hidden
          z-10
          bg-black
          border-t border-white/20
          shadow-sm
        "
      >
        {navigation.map((item) => {
          const Icon = item.icon;
          const isActive = pathname === item.href;
          return (
            <Link
              key={item.name}
              href={item.href}
              className={`
                flex flex-col items-center justify-center
                text-sm
                ${
                  isActive
                    ? 'text-purple-400'
                    : 'text-white hover:text-purple-400'
                }
              `}
            >
              <Icon className="w-6 h-6" />
              <span className="text-xs mt-1">{item.name}</span>
            </Link>
          );
        })}
      </nav>
    </>
  );
}
