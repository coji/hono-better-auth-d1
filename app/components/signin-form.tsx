import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { authClient } from '@/lib/auth-client'
import { useState } from 'react'
import { Link, useNavigate } from 'react-router'

export function SigninForm() {
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')
  const navigate = useNavigate()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')

    const formData = new FormData(e.currentTarget as HTMLFormElement)
    const email = formData.get('email')?.toString()
    const password = formData.get('password')?.toString()

    if (!email || !password) {
      setError('メールアドレスとパスワードを入力してください')
      return
    }

    setIsLoading(true)

    await authClient.signIn.email(
      {
        email,
        password,
      },
      {
        onSuccess: () => {
          navigate('/')
        },
        onError: (error) => {
          setError(
            'サインインに失敗しました。メールアドレスとパスワードを確認してください。',
          )
          console.error('Signin error:', error)
        },
      },
    )

    setIsLoading(false)
  }

  return (
    <Card className="mx-auto w-full max-w-md">
      <CardHeader>
        <CardTitle>サインイン</CardTitle>
        <CardDescription>アカウントにサインインしてください</CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="email">メールアドレス</Label>
            <Input
              id="email"
              name="email"
              type="email"
              required
              placeholder="example@email.com"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="password">パスワード</Label>
            <Input
              id="password"
              name="password"
              type="password"
              required
              placeholder="パスワードを入力"
            />
          </div>

          {error && (
            <div className="rounded bg-red-50 p-3 text-sm text-red-600">
              {error}
            </div>
          )}

          <Button type="submit" className="w-full" disabled={isLoading}>
            {isLoading ? 'サインイン中...' : 'サインイン'}
          </Button>
        </form>

        <div className="mt-4 text-center">
          <p className="text-sm text-gray-600">
            アカウントをお持ちでない方は{' '}
            <Link to="/signup" className="text-blue-600 hover:underline">
              こちらからサインアップ
            </Link>
          </p>
        </div>
      </CardContent>
    </Card>
  )
}
