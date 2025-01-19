'use client';

import { useState } from 'react';
import { useAppKitAccount, useAppKit } from '@reown/appkit/react';
import { toast } from 'react-hot-toast';
import { connection } from '@/app/lib/solana';
import { PublicKey, Transaction, SystemProgram, LAMPORTS_PER_SOL } from '@solana/web3.js';

export default function TransferForm() {
  const { status, address } = useAppKitAccount();
  const { open } = useAppKit();
  const [recipient, setRecipient] = useState('');
  const [amount, setAmount] = useState('');
  const [loading, setLoading] = useState(false);

  const handleTransfer = async (e: React.FormEvent) => {
    e.preventDefault();
    if (status !== 'connected' || !address) {
      await open();
      return;
    }

    try {
      setLoading(true);
      // Crear la transacción
      const transaction = new Transaction().add(
        SystemProgram.transfer({
          fromPubkey: new PublicKey(address),
          toPubkey: new PublicKey(recipient),
          lamports: parseFloat(amount) * LAMPORTS_PER_SOL
        })
      );

      // Obtener el último blockhash
      const { blockhash } = await connection.getLatestBlockhash();
      transaction.recentBlockhash = blockhash;
      transaction.feePayer = new PublicKey(address);

      // Enviar la transacción
      const { signature } = await window.solana.signAndSendTransaction(transaction);
      
      // Esperar confirmación
      await connection.confirmTransaction(signature);
      
      toast.success('Transferencia exitosa');
      setRecipient('');
      setAmount('');
    } catch (error) {
      console.error('Error en transferencia:', error);
      toast.error('Error al realizar la transferencia');
    } finally {
      setLoading(false);
    }
  };

  // Si no está conectado, mostrar un mensaje o botón de conexión
  if (status !== 'connected') {
    return (
      <div className="bg-white rounded-lg shadow p-4 text-center">
        <h2 className="text-lg font-bold mb-4">Transferir SOL</h2>
        <button
          onClick={() => open()}
          className="px-4 py-2 bg-purple-600 text-white rounded-md hover:bg-purple-700"
        >
          Conectar Wallet
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleTransfer} className="bg-white rounded-lg shadow p-4">
      <h2 className="text-lg font-bold mb-4">Transferir SOL</h2>
      
      <div className="mb-4">
        <label htmlFor="recipient" className="block text-sm font-medium text-gray-700">
          Dirección del destinatario
        </label>
        <input
          id="recipient"
          type="text"
          value={recipient}
          onChange={(e) => setRecipient(e.target.value)}
          className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md"
          placeholder="Dirección de Solana"
          required
        />
      </div>

      <div className="mb-4">
        <label htmlFor="amount" className="block text-sm font-medium text-gray-700">
          Cantidad (SOL)
        </label>
        <input
          id="amount"
          type="number"
          step="0.000001"
          min="0"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md"
          placeholder="0.0"
          required
        />
      </div>

      <button
        type="submit"
        disabled={loading}
        className="w-full py-2 px-4 bg-purple-600 text-white rounded-md hover:bg-purple-700 disabled:opacity-50"
      >
        {loading ? 'Enviando...' : 'Enviar SOL'}
      </button>
    </form>
  );
}