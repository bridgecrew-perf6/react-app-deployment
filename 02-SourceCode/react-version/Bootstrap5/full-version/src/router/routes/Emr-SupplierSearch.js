import { lazy } from 'react'

const SupplierSearch = lazy(() => import('../../views/emr-supplier-search/suppliersearch'))
const SupplierSearchResults = lazy(() => import('../../views/emr-supplier-search/suppliersearchresults'))

const SupplierSearchRoutes = [
  {
    path: '/suppliersearch/suppliersearch',
    element: <SupplierSearch />
  },
  {
    path: '/suppliersearch/suppliersearchresults',
    element: <SupplierSearchResults />
  }
]

export default SupplierSearchRoutes
