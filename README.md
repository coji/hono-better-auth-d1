# Hono Better Auth D1

フルスタック認証アプリケーション - Hono + Better Auth + Cloudflare D1 + React Router + Conform + Zod

## 🚀 技術スタック

### バックエンド

- **[Hono](https://hono.dev/)** - 軽量で高速なWebフレームワーク
- **[Better Auth](https://www.better-auth.com/)** - モダンな認証ライブラリ
- **[Cloudflare D1](https://developers.cloudflare.com/d1/)** - SQLiteベースのサーバーレスデータベース
- **[Drizzle ORM](https://orm.drizzle.team/)** - TypeScript ORMとスキーマビルダー

### フロントエンド

- **[React Router v7](https://reactrouter.com/)** - SPAモード（`ssr: false`）でファイルベースルーティング
- **[Conform](https://conform.guide/)** - 型安全なフォームバリデーション
- **[Zod](https://zod.dev/)** - TypeScript ファーストスキーマバリデーション
- **[Tailwind CSS v4](https://tailwindcss.com/)** - ユーティリティファーストCSSフレームワーク
- **[Radix UI](https://www.radix-ui.com/)** - アクセシブルなプリミティブコンポーネント

### 開発ツール

- **TypeScript** - 型安全性
- **Biome** - 高速なリンター・フォーマッター
- **Prettier** - コードフォーマッター
- **pnpm** - 高速なパッケージマネージャー

## ✨ 機能

- ✅ メール・パスワード認証
- ✅ ユーザー登録（サインアップ）- 名前、メール、パスワード確認付き
- ✅ ユーザーログイン（サインイン）
- ✅ セッション管理と自動リダイレクト
- ✅ レスポンシブなUI/UX
- ✅ リアルタイムフォームバリデーション（Conform + Zod）
- ✅ エラーハンドリング
- ✅ ローディング状態表示
- ✅ 型安全なフォーム処理

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

```txt
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
├── app/                   # フロントエンド（React Router v7 SPA）
│   ├── components/        # UIコンポーネント
│   │   └── ui/           # Radix UI ベースコンポーネント
│   │       ├── button.tsx
│   │       ├── card.tsx
│   │       ├── input.tsx
│   │       └── label.tsx
│   ├── hooks/
│   │   └── use-session.ts # セッション管理フック
│   ├── lib/
│   │   ├── auth-client.ts # Better Auth クライアント
│   │   └── utils.ts       # ユーティリティ関数
│   ├── routes/           # ファイルベースルーティング
│   │   ├── _index/       # ホームページ
│   │   ├── signin/       # サインインページ（Conform + Zod）
│   │   └── signup/       # サインアップページ（Conform + Zod）
│   ├── root.tsx          # ルートコンポーネント
│   ├── routes.ts         # ルート定義
│   └── app.css           # グローバルスタイル
├── migrations/            # データベースマイグレーション
├── scripts/              # スクリプト
├── public/               # 静的ファイル
├── react-router.config.ts # React Router設定（SPAモード）
├── components.json       # UI コンポーネント設定
├── drizzle.config.ts     # Drizzle ORM設定
└── wrangler.jsonc        # Cloudflare Workers設定
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

認証APIは `/api/auth` 下にマウントされています：

- `POST /api/auth/sign-up` - ユーザー登録
- `POST /api/auth/sign-in` - ユーザーログイン
- `POST /api/auth/sign-out` - ユーザーログアウト
- `GET /api/auth/session` - セッション情報取得

## 🔧 環境変数設定

### 開発環境

#### .env（SPAクライアント用）
```bash
BETTER_AUTH_SECRET=your-secret-key
DATABASE_URL=:memory:

# SPA用（Viteビルド時に埋め込まれる）
VITE_API_URL=http://localhost:8787
```

#### wrangler.jsonc（Cloudflare Workers用）
```jsonc
{
  "vars": {
    "BETTER_AUTH_URL": "http://localhost:8787",
    "CLIENT_ORIGIN": "http://localhost:5173"
  }
}
```

### 本番環境

本番デプロイ時は `wrangler.jsonc` の `vars` を更新：

```jsonc
{
  "vars": {
    "BETTER_AUTH_URL": "https://your-api.domain.com",
    "CLIENT_ORIGIN": "https://your-spa.domain.com"
  }
}
```

複数オリジンを許可する場合はカンマ区切り：
```jsonc
"CLIENT_ORIGIN": "https://app.domain.com,https://admin.domain.com"
```

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

3. `wrangler.jsonc` を更新：
   - 作成されたデータベースIDを設定
   - 本番用の環境変数を設定

4. 本番データベースにマイグレーション実行：

```bash
pnpm db:migrate:prod
```

5. デプロイ：

```bash
pnpm deploy
```

## ⚙️ React Router v7 SPA 設定

`react-router.config.ts`:

```typescript
export default {
  ssr: false, // SPAモード有効
  prerender: true, // プリレンダリング有効
} satisfies Config
```

SPAモードにより：

- クライアントサイドルーティング
- 高速なページ遷移
- ビルド時プリレンダリング

## 📋 フォームバリデーション

### Conform + Zod の利点

- **型安全性**: Zodスキーマから自動的にTypeScriptの型を生成
- **リアルタイムバリデーション**: クライアント・サーバー両方でバリデーション
- **アクセシビリティ**: 自動的にaria属性を設定
- **パフォーマンス**: 最適化されたレンダリング

### サインインフォーム

```typescript
const schema = z.object({
  email: z.string().email('有効なメールアドレスを入力してください'),
  password: z.string().min(6, 'パスワードは6文字以上で入力してください'),
})
```

### サインアップフォーム

```typescript
const schema = z.object({
  name: z.string().min(1, 'ユーザー名は必須です'),
  email: z.string().email('有効なメールアドレスを入力してください'),
  password: z.string().min(8, 'パスワードは8文字以上で入力してください'),
  confirmPassword: z.string().min(8, 'パスワード確認は必須です'),
})
```

## 🔐 認証フロー

1. **サインアップ**: `/signup` でユーザー名、メールアドレス、パスワード、パスワード確認を入力
2. **サインイン**: `/signin` でメールアドレスとパスワードを入力
3. **セッション管理**: サインイン後は自動的にホームページにリダイレクト
4. **ルートガード**: セッションがある場合は認証ページにアクセス不可

## 🎨 UI コンポーネント

プロジェクトでは Radix UI をベースとしたカスタムコンポーネントを使用しています：

- **Button**: `app/components/ui/button.tsx`
- **Card**: `app/components/ui/card.tsx`
- **Input**: `app/components/ui/input.tsx`
- **Label**: `app/components/ui/label.tsx`

## 📝 開発ノート

- **React Router v7**: SPAモード（`ssr: false`）でプリレンダリング有効
- **TypeScript設定**: モノレポ構成で、フロントエンドとバックエンドで分離
- **Better Auth**: email/password認証のみ有効化
- **環境設定**: Cloudflare Workers の `nodejs_compat_populate_process_env` で `process.env` 対応
- **動的CORS**: 環境変数によるオリジン設定でマルチ環境対応
- **動的Auth設定**: Better Auth の `trustedOrigins` も環境変数で動的設定
- **フォーム処理**: Conform + Zod で型安全なフォームバリデーション
- **セッション管理**: クライアントサイドでのセッション状態管理

## 🤝 コントリビューション

1. このリポジトリをフォーク
2. 機能ブランチを作成 (`git checkout -b feature/amazing-feature`)
3. 変更をコミット (`git commit -m 'Add amazing feature'`)
4. ブランチにプッシュ (`git push origin feature/amazing-feature`)
5. プルリクエストを作成

## 📄 ライセンス

このプロジェクトはMITライセンスの下で公開されています。
