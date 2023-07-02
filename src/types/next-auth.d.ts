import { DefaultSession } from '@auth/core/types'
// next-auth 의 타입 추가
declare module 'next-auth' {
  interface Session {
    user?: {
      id?: string
      role?: string
    } & DefaultSession['user'] // user 의 기본타입에 id, role 추가
  }
}
