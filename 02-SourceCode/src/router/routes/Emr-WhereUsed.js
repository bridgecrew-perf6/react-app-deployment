import { lazy } from 'react'

const WhereUsed = lazy(() => import('../../views/graphviewer/whereused'))
// const DashboardEcommerce = lazy(() => import('../../views/dashboard/ecommerce'))

const WhereUsedRoutes = [
  {
    path: '/productsearch/whereused',
    element: <WhereUsed />
  }
//   {
//     path: '/dashboard/ecommerce',
//     element: <DashboardEcommerce />
//   }
]

export default WhereUsedRoutes
