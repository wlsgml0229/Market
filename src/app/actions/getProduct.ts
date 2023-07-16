export interface ProductsParams {
  latitude?: number
  longitude?: number
  category?: string
}

export default async function getProducts(params: ProductsParams) {
  try {
    const { latitude, longitude, category } = params
    let query: any = {}
    if (category) {
      query.category = category
    }
    //지도범위 영역 늘려줌
    if (latitude) {
      query.latitude = {
        gte: Number(latitude) - 0.01,
        lte: Number(latitude) + 0.01,
      }
    }

    if (longitude) {
      query.latitude = {
        gte: Number(longitude) - 0.01,
        lte: Number(longitude) + 0.01,
      }
    }

    //product 테이블에서 가져옴 - 여러개
    const products = await prisma?.product.findMany({
      where: query,
      orderBy: {
        createdAt: 'desc',
      },
    })

    return {
      // 가져온 products 반환
      data: products,
    }
  } catch (error: any) {
    throw new Error(error)
  }
}
