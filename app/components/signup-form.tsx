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
import { useNavigate } from 'react-router'

export function SignupForm() {
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')
  const navigate = useNavigate()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')

    const formData = new FormData(e.currentTarget as HTMLFormElement)
    const name = formData.get('name')?.toString()
    const email = formData.get('email')?.toString()
    const password = formData.get('password')?.toString()
    const confirmPassword = formData.get('confirmPassword')?.toString()

    if (!name || !email || !password || !confirmPassword) {
      setError('すべての項目を入力してください')
      return
    }

    if (password !== confirmPassword) {
      setError('パスワードが一致しません')
      return
    }

    if (password.length < 8) {
      setError('パスワードは8文字以上で入力してください')
      return
    }

    setIsLoading(true)

    await authClient.signUp.email(
      {
        name,
        email,
        password,
      },
      {
        onSuccess: () => {
          navigate('/')
        },
        onError: (error) => {
          console.log(error)
        },
      },
    )

    setIsLoading(false)
  }

  return (
    <Card className="mx-auto w-full max-w-md">
      <CardHeader>
        <CardTitle>アカウント作成</CardTitle>
        <CardDescription>新しいアカウントを作成してください</CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="name">ユーザー名</Label>
            <Input
              id="name"
              name="name"
              type="text"
              required
              placeholder="ユーザー名を入力"
            />
          </div>

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
              placeholder="8文字以上"
              minLength={8}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="confirmPassword">パスワード確認</Label>
            <Input
              id="confirmPassword"
              name="confirmPassword"
              type="password"
              required
              placeholder="パスワードを再入力"
            />
          </div>

          {error && (
            <div className="rounded bg-red-50 p-3 text-sm text-red-600">
              {error}
            </div>
          )}

          <Button type="submit" className="w-full" disabled={isLoading}>
            {isLoading ? 'アカウント作成中...' : 'アカウント作成'}
          </Button>
        </form>
      </CardContent>
    </Card>
  )
}
