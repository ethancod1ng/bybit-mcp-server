# Bybit MCP Server

> **多言語ドキュメント**
> - [English](README.md)
> - [中文](README_CN.md)
> - [日本語](README_JA.md)

BybitエクスチェンジのModel Context Protocol（MCP）サーバーで、Claude CodeやCursorなどのAIコーディングツールがBybitの取引プラットフォームと連携できるようにします。

## クイックスタート

### インストール

```bash
npm install -g bybit-mcp-server
```

### 設定

このMCPサーバーは、MCPをサポートする様々なAIツールで使用できます：

[![Claude](https://img.shields.io/badge/Claude-FF6B35?style=for-the-badge&logo=anthropic&logoColor=white)](https://claude.ai) [![Cursor](https://img.shields.io/badge/Cursor-000000?style=for-the-badge&logo=cursor&logoColor=white)](https://cursor.sh)

#### Claude Code 設定

**テストネット設定（推奨 - 安全なテスト）：**
`claude_desktop_config.json`に追加：

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

**メインネット設定（⚠️ 警告：実資金を使用）：**
`claude_desktop_config.json`に追加：

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

#### Cursor 設定

上記のClaude Codeと同じ設定を使用しますが、`.cursor/mcp_config.json` に追加し、`mcpServers` の代わりに `mcp.servers` を使用してください。

### 環境設定

**オプション1：テストネット（推奨）**
```env
BYBIT_API_KEY=your_testnet_api_key_here
BYBIT_API_SECRET=your_testnet_api_secret_here
BYBIT_ENVIRONMENT=testnet
DEBUG=false
```

**オプション2：メインネット（⚠️ 実資金）**
```env
BYBIT_API_KEY=your_mainnet_api_key_here
BYBIT_API_SECRET=your_mainnet_api_secret_here
BYBIT_ENVIRONMENT=mainnet
DEBUG=false
```

### APIキーの取得

**テストネット：**
1. [Bybitテストネット](https://testnet.bybit.com/)にアクセス
2. アカウントを登録
3. API管理でAPIキーを作成
4. 必要な権限を有効化（読み取り、取引）

**メインネット：**
1. [Bybit](https://www.bybit.com/)にアクセス
2. アカウント認証を完了
3. API管理でAPIキーを作成
4. 必要な権限を有効化（読み取り、取引）
5. セキュリティ強化のためIP制限を設定

## 利用可能なツール

### マーケットデータ
- `get_price` - 取引シンボルの現在価格を取得
- `get_orderbook` - 取引シンボルのオーダーブック深度を取得
- `get_klines` - 履歴ローソク足データを取得
- `get_24hr_ticker` - 24時間取引統計を取得

### アカウント管理
- `get_account_info` - アカウント情報と残高を取得
- `get_wallet_balance` - 特定のアカウントタイプのウォレット残高を取得
- `get_open_orders` - 未約定/アクティブオーダーリストを取得
- `get_order_history` - 履歴オーダーを取得

### 取引（⚠️ メインネットでは実資金を使用）
- `place_order` - 新しいオーダーを発注
- `cancel_order` - 既存のオーダーをキャンセル
- `cancel_all_orders` - シンボルまたはカテゴリのすべてのオーダーをキャンセル

## 使用例

AIアシスタントに以下のように依頼してください：
- "BybitでBTCUSDTの現在価格を取得して"
- "ETHUSDTのオーダーブックを50レベル表示して"
- "アカウント残高を教えて"
- "0.1 BTCを45000ドルで指値買い注文を出して"
- "BTCUSDTのすべての未約定注文をキャンセルして"
- "過去20件の取引履歴を取得して"

## セキュリティ

⚠️ **重要なセキュリティ注意事項**：
- **テストネット**がデフォルトで推奨される安全な環境です
- **メインネット**の操作では実資金を使用 - 極めて慎重に使用してください
- APIキーはエラーメッセージから自動的に除去されます
- メインネット使用前にテストネットで十分にテストしてください
- メインネットでの取引操作時には警告が表示されます

🔐 **APIキーの安全性**：
- APIキーをバージョン管理にコミットしないでください
- 認証情報には環境変数を使用してください
- APIキーを定期的にローテーションしてください
- Bybit API設定でIP制限を使用してください

## 開発

```bash
npm run build     # TypeScriptコンパイル
npm run dev       # 開発モード
npm run lint      # リンティング実行
npm run typecheck # 型チェック
npm run watch     # ウォッチモード
```

### ローカル開発

1. リポジトリをクローン：
```bash
git clone https://github.com/ethancod1ng/bybit-mcp-server.git
cd bybit-mcp-server
```

2. 依存関係をインストール：
```bash
npm install
```

3. 環境を設定：
```bash
cp .env.example .env
# .envにAPI認証情報を編集
```

4. 開発モードで実行：
```bash
npm run dev
```

## 設定オプション

| 変数 | 説明 | デフォルト | 必須 |
|----------|-------------|---------|----------|
| `BYBIT_API_KEY` | Bybit APIキー | - | ✅ |
| `BYBIT_API_SECRET` | Bybit APIシークレット | - | ✅ |
| `BYBIT_ENVIRONMENT` | `testnet`または`mainnet` | `testnet` | ❌ |
| `BYBIT_BASE_URL` | カスタムAPI ベースURL | 自動検出 | ❌ |
| `DEBUG` | デバッグログ有効化 | `false` | ❌ |

## APIリファレンス

このサーバーはBybitのV5 APIエンドポイントを実装しています。詳細なAPIドキュメント：
- [Bybit V5 APIドキュメント](https://bybit-exchange.github.io/docs/v5/intro)
- [Bybit API GitHub](https://github.com/bybit-exchange/bybit-official-api-docs)

## コントリビューション

1. リポジトリをフォーク
2. フィーチャーブランチを作成（`git checkout -b feature/amazing-feature`）
3. 変更をコミット（`git commit -m 'Add some amazing feature'`）
4. ブランチにプッシュ（`git push origin feature/amazing-feature`）
5. プルリクエストを開く

## ライセンス

MIT License - 詳細は[LICENSE](LICENSE)ファイルを参照してください。

## サポート

- 📚 [ドキュメント](https://bybit-exchange.github.io/docs/)
- 🐛 [Issues](https://github.com/ethancod1ng/bybit-mcp-server/issues)
- 💬 [Discussions](https://github.com/ethancod1ng/bybit-mcp-server/discussions)