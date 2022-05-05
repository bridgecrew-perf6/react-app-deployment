// ** React Imports
import { Fragment } from 'react'
import { Link } from 'react-router-dom'

// ** Icons Imports
import Select from 'react-select'
// import ReactSelect from './SelectReact'

// ** Utils
// import { selectThemeColors } from '@utils'

import { Book } from 'react-feather'

// ** Custom Components
// import Avatar from '@components/avatar'
// import AvatarGroup from '@components/avatar-group'

// ** Utils
// import { kFormatter } from '@utils'

// ** Context
// import { ThemeColors } from '@src/utility/context/ThemeColors'

// import classnames from 'classnames'
// import toast from 'react-hot-toast'
// import * as Icons from 'react-feather'
// import { CopyToClipboard } from 'react-copy-to-clipboard'
// import { List } from 'react-feather'

// ** Reactstrap Imports
import { Row, Col, Button, Breadcrumb, BreadcrumbItem  } from 'reactstrap'
import Breadcrumbs from '@components/breadcrumbs'
import '@styles/base/pages/ui-feather.scss'

// ** Demo Components
// import InvoiceList from '@src/views/apps/invoice/list'
// import Sales from '@src/views/ui-elements/cards/analytics/Sales'
// import AvgSessions from '@src/views/ui-elements/cards/analytics/AvgSessions'
// import CardAppDesign from '@src/views/ui-elements/cards/advance/CardAppDesign'
// import SupportTracker from '@src/views/ui-elements/cards/analytics/SupportTracker'
// import OrdersReceived from '@src/views/ui-elements/cards/statistics/OrdersReceived'
// import SubscribersGained from '@src/views/ui-elements/cards/statistics/SubscribersGained'
// import CardCongratulations from '@src/views/ui-elements/cards/advance/CardCongratulations'
// import InputFile from './InputFile'
// import InputBasic from './InputBasic'
// import InputSizes from './InputSizes'
// import InputState from './InputStates'
// import InputFloating from './InputFloating'
// import InputHorizontalSize from './InputHorizontalSize'

// ** Images
// import jsonImg from '@src/assets/images/icons/json.png'
// import ceo from '@src/assets/images/portrait/small/avatar-s-9.jpg'

// ** Styles
// import '@styles/react/libs/charts/apex-charts.scss'
// import ReactFlow, { MiniMap, Controls } from 'react-flow-renderer'

// const OneWayNodes = [
//   {
//     id: '1',
//     type: 'input',
//     data: { label: <h3 style={{color: 'blue'}}>Product A</h3> },
//     position: { x: 500, y: 100 }
    
//   },
//   {
//     id: '2',
//     // type: 'output',
//     data: { label: <div style={{color: 'blue'}}>Place One</div> },
//     position: { x: 100, y: 300 }
//   },
//   {
//     id: '3',
//     // type: 'output',
//     data: { label: <div style={{color: 'blue'}}>Place Two</div> },
//     position: { x: 300, y: 300 }
//   },
//   {
//     id: '4',
//     // type: 'input',
//     data: { label: <div style={{color: 'blue'}}>Place Three</div> },
//     position: { x: 500, y: 300 }
//   },
//   {
//     id: '5',
//     // you can also pass a React component as a label
//     data: { label: <div style={{color: 'blue'}}>Place Four</div> },
//     position: { x: 700, y: 300 }
//   },
//   {
//     id: '6',
//     type: 'output',
//     data: { label: <div style={{color: 'blue'}}>Place Five</div> },
//     position: { x: 900, y: 300 }
//   }
// ]
// const OneWayEdges = [
//   { id: 'e1-1', source: '1', target: '2' },
//   { id: 'e1-2', source: '1', target: '3' },
//   { id: 'e2-3', source: '1', target: '4' },
//   { id: 'e1-4', source: '1', target: '5' },
//   { id: 'e1-2', source: '1', target: '6' }
// ]

const GraphViewer = () => {

  return (
    <div id='graphviewer'>
      <div className="">
        <h4 className="card-title">Product Graph View</h4>
      </div>
      <Breadcrumb className='mb-1'>
      <BreadcrumbItem>
          <Link to='/search/search'> Product Search </Link>
        </BreadcrumbItem>
        <BreadcrumbItem active>
          <span> GraphViewer </span>
        </BreadcrumbItem>
      </Breadcrumb>
      <div style={{height: '1000px', width: "2000px" }}>
        {/* <ReactFlow
          nodes={OneWayNodes}
          edges={OneWayEdges}
        /> */}
      </div>
    </div>
  )
}

export default GraphViewer
