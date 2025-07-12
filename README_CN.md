# Bybit MCP Server

> **多语言文档**
> - [English](README.md)
> - [中文](README_CN.md)

Bybit交易所的模型上下文协议（MCP）服务器，让Claude Code和Cursor等AI编程工具能够与Bybit交易平台进行交互。

## 快速开始

### 安装

```bash
npm install -g bybit-mcp-server
```

### 配置

支持的AI工具：
- Claude Code
- Cursor
- 任何支持MCP的AI工具

#### Claude Code 配置

添加到您的Claude Code配置中：

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

#### Cursor 配置

添加到您的Cursor设置中：

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

### 环境设置

创建 `.env` 文件：
```env
BYBIT_API_KEY=your_api_key_here
BYBIT_API_SECRET=your_api_secret_here
BYBIT_ENVIRONMENT=testnet
DEBUG=false
```

## 可用工具

### 市场数据
- `get_price` - 获取交易对当前价格
- `get_orderbook` - 获取交易对订单簿深度
- `get_klines` - 获取历史K线数据
- `get_24hr_ticker` - 获取24小时交易统计

### 账户管理
- `get_account_info` - 获取账户信息和余额
- `get_wallet_balance` - 获取特定账户类型的钱包余额
- `get_open_orders` - 获取活跃订单列表
- `get_order_history` - 获取历史订单

### 交易功能（仅测试网）
- `place_order` - 下新订单
- `cancel_order` - 取消现有订单
- `cancel_all_orders` - 取消某个交易对或类别的所有订单

## 使用示例

向您的AI助手询问：
- "获取Bybit上BTCUSDT的当前价格"
- "显示ETHUSDT的50档订单簿"
- "查看我的账户余额"
- "以45000美元的价格下0.1个BTC的限价买单"
- "取消BTCUSDT的所有挂单"
- "获取我最近20个订单的交易历史"

## 安全性

⚠️ **重要安全提示**：
- 交易操作默认**仅限测试网**以确保安全
- API密钥会自动从错误消息中隐藏
- 开发和测试时始终使用测试网
- 只有在完全确定实现正确时才切换到主网

🔐 **API密钥安全**：
- 永远不要将API密钥提交到版本控制
- 使用环境变量存储凭证
- 定期轮换您的API密钥
- 在Bybit API设置中使用IP限制

## 开发

```bash
npm run build     # 编译TypeScript
npm run dev       # 开发模式
npm run lint      # 运行代码检查
npm run typecheck # 类型检查
npm run watch     # 监视模式
```

### 本地开发

1. 克隆仓库：
```bash
git clone https://github.com/your-username/bybit-mcp-server.git
cd bybit-mcp-server
```

2. 安装依赖：
```bash
npm install
```

3. 设置环境：
```bash
cp .env.example .env
# 编辑.env文件添加您的API凭证
```

4. 运行开发模式：
```bash
npm run dev
```

## 配置选项

| 变量 | 描述 | 默认值 | 必需 |
|------|------|--------|------|
| `BYBIT_API_KEY` | 您的Bybit API密钥 | - | ✅ |
| `BYBIT_API_SECRET` | 您的Bybit API密钥 | - | ✅ |
| `BYBIT_ENVIRONMENT` | `testnet` 或 `mainnet` | `testnet` | ❌ |
| `BYBIT_BASE_URL` | 自定义API基础URL | 自动检测 | ❌ |
| `DEBUG` | 启用调试日志 | `false` | ❌ |

## API参考

本服务器实现了Bybit的V5 API端点。详细API文档：
- [Bybit V5 API 文档](https://bybit-exchange.github.io/docs/v5/intro)
- [Bybit API GitHub](https://github.com/bybit-exchange/bybit-official-api-docs)

## 贡献

1. Fork仓库
2. 创建功能分支（`git checkout -b feature/amazing-feature`）
3. 提交更改（`git commit -m 'Add some amazing feature'`）
4. 推送到分支（`git push origin feature/amazing-feature`）
5. 打开Pull Request

## 许可证

MIT许可证 - 详见[LICENSE](LICENSE)文件。

## 支持

- 📚 [文档](https://bybit-exchange.github.io/docs/)
- 🐛 [问题反馈](https://github.com/your-username/bybit-mcp-server/issues)
- 💬 [讨论](https://github.com/your-username/bybit-mcp-server/discussions)