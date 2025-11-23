
export interface Vice {
    id: number;
    name: string;
    cost: number;
    iconType: 'coffee' | 'cigarette' | 'food' | 'zap' | 'transport' | 'shopping';
    color: string;
    bg: string;
    lastTransactionAmount?: number;
}

export interface Goal {
    id: number;
    name: string;
    targetAmount: number;
    currentAmount: number;
}

export interface Achievement {
    id: string;
    title: string;
    description: string;
    iconType: 'trophy' | 'star' | 'flame' | 'target';
    isUnlocked: boolean;
}

export interface Reward {
    id: string;
    title: string;
    cost: number;
    type: 'digital' | 'voucher' | 'charity';
    iconType: 'gift' | 'crown' | 'ticket';
    description: string;
}

export interface Transaction {
    id: number;
    amount: number;
    date: string;
    viceName: string;
    type: 'switch' | 'sin-tax';
}

export interface SquadMember {
    id: string;
    name: string;
    avatarInitials: string;
    status: 'clean' | 'sin-tax' | 'pending' | 'called-out';
    stakedAmount: number;
}

export interface SquadActivity {
    id: number;
    memberId: string;
    memberName: string;
    type: 'sin_tax' | 'call_out' | 'vouch_pass' | 'stake_lost' | 'chat';
    message: string;
    timestamp: string;
    amount?: number;
}

export type ViewType = 'home' | 'success' | 'stats' | 'goals' | 'achievements' | 'rewards' | 'sin-tax-success' | 'squads';

export interface UserState {
    lifetimeBalance: number; // Total ever saved
    availableBalance: number; // Available to allocate to goals
    goldGrams: number;
    streak: number;
    lastSaved: number;
    points: number; // Gamification currency
}