import { create } from 'zustand';
import { getBalance } from '@/app/lib/solana';
import { toast } from 'react-hot-toast';

interface WalletState {
  balance: number;
  loading: boolean;
  error: string | null;
  fetchBalance: (address: string) => Promise<void>;
}

export const useWallet = create<WalletState>((set) => ({
  balance: 0,
  loading: false,
  error: null,
  fetchBalance: async (address: string) => {
    set({ loading: true });
    try {
      if (!address) throw new Error('No hay dirección de wallet');
      
      const balance = await getBalance(address);
      set({ balance, loading: false, error: null });
    } catch (error) {
      set({ error: 'Error al obtener balance', loading: false });
      toast.error('Error al obtener el balance');
    }
  }
}));