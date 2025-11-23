import React, { useState, useEffect } from 'react';
import { Vice, UserState, ViewType, Goal, Achievement, Reward, Transaction, SquadMember, SquadActivity } from './types';
import { IconAward, IconWallet, IconTarget, IconTrophy, IconGift, IconCoin, IconShield, IconUsers } from './components/Icons';
import HomeView from './components/HomeView';
import SuccessView from './components/SuccessView';
import StatsView from './components/StatsView';
import AddViceModal from './components/AddViceModal';
import AddGoalModal from './components/AddGoalModal';
import GoalsView from './components/GoalsView';
import AchievementsView from './components/AchievementsView';
import RewardsView from './components/RewardsView';
import AmountSelectionModal from './components/AmountSelectionModal';
import SinTaxModal from './components/SinTaxModal';
import SinTaxSuccessView from './components/SinTaxSuccessView';
import SquadsView from './components/SquadsView';
import VouchModal from './components/VouchModal';
import RewardRedemptionModal from './components/RewardRedemptionModal';

const INITIAL_VICES: Vice[] = [
    { id: 1, name: "Coffee", cost: 250, iconType: 'coffee', color: "text-amber-400", bg: "bg-amber-400/10" },
    { id: 2, name: "Cigarette", cost: 18, iconType: 'cigarette', color: "text-purple-300", bg: "bg-purple-300/10" },
    { id: 3, name: "Fast Food", cost: 450, iconType: 'food', color: "text-red-400", bg: "bg-red-400/10" },
];

const INITIAL_ACHIEVEMENTS: Achievement[] = [
    { id: 'streak-7', title: 'Solid Week', description: 'Resist habits for 7 consecutive days', iconType: 'flame', isUnlocked: false },
    { id: 'save-10k', title: 'High Roller', description: 'Save a total of ₹10,000', iconType: 'star', isUnlocked: false },
    { id: 'gold-1g', title: 'Golden Touch', description: 'Accumulate 1 gram of gold', iconType: 'trophy', isUnlocked: false },
    { id: 'custom-3', title: 'Self Aware', description: 'Add 3 custom habits', iconType: 'target', isUnlocked: false },
];

const INITIAL_REWARDS: Reward[] = [
    { id: '1', title: 'Golden Wallpaper', cost: 50, type: 'digital', iconType: 'gift', description: 'Exclusive background for your app' },
    { id: '2', title: 'Discount Voucher', cost: 250, type: 'voucher', iconType: 'ticket', description: '₹50 off on next purchase' },
    { id: '3', title: 'Premium Badge', cost: 500, type: 'digital', iconType: 'crown', description: 'Show off your status' },
    { id: '4', title: 'Charity Donation', cost: 100, type: 'charity', iconType: 'gift', description: 'Donate ₹10 to a cause' },
];

const INITIAL_SQUAD_MEMBERS: SquadMember[] = [
    { id: '2', name: 'Arjun', avatarInitials: 'AJ', status: 'pending', stakedAmount: 500 },
    { id: '3', name: 'Priya', avatarInitials: 'PS', status: 'sin-tax', stakedAmount: 250 }, // Reduced stake due to sin tax
    { id: '4', name: 'Rohan', avatarInitials: 'RD', status: 'clean', stakedAmount: 500 },
];

const INITIAL_SQUAD_ACTIVITIES: SquadActivity[] = [
    { id: 1, memberId: '3', memberName: 'Priya', type: 'sin_tax', message: 'paid Sin Tax. She owns her slip-up.', timestamp: '2h ago', amount: 250 },
    { id: 2, memberId: '4', memberName: 'Rohan', type: 'vouch_pass', message: 'was verified clean by the squad.', timestamp: '1d ago' },
];

