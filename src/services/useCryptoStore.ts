import { create } from 'zustand'
import type { Coin } from '../types/crypto';


interface CryptoState {
    coins: Coin[];
    // func for creating a list 
    setCoins: (coins: Coin[]) => void;

    updateCoin: (symbol: string, data: Partial<Coin>) => void;
}

export const useCryptoStore = create<CryptoState>((set) =>  ({
    coins: [],

    setCoins: (coins) => set({coins}),

    updateCoin: (symbol, data) => set((state) => ({
        // if symbol matches, then updating the price of coin 
        coins: state.coins.map((coin) => coin.symbol === symbol ? {...coin, ...data}: coin
    ),
    })),
}));
