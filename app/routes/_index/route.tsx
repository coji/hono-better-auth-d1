import { href, redirect, useNavigate } from 'react-router'
import { Button } from '~/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '~/components/ui/card'
import { authClient } from '~/lib/auth-client'
import type { Route } from './+types/route'

export const meta: Route.MetaFunction = () => {
  return [
    { title: 'ホーム - Better Auth App' },
    { name: 'description', content: 'Better Auth を使用した認証アプリ' },
  ]
}

export const clientLoader = async () => {
  const session = await authClient.getSession()

  if (!session.data) {
    return redirect(href('/signin'))
  }

  return { session: session.data.session, user: session.data.user }
}

export default function Home({
  loaderData: { session, user },
}: Route.ComponentProps) {
  const navigate = useNavigate()

  const handleSignOut = async () => {
    try {
      await authClient.signOut()
      navigate('/')
    } catch (error) {
      console.error('Sign out error:', error)
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 px-4 py-12 sm:px-6 lg:px-8">
      <Card className="mx-auto w-full max-w-2xl">
        <CardHeader>
          <CardTitle>ダッシュボード</CardTitle>
          <CardDescription>ようこそ、{user.name}さん</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <p>
              <strong>ユーザー名:</strong> {user.name}
            </p>
            <p>
              <strong>メールアドレス:</strong> {user.email}
            </p>
            <p>
              <strong>ユーザーID:</strong> {user.id}
            </p>
          </div>

          <Button
            onClick={handleSignOut}
            type="button"
            variant="outline"
            className="w-full"
          >
            サインアウト
          </Button>
        </CardContent>
      </Card>
    </div>
  )
}
