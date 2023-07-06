import React from 'react'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/pages/api/auth/[...nextauth]'
import getCurrentUser from '@/app/actions/getCurrentUser'
const User = async () => {
  // next-auth 를 통해 서버세션 받아오기
  // const session = await getServerSession(authOptions)
  // console.log('sessionData' + JSON.stringify(session))
  const userData = await getCurrentUser()
  console.dir(userData)
  return <div>User</div>
}

export default User
