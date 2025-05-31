# Hono Better Auth D1

フルスタック認証アプリケーション - Hono + Better Auth + Cloudflare D1 + React Router + shadcn/ui

## 🚀 技術スタック

### バックエンド
- **[Hono](https://hono.dev/)** - 軽量で高速なWebフレームワーク
- **[Better Auth](https://www.better-auth.com/)** - モダンな認証ライブラリ
- **[Cloudflare D1](https://developers.cloudflare.com/d1/)** - SQLiteベースのサーバーレスデータベース
- **[Drizzle ORM](https://orm.drizzle.team/)** - TypeScript ORMとスキーマビルダー

### フロントエンド
- **[React Router v7](https://reactrouter.com/)** - ファイルベースルーティング付きフルスタックReactフレームワーク
- **[Tailwind CSS v4](https://tailwindcss.com/)** - ユーティリティファーストCSSフレームワーク
- **[shadcn/ui](https://ui.shadcn.com/)** - 美しく再利用可能なコンポーネント

### 開発ツール
- **TypeScript** - 型安全性
- **Biome** - 高速なリンター・フォーマッター
- **Prettier** - コードフォーマッター
- **pnpm** - 高速なパッケージマネージャー

## ✨ 機能

- ✅ メール・パスワード認証
- ✅ ユーザー登録（サインアップ）
- ✅ ユーザーログイン（サインイン）
- ✅ セッション管理
- ✅ レスポンシブなUI/UX
- ✅ フォームバリデーション
- ✅ エラーハンドリング
- ✅ ローディング状態表示

## 🛠️ セットアップ

### 前提条件

- Node.js 18+
- pnpm
- Cloudflareアカウント（デプロイ用）

### インストール

```bash
# リポジトリをクローン
git clone <repository-url>
cd hono-better-auth-d1

# 依存関係をインストール
pnpm install
```

### 環境設定

```bash
# D1データベースを作成（ローカル開発用）
pnpm db:generate
pnpm db:migrate
```

### 開発サーバー起動

```bash
# APIサーバーとクライアントを同時起動
pnpm dev

# または個別に起動
pnpm dev:api    # Honoバックエンド（Wrangler）
pnpm dev:client # React Routerフロントエンド
```

## 📁 プロジェクト構造

```
├── api/                    # バックエンド（Hono）
│   ├── index.ts           # メインアプリケーション
│   ├── lib/
│   │   ├── auth.config.ts # Better Auth設定
│   │   └── auth.ts        # 認証インスタンス
│   ├── db/
│   │   ├── index.ts       # データベース接続
│   │   ├── schema.ts      # メインスキーマ
│   │   └── schema-auth.ts # 認証スキーマ
│   └── routes/
│       └── auth.ts        # 認証API ルート
├── app/                   # フロントエンド（React Router）
│   ├── components/        # UIコンポーネント
│   │   ├── ui/           # shadcn/ui コンポーネント
│   │   ├── signin-form.tsx
│   │   ├── signup-form.tsx
│   │   └── dashboard.tsx
│   ├── lib/
│   │   ├── auth-client.ts # Better Auth クライアント
│   │   └── utils.ts       # ユーティリティ関数
│   └── routes/           # ページルート
│       ├── _index/       # ホームページ
│       └── signup/       # サインアップページ
├── migrations/            # データベースマイグレーション
├── scripts/              # スクリプト
└── public/               # 静的ファイル
```

## 🔧 利用可能なコマンド

### 開発
```bash
pnpm dev                   # 開発サーバー起動（フロント・バック同時）
pnpm dev:api              # バックエンドのみ起動
pnpm dev:client           # フロントエンドのみ起動
pnpm build                # プロダクションビルド
```

### データベース
```bash
pnpm db:generate          # マイグレーションファイル生成
pnpm db:migrate           # ローカルDBマイグレーション実行
pnpm db:migrate:prod      # 本番DBマイグレーション実行
pnpm auth:generate        # Better Auth スキーマ生成
```

### コード品質
```bash
pnpm validate             # 全体検証（フォーマット・リント・型チェック）
pnpm lint                 # Biome リント実行
pnpm format               # Prettier フォーマットチェック
pnpm typecheck            # TypeScript 型チェック
```

### デプロイ
```bash
pnpm deploy               # Cloudflare Workers にデプロイ
pnpm typegen              # Cloudflare Workers 型生成
```

## 🌐 API エンドポイント

認証APIは `/api` 下にマウントされています：

- `POST /api/sign-up` - ユーザー登録
- `POST /api/sign-in` - ユーザーログイン
- `POST /api/sign-out` - ユーザーログアウト
- `GET /api/session` - セッション情報取得

## 🚀 デプロイ

### Cloudflare Workers & D1

1. Cloudflareアカウントでログイン：
```bash
npx wrangler login
```

2. D1データベースを作成：
```bash
npx wrangler d1 create hono-better-auth-db
```

3. `wrangler.jsonc` を更新して、作成されたデータベースIDを設定

4. 本番データベースにマイグレーション実行：
```bash
pnpm db:migrate:prod
```

5. デプロイ：
```bash
pnpm deploy
```

## 🎨 UI コンポーネント

プロジェクトでは [shadcn/ui](https://ui.shadcn.com/) を使用しています。新しいコンポーネントを追加する場合：

```bash
pnpm dlx shadcn@latest add button
pnpm dlx shadcn@latest add input
# など...
```

## 🔐 認証フロー

1. **サインアップ**: `/signup` でユーザー名、メールアドレス、パスワードを入力
2. **サインイン**: ホームページでメールアドレスとパスワードを入力
3. **セッション管理**: サインイン後はダッシュボードが表示
4. **サインアウト**: ダッシュボードからサインアウト可能

## 📝 開発ノート

- TypeScript設定はモノレポ構成で、フロントエンドとバックエンドで分離
- Better Authはemail/password認証のみ有効化
- CORS設定でローカル開発環境（localhost:5173）に対応
- フォームはFormDataベースで実装（React状態管理なし）

## 🤝 コントリビューション

1. このリポジトリをフォーク
2. 機能ブランチを作成 (`git checkout -b feature/amazing-feature`)
3. 変更をコミット (`git commit -m 'Add amazing feature'`)
4. ブランチにプッシュ (`git push origin feature/amazing-feature`)
5. プルリクエストを作成

## 📄 ライセンス

このプロジェクトはMITライセンスの下で公開されています。