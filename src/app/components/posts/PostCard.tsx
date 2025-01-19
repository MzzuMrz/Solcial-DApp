'use client';

import { useAppKitAccount, useAppKit } from '@reown/appkit/react';
import { toast } from 'react-hot-toast';
import { connection } from '@/app/lib/solana';
import { PublicKey, Transaction, SystemProgram, LAMPORTS_PER_SOL } from '@solana/web3.js';
import { Post } from '@/types/post';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import SparkleModal from '../../components/wallet/SparkleModal' 

interface PostCardProps {
  post: Post;
}

export default function PostCard({ post }: PostCardProps) {
  const { status, address } = useAppKitAccount();
  const { open } = useAppKit();
  const [loading, setLoading] = useState(false);
  const [profileLoading, setProfileLoading] = useState(false);
  const [isDonationModalOpen, setIsDonationModalOpen] = useState(false);
  const router = useRouter();

  // Mock user balance (you'd replace this with actual balance retrieval)
  const userBalance = 5.67;

  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat('en', {
      day: '2-digit',
      month: 'short',
      hour: '2-digit',
      minute: '2-digit'
    }).format(new Date(date));
  };

  const shortenWalletAddress = (walletAddress: string) => {
    return `${walletAddress.slice(0, 4)}...${walletAddress.slice(-4)}`;
  };

  const handleProfileClick = async () => {
    try {
      setProfileLoading(true);
      await new Promise(resolve => setTimeout(resolve, 300));
      router.push(`/user/${post.authorWallet}`);
    } catch (error) {
      console.error('Error navigating to profile:', error);
      toast.error('Error loading profile');
    } finally {
      setProfileLoading(false);
    }
  };

  const handleTip = async (tipAmount: number) => {
    try {
      if (status !== 'connected' || !address) {
        await open();
        return;
      }
      
      setLoading(true);
      const transaction = new Transaction().add(
        SystemProgram.transfer({
          fromPubkey: new PublicKey(address),
          toPubkey: new PublicKey(post.authorWallet),
          lamports: tipAmount * LAMPORTS_PER_SOL
        })
      );
      const { blockhash } = await connection.getLatestBlockhash();
      transaction.recentBlockhash = blockhash;
      transaction.feePayer = new PublicKey(address);
      const { signature } = await window.solana.signAndSendTransaction(transaction);
      await connection.confirmTransaction(signature);
      toast.success(`You have sent ${tipAmount} SOL to ${shortenWalletAddress(post.authorWallet)}`);
    } catch (error) {
      console.error('Error sending SOL:', error);
      toast.error('Error processing the transfer');
    } finally {
      setLoading(false);
      setIsDonationModalOpen(false);
    }
  };

  return (
    <>
      <div className="rounded-lg p-4 shadow bg-black/30 backdrop-blur-md border border-white/10">
        <div className="mb-3">
          <button 
            onClick={handleProfileClick}
            disabled={profileLoading}
            className="text-left group w-full"
          >
            <div className="flex items-center space-x-2">
              <div className="flex-grow">
                <div className="font-bold text-lg text-white-900 group-hover:text-purple-400 transition-colors">
                  {post.authorUsername}
                </div>
                <div className="text-sm text-gray-500 font-mono group-hover:text-purple-300 transition-colors">
                  {shortenWalletAddress(post.authorWallet)}
                </div>
              </div>
              {profileLoading && (
                <div className="w-5 h-5 border-t-2 border-b-2 border-purple-400 rounded-full animate-spin" />
              )}
            </div>
          </button>
        </div>
        <p className="text-white-800 mb-4">{post.content}</p>
        <div className="flex items-center justify-between text-sm text-white-500">
          <div className="flex space-x-4 items-center">
            <span>🎁 {post.tips} SOL</span>
            <button
              onClick={() => setIsDonationModalOpen(true)}
              disabled={loading}
              className="px-2 py-1 bg-purple-600 text-white rounded-md hover:bg-purple-700 disabled:opacity-50"
            >
              {loading ? 'Sending...' : 'Spark ✨'}
            </button>
          </div>
          <div>{formatDate(post.createdAt)}</div>
        </div>
      </div>

      <SparkleModal
        isOpen={isDonationModalOpen}
        onClose={() => setIsDonationModalOpen(false)}
        onConfirm={handleTip}
        userBalance={userBalance}
      />
    </>
  );
}