"use client";

import { useAppKitAccount, useAppKit } from "@reown/appkit/react";
import { useEffect, useState } from "react";
import Header from "@/app/components/layout/Header";
import Sidebar from "@/app/components/layout/Sidebar";
import * as AppKitWalletButton from "@reown/appkit-wallet-button/react";

function ClientLayout({ children }: { children: React.ReactNode }) {
  const { status } = useAppKitAccount();
  const { open } = useAppKit();
  const [isLoading, setIsLoading] = useState(true);
  const [pendingProvider, setPendingProvider] = useState<string | null>(null);

  const { isReady, isPending, connect } = AppKitWalletButton.useAppKitWallet({
    onSuccess() {
      console.log("Connection successful");
      setPendingProvider(null);
    },
    onError(error) {
      console.error("Login error:", error);
      console.log("Detailed error:", JSON.stringify(error));
      setPendingProvider(null);
    },
  });

  useEffect(() => {
    setIsLoading(false);
  }, [status]);

  useEffect(() => {
    console.log("AppKit Status:", { isReady, isPending });
  }, [isReady, isPending]);

  if (isLoading) {
    return <div className="min-h-screen bg-black" />;
  }

  if (0) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center p-4">
        <div className="text-center space-y-6">
          <h1 className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-purple-400 to-pink-600 text-transparent bg-clip-text">
            Welcome to SolScial
          </h1>
          <p className="text-lg text-purple-300 max-w-2xl mx-auto">
            Connect your wallet or sign in with your social account
          </p>
          <div className="flex flex-col gap-4 items-center">
            <button
              onClick={() => open()}
              className="
    px-4
    py-3
    bg-purple-600
    text-white
    rounded-xl
    font-semibold
    hover:bg-purple-700
    transition-all
    duration-300
    hover:scale-105
    shadow-lg
    flex
    items-center
    gap-2
    border-2 border-black
  "
            >
              Connect Wallet
            </button>

            <div className="flex flex-col gap-4">
              <button
                onClick={() => {
                  setPendingProvider("google");
                  connect("google");
                }}
                disabled={isPending}
                className="
                  px-6
                  py-3
                  bg-black
                  text-gray-800
                  rounded-xl
                  font-semibold
                  hover:bg-gray-100
                  transition-all
                  duration-300
                  hover:scale-105
                  shadow-lg
                  flex
                  items-center
                  gap-2
                  disabled:opacity-50
                  disabled:cursor-not-allowed
                  border-2 border-purple-600
                "
              >
                {isPending && pendingProvider === "google" ? (
                  <div className="w-5 h-5 border-t-2 border-b-2 border-gray-800 rounded-full animate-spin" />
                ) : (
                  <>
                    <svg className="w-5 h-5" viewBox="0 0 24 24">
                      <path
                        fill="currentColor"
                        d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                      />
                      <path
                        fill="currentColor"
                        d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                      />
                      <path
                        fill="currentColor"
                        d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                      />
                      <path
                        fill="currentColor"
                        d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                      />
                    </svg>
                    Sign in with Google
                  </>
                )}
              </button>

              <button
                onClick={() => {
                  setPendingProvider("x");
                  connect("x");
                }}
                disabled={isPending}
                className="
                  px-6
                  py-3
                  bg-black
                  text-white
                  rounded-xl
                  font-semibold
                  hover:bg-gray-900
                  transition-all
                  duration-300
                  hover:scale-105
                  shadow-lg
                  flex
                  items-center
                  gap-2
                  disabled:opacity-50
                  disabled:cursor-not-allowed
                  border-2 border-purple-600
                "
              >
                {isPending && pendingProvider === "x" ? (
                  <div className="w-5 h-5 border-t-2 border-b-2 border-white rounded-full animate-spin" />
                ) : (
                  <>
                    <svg className="w-5 h-5" viewBox="0 0 24 24">
                      <path
                        fill="currentColor"
                        d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"
                      />
                    </svg>
                    Sign in with X
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <>
      <Header />
      <div className="pt-16 min-h-screen flex flex-col lg:flex-row">
        <Sidebar />
        <main className="flex-1 p-4 lg:ml-64 lg:mr-80 z-0 relative ">
          {children}
        </main>
      </div>
    </>
  );
}

export default ClientLayout;
