import { Connection, LAMPORTS_PER_SOL, PublicKey } from '@solana/web3.js';

const SOLANA_RPC = process.env.NEXT_PUBLIC_SOLANA_RPC || 'https://api.devnet.solana.com';

export const connection = new Connection(SOLANA_RPC);

export const getBalance = async (address: string) => {
  try {
    const publicKey = new PublicKey(address);
    const balance = await connection.getBalance(publicKey);
    return balance / LAMPORTS_PER_SOL;
  } catch (error) {
    console.error('Error al obtener balance:', error);
    return 0;
  }
};