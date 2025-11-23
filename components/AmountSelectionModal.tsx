import React, { useState, useEffect } from 'react';
import { IconX, IconWallet } from './Icons';
import { Vice } from '../types';

interface AmountSelectionModalProps {
    isOpen: boolean;
    onClose: () => void;
    onConfirm: (amount: number) => void;
    vice: Vice | null;
}

const PRESET_AMOUNTS = [15, 20, 50, 100, 200, 500];

const AmountSelectionModal: React.FC<AmountSelectionModalProps> = ({ isOpen, onClose, onConfirm, vice }) => {
    const [amount, setAmount] = useState<string>('');

    // Set default cost when opening for a specific vice
    useEffect(() => {
        if (isOpen && vice) {
            setAmount(vice.cost.toString());
        }
    }, [isOpen, vice]);

    if (!isOpen || !vice) return null;

    const handleConfirm = () => {
        const val = parseFloat(amount);
        if (val > 0) {
            onConfirm(val);
            setAmount('');
        }
    };

    return (
        <div className="absolute inset-0 z-50 flex items-end sm:items-center justify-center bg-[#0a0512]/90 backdrop-blur-sm animate-fade-in">
            <div className="w-full max-w-[340px] mb-20 sm:mb-0 bg-[#1e1035] border border-purple-800 p-6 rounded-3xl shadow-2xl animate-pop-in relative shadow-purple-900/20">
                <button 
                    onClick={onClose}
                    className="absolute top-4 right-4 p-1 bg-purple-900/50 rounded-full text-purple-300 hover:text-white transition-colors"
                >
                    <IconX className="w-4 h-4" />
                </button>

                <div className="text-center mb-6">
                    <h3 className="text-lg text-purple-300 font-medium">Switching from</h3>
                    <h2 className="text-2xl font-bold text-white mt-1">{vice.name}</h2>
                </div>

                <div className="space-y-6">
                    {/* Large Input Field */}
                    <div className="relative">
                        <span className="absolute left-4 top-1/2 -translate-y-1/2 text-purple-400 text-2xl font-light">₹</span>
                        <input 
                            type="number" 
                            value={amount}
                            onChange={(e) => setAmount(e.target.value)}
                            className="w-full bg-[#130826] border-b-2 border-amber-400/50 focus:border-amber-400 rounded-xl p-4 pl-10 text-4xl text-white font-bold placeholder-purple-800 focus:outline-none transition-colors text-center"
                            placeholder="0"
                            autoFocus
                        />
                    </div>

                    {/* Preset Buttons Grid */}
                    <div className="grid grid-cols-3 gap-3">
                        {PRESET_AMOUNTS.map((val) => (
                            <button
                                key={val}
                                onClick={() => setAmount(val.toString())}
                                className="py-2 px-1 rounded-lg bg-purple-900/30 border border-purple-700/30 text-purple-300 hover:bg-amber-400 hover:text-black hover:border-amber-400 transition-all font-medium text-sm active:scale-95"
                            >
                                ₹{val}
                            </button>
                        ))}
                    </div>

                    {/* Confirm Button */}
                    <button 
                        onClick={handleConfirm}
                        disabled={!amount || parseFloat(amount) <= 0}
                        className="w-full bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 disabled:opacity-50 disabled:cursor-not-allowed text-black font-bold py-4 rounded-xl shadow-lg shadow-amber-900/20 active:scale-95 transition-all flex items-center justify-center space-x-2"
                    >
                        <IconWallet className="w-5 h-5" />
                        <span>Switch to Savings</span>
                    </button>
                </div>
            </div>
        </div>
    );
};

export default AmountSelectionModal;