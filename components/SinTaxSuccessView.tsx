
import React from 'react';
import { IconShield, IconCoin, IconCheck } from './Icons';

interface SinTaxSuccessViewProps {
    amount: number;
}

const SinTaxSuccessView: React.FC<SinTaxSuccessViewProps> = ({ amount }) => {
    return (
        <div className="absolute inset-0 flex flex-col items-center justify-center bg-gradient-to-br from-cyan-900 to-blue-900 z-40 animate-pop-in overflow-hidden">
            <div className="absolute inset-0 opacity-20 bg-[url('https://www.transparenttextures.com/patterns/stardust.png')] animate-spin-slow"></div>
            
            <div className="text-center space-y-6 relative z-10 p-6">
                <div className="relative w-28 h-28 mx-auto">
                    <div className="absolute inset-0 bg-cyan-500/30 rounded-full blur-xl animate-pulse"></div>
                    <div className="w-28 h-28 bg-gradient-to-br from-cyan-400 to-blue-600 rounded-full flex items-center justify-center shadow-2xl relative z-10 border-4 border-white/10">
                        <IconShield className="w-14 h-14 text-white" />
                        <div className="absolute bottom-0 right-0 bg-green-500 rounded-full p-1.5 border-4 border-blue-900">
                             <IconCheck className="w-4 h-4 text-white" />
                        </div>
                    </div>
                </div>

                <div className="space-y-2">
                    <h2 className="text-3xl font-bold text-white drop-shadow-md">Streak Frozen</h2>
                    <p className="text-cyan-100 font-medium text-lg leading-relaxed max-w-[280px] mx-auto">
                        Guilt converted to Gold.<br/>
                        <span className="text-white font-bold block mt-1">₹{amount} Saved.</span>
                    </p>
                </div>
                
                <div className="inline-flex items-center space-x-2 bg-white/10 backdrop-blur-md px-5 py-2.5 rounded-full border border-white/20">
                     <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse"></span>
                     <span className="text-cyan-100 text-xs font-semibold tracking-wide uppercase">You're still in the game</span>
                </div>
            </div>
        </div>
    );
};

export default SinTaxSuccessView;
