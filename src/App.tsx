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
        <h1 className="dashboard-title">Crypto Tracker</h1>
      </header>

      <div className="coin-list">
        {coins.map((coin) => (
          <div key={coin.symbol} className="coin-card group">
            
            {/* Left */}
            <div>
              <div className="coin-header">
                <h2 className="coin-info-name">{coin.name}</h2>
                <span className="coin-live-badge">Live</span>
              </div>
              <span className="coin-info-symbol">{coin.symbol}</span>
            </div>

            {/* Center */}
            <div className="coin-stats">
              <p className="coin-stats-title">24h High/Low</p>
              <p className="coin-stats-high">
                <span>H:</span> {coin.high24.toLocaleString()}
              </p>
              <p className="coin-stats-low">
                <span>L:</span> {coin.low24.toLocaleString()}
              </p>
            </div>

            {/* Right */}
            <div className="coin-price-wrapper">
              <p
                className={`coin-price ${
                  coin.status === 'up'
                    ? 'coin-price-up'
                    : coin.status === 'down'
                    ? 'coin-price-down'
                    : ''
                }`}
              >
                ${coin.price.toLocaleString(undefined, { minimumFractionDigits: 2 })}
              </p>

              <span
                className={`coin-change ${
                  coin.change24 >= 0 ? 'coin-change-up' : 'coin-change-down'
                }`}
              >
                {coin.change24 >= 0 ? '▲' : '▼'} {Math.abs(coin.change24)}%
              </span>
            </div>

          </div>
        ))}
      </div>
</div>

  )
}

export default App
