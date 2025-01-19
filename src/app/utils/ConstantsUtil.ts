import type { CaipNetwork, SocialProvider } from '@reown/appkit';
import type { Wallet } from '@reown/appkit-wallet-button';
import { solana, solanaDevnet } from '@reown/appkit/networks';
import type { AppKitNetwork } from '@reown/appkit/networks';

const projectId = process.env.NEXT_PUBLIC_PROJECT_ID;
if (!projectId) {
  throw new Error('NEXT_PUBLIC_PROJECT_ID is not set');
}

function getPublicUrl() {
  const publicUrl = process.env.NEXT_PUBLIC_PUBLIC_URL;
  if (publicUrl) {
    return publicUrl;
  }

  const vercelUrl = process.env.NEXT_PUBLIC_VERCEL_URL;
  if (vercelUrl) {
    return `https://${vercelUrl}`;
  }

  return 'http://localhost:3000';
}

const SolanaNetworks = [solana, solanaDevnet] as [AppKitNetwork, ...AppKitNetwork[]];

export const ConstantsUtil = {
  Metadata: {
    name: 'SolScial',
    description: 'Decentralized social network on Solana',
    url: getPublicUrl(),
    icons: [`${getPublicUrl()}/logo.png`],
  },
  ProjectId: projectId,
  SolanaNetworks,
  AllNetworks: SolanaNetworks,
  SolanaWalletButtons: [
    'phantom',
    'solflare',
    'backpack',
  ] as Wallet[],
  Socials: [
    'google',
    'x',
  ] as SocialProvider[]
}