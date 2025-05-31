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
  email: z.string().email('有効なメールアドレスを入力してください'),
  password: z.string().min(6, 'パスワードは6文字以上で入力してください'),
})

export const meta: Route.MetaFunction = () => {
  return [
    { title: 'サインイン - Better Auth App' },
    { name: 'description', content: 'Better Auth を使用した認証アプリ' },
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

  const result = await authClient.signIn.email({
    email: submission.value.email,
    password: submission.value.password,
  })

  if (result.data) {
    return redirect(href('/'))
  }
  return {
    lastResult: submission.reply({
      formErrors: [
        'サインインに失敗しました。メールアドレスとパスワードを確認してください。',
      ],
    }),
  }
}

export default function SignInPage({ actionData }: Route.ComponentProps) {
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
          <CardTitle>サインイン</CardTitle>
          <CardDescription>アカウントにサインインしてください</CardDescription>
        </CardHeader>
        <CardContent>
          <Form method="POST" {...getFormProps(form)} className="space-y-4">
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
                placeholder="パスワードを入力"
              />
              <div
                id={fields.password.errorId}
                className="text-sm text-red-600"
              >
                {fields.password.errors}
              </div>
            </div>

            {form.errors && (
              <div className="rounded bg-red-50 p-3 text-sm text-red-600">
                {form.errors}
              </div>
            )}

            <Button type="submit" className="w-full" disabled={isLoading}>
              {isLoading ? 'サインイン中...' : 'サインイン'}
            </Button>
          </Form>

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
    </div>
  )
}
