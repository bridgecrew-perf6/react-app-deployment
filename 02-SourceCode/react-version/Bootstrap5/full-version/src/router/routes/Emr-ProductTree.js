import { lazy } from 'react'

const ProductTree = lazy(() => import('../../views/emr-product-tree/emr-product-tree'))

const ProductTreeRoutes = [
  {
    path: '/productstructure/productstructure',
    element: <ProductTree />
  }
]

export default ProductTreeRoutes
