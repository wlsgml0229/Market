import getProducts, { ProductsParams } from '@/app/actions/getProduct'
import Container from '@/components/Container'
import EmptyState from '@/components/EmptyState'
import ProductCard from '@/components/ProductCard'

interface HomeProps {
  searchParams: ProductsParams
}
export default async function Home({ searchParams }: HomeProps) {
  const products = await getProducts(searchParams)
  console.log('products' + products)
  return (
    <Container>
      {/*Category*/}
      {products.data?.length === 0 ? (
        <EmptyState />
      ) : (
        <>
          <div>
            {products.data.map((product) => (
              <ProductCard />
            ))}
          </div>
        </>
      )}
    </Container>
  )
}
