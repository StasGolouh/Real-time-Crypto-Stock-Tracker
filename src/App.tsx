import { useEffect } from 'react';
import {subscribeToTicker} from './services/binanceService';
import { useCryptoStore } from "./store/useCryptoStore";
import type { BinanceTicker } from "./types/crypto";


function App() {
  //Take a func of updating coins
  const updateCoin = useCryptoStore((state) => state.updateCoin);

  //Take a list of coins
  const coins = useCryptoStore((state)=> state.coins);

  const trackedSymbols = ["btcusdt", "ethusdt", "solusdt"];

  useEffect(() => {
    // Subscribe to every coin
    const unsubs = trackedSymbols.map((coin) => subscribeToTicker(coin, (rawData: BinanceTicker) => {
      updateCoin (rawData.s, {
        price: parseFloat(rawData.c),
        change24: parseFloat(rawData.P),
        high24: parseFloat(rawData.h),
        low24: parseFloat(rawData.l)
      });
    }))
    // Loop through the array of closure functions and stop all sockets
    return () => {
      unsubs.forEach((unsub) => unsub());
  };
  }, [updateCoin]);

  
  return (
    <div className="p-10 bg-slate-950 min-h-screen text-white">
      <h1 className="text-2xl font-bold mb-5">Crypto Dashboard Live</h1>
      
      <div className="grid gap-4">
        {coins.map((coin) => (
          <div key={coin.symbol} className="p-4 bg-slate-900 border border-slate-800 rounded">
            {coin.symbol}: <span className="text-green-400 font-mono">${coin.price}</span>
          </div>
        ))}
      </div>
    </div>
  )
}

export default App
