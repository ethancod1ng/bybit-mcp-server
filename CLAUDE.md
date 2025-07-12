# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Development Commands

- `npm run build` - Compile TypeScript to JavaScript in dist/ directory
- `npm run dev` - Run in development mode using tsx
- `npm run watch` - Watch mode with automatic restart on file changes
- `npm start` - Start the compiled server from dist/
- `npm run typecheck` - Run TypeScript type checking without compilation
- `npm run lint` - Run ESLint on TypeScript source files

## Architecture Overview

This is a Model Context Protocol (MCP) server that provides AI tools access to Bybit cryptocurrency exchange APIs. The server exposes 11 tools across three categories:

**Market Data Tools** (public): get_price, get_orderbook, get_klines, get_24hr_ticker
**Account Management Tools** (requires API credentials): get_account_info, get_wallet_balance, get_open_orders, get_order_history  
**Trading Tools** (testnet only): place_order, cancel_order, cancel_all_orders

### Core Components

- **src/server.ts** - Main MCP server class with tool registration and execution logic
- **src/client.ts** - Bybit API client wrapper handling authentication and requests
- **src/tools.ts** - MCP tool definitions with input schemas
- **src/types.ts** - TypeScript types and Zod validation schemas
- **src/config.ts** - Configuration loading and validation

### Key Implementation Details

- All tool execution happens in `BybitMCPServer.handleToolCall()` (src/server.ts:53-153)
- Security features include API credential sanitization in error messages (src/server.ts:159-173)
- Trading operations are safety-restricted to testnet environment by default
- Uses Bybit V5 API with comprehensive input validation via Zod schemas

### Environment Configuration

Required variables:
- `BYBIT_API_KEY` - Bybit API key
- `BYBIT_API_SECRET` - Bybit API secret  
- `BYBIT_ENVIRONMENT` - "testnet" (default) or "mainnet"
- `DEBUG` - Enable verbose logging (optional)

### Local Testing

Build and link globally: `npm run build && npm link`
Test with credentials: `BYBIT_API_KEY=key BYBIT_API_SECRET=secret npm run dev`