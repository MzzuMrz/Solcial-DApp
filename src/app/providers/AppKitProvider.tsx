'use client';

import { createAppKit } from '@reown/appkit/react';
import { SolanaAdapter } from '@reown/appkit-adapter-solana/react';
import { PhantomWalletAdapter, SolflareWalletAdapter } from '@solana/wallet-adapter-wallets';
import { solana, solanaDevnet } from '@reown/appkit/networks';

const solanaAdapter = new SolanaAdapter({
  wallets: [new PhantomWalletAdapter(), new SolflareWalletAdapter()]
});

export const modal = createAppKit({
  projectId: process.env.NEXT_PUBLIC_PROJECT_ID!, 
  metadata: {
    name: 'Social Crypto App',
    description: 'Social media con funcionalidades crypto',
    url: 'https://tu-app.com',
    icons: ['https://tu-app.com/icon.png']
  },
  networks: [solana, solanaDevnet],
  adapters: [solanaAdapter],
  defaultNetwork: solanaDevnet
});