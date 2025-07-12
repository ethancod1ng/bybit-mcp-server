import { Server } from '@modelcontextprotocol/sdk/server/index.js';
import { StdioServerTransport } from '@modelcontextprotocol/sdk/server/stdio.js';
import {
  CallToolRequestSchema,
  ListToolsRequestSchema,
  CallToolResult,
  TextContent,
} from '@modelcontextprotocol/sdk/types.js';
import { BybitClient } from './client.js';
import { BybitConfigType, BybitToolRequest } from './types.js';
import { tools } from './tools.js';

export class BybitMCPServer {
  private server: Server;
  private client: BybitClient;

  constructor(config: BybitConfigType) {
    this.server = new Server({
      name: 'bybit-mcp-server',
      version: '1.0.0',
    });

    this.client = new BybitClient(config);
    this.setupHandlers();
  }

  private setupHandlers() {
    this.server.setRequestHandler(ListToolsRequestSchema, async () => ({
      tools: tools,
    }));

    this.server.setRequestHandler(CallToolRequestSchema, async (request) => {
      try {
        const { name, arguments: args } = request.params as BybitToolRequest;
        const result = await this.handleToolCall(name, args);
        return result;
      } catch (error) {
        const errorMessage = error instanceof Error ? error.message : String(error);
        this.logError(`Error in tool call: ${errorMessage}`);
        return {
          content: [
            {
              type: 'text' as const,
              text: `Error: ${this.sanitizeError(errorMessage)}`,
            } as TextContent,
          ],
          isError: true,
        };
      }
    });
  }

  private async handleToolCall(name: string, args: Record<string, unknown>): Promise<CallToolResult> {
    try {
      let result;

      switch (name) {
        case 'get_price':
          result = await this.client.getPrice(args.symbol as string);
          break;

        case 'get_orderbook':
          result = await this.client.getOrderBook(
            args.symbol as string,
            args.limit as number
          );
          break;

        case 'get_klines':
          result = await this.client.getKlines(
            args.symbol as string,
            args.interval as string,
            args.limit as number
          );
          break;

        case 'get_24hr_ticker':
          result = await this.client.get24hrTicker(args.symbol as string);
          break;

        case 'get_account_info':
          result = await this.client.getAccountInfo();
          break;

        case 'get_wallet_balance':
          result = await this.client.getWalletBalance(
            args.accountType as string,
            args.coin as string
          );
          break;

        case 'get_open_orders':
          result = await this.client.getOpenOrders(
            args.category as string,
            args.symbol as string,
            args.limit as number
          );
          break;

        case 'get_order_history':
          result = await this.client.getOrderHistory(
            args.category as string,
            args.symbol as string,
            args.limit as number
          );
          break;

        case 'place_order':
          result = await this.client.placeOrder({
            category: args.category as string,
            symbol: args.symbol as string,
            side: args.side as string,
            orderType: args.orderType as string,
            qty: args.qty as string,
            price: args.price as string,
            timeInForce: args.timeInForce as string,
          });
          break;

        case 'cancel_order':
          result = await this.client.cancelOrder(
            args.category as string,
            args.symbol as string,
            args.orderId as string,
            args.orderLinkId as string
          );
          break;

        case 'cancel_all_orders':
          result = await this.client.cancelAllOrders(
            args.category as string,
            args.symbol as string
          );
          break;

        default:
          throw new Error(`Unknown tool: ${name}`);
      }

      return {
        content: [
          {
            type: 'text',
            text: JSON.stringify(result, null, 2),
          } as TextContent,
        ],
        isError: false,
      };
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : String(error);
      throw new Error(errorMessage);
    }
  }

  private logError(message: string) {
    console.error(`[${new Date().toISOString()}] ${message}`);
  }

  private sanitizeError(error: string): string {
    const sensitivePatterns = [
      /api[_-]?key[s]?[:\s=][\w-]+/gi,
      /secret[s]?[:\s=][\w-]+/gi,
      /token[s]?[:\s=][\w-]+/gi,
      /password[s]?[:\s=][\w-]+/gi,
    ];

    let sanitized = error;
    sensitivePatterns.forEach(pattern => {
      sanitized = sanitized.replace(pattern, '[REDACTED]');
    });

    return sanitized;
  }

  async start() {
    const transport = new StdioServerTransport();
    await this.server.connect(transport);
    
    this.logError(`Bybit MCP Server started with ${tools.length} tools`);
  }
}