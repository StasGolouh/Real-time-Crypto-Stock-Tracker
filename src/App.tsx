import { useEffect } from 'react';
import {subscribeToTicker} from './services/binanceService';
import { useCryptoStore } from "./store/useCryptoStore";
import type { BinanceTicker } from "./types/crypto";
import './App.css';


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
    <div className="dashboard-container">
      <header className="dashboard-header">
        <h1 className="text-3xl font-bold text-blue-500">Crypto Tracker</h1>
      </header>

      <div className="space-y-4">
        {coins.map((coin) => (
          <div key={coin.symbol} className="coin-card">
            <div>
              <h2 className="coin-info-name">{coin.name}</h2>
              <span className="coin-info-symbol">{coin.symbol}</span>
            </div>
            <div className="text-right">
            <p className={`coin-price
              ${coin.status === 'up' ? 'text-green-400' : 
              coin.status === 'down' ? 'text-red-400' : 
              'text-white'
            }`}>
              ${coin.price}
            </p>  
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default App
