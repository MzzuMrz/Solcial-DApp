"use client";

import Image from "next/image";
import { useState } from "react";
import { useAppKitAccount, useAppKit } from "@reown/appkit/react";
import { toast } from "react-hot-toast";
import { connection } from "@/app/lib/solana";
import {
  PublicKey,
  Transaction,
  SystemProgram,
  LAMPORTS_PER_SOL,
} from "@solana/web3.js";
import SparkleModal from "../../components/wallet/SparkleModal";

export default function ProfilePage() {
  const { status, address } = useAppKitAccount();
  const { open } = useAppKit();
  const [tipLoading, setTipLoading] = useState(false);
  const [followLoading, setFollowLoading] = useState(false);
  const [isDonationModalOpen, setIsDonationModalOpen] = useState(false);

  const userBalance = 5.67;

  const user = {
    name: "Jane Doe",
    username: "@janedoe",
    email: "janedoe@example.com",
    bio: "Developer, tech enthusiast, and cat lover. Passionate about building community projects.",
    coverImage:
      "https://images.unsplash.com/photo-1546443046-ed1ce6ffd45f?auto=format&w=1200&q=75",
    avatar:
      "https://images.unsplash.com/photo-1564869735101-c501911e60d8?auto=format&fit=crop&w=200&q=75",
    followers: 1200,
    following: 180,
    posts: 42,
    walletAddress: "F2KZ3ENPDsMzqG9S1xqTNRghzi7n5DsYxxxxxExample",
  };

  const mockPosts = [
    {
      id: 1,
      title: "My First Post",
      content:
        "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Dolores dignissimos laborum, fugit excepturi cupiditate suscipit.",
      date: "01/16/2025",
    },
    {
      id: 2,
      title: "Programming Tips",
      content:
        "Nam mollis, urna eu porta pellentesque, orci turpis vehicula elit, vel pharetra orci lectus vel orci.",
      date: "01/12/2025",
    },
    {
      id: 3,
      title: "Web Development Thoughts",
      content:
        "Curabitur et est congue, malesuada diam id, ultricies risus. Quisque rhoncus accumsan libero.",
      date: "01/05/2025",
    },
  ];

  function shortenWalletAddress(walletAddress: string) {
    return `${walletAddress.slice(0, 4)}...${walletAddress.slice(-4)}`;
  }

  async function handleTip(tipAmount: number) {
    try {
      if (status !== "connected" || !address) {
        await open();
        return;
      }

      setTipLoading(true);
      const transaction = new Transaction().add(
        SystemProgram.transfer({
          fromPubkey: new PublicKey(address),
          toPubkey: new PublicKey(user.walletAddress),
          lamports: tipAmount * LAMPORTS_PER_SOL,
        })
      );
      const { blockhash } = await connection.getLatestBlockhash();
      transaction.recentBlockhash = blockhash;
      transaction.feePayer = new PublicKey(address);
      const { signature } = await window.solana.signAndSendTransaction(
        transaction
      );
      await connection.confirmTransaction(signature);
      toast.success(
        `You have sent ${tipAmount} SOL to ${shortenWalletAddress(
          user.walletAddress
        )}`
      );
    } catch (error) {
      toast.error("Error processing the transfer");
    } finally {
      setTipLoading(false);
      setIsDonationModalOpen(false);
    }
  }

  async function handleFollow() {
    try {
      if (status !== "connected" || !address) {
        await open();
        return;
      }
      setFollowLoading(true);
      toast.success(`You are now following ${user.username}`);
    } catch {
      toast.error("Error following user");
    } finally {
      setFollowLoading(false);
    }
  }

  return (
    <div className="min-h-screen flex flex-col bg-black text-white">
      <div
        className="h-48 md:h-64 w-full bg-cover bg-center relative"
        style={{ backgroundImage: `url(${user.coverImage})` }}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-black/30 to-purple-900/40 backdrop-blur-sm" />
      </div>
      <div className="max-w-4xl mx-auto w-full p-4 md:p-8 -mt-16">
        <div className="relative bg-white/10 backdrop-blur-md rounded-lg p-4 md:p-8 border border-white/20">
          <div className="w-24 h-24 md:w-32 md:h-32 rounded-full overflow-hidden border-4 border-purple-600 absolute -top-12 md:-top-16 left-4 md:left-8">
            <Image
              src={user.avatar}
              alt="User Avatar"
              width={128}
              height={128}
              className="object-cover w-full h-full"
            />
          </div>
          <div className="mt-16 md:mt-20">
            <h1 className="text-2xl font-bold text-purple-300">{user.name}</h1>
            <p className="text-purple-400">{user.username}</p>
            <p className="text-sm text-purple-400 mt-2">
              Adress: {user.walletAddress}
            </p>
            <p className="text-sm text-purple-200 mt-2">{user.email}</p>
            <p className="mt-4 text-white/90">{user.bio}</p>
            <div className="flex items-center space-x-6 mt-4 text-white/80">
              <div className="text-center">
                <p className="font-semibold">Followers</p>
                <p className="text-xl font-bold">{user.followers}</p>
              </div>
              <div className="text-center">
                <p className="font-semibold">Following</p>
                <p className="text-xl font-bold">{user.following}</p>
              </div>
              <div className="text-center">
                <p className="font-semibold">Posts</p>
                <p className="text-xl font-bold">{user.posts}</p>
              </div>
            </div>
            <div className="flex flex-wrap items-center gap-2 mt-6">
              <button
                onClick={handleFollow}
                disabled={followLoading}
                className="px-3 py-1 bg-purple-600 text-white rounded-md hover:bg-purple-700 disabled:opacity-50"
              >
                {followLoading ? "Following..." : "Follow"}
              </button>
              <button
                onClick={() => setIsDonationModalOpen(true)}
                disabled={tipLoading}
                className="px-3 py-1 bg-purple-600 text-white rounded-md hover:bg-purple-700 disabled:opacity-50"
              >
                {tipLoading ? "Sending..." : "Spark ✨"}
              </button>
            </div>
          </div>
        </div>
        <div className="mt-8 space-y-4">
          <h2 className="text-xl font-semibold text-purple-300">
            Recent Posts
          </h2>
          {mockPosts.map((post) => (
            <div
              key={post.id}
              className="bg-white/10 backdrop-blur-md shadow rounded-lg p-4 border border-white/20"
            >
              <h3 className="text-lg font-semibold text-purple-200">
                {post.title}
              </h3>
              <p className="text-xs text-purple-400 mb-2">{post.date}</p>
              <p className="text-white/90">{post.content}</p>
            </div>
          ))}
        </div>
      </div>
      <SparkleModal
        isOpen={isDonationModalOpen}
        onClose={() => setIsDonationModalOpen(false)}
        onConfirm={handleTip}
        userBalance={userBalance}
      />
    </div>
  );
}
