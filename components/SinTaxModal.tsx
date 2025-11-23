
import React, { useState } from 'react';
import { IconX, IconShield, IconAlertTriangle } from './Icons';
import { Vice } from '../types';

interface SinTaxModalProps {
    isOpen: boolean;
    onClose: () => void;
    vices: Vice[];
    onConfirm: (amount: number, viceName: string) => void;
}

const SinTaxModal: React.FC<SinTaxModalProps> = ({ isOpen, onClose, vices, onConfirm }) => {
    const [amount, setAmount] = useState<string>('');
    const [selectedViceId, setSelectedViceId] = useState<number | null>(null);

    if (!isOpen) return null;

    const handleViceClick = (vice: Vice) => {
        setSelectedViceId(vice.id);
        setAmount(vice.cost.toString());
    };

    const handleConfirm = () => {
        const val = parseFloat(amount);
        if (val > 0) {
            const selectedVice = vices.find(v => v.id === selectedViceId);
            onConfirm(val, selectedVice ? selectedVice.name : 'Custom Slip-up');
            setAmount('');
            setSelectedViceId(null);
        }
    };

    return (
        <div className="absolute inset-0 z-50 flex items-end sm:items-center justify-center bg-[#0a0512]/90 backdrop-blur-md animate-fade-in">
            <div className="w-full max-w-[340px] mb-20 sm:mb-0 bg-white/5 backdrop-blur-xl border border-white/10 p-6 rounded-3xl shadow-2xl animate-pop-in relative">
                <button 
                    onClick={onClose}
                    className="absolute top-4 right-4 p-1 bg-white/10 rounded-full text-slate-400 hover:text-white transition-colors"
                >
                    <IconX className="w-4 h-4" />
                </button>

                <div className="text-center mb-6">
                    <div className="w-12 h-12 bg-cyan-500/10 rounded-full flex items-center justify-center mx-auto mb-3 text-cyan-400 border border-cyan-500/20">
                        <IconShield className="w-6 h-6" />
                    </div>
                    <h3 className="text-xl font-bold text-white">Balance the Scales</h3>
                    <p className="text-slate-400 text-xs mt-1">Invest the cost of your vice to protect your streak.</p>
                </div>

                <div className="space-y-4">
                    <div className="grid grid-cols-2 gap-2">
                        {vices.map(vice => (
                            <button
                                key={vice.id}
                                onClick={() => handleViceClick(vice)}
                                className={`p-3 rounded-xl border text-left transition-all active:scale-95 ${
                                    selectedViceId === vice.id 
                                        ? 'bg-cyan-500/20 border-cyan-500/50 text-white' 
                                        : 'bg-white/5 border-white/5 text-slate-400 hover:bg-white/10'
                                }`}
                            >
                                <p className="font-bold text-sm truncate">{vice.name}</p>
                                <p className="text-xs opacity-60">₹{vice.cost}</p>
                            </button>
                        ))}
                    </div>

                    <div className="relative mt-2">
                         <span className="absolute left-4 top-1/2 -translate-y-1/2 text-cyan-400 text-lg font-light">₹</span>
                         <input 
                             type="number" 
                             value={amount}
                             onChange={(e) => setAmount(e.target.value)}
                             className="w-full bg-[#0a0512]/50 border border-white/10 focus:border-cyan-400 rounded-xl p-3 pl-8 text-white placeholder-slate-600 focus:outline-none transition-colors"
                             placeholder="Other amount"
                         />
                    </div>

                    <button 
                        onClick={handleConfirm}
                        disabled={!amount || parseFloat(amount) <= 0}
                        className="w-full bg-cyan-500 hover:bg-cyan-400 disabled:opacity-50 disabled:cursor-not-allowed text-black font-bold py-3.5 rounded-xl mt-2 transition-all active:scale-95 shadow-lg shadow-cyan-900/20"
                    >
                        Pay Tax & Freeze Streak
                    </button>
                </div>
            </div>
        </div>
    );
};

export default SinTaxModal;