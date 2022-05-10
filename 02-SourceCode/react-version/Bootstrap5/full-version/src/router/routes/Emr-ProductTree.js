import { lazy } from 'react'

const ProductTree = lazy(() => import('../../views/emr-product-tree/emr-product-tree'))

const ProductTreeRoutes = [
  {
    path: '/productsearch/productstructure',
    element: <ProductTree />
  }
]

export default ProductTreeRoutes
