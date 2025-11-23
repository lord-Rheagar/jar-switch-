
import React from 'react';
import { Reward } from '../types';
import { IconCoin, getIconByType, IconLock } from './Icons';

interface RewardsViewProps {
    points: number;
    rewards: Reward[];
    onRedeem: (rewardId: string) => void;
}

const RewardsView: React.FC<RewardsViewProps> = ({ points, rewards, onRedeem }) => {
    return (
        <div className="p-6 h-full animate-slide-up flex flex-col">
            <div className="mb-6 flex items-end justify-between">
                <div>
                    <h2 className="text-2xl font-bold text-white">Rewards Shop</h2>
                    <p className="text-purple-300/60 text-xs mt-1">Spend your coins on exclusive items</p>
                </div>
                <div className="flex flex-col items-end">
                    <div className="flex items-center space-x-2 bg-purple-900/50 px-4 py-2 rounded-2xl border border-purple-700/50">
                        <IconCoin className="w-5 h-5 text-yellow-400" />
                        <span className="text-xl font-bold text-white">{points}</span>
                    </div>
                    <span className="text-[10px] text-purple-400 font-medium mt-1 uppercase tracking-wide">Available Balance</span>
                </div>
            </div>

            <div className="grid grid-cols-1 gap-3 overflow-y-auto hide-scrollbar pb-20">
                {rewards.map((reward) => {
                    const canAfford = points >= reward.cost;
                    
                    return (
                        <div key={reward.id} className="bg-[#1e1035] border border-purple-800/50 rounded-2xl p-4 flex items-center justify-between group hover:bg-[#251342] transition-colors">
                            <div className="flex items-center space-x-4">
                                <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${canAfford ? 'bg-amber-500/10 text-amber-400' : 'bg-purple-900/20 text-purple-700'}`}>
                                    {getIconByType(reward.iconType, "w-6 h-6")}
                                </div>
                                <div>
                                    <h3 className="font-bold text-white text-sm">{reward.title}</h3>
                                    <p className="text-[10px] text-purple-300/60">{reward.description}</p>
                                    <div className="flex items-center space-x-1 mt-1.5">
                                        <IconCoin className={`w-3 h-3 ${canAfford ? 'text-yellow-500' : 'text-purple-500'}`} />
                                        <span className={`text-xs font-bold ${canAfford ? 'text-yellow-500' : 'text-purple-500'}`}>{reward.cost}</span>
                                    </div>
                                </div>
                            </div>
                            
                            <button
                                onClick={() => onRedeem(reward.id)}
                                disabled={!canAfford}
                                className={`px-4 py-2 rounded-xl text-xs font-bold transition-all active:scale-95 ${
                                    canAfford 
                                        ? 'bg-gradient-to-r from-amber-500 to-amber-600 text-black shadow-lg shadow-amber-900/20 hover:from-amber-400 hover:to-amber-500' 
                                        : 'bg-purple-900/30 text-purple-500 cursor-not-allowed border border-purple-800/30'
                                }`}
                            >
                                {canAfford ? 'Redeem' : 'Locked'}
                            </button>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

export default RewardsView;
