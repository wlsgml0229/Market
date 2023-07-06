import { getServerSession } from 'next-auth'
import { authOptions } from '@/pages/api/auth/[...nextauth]'

export async function getSession() {
  return await getServerSession(authOptions)
}

export default async function getCurrentUser() {
  const session = await getSession()
  if (!session?.user?.email) {
    return null
  }
  const currentUser = await prisma?.user.findUnique({
    where: {
      email: session.user.email,
    },
  })
  if (!currentUser) {
    return null
  }
  return currentUser
}
