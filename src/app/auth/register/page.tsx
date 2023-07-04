'use client'
import React, { useState } from 'react'
import Input from '@/components/Input'
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form'
import Button from '@/components/Buttom'
import Link from 'next/link'
import axios from 'axios'
import { useRouter } from 'next/navigation'

const RegisterPage = () => {
  const [isLoading, setIsLoading] = useState(false)

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FieldValues>({
    defaultValues: {
      name: '',
      email: '',
      password: '',
    },
  })
  const router = useRouter()
  const onSubmit: SubmitHandler<FieldValues> = async (body) => {
    setIsLoading(true)
    try {
      const { data } = await axios.post('/api/register', body)
      console.log(data)
      await router.push('/auth/login')
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
        <h1 className="text-2xl">Register</h1>
        <Input
          id="email"
          label="email"
          disabled={isLoading}
          register={register}
          errors={errors}
        />
        <Input
          id="name"
          label="name"
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
        <Button label="Regsiter" />
        <div>
          <p className="text-gray-400 text-center">
            Already a member?{' '}
            <Link href="/auth/login" className="text-black hover:underline">
              Login
            </Link>
          </p>
        </div>
      </form>
    </section>
  )
}

export default RegisterPage