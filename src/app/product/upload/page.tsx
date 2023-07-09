'use client'
import React, { useState } from 'react'
import Input from '@/components/Input'
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form'
import Button from '@/components/Buttom'
import Container from '@/components/Container'
import Heading from '@/components/Heading'

const ProductUploadPage = () => {
  const [isLoading, setIsLoading] = useState(false)
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
    reset,
  } = useForm<FieldValues>({
    defaultValues: {
      title: '',
      description: '',
      category: '',
      latitude: 33.5563,
      longitude: 126.79581,
      imageSrc: '',
      price: 1,
    },
  })
  //data 인자에 input values 담김
  const onSubmit: SubmitHandler<FieldValues> = (data) => {}
  return (
    <Container>
      <div className="max-w-screen-lg mx-auto">
        <form className="flex flex-col gap-8" onSubmit={handleSubmit(onSubmit)}>
          <Heading title="Product Upload" subtitle="upload your product" />
          <Input
            id="title"
            label="Title"
            disabled={isLoading}
            register={register}
            errors={errors}
            required
          />
          <hr />
          <Input
            id="description"
            label="Description"
            disabled={isLoading}
            register={register}
            errors={errors}
            required
          />
          <hr />
          <Input
            id="price"
            label="Price"
            disabled={isLoading}
            register={register}
            errors={errors}
            formatPrice
            required
          />
          <hr />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 max-h[50vh] overflow-y-auto"></div>
          <hr />
          <Button label="상품 생성 하기" />
        </form>
      </div>
    </Container>
  )
}

export default ProductUploadPage
