'use client';

import { useState } from 'react';
import { X } from 'lucide-react';

interface SolDonationModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: (amount: number) => void;
  userBalance: number;
}

export default function SolDonationModal({ 
  isOpen, 
  onClose, 
  onConfirm, 
  userBalance 
}: SolDonationModalProps) {
  const [selectedAmount, setSelectedAmount] = useState<number | null>(null);
  const [customAmount, setCustomAmount] = useState<string>('');
  const [error, setError] = useState<string | null>(null);

  const predefinedAmounts = [0.5, 1, 2];

  const handleAmountSelect = (amount: number) => {
    setSelectedAmount(amount);
    setCustomAmount('');
    setError(null);
  };

  const handleCustomAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setCustomAmount(value);
    setSelectedAmount(null);
    setError(null);
  };

  const handleConfirm = () => {
    let finalAmount: number;

    // Determine the amount to donate
    if (selectedAmount !== null) {
      finalAmount = selectedAmount;
    } else {
      const parsedCustomAmount = parseFloat(customAmount);
      
      // Validate custom amount
      if (isNaN(parsedCustomAmount) || parsedCustomAmount <= 0) {
        setError('Please enter a valid amount');
        return;
      }

      if (parsedCustomAmount > userBalance) {
        setError('Insufficient balance');
        return;
      }

      finalAmount = parsedCustomAmount;
    }

    // Confirm donation
    onConfirm(finalAmount);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-black/30 backdrop-blur-md border border-white/10 rounded-xl w-full max-w-md">
        <div className="flex justify-between items-center p-4 border-b border-white/10">
          <h2 className="text-xl font-semibold text-purple-300">Spark ✨</h2>
          <button 
            onClick={onClose}
            className="text-white hover:text-purple-400 transition-colors"
          >
            <X className="w-6 h-6" />
          </button>
        </div>
        
        <div className="p-4 space-y-4">
          <div className="flex justify-between items-center">
            <span className="text-white/80">Your Balance:</span>
            <span className="text-purple-300 font-semibold">{userBalance.toFixed(2)} SOL</span>
          </div>

          <div className="space-y-2">
            <label className="text-white/80 block">Select Amount (SOL)</label>
            <div className="flex space-x-2">
              {predefinedAmounts.map((amount) => (
                <button
                  key={amount}
                  onClick={() => handleAmountSelect(amount)}
                  className={`
                    px-4 py-2 rounded-md transition-all duration-300
                    ${
                      selectedAmount === amount
                        ? 'bg-purple-600 text-white'
                        : 'bg-white/10 text-white/80 hover:bg-white/20'
                    }
                  `}
                >
                  {amount}
                </button>
              ))}
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-white/80 block">Custom Amount</label>
            <input 
              type="number"
              value={customAmount}
              onChange={handleCustomAmountChange}
              placeholder="Enter custom amount"
              className="
                w-full 
                bg-white/10 
                text-white 
                rounded-md 
                px-3 
                py-2 
                border 
                border-white/20 
                focus:outline-none 
                focus:ring-2 
                focus:ring-purple-500
              "
            />
          </div>

          {error && (
            <div className="text-red-400 text-sm">
              {error}
            </div>
          )}

          <button
            onClick={handleConfirm}
            disabled={!selectedAmount && !customAmount}
            className="
              w-full 
              bg-purple-600 
              text-white 
              rounded-md 
              py-3 
              font-semibold 
              hover:bg-purple-700 
              transition-colors
              disabled:opacity-50
              disabled:cursor-not-allowed
            "
          >
            Confirm Spark
          </button>
        </div>
      </div>
    </div>
  );
}