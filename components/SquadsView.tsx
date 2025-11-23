
import React, { useState, useRef, useEffect } from 'react';
import { SquadMember, SquadActivity } from '../types';
import { IconShield, IconAlertTriangle, IconCheck, IconMessageSquare, IconSend, IconBell, IconHeart, IconChip, IconX } from './Icons';

interface SquadsViewProps {
    squadName: string;
    potAmount: number;
    members: SquadMember[];
    activities: SquadActivity[];
    onOpenVouch: () => void;
    onSendMessage: (text: string) => void;
    onNudge: (memberId: string) => void;
    onCheer: (memberId: string) => void;
}

const SquadsView: React.FC<SquadsViewProps> = ({ 
    squadName, 
    potAmount, 
    members, 
    activities, 
    onOpenVouch, 
    onSendMessage,
    onNudge,
    onCheer
}) => {
    const [message, setMessage] = useState('');
    const [selectedMember, setSelectedMember] = useState<string | null>(null);
    const [floatingElements, setFloatingElements] = useState<{id: number, x: number, y: number, icon: React.ReactNode}[]>([]);
    const pendingCount = members.filter(m => m.status === 'pending').length;
    const scrollRef = useRef<HTMLDivElement>(null);

    // Auto-scroll chat
    useEffect(() => {
        if (scrollRef.current) {
            scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
        }
    }, [activities]);

    const getStatusColor = (status: string) => {
        switch(status) {
            case 'clean': return 'border-green-500 shadow-[0_0_15px_rgba(34,197,94,0.3)]';
            case 'sin-tax': return 'border-cyan-500 shadow-[0_0_15px_rgba(6,182,212,0.3)]';
            case 'pending': return 'border-red-500 animate-pulse shadow-[0_0_15px_rgba(239,68,68,0.3)]';
            default: return 'border-purple-800';
        }
    };

    const handleSend = () => {
        if (!message.trim()) return;
        onSendMessage(message);
        setMessage('');
    };

    const triggerReaction = (type: 'nudge' | 'cheer', memberId: string) => {
        if (type === 'nudge') onNudge(memberId);
        else onCheer(memberId);
        
        // Find member position (approximate based on index) to float emoji
        // For demo, just float from center-ish or random X
        const newId = Date.now();
        const icon = type === 'nudge' ? <IconBell className="w-6 h-6 text-yellow-400" /> : <IconHeart className="w-6 h-6 text-red-500" />;
        
        setFloatingElements(prev => [...prev, {
            id: newId,
            x: 50 + (Math.random() * 20 - 10), // Center +/- 10%
            y: 60,
            icon
        }]);

        setTimeout(() => {
            setFloatingElements(prev => prev.filter(e => e.id !== newId));
        }, 1500);

        setSelectedMember(null);
    };

    return (
        <div className="h-full flex flex-col animate-slide-up relative bg-[#130826]">
            
            {/* Action Menu Overlay */}
            {selectedMember && (
                <div className="absolute inset-0 z-40 bg-black/60 backdrop-blur-sm flex items-center justify-center animate-fade-in" onClick={() => setSelectedMember(null)}>
                    <div className="bg-[#1e1035] p-6 rounded-3xl border border-purple-600/50 shadow-2xl transform scale-100 animate-pop-in space-y-4 w-64" onClick={e => e.stopPropagation()}>
                        <div className="flex justify-between items-center mb-2">
                            <h3 className="font-bold text-white text-lg">Interact</h3>
                            <button onClick={() => setSelectedMember(null)}><IconX className="w-5 h-5 text-purple-400" /></button>
                        </div>
                        <button 
                            onClick={() => triggerReaction('nudge', selectedMember)}
                            className="w-full flex items-center justify-center space-x-3 bg-purple-900/40 hover:bg-purple-800/60 p-4 rounded-xl transition-colors group"
                        >
                            <div className="p-2 bg-yellow-500/20 rounded-full group-hover:scale-110 transition-transform">
                                <IconBell className="w-5 h-5 text-yellow-400" />
                            </div>
                            <span className="font-bold text-slate-200">Nudge</span>
                        </button>
                        <button 
                            onClick={() => triggerReaction('cheer', selectedMember)}
                            className="w-full flex items-center justify-center space-x-3 bg-purple-900/40 hover:bg-purple-800/60 p-4 rounded-xl transition-colors group"
                        >
                            <div className="p-2 bg-red-500/20 rounded-full group-hover:scale-110 transition-transform">
                                <IconHeart className="w-5 h-5 text-red-400" />
                            </div>
                            <span className="font-bold text-slate-200">Cheer</span>
                        </button>
                    </div>
                </div>
            )}

            {/* Top Header & Weekly Goal */}
            <div className="p-6 pb-2 z-10">
                <div className="flex justify-between items-end mb-4">
                    <div>
                        <h2 className="text-lg font-bold text-purple-300 uppercase tracking-widest text-xs">{squadName}</h2>
                        <h1 className="text-4xl font-extrabold text-white mt-1">₹{potAmount.toLocaleString()}</h1>
                    </div>
                    <div className="text-right">
                        <div className="text-[10px] text-purple-400 font-bold uppercase mb-1">Weekly Goal</div>
                        <div className="w-24 h-2 bg-purple-900/50 rounded-full overflow-hidden">
                            <div className="h-full bg-gradient-to-r from-green-400 to-green-500 w-[70%]"></div>
                        </div>
                        <div className="text-[10px] text-white font-bold mt-1">₹5,000</div>
                    </div>
                </div>
            </div>

            {/* The Table */}
            <div className="relative flex-1 min-h-[300px] flex items-center justify-center overflow-hidden">
                {/* Floating Animations */}
                {floatingElements.map(el => (
                    <div 
                        key={el.id} 
                        className="absolute z-50 animate-float-up pointer-events-none"
                        style={{ left: `${el.x}%`, top: `${el.y}%` }}
                    >
                        {el.icon}
                    </div>
                ))}

                {/* Table Surface */}
                <div className="absolute w-[120%] h-[80%] bg-[#1e1035] rounded-[100%] border-4 border-purple-900/50 shadow-2xl transform rotate-x-12 top-10"></div>
                
                {/* Center Pot */}
                <div className="relative z-10 w-32 h-32 rounded-full border-4 border-amber-500/20 bg-gradient-to-b from-[#2a1b42] to-[#130826] flex items-center justify-center shadow-2xl shadow-amber-900/30">
                    <div className="text-center">
                        <div className="text-xs text-amber-500 font-bold uppercase tracking-wider mb-0.5">Staked</div>
                        <div className="text-xl font-bold text-white">₹{potAmount}</div>
                    </div>
                </div>

                {/* Avatars */}
                {members.map((member, i) => {
                    const positions = [
                        'top-4 left-1/2 -translate-x-1/2', 
                        'top-1/3 right-8',
                        'bottom-24 right-16', 
                        'bottom-24 left-16', 
                        'top-1/3 left-8', 
                    ];
                    
                    if(i > 4) return null;

                    return (
                        <div 
                            key={member.id} 
                            className={`absolute ${positions[i]} z-20 flex flex-col items-center cursor-pointer group`}
                            onClick={() => setSelectedMember(member.id)}
                        >
                            {/* Chip Stack Visual */}
                            <div className="absolute -right-2 top-0 transform translate-x-1/2 -translate-y-1/2 flex flex-col items-center -space-y-3 scale-75 group-hover:scale-90 transition-transform">
                                <IconChip className="w-6 h-6 text-amber-500 drop-shadow-md" />
                                <IconChip className="w-6 h-6 text-amber-600 drop-shadow-md" />
                            </div>

                            <div className={`w-14 h-14 rounded-full bg-slate-800 border-2 flex items-center justify-center text-white font-bold text-sm relative transition-all ${getStatusColor(member.status)}`}>
                                {member.avatarInitials}
                                {member.status === 'pending' && (
                                    <div className="absolute inset-0 rounded-full animate-pulse-ring border border-red-500/50"></div>
                                )}
                                {member.status === 'clean' && (
                                    <div className="absolute -top-1 -right-1 w-5 h-5 bg-green-500 rounded-full flex items-center justify-center border-2 border-[#130826]">
                                        <IconCheck className="w-3 h-3 text-white" />
                                    </div>
                                )}
                            </div>
                            <span className="text-[10px] font-bold text-purple-200 mt-1 bg-black/40 px-2 py-0.5 rounded-full backdrop-blur-sm">
                                {member.name}
                            </span>
                        </div>
                    );
                })}
            </div>

            {/* Verify Action Button - Floating */}
            {pendingCount > 0 && (
                <div className="absolute bottom-[100px] left-0 right-0 flex justify-center z-30 px-6 pointer-events-none">
                    <button 
                        onClick={onOpenVouch}
                        className="pointer-events-auto w-full max-w-[200px] bg-gradient-to-r from-red-600 to-red-500 hover:from-red-500 hover:to-red-400 text-white font-bold py-3 rounded-2xl shadow-lg shadow-red-900/40 flex items-center justify-center space-x-2 animate-bounce-slow"
                    >
                        <IconAlertTriangle className="w-5 h-5" />
                        <span>Verify Squad ({pendingCount})</span>
                    </button>
                </div>
            )}

            {/* Chat Input & Feed */}
            <div className="bg-[#1e1035] border-t border-purple-800/50 relative z-20 flex flex-col h-[35%] max-h-[250px]">
                {/* Chat History */}
                <div className="flex-1 overflow-y-auto p-4 space-y-3 hide-scrollbar" ref={scrollRef}>
                    {activities.map(activity => (
                        <div key={activity.id} className="text-xs flex items-start space-x-3 animate-fade-in">
                            <div className="mt-1 w-5 h-5 rounded-full bg-purple-900 flex items-center justify-center text-[8px] font-bold text-purple-200 border border-purple-700">
                                {activity.memberName.substring(0,2).toUpperCase()}
                            </div>
                            <div className="flex-1">
                                {activity.type === 'chat' ? (
                                    <div className="bg-purple-800/30 rounded-r-xl rounded-bl-xl p-2 inline-block max-w-[90%]">
                                        <p className="text-white text-sm">{activity.message}</p>
                                    </div>
                                ) : (
                                    <div className="text-purple-300">
                                        <span className="font-bold text-purple-200">{activity.memberName}</span> {activity.message}
                                        {activity.amount && <span className="font-bold text-amber-400 ml-1">₹{activity.amount}</span>}
                                    </div>
                                )}
                            </div>
                        </div>
                    ))}
                </div>

                {/* Input Area */}
                <div className="p-3 bg-[#130826] flex items-center space-x-2">
                    <input 
                        type="text" 
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        onKeyPress={(e) => e.key === 'Enter' && handleSend()}
                        placeholder="Chat with squad..."
                        className="flex-1 bg-purple-900/20 border border-purple-800/50 rounded-full px-4 py-2.5 text-sm text-white focus:outline-none focus:border-purple-500 transition-colors placeholder-purple-600"
                    />
                    <button 
                        onClick={handleSend}
                        disabled={!message.trim()}
                        className="p-2.5 bg-amber-500 hover:bg-amber-400 disabled:opacity-50 disabled:bg-purple-800 text-black rounded-full transition-all active:scale-95"
                    >
                        <IconSend className="w-4 h-4" />
                    </button>
                </div>
            </div>
        </div>
    );
};

export default SquadsView;
