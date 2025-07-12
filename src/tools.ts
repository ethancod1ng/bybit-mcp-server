import { Tool } from '@modelcontextprotocol/sdk/types.js';
import {
  PriceSchema,
  OrderBookSchema,
  KlinesSchema,
  TickerSchema,
  PlaceOrderSchema,
  CancelOrderSchema,
  OrderHistorySchema,
  OpenOrdersSchema,
  WalletBalanceSchema
} from './types.js';

export const tools: Tool[] = [
  {
    name: 'get_price',
    description: 'Get the current price for a trading symbol',
    inputSchema: {
      type: 'object',
      properties: PriceSchema.shape,
      required: ['symbol']
    }
  },
  {
    name: 'get_orderbook',
    description: 'Get the order book depth for a trading symbol',
    inputSchema: {
      type: 'object',
      properties: OrderBookSchema.shape,
      required: ['symbol']
    }
  },
  {
    name: 'get_klines',
    description: 'Get historical candlestick data for a trading symbol',
    inputSchema: {
      type: 'object',
      properties: KlinesSchema.shape,
      required: ['symbol', 'interval']
    }
  },
  {
    name: 'get_24hr_ticker',
    description: 'Get 24-hour trading statistics for symbols',
    inputSchema: {
      type: 'object',
      properties: TickerSchema.shape,
      required: []
    }
  },
  {
    name: 'get_account_info',
    description: 'Get account information and balances',
    inputSchema: {
      type: 'object',
      properties: {},
      required: []
    }
  },
  {
    name: 'get_wallet_balance',
    description: 'Get wallet balance for a specific account type',
    inputSchema: {
      type: 'object',
      properties: WalletBalanceSchema.shape,
      required: ['accountType']
    }
  },
  {
    name: 'get_open_orders',
    description: 'Get list of open/active orders',
    inputSchema: {
      type: 'object',
      properties: OpenOrdersSchema.shape,
      required: ['category']
    }
  },
  {
    name: 'get_order_history',
    description: 'Get historical orders',
    inputSchema: {
      type: 'object',
      properties: OrderHistorySchema.shape,
      required: ['category']
    }
  },
  {
    name: 'place_order',
    description: 'Place a new order (⚠️ WARNING: Can use real funds on mainnet)',
    inputSchema: {
      type: 'object',
      properties: PlaceOrderSchema.shape,
      required: ['category', 'symbol', 'side', 'orderType', 'qty']
    }
  },
  {
    name: 'cancel_order',
    description: 'Cancel an existing order (⚠️ WARNING: Affects real orders on mainnet)',
    inputSchema: {
      type: 'object',
      properties: CancelOrderSchema.shape,
      required: ['category', 'symbol']
    }
  },
  {
    name: 'cancel_all_orders',
    description: 'Cancel all orders for a symbol or category (⚠️ WARNING: Affects real orders on mainnet)',
    inputSchema: {
      type: 'object',
      properties: {
        category: {
          type: 'string',
          enum: ['spot', 'linear', 'inverse', 'option'],
          description: 'Product type'
        },
        symbol: {
          type: 'string',
          description: 'Trading symbol (optional, if not provided cancels all orders in category)'
        }
      },
      required: ['category']
    }
  }
];