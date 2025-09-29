'use server'

import { FormState, User } from '@/types/auth.types'
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'

export async function login(state: FormState, formData: FormData) {
  const cookieStore = await cookies()
  const username = formData.get('username')
  const password = formData.get('password')

  if (!username || !password) {
    return { error: 'Kullanıcı adı ve şifre gereklidir.' }
  }

  let users: User[] = []
  try {
    const res = await fetch(
      `http://localhost:3001/users?username=${username}&password=${password}`
    )
    users = await res.json()
  } catch (error) {
    console.error('Error fetching users:', error)
    return { error: 'Bir hata oluştu. Lütfen tekrar deneyin.' }
  }

  if (users && users.length > 0) {
    const user = users[0]

    const token = user.id
    console.log({
      users: users,
      username: username,
      password: password,
      token: token,
    })
    cookieStore.set('auth_token', JSON.stringify(token), {
      httpOnly: true,
      sameSite: 'strict',
      path: '/',
    })
    redirect('/dashboard')
  } else {
    return { error: 'Geçersiz kullanıcı adı veya şifre.' }
  }
}

export async function logout() {
  const cookieStore = await cookies()
  cookieStore.delete('auth_token')
  redirect('/')
}
