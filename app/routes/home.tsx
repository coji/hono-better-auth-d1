import { useNavigate } from 'react-router'
import { authClient } from '~/lib/auth-client'
export function meta() {
  return [
    { title: 'New React Router App' },
    { name: 'description', content: 'Welcome to React Router!' },
  ]
}

export default function Home() {
  const navigate = useNavigate()

  return (
    <div>
      <form
        onSubmit={(e) => {
          e.preventDefault()
          const formData = new FormData(e.currentTarget)
          const email = formData.get('email')?.toString()
          const password = formData.get('password')?.toString()
          console.log('Email:', email, 'Password:', password)
          if (!email || !password) {
            console.error('Email and password are required')
            return
          }

          authClient.signIn.email(
            {
              email,
              password,
            },
            {
              onSuccess: () => {
                navigate('/')
              },
              onError: (error) => {
                console.error(error)
              },
            },
          )
        }}
      >
        <input name="email" />
        <input name="password" type="password" />
        <button type="submit">Submit</button>
      </form>
    </div>
  )
}
