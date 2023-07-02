export { default } from 'next-auth/middleware'

// 로그인 한 사람만 접근가능 페이지 설정
export const config = { matcher: ['/admin/:path*', '/user'] }
