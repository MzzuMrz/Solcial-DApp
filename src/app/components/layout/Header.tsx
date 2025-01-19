'use client';

import { useState } from 'react';
import { useAppKitAccount, useAppKit } from '@reown/appkit/react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Menu, X, Bell, Copy, Check } from 'lucide-react';
import { toast } from 'react-hot-toast';

export default function Header() {
  const { status, address } = useAppKitAccount();
  const { open } = useAppKit();
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [hasCopied, setHasCopied] = useState(false);

  const userBalance = 2.5;

  const toggleMobileMenu = () => {
    setMobileMenuOpen((prev) => !prev);
  };

  const copyToClipboard = async () => {
    if (address) {
      try {
        await navigator.clipboard.writeText(address);
        setHasCopied(true);
        toast.success('Address copied to clipboard');
        setTimeout(() => setHasCopied(false), 2000);
      } catch (err) {
        toast.error('Failed to copy address');
        console.error('Failed to copy:', err);
      }
    }
  };

  return (
    <header
      className="
        fixed
        top-0
        left-0
        right-0
        z-50
        bg-black/50
        backdrop-blur-md
        shadow-md
        transition-colors
        duration-300
      "
    >
      <div className="mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-4">
          <Link
            href="/"
            className="
              text-2xl
              font-bold
              bg-gradient-to-r from-purple-600 to-pink-500
              text-transparent
              bg-clip-text
              hover:brightness-110
              transition-all
              duration-300
            "
          >
            SolScial
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center space-x-6">
            <Link
              href="/feed"
              className={`
                text-sm
                ${pathname === '/feed' ? 'text-purple-400' : 'text-gray-200 hover:text-purple-300'}
              `}
            >
              Feed
            </Link>
            <Link
              href="/profile"
              className={`
                text-sm
                ${pathname === '/profile' ? 'text-purple-400' : 'text-gray-200 hover:text-purple-300'}
              `}
            >
              Profile
            </Link>
            <Link
              href="/notifications"
              className="relative text-gray-200 hover:text-purple-300"
            >
              <Bell size={18} />
            </Link>

            {status === 'connected' && (
              <div className="text-sm text-gray-200">
                Balance: 
                <span className="ml-1 text-white font-semibold">
                  {userBalance} SOL
                </span>
              </div>
            )}

            {status === 'connected' ? (
              <div className="flex items-center space-x-4">
                <button 
                  onClick={copyToClipboard}
                  className="flex items-center space-x-2 text-sm text-gray-300 hover:text-purple-300 transition-colors"
                >
                  <span className="truncate">{address?.slice(0, 4)}...{address?.slice(-4)}</span>
                  {hasCopied ? (
                    <Check size={16} className="text-green-500" />
                  ) : (
                    <Copy size={16} />
                  )}
                </button>
                <button
                  onClick={() => open()}
                  className="
                    px-3
                    py-1
                    text-sm
                    rounded-full
                    bg-purple-600
                    text-white
                    hover:bg-purple-700
                    transition-colors
                    duration-300
                  "
                >
                  Switch Wallet
                </button>
              </div>
            ) : (
              <button
                onClick={() => open()}
                className="
                  px-4
                  py-2
                  bg-purple-600
                  text-white
                  rounded-full
                  hover:bg-purple-700
                  transition-colors
                  duration-300
                "
              >
                Connect Wallet
              </button>
            )}
          </nav>

          <button
            className="md:hidden text-gray-200 hover:text-purple-300 transition-colors duration-300"
            onClick={toggleMobileMenu}
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {mobileMenuOpen && (
          <nav className="md:hidden flex flex-col space-y-4 pb-4">
            {status === 'connected' && (
              <div className="text-sm text-gray-300">
                Balance:
                <span className="ml-1 text-white font-semibold">
                  {userBalance} SOL
                </span>
              </div>
            )}

            {status === 'connected' ? (
              <div className="flex flex-col space-y-2 mt-2">
                <button 
                  onClick={copyToClipboard}
                  className="flex items-center space-x-2 text-sm text-gray-300 hover:text-purple-300 transition-colors"
                >
                  <span className="truncate">{address}</span>
                  {hasCopied ? (
                    <Check size={16} className="text-green-500" />
                  ) : (
                    <Copy size={16} />
                  )}
                </button>
                <button
                  onClick={() => {
                    open();
                    setMobileMenuOpen(false);
                  }}
                  className="
                    px-3
                    py-1
                    text-sm
                    rounded-full
                    bg-purple-600
                    text-white
                    hover:bg-purple-700
                    transition-colors
                    duration-300
                  "
                >
                  Switch Wallet
                </button>
              </div>
            ) : (
              <button
                onClick={() => {
                  open();
                  setMobileMenuOpen(false);
                }}
                className="
                  mt-2
                  px-4
                  py-2
                  bg-purple-600
                  text-white
                  rounded-full
                  hover:bg-purple-700
                  transition-colors
                  duration-300
                "
              >
                Connect Wallet
              </button>
            )}
          </nav>
        )}
      </div>
    </header>
  );
}