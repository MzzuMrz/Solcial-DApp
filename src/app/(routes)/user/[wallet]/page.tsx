'use client';

import Image from 'next/image';
import { useState } from 'react';
import { useAppKitAccount, useAppKit } from '@reown/appkit/react';
import { toast } from 'react-hot-toast';
import { connection } from '@/app/lib/solana';
import { PublicKey, Transaction, SystemProgram, LAMPORTS_PER_SOL } from '@solana/web3.js';
import { User, ArrowLeft } from 'lucide-react';
import { use } from 'react';

import { useRouter } from 'next/navigation';

export default function UserProfilePage({ params }: { params: Promise<{ wallet: string }> }) {
  const { wallet } = use(params);
  const { status, address } = useAppKitAccount();
  const { open } = useAppKit();
  const router = useRouter();

  const [tipLoading, setTipLoading] = useState(false);
  const [followLoading, setFollowLoading] = useState(false);

  // Mock user data
  const mockUser = {
    username: '@cryptoartist',
    bio: 'Digital artist exploring the intersection of art and blockchain technology',
    avatar: null,
    coverImage: null,
    followers: 842,
    following: 156,
    totalTips: 15.5,
    posts: [
      {
        id: 1,
        content: 'Just minted my latest NFT collection on Solana! 🎨',
        createdAt: new Date('2025-01-15'),
        tips: 2.5
      },
      {
        id: 2,
        content: 'The future of digital art is decentralized. Excited to be part of this revolution!',
        createdAt: new Date('2025-01-14'),
        tips: 1.8
      },
      {
        id: 3,
        content: 'Working on something special. Stay tuned! ✨',
        createdAt: new Date('2025-01-13'),
        tips: 1.2
      }
    ]
  };

  const handleTip = async () => {
    try {
      if (status !== 'connected' || !address) {
        await open();
        return;
      }
      const inputAmount = prompt('How many SOL would you like to send?');
      if (!inputAmount) return;
      const tipAmount = parseFloat(inputAmount);
      if (isNaN(tipAmount) || tipAmount <= 0) {
        toast.error('Invalid amount', { duration: 5000 });
        return;
      }
      setTipLoading(true);
      const transaction = new Transaction().add(
        SystemProgram.transfer({
          fromPubkey: new PublicKey(address),
          toPubkey: new PublicKey(wallet),
          lamports: tipAmount * LAMPORTS_PER_SOL,
        })
      );
      const { blockhash } = await connection.getLatestBlockhash();
      transaction.recentBlockhash = blockhash;
      transaction.feePayer = new PublicKey(address);
      const { signature } = await window.solana.signAndSendTransaction(transaction);
      await connection.confirmTransaction(signature);
      toast.success(`You have sent ${tipAmount} SOL to ${mockUser.username}`, {
        duration: 5000
      });
    } catch (error) {
      toast.error('Error processing the transfer', { duration: 5000 });
    } finally {
      setTipLoading(false);
    }
  };

  const handleFollow = async () => {
    try {
      if (status !== 'connected' || !address) {
        await open();
        return;
      }
      setFollowLoading(true);
      await new Promise(resolve => setTimeout(resolve, 1000));
      toast.success(`You are now following ${mockUser.username}`, {
        duration: 5000
      });
    } catch {
      toast.error('Error following user', { duration: 5000 });
    } finally {
      setFollowLoading(false);
    }
  };

  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat('en', {
      day: '2-digit',
      month: 'short',
      hour: '2-digit',
      minute: '2-digit'
    }).format(date);
  };

  return (
    <div className="min-h-screen flex flex-col bg-black text-white">
         <button
        onClick={() => router.push('/feed')}
        className="fixed top-4 left-4 z-10 px-4 py-2 bg-black/50 backdrop-blur-md text-white rounded-lg 
                 hover:bg-black/70 transition-all duration-300 flex items-center gap-2 border border-white/10"
      >
        <ArrowLeft className="w-4 h-4" />
        <span>Back to Feed</span>
      </button>
      <div className="h-48 md:h-64 w-full bg-gradient-to-br from-purple-900 to-black relative">
        <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" />
      </div>
      
      <div className="max-w-4xl mx-auto w-full p-4 md:p-8 -mt-16">
        <div className="relative bg-white/10 backdrop-blur-md rounded-lg p-4 md:p-8 border border-white/20">
          <div className="w-24 h-24 md:w-32 md:h-32 rounded-full overflow-hidden border-4 border-purple-600 absolute -top-12 md:-top-16 left-4 md:left-8 bg-purple-900/50">
            <User className="w-full h-full p-4 text-purple-300" />
          </div>
          
          <div className="mt-16 md:mt-20">
            <div className="flex justify-between items-start">
              <div>
                <h1 className="text-2xl font-bold text-purple-300">{mockUser.username}</h1>
                <p className="text-sm text-purple-400 mt-1">{wallet}</p>
              </div>
              <div className="flex gap-2">
                <button
                  onClick={handleFollow}
                  disabled={followLoading}
                  className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 disabled:opacity-50 transition-all duration-300"
                >
                  {followLoading ? 'Following...' : 'Follow'}
                </button>
                <button
                  onClick={handleTip}
                  disabled={tipLoading}
                  className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 disabled:opacity-50 transition-all duration-300"
                >
                  {tipLoading ? 'Sending...' : 'Spark It! ✨'}
                </button>
              </div>
            </div>
            
            <p className="mt-4 text-white/90">{mockUser.bio}</p>
            
            <div className="flex items-center space-x-6 mt-4 text-white/80">
              <div className="text-center">
                <p className="font-semibold">Followers</p>
                <p className="text-xl font-bold">{mockUser.followers}</p>
              </div>
              <div className="text-center">
                <p className="font-semibold">Following</p>
                <p className="text-xl font-bold">{mockUser.following}</p>
              </div>
              <div className="text-center">
                <p className="font-semibold">Total Tips</p>
                <p className="text-xl font-bold">{mockUser.totalTips} SOL</p>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-8 space-y-4">
          <h2 className="text-xl font-semibold text-purple-300">Recent Posts</h2>
          {mockUser.posts.map((post) => (
            <div
              key={post.id}
              className="bg-white/10 backdrop-blur-md shadow rounded-lg p-4 border border-white/20"
            >
              <p className="text-white/90 mb-2">{post.content}</p>
              <div className="flex justify-between items-center text-sm text-white/60">
                <span>🎁 {post.tips} SOL</span>
                <span>{formatDate(post.createdAt)}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}