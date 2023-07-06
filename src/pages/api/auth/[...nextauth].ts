import NextAuth, { NextAuthOptions } from 'next-auth'
import GoogleProvider from 'next-auth/providers/google'
import CredentialsProvider from 'next-auth/providers/credentials'
import { PrismaAdapter } from '@auth/prisma-adapter'
// import { PrismaClient } from '@prisma/client'
import prisma from '@/helpers/prismadb'
import bcrypt from 'bcrypt'

// const prisma = new PrismaClient()

export const authOptions: NextAuthOptions = {
  adapter: PrismaAdapter(prisma),
  providers: [
    GoogleProvider({
      //! --> undefined 가 아니라고 선언
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
    CredentialsProvider({
      // The name to display on the sign in form (e.g. "Sign in with...")
      name: 'Credentials',
      // `credentials` is used to generate a form on the sign in page.
      // You can specify which fields should be submitted, by adding keys to the `credentials` object.
      // e.g. domain, username, password, 2FA token, etc.
      // You can pass any HTML attribute to the <input> tag through the object.
      credentials: {
        email: { label: 'Email', type: 'text' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials, req) {
        console.dir(credentials)
        console.dir(req)
        if (!credentials?.email || !credentials?.password) {
          throw new Error('Invalid credentials')
        }
        const user = await prisma.user.findUnique({
          where: {
            email: credentials.email,
          },
        })
        // hashedPassword 가 없으면 소셜로그인 한 사람이다.
        if (!user || !user?.hashedPassword) {
          throw new Error('Invalid credentials')
        }
        const isCrrectPassword = await bcrypt.compare(
          credentials.password,
          user.hashedPassword
        )
        if (!isCrrectPassword) {
          throw new Error()
        }
        return user
      },
    }),
  ],
  //sign in 할때 세션 저장
  session: {
    strategy: 'jwt',
  },
  jwt: {
    secret: process.env.JWT_SECRET,
    maxAge: 30 * 24 * 60 * 60, // 1month
  },
  pages: {
    signIn: '/auth/login',
  },
  callbacks: {
    async jwt({ token, user }) {
      // 해당 return된 정보 아래 token 정보에 들어감
      return { ...token, ...user }
    },
    async session({ session, token }) {
      session.user = token
      return session
    },
  },
}

export default NextAuth(authOptions)
