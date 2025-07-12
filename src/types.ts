import { z } from 'zod';

export const BybitConfig = z.object({
  apiKey: z.string(),
  apiSecret: z.string(),
  environment: z.enum(['testnet', 'mainnet']).default('testnet'),
  baseUrl: z.string().optional(),
  debug: z.boolean().default(false),
});

export type BybitConfigType = z.infer<typeof BybitConfig>;

export interface BybitToolRequest {
  name: string;
  arguments: Record<string, unknown>;
}

export interface BybitToolResponse {
  content: Array<{
    type: 'text';
    text: string;
  }>;
  isError?: boolean;
}

export const PriceSchema = z.object({
  symbol: z.string().describe('Trading symbol (e.g., BTCUSDT)')
});

export const OrderBookSchema = z.object({
  symbol: z.string().describe('Trading symbol (e.g., BTCUSDT)'),
  limit: z.number().min(1).max(500).optional().describe('Number of entries to return (default: 25)')
});

export const KlinesSchema = z.object({
  symbol: z.string().describe('Trading symbol (e.g., BTCUSDT)'),
  interval: z.enum(['1', '3', '5', '15', '30', '60', '120', '240', '360', '720', 'D', 'M', 'W']).describe('Kline interval'),
  limit: z.number().min(1).max(1000).optional().describe('Number of klines to return (default: 200)')
});

export const TickerSchema = z.object({
  symbol: z.string().optional().describe('Trading symbol (if not provided, returns all symbols)')
});

export const PlaceOrderSchema = z.object({
  category: z.enum(['spot', 'linear', 'inverse', 'option']).describe('Product type'),
  symbol: z.string().describe('Trading symbol'),
  side: z.enum(['Buy', 'Sell']).describe('Order side'),
  orderType: z.enum(['Market', 'Limit']).describe('Order type'),
  qty: z.string().describe('Order quantity'),
  price: z.string().optional().describe('Order price (required for limit orders)'),
  timeInForce: z.enum(['GTC', 'IOC', 'FOK']).optional().describe('Time in force (default: GTC)')
});

export const CancelOrderSchema = z.object({
  category: z.enum(['spot', 'linear', 'inverse', 'option']).describe('Product type'),
  symbol: z.string().describe('Trading symbol'),
  orderId: z.string().optional().describe('Order ID'),
  orderLinkId: z.string().optional().describe('Order link ID')
});

export const OrderHistorySchema = z.object({
  category: z.enum(['spot', 'linear', 'inverse', 'option']).describe('Product type'),
  symbol: z.string().optional().describe('Trading symbol'),
  limit: z.number().min(1).max(50).optional().describe('Number of records to return (default: 20)')
});

export const OpenOrdersSchema = z.object({
  category: z.enum(['spot', 'linear', 'inverse', 'option']).describe('Product type'),
  symbol: z.string().optional().describe('Trading symbol'),
  limit: z.number().min(1).max(50).optional().describe('Number of records to return (default: 20)')
});

export const WalletBalanceSchema = z.object({
  accountType: z.enum(['UNIFIED', 'CONTRACT', 'SPOT', 'INVESTMENT', 'OPTION', 'FUND']).describe('Account type'),
  coin: z.string().optional().describe('Coin name (if not provided, returns all coins)')
});