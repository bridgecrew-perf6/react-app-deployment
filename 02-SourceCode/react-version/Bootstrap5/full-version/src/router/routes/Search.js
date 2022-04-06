import { lazy } from 'react'

const Search = lazy(() => import('../../views/search/search'))
// const DashboardEcommerce = lazy(() => import('../../views/dashboard/ecommerce'))

const SearchRoutes = [
  {
    path: '/search/search',
    element: <Search />
  }
//   {
//     path: '/dashboard/ecommerce',
//     element: <DashboardEcommerce />
//   }
]

export default SearchRoutes
