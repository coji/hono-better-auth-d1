import { useSession } from '~/hooks/use-session'
import { SigninForm } from '@/components/signin-form'
import { Dashboard } from '@/components/dashboard'

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
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto mb-4" />
          <p>読み込み中...</p>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
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
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <SigninForm />
    </div>
  )
}
