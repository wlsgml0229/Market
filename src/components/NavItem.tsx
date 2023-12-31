import Link from 'next/link'
import React from 'react'
//next js 제공 함수 사용
import { signIn, signOut } from 'next-auth/react'
import { User } from '@prisma/client'
interface NavItemProps {
  mobile?: boolean
  currentUser?: User | null
}
// ?: 옵셔널 사용
const NavItem = ({ mobile, currentUser }: NavItemProps) => {
  //session provider 제거

  return (
    <ul
      className={`text-md justify-center flex gap-4 w-full items-center ${
        mobile && 'flex-col h-full'
      } `}
    >
      <li className="py-2 text-center border-b-4 cursor-pointer">
        <Link href="/admin">Admin</Link>
      </li>
      <li className="py-2 text-center border-b-4 cursor-pointer">
        <Link href="/user">User</Link>
      </li>
      {currentUser ? (
        <li className="py-2 text-center border-b-4 cursor-pointer">
          <button onClick={() => signOut()}>Signout</button>
        </li>
      ) : (
        <li className="py-2 text-center border-b-4 cursor-pointer">
          <button onClick={() => signIn()}>Signin</button>
        </li>
      )}
    </ul>
  )
}

export default NavItem
