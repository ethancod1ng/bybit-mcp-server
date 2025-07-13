import { RestClientV5 } from 'bybit-api';
import { BybitConfigType } from './types.js';

export class BybitClient {
  private client: RestClientV5;
  private config: BybitConfigType;

  constructor(config: BybitConfigType) {
    this.config = config;
    
    const baseUrl = config.baseUrl || (config.environment === 'testnet' 
      ? 'https://api-testnet.bybit.com' 
      : 'https://api.bybit.com');

    this.client = new RestClientV5({
      key: config.apiKey,
      secret: config.apiSecret,
      testnet: config.environment === 'testnet',
      baseUrl: baseUrl,
    });
  }

  async getPrice(symbol: string) {
    try {
      const response = await this.client.getTickers({
        category: 'spot',
        symbol: symbol
      });
      return response;
    } catch (error) {
      throw new Error(`Failed to get price for ${symbol}: ${error instanceof Error ? error.message : JSON.stringify(error)}`);
    }
  }

  async getOrderBook(symbol: string, limit: number = 25) {
    try {
      const response = await this.client.getOrderbook({
        category: 'spot',
        symbol: symbol,
        limit: limit
      });
      return response;
    } catch (error) {
      throw new Error(`Failed to get order book for ${symbol}: ${error instanceof Error ? error.message : JSON.stringify(error)}`);
    }
  }

  async getKlines(symbol: string, interval: string, limit: number = 200) {
    try {
      const response = await this.client.getKline({
        category: 'spot',
        symbol: symbol,
        interval: interval as any,
        limit: limit
      });
      return response;
    } catch (error) {
      throw new Error(`Failed to get klines for ${symbol}: ${error instanceof Error ? error.message : JSON.stringify(error)}`);
    }
  }

  async get24hrTicker(symbol?: string) {
    try {
      const response = await this.client.getTickers({
        category: 'spot',
        symbol: symbol
      });
      return response;
    } catch (error) {
      throw new Error(`Failed to get 24hr ticker: ${error instanceof Error ? error.message : JSON.stringify(error)}`);
    }
  }

  async getAccountInfo() {
    try {
      const response = await this.client.getWalletBalance({
        accountType: 'UNIFIED'
      });
      return response;
    } catch (error) {
      throw new Error(`Failed to get account info: ${error instanceof Error ? error.message : JSON.stringify(error)}`);
    }
  }

  async getWalletBalance(accountType: string, coin?: string) {
    try {
      const response = await this.client.getWalletBalance({
        accountType: accountType as any,
        coin: coin
      });
      return response;
    } catch (error) {
      throw new Error(`Failed to get wallet balance: ${error instanceof Error ? error.message : JSON.stringify(error)}`);
    }
  }

  async getOpenOrders(category: string, symbol?: string, limit: number = 20) {
    try {
      const response = await this.client.getActiveOrders({
        category: category as any,
        symbol: symbol,
        limit: limit
      });
      return response;
    } catch (error) {
      throw new Error(`Failed to get open orders: ${error instanceof Error ? error.message : JSON.stringify(error)}`);
    }
  }

  async getOrderHistory(category: string, symbol?: string, limit: number = 20) {
    try {
      const response = await this.client.getHistoricOrders({
        category: category as any,
        symbol: symbol,
        limit: limit
      });
      return response;
    } catch (error) {
      throw new Error(`Failed to get order history: ${error instanceof Error ? error.message : JSON.stringify(error)}`);
    }
  }

  async placeOrder(params: {
    category: string;
    symbol: string;
    side: string;
    orderType: string;
    qty: string;
    price?: string;
    timeInForce?: string;
  }) {
    try {
      if (this.config.environment === 'mainnet') {
        console.error('⚠️  WARNING: Placing order on MAINNET with real funds!');
      }

      const response = await this.client.submitOrder({
        category: params.category as any,
        symbol: params.symbol,
        side: params.side as any,
        orderType: params.orderType as any,
        qty: params.qty,
        price: params.price,
        timeInForce: params.timeInForce as any
      });
      return response;
    } catch (error) {
      throw new Error(`Failed to place order: ${error instanceof Error ? error.message : JSON.stringify(error)}`);
    }
  }

  async cancelOrder(category: string, symbol: string, orderId?: string, orderLinkId?: string) {
    try {
      if (this.config.environment === 'mainnet') {
        console.error('⚠️  WARNING: Canceling order on MAINNET!');
      }

      const response = await this.client.cancelOrder({
        category: category as any,
        symbol: symbol,
        orderId: orderId,
        orderLinkId: orderLinkId
      });
      return response;
    } catch (error) {
      throw new Error(`Failed to cancel order: ${error instanceof Error ? error.message : JSON.stringify(error)}`);
    }
  }

  async cancelAllOrders(category: string, symbol?: string) {
    try {
      if (this.config.environment === 'mainnet') {
        console.error('⚠️  WARNING: Canceling ALL orders on MAINNET!');
      }

      const response = await this.client.cancelAllOrders({
        category: category as any,
        symbol: symbol
      });
      return response;
    } catch (error) {
      throw new Error(`Failed to cancel all orders: ${error instanceof Error ? error.message : JSON.stringify(error)}`);
    }
  }
}