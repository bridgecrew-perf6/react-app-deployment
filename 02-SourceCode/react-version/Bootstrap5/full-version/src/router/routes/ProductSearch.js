import { lazy } from 'react'

const ProductSearch = lazy(() => import('../../views/productsearch/productsearch'))
// const DashboardEcommerce = lazy(() => import('../../views/dashboard/ecommerce'))

const ProductSearchRoutes = [
  {
    path: '/productsearch/productsearchresults',
    element: <ProductSearch />
  }
//   {
//     path: '/dashboard/ecommerce',
//     element: <DashboardEcommerce />
//   }
]

export default ProductSearchRoutes
