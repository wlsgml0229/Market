'use client'
import React, { useState } from 'react'
import Input from '@/components/Input'
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form'
import Button from '@/components/Buttom'
import Container from '@/components/Container'
import Heading from '@/components/Heading'
import ImageUpload from '@/components/ImageUpload'
import { categories } from '@/components/categories/Categories'
import CategoryInput from '@/components/categories/CategoryInput'
import KakaoMap from '@/components/KakaoMap'
import dynamic from 'next/dynamic'
import axios from 'axios'
import { useRouter } from 'next/navigation'

const ProductUploadPage = () => {
  const router = useRouter()
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
  const imageSrc = watch('imageSrc')
  const category = watch('category')
  const latitude = watch('latitude')
  const longitude = watch('longitude')

  const kakaoMap = dynamic(() => import('../../../components/KakaoMap'), {
    ssr: false,
  })
  const setCustomValue = (id: string, value: any) => {
    //react hook form
    setValue(id, value)
  }
  //data 인자에 input values 담김
  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    setIsLoading(true)
    axios
      .post('/api/products', data)
      .then((res) => {
        router.push(`/product/${res.data.id}`)
      })
      .catch((err) => {
        console.log(err)
      })
      .finally(() => {
        setIsLoading(false)
      })
  }
  return (
    <Container>
      <div className="max-w-screen-lg mx-auto">
        <form className="flex flex-col gap-8" onSubmit={handleSubmit(onSubmit)}>
          <Heading title="Product Upload" subtitle="upload your product" />
          <ImageUpload
            onChange={(value) => setCustomValue('imageSrc', value)}
            value={imageSrc}
          />
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
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 max-h[50vh] overflow-y-auto">
            {categories.map((item) => (
              <div key={item.label} className="col-span-1">
                <CategoryInput
                  onClick={() => setCustomValue('category', category)}
                  selected={category === item.path}
                  label={item.label}
                  icon={item.icon}
                  path={item.path}
                />
              </div>
            ))}
          </div>
          <hr />
          <KakaoMap
            setCustomValue={setCustomValue}
            latitude={latitude}
            longitude={longitude}
          />
          <Button label="상품 생성 하기" />
        </form>
      </div>
    </Container>
  )
}

export default ProductUploadPage
