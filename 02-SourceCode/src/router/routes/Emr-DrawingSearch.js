import { lazy } from 'react'

const DrawingSearch = lazy(() => import('../../views/emr-drawings/drawingsearch'))
const DrawingSearchResults = lazy(() => import('../../views/emr-drawings/drawingsearchresults'))

const DrawingSearchRoutes = [
  {
    path: '/drawingsearch/drawingsearch',
    element: <DrawingSearch />
  },
  {
    path: '/drawingsearch/drawingsearchresults',
    element: <DrawingSearchResults />
  }
]

export default DrawingSearchRoutes
