'use client';

import { createAppKit } from '@reown/appkit/react';
import { SolanaAdapter } from '@reown/appkit-adapter-solana/react';
import { PhantomWalletAdapter, SolflareWalletAdapter } from '@solana/wallet-adapter-wallets';
import { solana, solanaTestnet, solanaDevnet } from '@reown/appkit/networks';

// Configura el adaptador de Solana
const solanaAdapter = new SolanaAdapter({
  wallets: [new PhantomWalletAdapter(), new SolflareWalletAdapter()]
});

// Crea la instancia de AppKit
const modal = createAppKit({
  projectId: 'TU_PROJECT_ID', // Reemplaza con tu Project ID
  metadata: {
    name: 'Mi dApp',
    description: 'Mi primera dApp con ReOwn AppKit',
    url: 'https://tu-app.com',
    icons: ['https://tu-app.com/icon.png']
  },
  networks: [solana, solanaTestnet, solanaDevnet],
  adapters: [solanaAdapter],
  defaultNetwork: solanaDevnet // O el network que prefieras por defecto
});

export function Providers({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
