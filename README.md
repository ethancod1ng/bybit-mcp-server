# Bybit MCP Server

> **Multi-language Documentation**
> - [English](README.md)
> - [中文](README_CN.md)

A Model Context Protocol (MCP) server for Bybit exchange, enabling AI coding tools like Claude Code and Cursor to interact with Bybit's trading platform.

## Quick Start

### Installation

```bash
npm install -g bybit-mcp-server
```

### Configuration

Supported AI Tools:
- Claude Code
- Cursor
- Any MCP-compatible AI tool

#### Claude Code Configuration

Add to your Claude Code configuration:

```json
{
  "mcpServers": {
    "bybit": {
      "command": "bybit-mcp-server",
      "env": {
        "BYBIT_API_KEY": "your_api_key",
        "BYBIT_API_SECRET": "your_api_secret",
        "BYBIT_ENVIRONMENT": "testnet"
      }
    }
  }
}
```

#### Cursor Configuration

Add to your Cursor settings:

```json
{
  "mcp.servers": {
    "bybit": {
      "command": "bybit-mcp-server",
      "env": {
        "BYBIT_API_KEY": "your_api_key",
        "BYBIT_API_SECRET": "your_api_secret",
        "BYBIT_ENVIRONMENT": "testnet"
      }
    }
  }
}
```

### Environment Setup

Create `.env` file:
```env
BYBIT_API_KEY=your_api_key_here
BYBIT_API_SECRET=your_api_secret_here
BYBIT_ENVIRONMENT=testnet
DEBUG=false
```

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

### Trading (Testnet Only)
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
- Trading operations are **TESTNET ONLY** by default for safety
- API keys are automatically redacted from error messages
- Always use testnet for development and testing
- Only switch to mainnet when you're absolutely sure about your implementation

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