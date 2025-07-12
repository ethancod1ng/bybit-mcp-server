import dotenv from 'dotenv';
import { BybitConfig, BybitConfigType } from './types.js';

dotenv.config();

export function loadConfig(): BybitConfigType {
  const config = {
    apiKey: process.env.BYBIT_API_KEY || '',
    apiSecret: process.env.BYBIT_API_SECRET || '',
    environment: (process.env.BYBIT_ENVIRONMENT as 'testnet' | 'mainnet') || 'testnet',
    baseUrl: process.env.BYBIT_BASE_URL || undefined,
    debug: process.env.DEBUG === 'true',
  };

  try {
    return BybitConfig.parse(config);
  } catch (error) {
    console.error('Configuration validation failed:', error);
    throw new Error('Invalid configuration. Please check your environment variables.');
  }
}

export function validateConfig(config: BybitConfigType): void {
  if (!config.apiKey || !config.apiSecret) {
    throw new Error('BYBIT_API_KEY and BYBIT_API_SECRET environment variables are required');
  }

  // Note: Avoid console output in MCP servers as it interferes with JSON-RPC protocol
  // Environment info is logged via logError in server.ts instead
}