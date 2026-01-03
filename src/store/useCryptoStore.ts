import { create } from 'zustand'
import type { Coin } from '../types/crypto';


interface CryptoState {
    coins: Coin[];
    // Func for creating a list 
    setCoins: (coins: Coin[]) => void;

    updateCoin: (symbol: string, data: Partial<Coin>) => void;
}

export const useCryptoStore = create<CryptoState>((set) =>  ({
    coins: [
    { symbol: 'BTCUSDT', name: 'Bitcoin', price: 0, change24: 0, high24: 0, low24: 0, id: '1' },
    { symbol: 'ETHUSDT', name: 'Ethereum', price: 0, change24: 0, high24: 0, low24: 0, id: '2' },
    ],

    setCoins: (coins) => set({coins}),

    updateCoin: (symbol, data) => 
        set((state) => ({
        // if symbol matches, then updating the price of coin 
        coins: state.coins.map((coin) => {
            if (coin.symbol === symbol && data.price !== undefined) {
                const status = data.price > coin.price ? 'up' : data.price < coin.price ? 'down' : 'same';
                return {...coin, ...data, status};
            }
            return coin;
        }),
    })),
}));
