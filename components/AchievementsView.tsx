import React from 'react';
import { Achievement } from '../types';
import { getIconByType, IconLock } from './Icons';

interface AchievementsViewProps {
    achievements: Achievement[];
}

const AchievementsView: React.FC<AchievementsViewProps> = ({ achievements }) => {
    const unlockedCount = achievements.filter(a => a.isUnlocked).length;
    const progress = (unlockedCount / achievements.length) * 100;

    return (
        <div className="p-6 h-full animate-slide-up flex flex-col">
            <div className="mb-6">
                <h2 className="text-2xl font-bold text-white mb-2">Achievements</h2>
                <div className="flex items-center space-x-3">
                    <div className="flex-1 bg-purple-900/50 h-2 rounded-full overflow-hidden">
                        <div className="bg-amber-500 h-full transition-all duration-1000" style={{width: `${progress}%`}}></div>
                    </div>
                    <span className="text-xs text-amber-400 font-bold">{unlockedCount}/{achievements.length}</span>
                </div>
            </div>

            <div className="grid grid-cols-2 gap-3 overflow-y-auto hide-scrollbar pb-20">
                {achievements.map((achievement) => (
                    <div 
                        key={achievement.id} 
                        className={`rounded-2xl p-4 border transition-all duration-300 flex flex-col items-center text-center space-y-3 ${
                            achievement.isUnlocked 
                                ? 'bg-gradient-to-b from-[#2a1b42] to-[#1e1035] border-amber-500/30 shadow-[0_4px_20px_-5px_rgba(245,158,11,0.15)]' 
                                : 'bg-[#130826] border-purple-900/30 opacity-70'
                        }`}
                    >
                        <div className={`w-14 h-14 rounded-full flex items-center justify-center relative ${
                            achievement.isUnlocked ? 'bg-amber-500/20 text-amber-400' : 'bg-purple-900/30 text-purple-700'
                        }`}>
                            {achievement.isUnlocked ? getIconByType(achievement.iconType, "w-7 h-7") : <IconLock className="w-6 h-6" />}
                            {achievement.isUnlocked && (
                                <div className="absolute inset-0 bg-amber-400/20 rounded-full blur-md animate-pulse"></div>
                            )}
                        </div>
                        <div>
                            <h3 className={`font-bold text-sm mb-1 ${achievement.isUnlocked ? 'text-white' : 'text-purple-400/50'}`}>
                                {achievement.title}
                            </h3>
                            <p className="text-[10px] text-purple-300/60 leading-tight">{achievement.description}</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default AchievementsView;