import { getFormProps, getInputProps, useForm } from '@conform-to/react'
import { getZodConstraint, parseWithZod } from '@conform-to/zod'
import { Label } from '@radix-ui/react-label'
import { Form, href, Link, redirect, useNavigation } from 'react-router'
import { z } from 'zod'
import { Button } from '~/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '~/components/ui/card'
import { Input } from '~/components/ui/input'
import { authClient } from '~/lib/auth-client'
import type { Route } from './+types/route'

const schema = z.object({
  name: z.string().min(1, 'ユーザー名は必須です'),
  email: z.string().email('有効なメールアドレスを入力してください'),
  password: z.string().min(8, 'パスワードは8文字以上で入力してください'),
  confirmPassword: z.string().min(8, 'パスワード確認は必須です'),
})

export const meta: Route.MetaFunction = () => {
  return [
    { title: 'サインアップ' },
    { name: 'description', content: '新しいアカウントを作成してください' },
  ]
}

export const clientLoader = async () => {
  const session = await authClient.getSession()
  if (session.data) {
    return redirect(href('/'))
  }
  return {}
}

export const clientAction = async ({ request }: Route.ActionArgs) => {
  const submission = parseWithZod(await request.formData(), { schema })
  if (submission.status !== 'success') {
    return { lastResult: submission.reply() }
  }

  const { name, email, password, confirmPassword } = submission.value
  if (password !== confirmPassword) {
    return {
      lastResult: submission.reply({
        formErrors: ['パスワードが一致しません'],
      }),
    }
  }

  const result = await authClient.signUp.email({ name, email, password })
  if (!result.data) {
    console.log(result.error)
    return {
      lastResult: submission.reply({
        formErrors: ['アカウントの作成に失敗しました。再度お試しください。'],
      }),
    }
  }

  return redirect(href('/'))
}

export default function SignupPage({ actionData }: Route.ComponentProps) {
  const [form, fields] = useForm({
    lastResult: actionData?.lastResult,
    onValidate: ({ formData }) => parseWithZod(formData, { schema }),
    constraint: getZodConstraint(schema),
  })
  const navigation = useNavigation()
  const isLoading = navigation.state === 'submitting'

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50 px-4 py-12 sm:px-6 lg:px-8">
      <Card className="mx-auto w-full max-w-md">
        <CardHeader>
          <CardTitle>アカウント作成</CardTitle>
          <CardDescription>新しいアカウントを作成してください</CardDescription>
        </CardHeader>
        <CardContent>
          <Form method="POST" {...getFormProps(form)} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor={fields.name.id}>ユーザー名</Label>
              <Input
                {...getInputProps(fields.name, { type: 'text' })}
                placeholder="ユーザー名を入力"
              />
              <div id={fields.name.errorId} className="text-sm text-red-600">
                {fields.name.errors}
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor={fields.email.id}>メールアドレス</Label>
              <Input
                {...getInputProps(fields.email, { type: 'email' })}
                placeholder="example@email.com"
              />
              <div id={fields.email.errorId} className="text-sm text-red-600">
                {fields.email.errors}
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor={fields.password.id}>パスワード</Label>
              <Input
                {...getInputProps(fields.password, { type: 'password' })}
                placeholder="8文字以上"
              />
              <div
                id={fields.password.errorId}
                className="text-sm text-red-600"
              >
                {fields.password.errors}
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor={fields.confirmPassword.id}>パスワード確認</Label>
              <Input
                {...getInputProps(fields.confirmPassword, { type: 'password' })}
                placeholder="パスワードを再入力"
              />
              <div
                id={fields.confirmPassword.errorId}
                className="text-sm text-red-600"
              >
                {fields.confirmPassword.errors}
              </div>
            </div>

            {form.errors && (
              <div className="rounded bg-red-50 p-3 text-sm text-red-600">
                {form.errors}
              </div>
            )}

            <Button type="submit" className="w-full" disabled={isLoading}>
              {isLoading ? 'アカウント作成中...' : 'アカウント作成'}
            </Button>
          </Form>

          <div className="mt-4 text-center">
            <p className="text-sm text-gray-600">
              アカウントをお持ちの方は{' '}
              <Link
                to={href('/signin')}
                className="text-blue-600 hover:underline"
              >
                こちらからサインイン
              </Link>
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
