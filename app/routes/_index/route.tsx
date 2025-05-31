import { Dashboard } from '@/components/dashboard'
import { SigninForm } from '@/components/signin-form'
import { useSession } from '~/hooks/use-session'

export function meta() {
  return [
    { title: 'ホーム - Better Auth App' },
    { name: 'description', content: 'Better Auth を使用した認証アプリ' },
  ]
}

export default function Home() {
  const { data, isPending, error } = useSession()

  if (isPending) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="mx-auto mb-4 h-8 w-8 animate-spin rounded-full border-b-2 border-blue-600" />
          <p>読み込み中...</p>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gray-50">
        <div className="text-center text-red-600">
          <p>エラーが発生しました: {error.message}</p>
        </div>
      </div>
    )
  }

  // ユーザーがサインイン済みの場合はダッシュボードを表示
  if (data?.user) {
    return <Dashboard user={data.user} />
  }

  // 未サインインの場合はサインインフォームを表示
  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50 px-4 py-12 sm:px-6 lg:px-8">
      <SigninForm />
    </div>
  )
}
