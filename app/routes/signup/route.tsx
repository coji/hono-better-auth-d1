import { SignupForm } from '@/components/signup-form'

export function meta() {
  return [
    { title: 'サインアップ' },
    { name: 'description', content: '新しいアカウントを作成してください' },
  ]
}

export default function Signup() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50 px-4 py-12 sm:px-6 lg:px-8">
      <SignupForm />
    </div>
  )
}
