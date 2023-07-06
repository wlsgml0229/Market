'use client'
import React, { useState } from 'react'
import Input from '@/components/Input'
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form'
import Button from '@/components/Buttom'
import Link from 'next/link'
import axios from 'axios'
import { useRouter } from 'next/navigation'
import { signIn } from 'next-auth/react'

const LoginPage = () => {
  const [isLoading, setIsLoading] = useState(false)

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FieldValues>({
    defaultValues: {
      email: '',
      password: '',
    },
  })
  const router = useRouter()
  const onSubmit: SubmitHandler<FieldValues> = async (body) => {
    setIsLoading(true)
    try {
      // next auth에서 제공하는 signIn 메소드를 사용
      const data = signIn('credentials', body)
      console.log(data)
    } catch (error) {
      console.log(error)
    } finally {
      setIsLoading(false)
    }
  }
  return (
    <section className="grid h-[calc(100vh_-_56px)] place-items-center">
      <form
        className="flex flex-col justify-center gap-4 min-w-[350px]"
        onSubmit={handleSubmit(onSubmit)}
      >
        <h1 className="text-2xl">Login</h1>
        <Input
          id="email"
          label="email"
          type="email"
          disabled={isLoading}
          register={register}
          errors={errors}
        />

        <Input
          id="password"
          label="password"
          type="password"
          disabled={isLoading}
          register={register}
          errors={errors}
        />
        <Button label="SignIn" />
        <div>
          <p className="text-gray-400 text-center">
            Not a member?{' '}
            <Link href="/auth/register" className="text-black hover:underline">
              Register
            </Link>
          </p>
        </div>
      </form>
    </section>
  )
}

export default LoginPage
