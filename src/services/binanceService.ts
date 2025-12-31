import type { BinanceTicker } from "../types/crypto";

const BINANCE_WS_URL = "wss://stream.binance.com:9443/ws";

/**
 * Function to subscribe to the price stream (Ticker)
 * @param symbol - coin symbol, for example 'btcusdt'
 * @param onMessage - callback that is called when data is received
 */

export const subscribeToTicker = (symbol: string, onMessage: (data: BinanceTicker) => void) => {
    //Open a connection for a specific coin
    const ws = new WebSocket(`${BINANCE_WS_URL}/${symbol.toLowerCase()}@ticker`);

    ws.onmessage = (event) => {
        const data: BinanceTicker = JSON.parse(event.data);
        onMessage(data); // We pass the "raw" data on
    };

    ws.onerror = (error) => {
        console.error(`WebSocket error for ${symbol}:`, error);
    };

    // Return the function to close the socket
    return () => {
        if (ws.readyState === WebSocket.OPEN) {
            ws.close();
        };
    };
}