'use client';

import { createAppKit } from '@reown/appkit/react';
import { ConstantsUtil } from '../utils/ConstantsUtil';
import { solana } from '@reown/appkit/networks';

export const appKitConfig = createAppKit({
  projectId: ConstantsUtil.ProjectId,
  metadata: ConstantsUtil.Metadata,
  networks: ConstantsUtil.SolanaNetworks,
  defaultNetwork: solana
});