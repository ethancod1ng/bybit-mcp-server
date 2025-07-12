# 本地MCP服务器测试配置

## 方法1: 使用 Claude Code 测试

### 1. 构建项目
```bash
cd /data/bybit-mcp-server
npm run build
```

### 2. 配置 Claude Code

在 Claude Code 配置文件中添加：

**方法 A: 使用本地路径**
```json
{
  "mcpServers": {
    "bybit": {
      "command": "node",
      "args": ["/data/bybit-mcp-server/dist/index.js"],
      "env": {
        "BYBIT_API_KEY": "your_testnet_api_key",
        "BYBIT_API_SECRET": "your_testnet_api_secret",
        "BYBIT_ENVIRONMENT": "testnet"
      }
    }
  }
}
```

**方法 B: 使用 tsx (开发模式)**
```json
{
  "mcpServers": {
    "bybit": {
      "command": "npx",
      "args": ["tsx", "/data/bybit-mcp-server/src/index.ts"],
      "env": {
        "BYBIT_API_KEY": "your_testnet_api_key",
        "BYBIT_API_SECRET": "your_testnet_api_secret",
        "BYBIT_ENVIRONMENT": "testnet"
      }
    }
  }
}
```

### 3. 重启 Claude Code
重启Claude Code以加载新配置。

## 方法2: 使用 npm link 测试

### 1. 构建并链接
```bash
cd /data/bybit-mcp-server
npm run build
npm link
```

### 2. 验证安装
```bash
which bybit-mcp-server
```

### 3. 配置 Claude Code
```json
{
  "mcpServers": {
    "bybit": {
      "command": "bybit-mcp-server",
      "env": {
        "BYBIT_API_KEY": "your_testnet_api_key",
        "BYBIT_API_SECRET": "your_testnet_api_secret",
        "BYBIT_ENVIRONMENT": "testnet"
      }
    }
  }
}
```

## 方法3: 直接命令行测试

### 1. 测试服务器启动
```bash
cd /data/bybit-mcp-server
BYBIT_API_KEY=your_key BYBIT_API_SECRET=your_secret npm run dev
```

### 2. 使用 MCP 客户端测试
```bash
# 安装 MCP 客户端工具
npm install -g @modelcontextprotocol/cli

# 测试连接
mcp-client connect node /data/bybit-mcp-server/dist/index.js
```

## 获取 Bybit 测试网 API

1. 访问 [Bybit 测试网](https://testnet.bybit.com/)
2. 注册账户
3. 在API管理中创建API密钥
4. 记录API Key和Secret

## 测试步骤

1. **验证连接**：
   ```
   Ask Claude: "List available tools from Bybit"
   ```

2. **测试市场数据**：
   ```
   Ask Claude: "Get the current price of BTCUSDT from Bybit"
   ```

3. **测试账户信息**：
   ```
   Ask Claude: "Get my Bybit account balance"
   ```

## 故障排除

### 常见问题

1. **服务器无法启动**
   - 检查环境变量是否设置
   - 确认API密钥有效
   - 查看日志输出

2. **Claude Code 无法连接**
   - 检查配置文件路径
   - 确认dist目录存在
   - 重启Claude Code

3. **API调用失败**
   - 确认使用测试网环境
   - 检查API密钥权限
   - 验证网络连接

### 调试命令
```bash
# 查看详细日志
DEBUG=true npm run dev

# 检查类型
npm run typecheck

# 运行linter
npm run lint
```