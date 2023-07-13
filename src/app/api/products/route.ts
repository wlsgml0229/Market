import getCurrentUser from '@/app/actions/getCurrentUser'
import { NextResponse } from 'next/server'

export async function POST(request: Request) {
  const currentUser = await getCurrentUser()
  if (!currentUser) {
    return NextResponse.error()
  }
  console.log('request' + request)
  const body = await request.json()
  const { title, description, imageSrc, category, latitude, longitude, price } =
    body

  Object.keys(body).forEach((value) => {
    if (!body[value]) {
      return NextResponse.error()
    }
  })
  const product = await prisma?.product.create({
    data: {
      title,
      description,
      imageSrc,
      category,
      latitude,
      longitude,
      price: Number(price),
      userId: currentUser.id,
    },
  })
  return NextResponse.json(product)
}
