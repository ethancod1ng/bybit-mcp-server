# Bybit MCP Server
[![smithery badge](https://smithery.ai/badge/@ethancod1ng/bybit-mcp-server)](https://smithery.ai/server/@ethancod1ng/bybit-mcp-server)

> **Multi-language Documentation**
> - [English](README.md)
> - [中文](README_CN.md)
> - [日本語](README_JA.md)

A Model Context Protocol (MCP) server for Bybit exchange, enabling AI coding tools like Claude Code and Cursor to interact with Bybit's trading platform.

## Quick Start

### Installation


```bash
npm install -g bybit-mcp-server
```

### Configuration

This MCP server can be used with various AI tools that support MCP:

[![Claude](https://img.shields.io/badge/Claude-FF6B35?style=for-the-badge&logo=anthropic&logoColor=white)](https://claude.ai) [![Cursor](https://img.shields.io/badge/Cursor-000000?style=for-the-badge&logo=cursor&logoColor=white)](https://cursor.sh)

#### Claude Code Configuration

**For Testnet (Recommended - Safe for testing):**
Add to `claude_desktop_config.json`:

```json
{
  "mcpServers": {
    "bybit": {
      "command": "npx",
      "args": ["bybit-mcp-server"],
      "env": {
        "BYBIT_API_KEY": "your_testnet_api_key",
        "BYBIT_API_SECRET": "your_testnet_api_secret",
        "BYBIT_ENVIRONMENT": "testnet"
      }
    }
  }
}
```

**For Mainnet (⚠️ WARNING: Uses real funds):**
Add to `claude_desktop_config.json`:

```json
{
  "mcpServers": {
    "bybit": {
      "command": "npx",
      "args": ["bybit-mcp-server"],
      "env": {
        "BYBIT_API_KEY": "your_mainnet_api_key",
        "BYBIT_API_SECRET": "your_mainnet_api_secret",
        "BYBIT_ENVIRONMENT": "mainnet"
      }
    }
  }
}
```

#### Cursor Configuration

Use the same configuration as Claude Code above, but add to `.cursor/mcp_config.json` with `mcp.servers` instead of `mcpServers`.

### Environment Setup

**Option 1: Testnet (Recommended)**
```env
BYBIT_API_KEY=your_testnet_api_key_here
BYBIT_API_SECRET=your_testnet_api_secret_here
BYBIT_ENVIRONMENT=testnet
DEBUG=false
```

**Option 2: Mainnet (⚠️ Real funds)**
```env
BYBIT_API_KEY=your_mainnet_api_key_here
BYBIT_API_SECRET=your_mainnet_api_secret_here
BYBIT_ENVIRONMENT=mainnet
DEBUG=false
```

### Getting API Keys

**For Testnet:**
1. Visit [Bybit Testnet](https://testnet.bybit.com/)
2. Register an account
3. Go to API Management and create API keys
4. Enable required permissions (read, trade)

**For Mainnet:**
1. Visit [Bybit](https://www.bybit.com/)
2. Complete account verification
3. Go to API Management and create API keys
4. Enable required permissions (read, trade)
5. Set IP restrictions for additional security

## Available Tools

### Market Data
- `get_price` - Get current price for a trading symbol
- `get_orderbook` - Get order book depth for a trading symbol
- `get_klines` - Get historical candlestick data
- `get_24hr_ticker` - Get 24-hour trading statistics

### Account Management
- `get_account_info` - Get account information and balances
- `get_wallet_balance` - Get wallet balance for specific account type
- `get_open_orders` - Get list of open/active orders
- `get_order_history` - Get historical orders

### Trading (⚠️ Can use real funds on mainnet)
- `place_order` - Place a new order
- `cancel_order` - Cancel an existing order
- `cancel_all_orders` - Cancel all orders for a symbol or category

## Usage Examples

Ask your AI assistant to:
- "Get the current price of BTCUSDT on Bybit"
- "Show me the order book for ETHUSDT with 50 levels"
- "Get my account balance"
- "Place a limit buy order for 0.1 BTC at $45000"
- "Cancel all my open orders for BTCUSDT"
- "Get my trading history for the last 20 orders"

## Security

⚠️ **Important Security Notes**:
- **TESTNET** is the default and recommended environment for safety
- **MAINNET** operations use real funds - use with extreme caution
- API keys are automatically redacted from error messages
- Always test thoroughly on testnet before using mainnet
- Trading operations will display warnings when using mainnet

🔐 **API Key Safety**:
- Never commit API keys to version control
- Use environment variables for credentials
- Regularly rotate your API keys
- Use IP restrictions in Bybit API settings

## Development

```bash
npm run build     # Compile TypeScript
npm run dev       # Development mode
npm run lint      # Run linting
npm run typecheck # Type checking
npm run watch     # Watch mode
```

### Local Development

1. Clone the repository:
```bash
git clone https://github.com/your-username/bybit-mcp-server.git
cd bybit-mcp-server
```

2. Install dependencies:
```bash
npm install
```

3. Set up environment:
```bash
cp .env.example .env
# Edit .env with your API credentials
```

4. Run in development mode:
```bash
npm run dev
```

## Configuration Options

| Variable | Description | Default | Required |
|----------|-------------|---------|----------|
| `BYBIT_API_KEY` | Your Bybit API key | - | ✅ |
| `BYBIT_API_SECRET` | Your Bybit API secret | - | ✅ |
| `BYBIT_ENVIRONMENT` | `testnet` or `mainnet` | `testnet` | ❌ |
| `BYBIT_BASE_URL` | Custom API base URL | Auto-detected | ❌ |
| `DEBUG` | Enable debug logging | `false` | ❌ |

## API Reference

This server implements Bybit's V5 API endpoints. For detailed API documentation:
- [Bybit V5 API Documentation](https://bybit-exchange.github.io/docs/v5/intro)
- [Bybit API GitHub](https://github.com/bybit-exchange/bybit-official-api-docs)

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

MIT License - see [LICENSE](LICENSE) file for details.

## Support

- 📚 [Documentation](https://bybit-exchange.github.io/docs/)
- 🐛 [Issues](https://github.com/your-username/bybit-mcp-server/issues)
- 💬 [Discussions](https://github.com/your-username/bybit-mcp-server/discussions)
