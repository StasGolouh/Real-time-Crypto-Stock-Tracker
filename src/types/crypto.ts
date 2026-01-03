export interface Coin {
    symbol: string;
    name: string;
    price: number;
    change24: number; // Changes for 24 hours
    high24: number;
    low24: number;
    status?: 'up' | 'down' | 'same';
}

export interface BinanceTicker {
  e: string;      // Event type
  E: number;      // Event time
  s: string;      // Symbol (ex. BTCUSDT)
  p: string;      // Price change
  P: string;      // Price change percent
  c: string;      // Last price (current price)
  h: string;      // High price
  l: string;      // Low price
  v: string;      // Total traded base asset volume
}

export interface PriceAlert {
    id: string;
    symbol: string;
    targetPrice: number;
    condition: 'above' | 'below';
    isActive: boolean;
    createdAt: number;
}