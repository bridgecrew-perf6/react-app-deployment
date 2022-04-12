import { lazy } from 'react'

const GraphViewer = lazy(() => import('../../views/graphviewer/graphviewer'))
// const DashboardEcommerce = lazy(() => import('../../views/dashboard/ecommerce'))

const GraphViewerRoutes = [
  {
    path: '/graphviewer/graphviewer',
    element: <GraphViewer />
  }
//   {
//     path: '/dashboard/ecommerce',
//     element: <DashboardEcommerce />
//   }
]

export default GraphViewerRoutes
