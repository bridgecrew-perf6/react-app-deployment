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


const GraphViewer = () => {
  // ** Context
  // const { colors } = useContext(ThemeColors)

  // const colourOptions = [
  //   { value: 'ocean', label: 'Ocean' },
  //   { value: 'blue', label: 'Blue' },
  //   { value: 'purple', label: 'Purple' },
  //   { value: 'red', label: 'Red' },
  //   { value: 'orange', label: 'Orange' }
  // ]

//   const fieldOptions = [
//     { value: 'Catalog/ProductNo', label: 'Catalog/ProductNo' },
//     { value: 'PartNo', label: 'PartNo' },
//     { value: 'AGR', label: 'AGR' },
//     { value: 'EAU', label: 'EAU' },
//     { value: 'StockInventory', label: 'Stock Inventory' }
//   ]


//   const locationOptions = [
//     { value: 'India', label: 'India' },
//     { value: 'Germany', label: 'Germany' },
//     { value: 'France', label: 'France' },
//     { value: 'Netherlands ', label: 'Netherlands ' },
//     { value: 'Poland ', label: 'Poland ' },
//     { value: 'UK ', label: 'UK ' }

//   ]

//   const acdcOptions = [
//     { value: 'AC', label: 'AC' },
//     { value: 'DC', label: 'DC' }
//   ]

//   const voltageOptions = [
//     { value: '100', label: '100' },
//     { value: '200', label: '200' },
//     { value: '300', label: '300' },
//     { value: '400', label: '400' }
//   ]


//   const categoryOptions = [
//     { value: '039169-001-50', label: '039169-001-50' },
//     { value: '039169-001-60', label: '039169-001-60' },
//     { value: '039169-001-70', label: '039169-001-70' },
//     { value: '039169-001-80', label: '039169-001-80' },
//     { value: '039169-001-FD', label: '039169-001-FD' }
//   ]

  // ** Vars
  // const avatarGroupArr = [
  //   {
  //     imgWidth: 33,
  //     imgHeight: 33,
  //     title: 'Billy Hopkins',
  //     placement: 'bottom',
  //     img: require('@src/assets/images/portrait/small/avatar-s-9.jpg').default
  //   },
  //   {
  //     imgWidth: 33,
  //     imgHeight: 33,
  //     title: 'Amy Carson',
  //     placement: 'bottom',
  //     img: require('@src/assets/images/portrait/small/avatar-s-6.jpg').default
  //   },
  //   {
  //     imgWidth: 33,
  //     imgHeight: 33,
  //     title: 'Brandon Miles',
  //     placement: 'bottom',
  //     img: require('@src/assets/images/portrait/small/avatar-s-8.jpg').default
  //   },
  //   {
  //     imgWidth: 33,
  //     imgHeight: 33,
  //     title: 'Daisy Weber',
  //     placement: 'bottom',
  //     img: require('@src/assets/images/portrait/small/avatar-s-7.jpg').default
  //   },
  //   {
  //     imgWidth: 33,
  //     imgHeight: 33,
  //     title: 'Jenny Looper',
  //     placement: 'bottom',
  //     img: require('@src/assets/images/portrait/small/avatar-s-20.jpg').default
  //   }
  // ]
  // const data = [
  //   {
  //     title: '12 Invoices have been paid',
  //     content: 'Invoices have been paid to the company.',
  //     meta: '',
  //     metaClassName: 'me-1',
  //     customContent: (
  //       <div className='d-flex align-items-center'>
  //         <img className='me-1' src={jsonImg} alt='data.json' height='23' />
  //         <span>data.json</span>
  //       </div>
  //     )
  //   },
  //   {
  //     title: 'Client Meeting',
  //     content: 'Project meeting with john @10:15am.',
  //     meta: '',
  //     metaClassName: 'me-1',
  //     color: 'warning',
  //     customContent: (
  //       <div className='d-flex align-items-center'>
  //         <Avatar img={ceo} />
  //         <div className='ms-50'>
  //           <h6 className='mb-0'>John Doe (Client)</h6>
  //           <span>CEO of Infibeam</span>
  //         </div>
  //       </div>
  //     )
  //   },
  //   {
  //     title: 'Create a new project for client',
  //     content: 'Add files to new design folder',
  //     color: 'info',
  //     meta: '',
  //     metaClassName: 'me-1',
  //     customContent: <AvatarGroup data={avatarGroupArr} />
  //   },
  //   {
  //     title: 'Create a new project for client',
  //     content: 'Add files to new design folder',
  //     color: 'danger',
  //     meta: '',
  //     metaClassName: 'me-1'
  //   }
  // ]

  return (
    <div id='graphviewer'>
      <div class="">
        <h4 class="card-title">Graph Viewer</h4>
      </div>
    </div>
  )
}

export default GraphViewer