const App: React.FC = () => {
    // --- STATE ---
    const [userState, setUserState] = useState<UserState>({
        lifetimeBalance: 2450.00,
        availableBalance: 450.00, // Starting available for demo
        goldGrams: 0.452,
        streak: 12,
        lastSaved: 0,
        points: 120 // Starting points for demo
    });
    
    const [vices, setVices] = useState<Vice[]>(INITIAL_VICES);
    const [goals, setGoals] = useState<Goal[]>([]);
    const [achievements, setAchievements] = useState<Achievement[]>(INITIAL_ACHIEVEMENTS);
    const [rewards, setRewards] = useState<Reward[]>(INITIAL_REWARDS);
    const [transactions, setTransactions] = useState<Transaction[]>([
        { id: 171501, amount: 250, date: new Date(Date.now() - 86400000).toISOString(), viceName: 'Coffee', type: 'switch' },
        { id: 171502, amount: 450, date: new Date(Date.now() - 172800000).toISOString(), viceName: 'Fast Food', type: 'switch' },
    ]);
    
    // Squad State
    const [squadMembers, setSquadMembers] = useState<SquadMember[]>(INITIAL_SQUAD_MEMBERS);
    const [squadActivities, setSquadActivities] = useState<SquadActivity[]>(INITIAL_SQUAD_ACTIVITIES);
    
    const [activeView, setActiveView] = useState<ViewType>('home');
    
    // Modal States
    const [isAddViceModalOpen, setIsAddViceModalOpen] = useState(false);
    const [isAddGoalModalOpen, setIsAddGoalModalOpen] = useState(false);
    const [isAmountModalOpen, setIsAmountModalOpen] = useState(false);
    const [isSinTaxModalOpen, setIsSinTaxModalOpen] = useState(false);
    const [isVouchModalOpen, setIsVouchModalOpen] = useState(false);
    const [selectedVice, setSelectedVice] = useState<Vice | null>(null);
    const [redeemedReward, setRedeemedReward] = useState<Reward | null>(null);

    // --- EFFECT: Check Achievements ---
    useEffect(() => {
        const checkAchievements = () => {
            const updated = achievements.map(ach => {
                if (ach.isUnlocked) return ach;
                
                let unlocked = false;
                switch (ach.id) {
                    case 'streak-7': unlocked = userState.streak >= 7; break;
                    case 'save-10k': unlocked = userState.lifetimeBalance >= 10000; break;
                    case 'gold-1g': unlocked = userState.goldGrams >= 1; break;
                    case 'custom-3': unlocked = (vices.length - INITIAL_VICES.length) >= 3; break;
                    default: break;
                }
                
                if (unlocked) {
                    // Could trigger a toast here
                    return { ...ach, isUnlocked: true };
                }
                return ach;
            });
            
            // Only update if something changed
            if (JSON.stringify(updated) !== JSON.stringify(achievements)) {
                setAchievements(updated);
            }
        };
        
        checkAchievements();
    }, [userState, vices, achievements]);

    // --- ACTIONS ---

    const handleViceSelect = (vice: Vice) => {
        setSelectedVice(vice);
        setIsAmountModalOpen(true);
    };

    const handleTransactionConfirm = (amount: number) => {
        if (!selectedVice) return;

        // Assume 1g Gold ~ 5500 INR
        const goldBought = amount / 5500; 
        // 1 Coin per ₹10 saved
        const pointsEarned = Math.floor(amount / 10);
        
        // Update User State
        setUserState(prev => ({
            lifetimeBalance: prev.lifetimeBalance + amount,
            availableBalance: prev.availableBalance + amount,
            goldGrams: prev.goldGrams + goldBought,
            streak: prev.streak + 1,
            lastSaved: amount,
            points: prev.points + pointsEarned
        }));

        // Update Vice's Last Transaction
        setVices(prevVices => 
            prevVices.map(v => 
                v.id === selectedVice.id 
                ? { ...v, lastTransactionAmount: amount } 
                : v
            )
        );

        // Log Transaction
        const newTransaction: Transaction = {
            id: Date.now(),
            amount: amount,
            date: new Date().toISOString(),
            viceName: selectedVice.name,
            type: 'switch'
        };
        setTransactions(prev => [newTransaction, ...prev]);

        // Reset Selection & Show Success
        setIsAmountModalOpen(false);
        setSelectedVice(null);
        setActiveView('success');
        setTimeout(() => setActiveView('home'), 2500);
    };

    const handleSinTaxConfirm = (amount: number, viceName: string) => {
        // Assume 1g Gold ~ 5500 INR
        const goldBought = amount / 5500; 
        
        // Update User State - MONEY SAVED, BUT STREAK FROZEN (NOT INCREMENTED)
        setUserState(prev => ({
            ...prev,
            lifetimeBalance: prev.lifetimeBalance + amount,
            availableBalance: prev.availableBalance + amount,
            goldGrams: prev.goldGrams + goldBought,
            lastSaved: amount,
            // Streak does not increment, simulating a "Freeze"
        }));

        // Log Transaction
        const newTransaction: Transaction = {
            id: Date.now(),
            amount: amount,
            date: new Date().toISOString(),
            viceName: viceName,
            type: 'sin-tax'
        };
        setTransactions(prev => [newTransaction, ...prev]);
        
        // Also log to squad feed if in a squad (simulated)
        const newActivity: SquadActivity = {
            id: Date.now(),
            memberId: '1', // Self
            memberName: 'You',
            type: 'sin_tax',
            message: 'paid Sin Tax and froze streak.',
            timestamp: 'Just now',
            amount: amount
        };
        setSquadActivities(prev => [newActivity, ...prev]);

        setIsSinTaxModalOpen(false);
        setActiveView('sin-tax-success');
        setTimeout(() => setActiveView('home'), 3000);
    };

    const handleAddVice = (newVice: Vice) => {
        setVices([...vices, newVice]);
        setIsAddViceModalOpen(false);
    };

    const handleAddGoal = (newGoal: Goal) => {
        setGoals([...goals, newGoal]);
        setIsAddGoalModalOpen(false);
    };

    const handleAllocateToGoal = (goalId: number) => {
        const goal = goals.find(g => g.id === goalId);
        if (!goal) return;

        const remainingNeeded = goal.targetAmount - goal.currentAmount;
        const amountToAllocate = Math.min(userState.availableBalance, remainingNeeded);

        if (amountToAllocate <= 0) return;

        setGoals(goals.map(g => 
            g.id === goalId 
            ? { ...g, currentAmount: g.currentAmount + amountToAllocate } 
            : g
        ));
        
        setUserState(prev => ({
            ...prev,
            availableBalance: prev.availableBalance - amountToAllocate
        }));
    };

    const handleRedeemReward = (rewardId: string) => {
        const reward = rewards.find(r => r.id === rewardId);
        if (!reward || userState.points < reward.cost) return;

        setUserState(prev => ({
            ...prev,
            points: prev.points - reward.cost
        }));
        
        // Trigger the reward success modal
        setRedeemedReward(reward);
    };

    const handleVouch = (memberId: string, isVouched: boolean) => {
        // Update member status
        setSquadMembers(prev => prev.map(m => {
            if (m.id === memberId) {
                return { ...m, status: isVouched ? 'clean' : 'called-out' };
            }
            return m;
        }));

        // Add activity
        const member = squadMembers.find(m => m.id === memberId);
        if (member) {
            const newActivity: SquadActivity = {
                id: Date.now(),
                memberId: member.id,
                memberName: member.name,
                type: isVouched ? 'vouch_pass' : 'call_out',
                message: isVouched ? 'was vouched clean.' : 'was called out by You.',
                timestamp: 'Just now'
            };
            setSquadActivities(prev => [newActivity, ...prev]);
        }
    };

    // Squad Interaction Handlers
    const handleSquadMessage = (text: string) => {
        const newActivity: SquadActivity = {
            id: Date.now(),
            memberId: '1',
            memberName: 'You',
            type: 'chat',
            message: text,
            timestamp: 'Just now'
        };
        setSquadActivities(prev => [...prev, newActivity]);
    };

    const handleSquadNudge = (memberId: string) => {
        // Simulation
        const member = squadMembers.find(m => m.id === memberId);
        if (member) {
            alert(`You nudged ${member.name} to verify!`);
        }
    };

    const handleSquadCheer = (memberId: string) => {
         const member = squadMembers.find(m => m.id === memberId);
         if (member) {
             // In a real app, this sends a push notification
             console.log(`Cheered for ${member.name}`);
         }
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-[#05020a] p-4 font-inter text-slate-100">
            {/* Mobile Container Simulation */}
            <div className="w-full max-w-[380px] bg-[#0f0518] h-[750px] relative border border-purple-900/50 shadow-2xl shadow-purple-900/20 overflow-hidden rounded-[40px]">
                
                {/* Overlay Modals */}
                <AddViceModal 
                    isOpen={isAddViceModalOpen} 
                    onClose={() => setIsAddViceModalOpen(false)} 
                    onAdd={handleAddVice} 
                />
                
                <AddGoalModal 
                    isOpen={isAddGoalModalOpen}
                    onClose={() => setIsAddGoalModalOpen(false)}
                    onAdd={handleAddGoal}
                />

                <AmountSelectionModal
                    isOpen={isAmountModalOpen}
                    onClose={() => setIsAmountModalOpen(false)}
                    onConfirm={handleTransactionConfirm}
                    vice={selectedVice}
                />

                <SinTaxModal 
                    isOpen={isSinTaxModalOpen}
                    onClose={() => setIsSinTaxModalOpen(false)}
                    vices={vices}
                    onConfirm={handleSinTaxConfirm}
                />

                <VouchModal 
                    isOpen={isVouchModalOpen}
                    onClose={() => setIsVouchModalOpen(false)}
                    pendingMembers={squadMembers.filter(m => m.status === 'pending')}
                    onVouch={handleVouch}
                />

                <RewardRedemptionModal 
                    reward={redeemedReward}
                    onClose={() => setRedeemedReward(null)}
                />

                {/* Status Bar */}
                <div className="flex justify-between items-center p-6 pb-2 z-20 relative glass-purple border-b border-purple-900/30">
                    <div className="flex items-center space-x-2">
                        <div className="w-8 h-8 bg-amber-400 rounded-full flex items-center justify-center shadow-lg shadow-amber-400/20 animate-fade-in">
                            <span className="font-bold text-black text-xs">Jar</span>
                        </div>
                        <span className="font-bold text-lg tracking-tight text-white">Switch</span>
                    </div>
                    {/* Toggle between Streak and Points depending on view */}
                    <div className="flex items-center space-x-2 bg-[#2a1245] px-3 py-1.5 rounded-full border border-purple-800/50 transition-all">
                        {activeView === 'rewards' ? (
                            <>
                                <IconCoin className="w-4 h-4 text-yellow-400" />
                                <span className="text-xs font-bold text-yellow-400">{userState.points} Coins</span>
                            </>
                        ) : activeView === 'sin-tax-success' ? (
                            <>
                                <IconShield className="w-4 h-4 text-cyan-400" />
                                <span className="text-xs font-bold text-cyan-400">Streak Frozen</span>
                            </>
                        ) : (
                            <>
                                <IconAward className="w-4 h-4 text-amber-400" />
                                <span className="text-xs font-bold text-amber-400">{userState.streak} Day Streak</span>
                            </>
                        )}
                    </div>
                </div>

                {/* Main View Container */}
                <div className="h-full pb-20 pt-4 overflow-hidden bg-gradient-to-b from-[#0f0518] to-[#1a0b2e]">
                    {activeView === 'home' && (
                        <HomeView 
                            balance={userState.lifetimeBalance}
                            goldGrams={userState.goldGrams}
                            vices={vices}
                            onViceSelect={handleViceSelect}
                            onOpenModal={() => setIsAddViceModalOpen(true)}
                            onOpenSinTaxModal={() => setIsSinTaxModalOpen(true)}
                            setActiveView={setActiveView}
                        />
                    )}
                    {activeView === 'success' && (
                        <SuccessView 
                            amount={userState.lastSaved} 
                            pointsEarned={Math.floor(userState.lastSaved / 10)}
                        />
                    )}
                    {activeView === 'sin-tax-success' && (
                        <SinTaxSuccessView 
                            amount={userState.lastSaved}
                        />
                    )}
                    {activeView === 'stats' && (
                        <StatsView 
                            setActiveView={setActiveView}
                            totalSaved={userState.lifetimeBalance}
                            transactions={transactions}
                        />
                    )}
                    {activeView === 'goals' && (
                        <GoalsView 
                            goals={goals}
                            availableBalance={userState.availableBalance}
                            onAllocate={handleAllocateToGoal}
                            onOpenModal={() => setIsAddGoalModalOpen(true)}
                        />
                    )}
                    {activeView === 'achievements' && (
                        <AchievementsView 
                            achievements={achievements}
                        />
                    )}
                    {activeView === 'rewards' && (
                        <RewardsView
                            points={userState.points}
                            rewards={rewards}
                            onRedeem={handleRedeemReward}
                        />
                    )}
                    {activeView === 'squads' && (
                        <SquadsView 
                            squadName="Wolf Pack"
                            potAmount={1750 + userState.availableBalance} // Demo math
                            members={[...squadMembers, { id: '1', name: 'You', avatarInitials: 'ME', status: 'clean', stakedAmount: 500 }]} // Add self
                            activities={squadActivities}
                            onOpenVouch={() => setIsVouchModalOpen(true)}
                            onSendMessage={handleSquadMessage}
                            onNudge={handleSquadNudge}
                            onCheer={handleSquadCheer}
                        />
                    )}
                </div>

                {/* Bottom Tab Bar */}
                <div className="absolute bottom-0 w-full glass-purple border-t border-purple-900/30 p-2 pb-6 flex justify-around items-center text-slate-500 z-30">
                    <button 
                        className={`flex flex-col items-center p-2 transition-all ${activeView === 'home' ? 'text-amber-400 scale-105' : 'text-purple-400/40 hover:text-purple-200'}`} 
                        onClick={() => setActiveView('home')}
                    >
                        <IconWallet className="w-5 h-5 mb-0.5" />
                        <span className="text-[10px] font-bold tracking-wide">Switch</span>
                    </button>
                    
                    <button 
                        className={`flex flex-col items-center p-2 transition-all ${activeView === 'goals' ? 'text-amber-400 scale-105' : 'text-purple-400/40 hover:text-purple-200'}`} 
                        onClick={() => setActiveView('goals')}
                    >
                        <IconTarget className="w-5 h-5 mb-0.5" />
                        <span className="text-[10px] font-bold tracking-wide">Goals</span>
                    </button>

                    <button 
                        className={`flex flex-col items-center p-2 transition-all ${activeView === 'squads' ? 'text-amber-400 scale-105' : 'text-purple-400/40 hover:text-purple-200'}`} 
                        onClick={() => setActiveView('squads')}
                    >
                        <IconUsers className="w-5 h-5 mb-0.5" />
                        <span className="text-[10px] font-bold tracking-wide">Squad</span>
                    </button>

                    <button 
                        className={`flex flex-col items-center p-2 transition-all ${activeView === 'achievements' ? 'text-amber-400 scale-105' : 'text-purple-400/40 hover:text-purple-200'}`} 
                        onClick={() => setActiveView('achievements')}
                    >
                        <IconTrophy className="w-5 h-5 mb-0.5" />
                        <span className="text-[10px] font-bold tracking-wide">Awards</span>
                    </button>

                    <button 
                        className={`flex flex-col items-center p-2 transition-all ${activeView === 'rewards' ? 'text-amber-400 scale-105' : 'text-purple-400/40 hover:text-purple-200'}`} 
                        onClick={() => setActiveView('rewards')}
                    >
                        <IconGift className="w-5 h-5 mb-0.5" />
                        <span className="text-[10px] font-bold tracking-wide">Shop</span>
                    </button>
                </div>

            </div>
        </div>
    );
};

export default App;