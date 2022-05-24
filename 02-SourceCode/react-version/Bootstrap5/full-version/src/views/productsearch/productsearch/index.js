// ** React Imports
// import { data } from '../../tables/data-tables/data'
// ** Reactstrap Imports
// import { Badge, UncontrolledDropdown, DropdownToggle, DropdownMenu, DropdownItem, UncontrolledTooltip } from 'reactstrap'
// import Breadcrumbs from '@components/breadcrumbs'
// ** Icons Imports
// import Select from 'react-select'
// import ReactSelect from './SelectReact'


// ** Utils
// import { selectThemeColors } from '@utils'

// import { Book } from 'react-feather'

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
// import Flatpickr from 'react-flatpickr'
// import { ChevronDown } from 'react-feather'
// import TableAdvSearch from './TableAdvSearch'
// ** Reactstrap Imports
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
// import '../../../assets/scss/stye.css'
// import TableExpandable from './TableExpandable'
// import TableZeroConfig from './TableZeroConfig'
// import TableWithButtons from './TableWithButtons'
// import TableMultilingual from './TableMultilingual'
// import DataTablesReOrder from './TableColumnReorder'
import { Fragment, useState, useEffect} from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'
import Avatar from '@components/avatar'
import { ChevronDown, MoreVertical, Edit, FileText, Archive, Trash, ArrowDownCircle, ArrowUpCircle, Image, Send, CheckCircle, Save, Info, PieChart, Download } from 'react-feather'
import CsvDownload from 'react-csv-downloader'
import ReactPaginate from 'react-paginate'
import DataTable from 'react-data-table-component'
import {  Card, CardHeader, CardBody, CardTitle, Input, Row, Col, Breadcrumb, BreadcrumbItem, ModalHeader, ModalBody, ModalFooter, Modal, UncontrolledTooltip, Spinner } from 'reactstrap'
import '@styles/base/pages/ui-feather.scss'
import '@styles/react/apps/app-invoice.scss'
import '@styles/react/libs/tables/react-dataTable-component.scss'
import { apiUrl } from '../../../serviceWorker'

const GenerateUrl = (x) => {
  let url = null
  if (x.LocationCode === "GLOBAL") {
    if (x.FieldType === "Catalog/ProductNo") {
      const prodno = x.ProductNo
      if (x?.AragoSearch) {
        url = `${apiUrl}/part/global?product_number=${prodno}`
      } else {
        url = `${apiUrl}/part/global?product_number=${prodno}`
      }
    } else if (x.FieldType === "Description") {
      const desc = x.ProductNo
      if (x?.AragoSearch) {
        url = `${apiUrl}/part/global?description=${desc}`
      } else {
        url = `${apiUrl}/part/global?description=${desc}`
      }
    } 
  } else {
    if (x.FieldType === "Catalog/ProductNo") {
      const loc = x.LocationCode
      const prodno = x.ProductNo
      url = `${apiUrl}/part?product_number=${prodno}&location=${loc}`
    } else if (x.FieldType === "Description") {
      const loc = x.LocationCode
      const desc = x.ProductNo
      url = `${apiUrl}/part?location=${loc}&description=${desc}`
    } else if (x.FieldType === "Drawing Number") {
      const loc = x.LocationCode
      const drawNo = x.ProductNo
      url = `${apiUrl}/part?drawing_number=${drawNo}&location=${loc}`
    } else if (x.FieldType === "AGR") {
      const loc = x.LocationCode
      const agrmin = x.Min
      const agrmax = x.Max
      url = `${apiUrl}/part?location=${loc}&agr_min=${agrmin}&agr_max=${agrmax}`
    } else if (x.FieldType === "EAU") {
      const loc = x.LocationCode
      const eaumin = x.Min
      const eaumax = x.Max
      url = `${apiUrl}/part?location=${loc}&eau_min=${eaumin}&eau_max=${eaumax}`
    } else if (x.FieldType === "StockInventory") {
      const loc = x.LocationCode
      const envmin = x.Min
      const envmax = x.Max
      url = `${apiUrl}/part?location=${loc}&inv_min=${envmin}&inv_max=${envmax}`
    }
  } 
  console.log(url)
  return url
}
const onSelectDrawings = (val) => {
  console.log(val.product_number)
  window.open(`/drawingsearch/drawingsearchresults?productNo=${btoa(val.product_number)}`)
  // window.open(`/drawingsearch/drawingsearchresults?productNo=${btoa(val.product_number)}`, "_blank", "toolbar=yes,scrollbars=yes,resizable=yes,top=500,left=500,width=400,height=400")
}
const onSelcetWhereUsed = (val) => {
  console.log(val.product_number)
  window.open(`/productsearch/whereused?productNo=${btoa(val.product_number)}`)
}
const onSelcetProductStructure = (val) => {
  console.log(val.product_number)
  window.open(`/productsearch/productstructure?productNo=${btoa(val.product_number)}`)
}
const invoiceStatusObj = {
  Edit: { color: 'light-secondary', icon: Edit },
  Paid: { color: 'light-success', icon: CheckCircle },
  Draft: { color: 'light-primary', icon: Save },
  Downloaded: { color: 'light-info', icon: ArrowDownCircle },
  UpArrow: { color: 'light-info', icon: ArrowUpCircle },
  'Past Due': { color: 'light-danger', icon: Info },
  'Partial Payment': { color: 'light-warning', icon: PieChart }
}

const PropertiesWindow = ({row}) => {
  const [isOpenModel, setScrollInnerModal] = useState(false)
  const color = invoiceStatusObj[row.product_number] ? invoiceStatusObj[row.product_number].color : 'light-danger',
  Icon = invoiceStatusObj[row.product_number] ? invoiceStatusObj[row.product_number].icon : Edit

  return (
    <Fragment>
      <Avatar color={color} icon={<Icon size={14} />} id={`av-tooltip-${row._id}`} onClick={() => { setScrollInnerModal(true) }}/>
      {/* <UncontrolledTooltip placement='bottom' target={`av-tooltip-${row.product_number}`}>
        <span className='fw-bold fs-30'>PROPERTIES</span><br />
        <span className='fw-bold text-left'>Catalog/Product #: {row.product_number}</span><br />
        <span className='fw-bold'>Description: {row.description}</span><br />
        <span className='fw-bold'>AGR: {row.agr}</span><br />
        <span className='fw-bold'>EAU: {row.eau}</span><br />
        <span className='fw-bold'>On Hand Inventory: {row.inventory}</span><br />
        <span className='fw-bold'>Plant: {row.organization}</span><br />
        <span className='fw-bold'>Status: {row.status}</span><br />
        <span className='fw-bold'>Standard Cost: {row.std_cost_current}</span><br />
        <span className='fw-bold'>Weight: {row.weight}</span>
      </UncontrolledTooltip> */}
      <Modal scrollable isOpen={isOpenModel} toggle={() => { setScrollInnerModal(false) }} centered={true}>
        <ModalHeader toggle={() => { setScrollInnerModal(false) }}>PROPERTIES</ModalHeader>
        <ModalBody>
          <p><span className='fw-bold'>Catalog/Product #:</span> {row.product_number}</p>
          <p><span className='fw-bold'>Description:</span> {row.description}</p>
          <p><span className='fw-bold'>AGR:</span> {row.agr}</p>
          <p><span className='fw-bold'>EAU:</span> {row.eau}</p>
          <p><span className='fw-bold'>On Hand Inventory:</span> {row.on_hand_inventory}</p>
          <p><span className='fw-bold'>Drawing Number:</span> {row.drawing_number}</p>
          <p><span className='fw-bold'>Drawing Version:</span> {row.drawing_revision}</p>
          <p><span className='fw-bold'>Assy. Item Status:</span> {row.assy_item_status}</p>
          <p><span className='fw-bold'>Is_Catalog:</span> {row.is_catalog}</p>
          <p><span className='fw-bold'>Intellectual Owner:</span> {row.plant}</p>
        </ModalBody>
      </Modal>
    </Fragment>
  )
}
// ** Table Adv Search Column
export const advSearchColumns = [
  {
    name: 'Catalog/Product #',
    sortable: true,
    minWidth: '200px',
    selector: row => row.product_number
  },
  {
  name: 'Description',
  sortable: true,
  minWidth: '200px',
  selector: row => row.description
  },
  {
    name: 'Properties',
    sortable: true,
    minWidth: '50px',
    sortField: 'properties',
    cell: row => <PropertiesWindow row={row}/>
  },
  {
    name: 'Drawing',
    sortable: false,
    minWidth: '50px',
    sortField: 'drawingeu',
    cell: row => {
      const color = invoiceStatusObj[row.product_number] ? invoiceStatusObj[row.product_number].color : 'light-warning',
        Icon = invoiceStatusObj[row.product_number] ? invoiceStatusObj[row.product_number].icon : Image
      return (
        <Fragment>
          <Avatar color={color} icon={<Icon size={14} />} id={`av-tooltip-${row._id}`} onClick={() => { onSelectDrawings(row) }}/>
        </Fragment>
      )
    }
  },
  {
    name: 'Product Structure',
    sortable: true,
    minWidth: '150px',
    sortField: 'productStrucuture',
    cell: row => {
      const color = invoiceStatusObj[row.product_number] ? invoiceStatusObj[row.product_number].color : 'light-primary',
        Icon = invoiceStatusObj[row.product_number] ? invoiceStatusObj[row.product_number].icon : ArrowDownCircle
      return (
        <Fragment>
          <Avatar color={color} icon={<Icon size={14} />} id={`av-tooltip-${row._id}`} onClick={() => { onSelcetProductStructure(row) }}/>
        </Fragment>
      )
    }
  },
  // {
  //   name: 'ICS Product Structure',
  //   sortable: true,
  //   minWidth: '150px',
  //   sortField: 'icsproduct',
  //   cell: row => {
  //     const color = invoiceStatusObj[row.product_number] ? invoiceStatusObj[row.product_number].color : 'light-primary',
  //       Icon = invoiceStatusObj[row.product_number] ? invoiceStatusObj[row.product_number].icon : ArrowDownCircle
  //     return (
  //       <Fragment>
  //         <Avatar color={color} icon={<Icon size={14} />} id={`av-tooltip-${row._id}`} />
  //       </Fragment>
  //     )
  //   }
  // },
  {
    name: 'Where Used',
    sortable: true,
    minWidth: '100px',
    sortField: 'whereused',
    cell: row => {
      const color = invoiceStatusObj[row.product_number] ? invoiceStatusObj[row.product_number].color : 'light-success',
        Icon = invoiceStatusObj[row.product_number] ? invoiceStatusObj[row.product_number].icon : ArrowUpCircle
      return (
        <Fragment>
          <Avatar color={color} icon={<Icon size={14} />} id={`av-tooltip-${row._id}`} onClick={() => { onSelcetWhereUsed(row) }}/>
        </Fragment>
      )
    }
  },
  // {
  //   name: 'Implode',
  //   sortable: true,
  //   minWidth: '100px',
  //   sortField:'Implode',
  //   cell: row => {
  //     const color = invoiceStatusObj[row.product_number] ? invoiceStatusObj[row.product_number].color : 'light-success',
  //       Icon = invoiceStatusObj[row.product_number] ? invoiceStatusObj[row.product_number].icon : ArrowUpCircle
  //     return (
  //       <Fragment>
  //         <Avatar color={color} icon={<Icon size={14} />} id={`av-tooltip-${row._id}`} />
  //       </Fragment>
  //     )
  //   }
  // },
  {
    name: 'AGR',
    sortable: true,
    minWidth: '2px',
    selector: row => row.agr
  },
  {
    name: 'EAU',
    sortable: true,
    minWidth: '2px',
    selector: row => row.eau
  },
  {
    name: 'On Hand Invnetory',
    sortable: true,
    minWidth: '50px',
    selector: row => row.on_hand_inventory
  },
  {
    name: 'Drawing Number',
    sortable: true,
    minWidth: '50px',
    selector: row => row.drawing_number
  },
  {
    name: 'Drawing Version',
    sortable: true,
    minWidth: '50px',
    selector: row => row.drawing_revision
  },
  {
    name: 'Assy. Item Status',
    sortable: true,
    minWidth: '100px',
    selector: row => row.assy_item_status
  },
  {
    name: 'Intellectual Owner',
    sortable: true,
    minWidth: '100px',
    selector: row => row.plant
  }
]
// ** CSV Columns
export const CsvDataColumns = [
  {
    id: 'product_number',
    displayName: 'Catalog/Product #'
  },
  {
    id: 'description',
    displayName: 'Description'
  },
  {
    id: 'agr',
    name: 'AGR'
  },
  {
    id: 'eau',
    name: 'EAU'
  },
  {
    id: 'on_hand_inventory',
    displayName: 'On Hand Inventory'
  },
  {
    id: 'drawing_number',
    displayName: 'Drawing Number'
  },
  {
    id: 'drawing_revision',
    displayName: 'Drawing Version'
  },
  {
    id: 'assy_item_status',
    displayName: 'Assy. Item Status'
  },
  {
    id: 'is_catalog',
    displayName: 'Is Catalog'
  },
  {
    id: 'plant',
    displayName: 'Intellectual Owner'
  }
  // {
  //   id: 'part_revision',
  //   displayName: 'Part Revision'
  // },
  
  // {
  //   id: 'std_cost_current',
  //   displayName: 'Standard Cost'
  // },
]

const ProductSearch = () => {
  // const [Picker, setPicker] = useState('')
  const [data, setData] = useState([])
  const [isLoadingData, SetIsLoadingData] = useState(true)
  const [searchName, setSearchName] = useState('')
  // const [searchPost, setSearchPost] = useState('')
  // const [searchCity, setSearchCity] = useState('')
  const [currentPage, setCurrentPage] = useState(0)
  const [filteredData, setFilteredData] = useState([])
  // const [csvColumns, setcsvcolumns] = useState([])
  const [csvData, setcsvData] = useState([])
  const [timeTaken, setTimeTaken] = useState(0)

  // ** Function to handle Pagination
  const handlePagination = page => setCurrentPage(page.selected)
  const [searchData, setSearchData] = useState('')

  // ** SET CSV Data
  const onSetCSVData = (CsvData) => {
    const csvdata = []
    CsvData.map(item => {
      csvdata.push({
        agr: item.agr,
        assy_item_status: item.assy_item_status,
        description: item.description.replaceAll(',', ' '),
        drawing_number: item.drawing_number,
        drawing_revision: item.drawing_revision,
        eau: item.eau,
        is_catalog: item.is_catalog,
        on_hand_inventory: item.on_hand_inventory,
        plant: item.plant,
        product_number: item.product_number,
        _id: item._id
      })
    })
    setcsvData(csvdata)
  }

  useEffect(() => {
    const searchdata = localStorage.getItem('searchData')
    if (searchdata === undefined || searchdata === null) {
      window.location.href = '/search/search'
    } else {
      const x = JSON.parse(atob(searchdata))
      setSearchData(x)
      const url = GenerateUrl(x)
      if (url !== null) {
        const timer = setInterval(() => {
          setTimeTaken(timeTaken => timeTaken + 1)
        }, 0.9)
        axios.get(url).then(response => {
          console.log(response)
          if (response.data?.result) {
            setData(response.data.result._documents)
            onSetCSVData(response.data.result._documents)
          } else {
          setData(response.data)
          onSetCSVData(response.data)
          }
          
          SetIsLoadingData(false)
          clearInterval(timer)
        }).catch(err => {
          SetIsLoadingData(false)
          clearInterval(timer)
          console.log(err)
        })
      } else {
        alert("Not valid search.")
        window.location.href = '/search/search'
      }
    }
  }, [])

  // ** Table data to render
  const dataToRender = () => {
    if (
      searchName.length
      // searchPost.length ||
      
      // searchCity.length 
      // searchSalary.length
      // Picker.length
    ) {
      return filteredData
    } else {
      return data
    }
  }

  // ** Custom Pagination
  const paginationComponentOptions = {
    rowsPerPageText: 'Records per page',
    rangeSeparatorText: 'of',
    selectAllRowsItem: true,
    selectAllRowsItemText: 'All'
  }
  const CustomPagination = () => (
    <ReactPaginate
      previouslabel={''}
      nextlabel={''}
      forcePage={currentPage}
      onPageChange={page => handlePagination(page)}
      pageCount={Math.ceil(dataToRender().length / 10) || 1}
      breaklabel={'...'}
      pageRangeDisplayed={2}
      marginPagesDisplayed={2}
      activeClassName='active'
      pageClassName='page-item'
      breakClassName='page-item'
      nextLinkClassName='page-link'
      pageLinkClassName='page-link'
      breakLinkClassName='page-link'
      previousLinkClassName='page-link'
      nextClassName='page-item next-item'
      previousClassName='page-item prev-item'
      containerClassName={'pagination react-paginate separated-pagination pagination-sm justify-content-end pe-1 mt-1'}
    />
  )

  // ** Function to handle name filter
  const handleNameFilter = e => {
    const value = e.target.value
    let updatedData = []
    setSearchName(value)
    if (value.length) {
      updatedData = data.filter(item => {
        const productName = typeof item.product_number === "string" ? item.product_number : item.product_number.toString()
        const includes = (productName.toLowerCase().includes(value.toLowerCase()) || item.description.toLowerCase().includes(value.toLowerCase()))

        if (includes) {
          return includes
        // } else if (!startsWith && includes) {
        //   return includes
        } else return null
      })
      setFilteredData([...updatedData])
      setSearchName(value)
    }
  }

  // ** Function to handle email filter
  // const handleEmailFilter = e => {
  //   const value = e.target.value
  //   let updatedData = []
  //   const dataToFilter = () => {
  //     if (searchName.length || searchPost.length || searchCity.length || searchSalary.length) {
  //       return filteredData
  //     } else {
  //       return data
  //     }
  //   }

  //   setSearchEmail(value)
  //   if (value.length) {
  //     updatedData = dataToFilter().filter(item => {
  //       const startsWith = item.email.toLowerCase().startsWith(value.toLowerCase())

  //       const includes = item.email.toLowerCase().includes(value.toLowerCase())

  //       if (startsWith) {
  //         return startsWith
  //       } else if (!startsWith && includes) {
  //         return includes
  //       } else return null
  //     })
  //     setFilteredData([...updatedData])
  //     setSearchEmail(value)
  //   }
  // }

  // ** Function to handle post filter
  // const handlePostFilter = e => {
  //   const value = e.target.value
  //   let updatedData = []
  //   const dataToFilter = () => {
  //     if (searchName.length || searchCity.length) {
  //       return filteredData
  //     } else {
  //       return data
  //     }
  //   }

  //   setSearchPost(value)
  //   if (value.length) {
  //     updatedData = dataToFilter().filter(item => {
  //       const startsWith = item.post.toLowerCase().startsWith(value.toLowerCase())

  //       const includes = item.post.toLowerCase().includes(value.toLowerCase())

  //       if (startsWith) {
  //         return startsWith
  //       } else if (!startsWith && includes) {
  //         return includes
  //       } else return null
  //     })
  //     setFilteredData([...updatedData])
  //     setSearchPost(value)
  //   }
  // }

  // ** Function to handle city filter
  // const handleCityFilter = e => {
  //   const value = e.target.value
  //   let updatedData = []
  //   const dataToFilter = () => {
  //     if (searchName.length || searchPost.length) {
  //       return filteredData
  //     } else {
  //       return data
  //     }
  //   }

  //   setSearchCity(value)
  //   if (value.length) {
  //     updatedData = dataToFilter().filter(item => {
  //       const startsWith = item.city.toLowerCase().startsWith(value.toLowerCase())

  //       const includes = item.city.toLowerCase().includes(value.toLowerCase())

  //       if (startsWith) {
  //         return startsWith
  //       } else if (!startsWith && includes) {
  //         return includes
  //       } else return null
  //     })
  //     setFilteredData([...updatedData])
  //     setSearchCity(value)
  //   }
  // }

  // ** Function to handle salary filter
  // const handleSalaryFilter = e => {
  //   const value = e.target.value
  //   let updatedData = []
  //   const dataToFilter = () => {
  //     if (searchName.length || searchPost.length || searchCity.length) {
  //       return filteredData
  //     } else {
  //       return data
  //     }
  //   }

  //   setSearchSalary(value)
  //   if (value.length) {
  //     updatedData = dataToFilter().filter(item => {
  //       const startsWith = item.salary.toLowerCase().startsWith(value.toLowerCase())

  //       const includes = item.salary.toLowerCase().includes(value.toLowerCase())

  //       if (startsWith) {
  //         return startsWith
  //       } else if (!startsWith && includes) {
  //         return includes
  //       } else return null
  //     })
  //     setFilteredData([...updatedData])
  //     setSearchSalary(value)
  //   }
  // }

  // ** Function to handle date filter
  // const handleDateFilter = range => {
  //   const arr = []
  //   let updatedData = []
  //   const dataToFilter = () => {
  //     if ( searchName.length || searchPost.length || searchCity.length || searchSalary.length) {
  //       return filteredData
  //     } else {
  //       return data
  //     }
  //   }

  //   range.map(i => {
  //     const date = new Date(i)

  //     const year = date.getFullYear()

  //     let month = (1 + date.getMonth()).toString()
  //     month = month.length > 1 ? month : `0${month}`

  //     let day = date.getDate().toString()
  //     day = day.length > 1 ? day : `0${day}`

  //     arr.push(`${month}/${day}/${year}`)
  //     return true
  //   })

  //   setPicker(range)

  //   if (range.length) {
  //     updatedData = dataToFilter().filter(item => {
  //       return (
  //         new Date(item.start_date).getTime() >= new Date(arr[0]).getTime() &&
  //         new Date(item.start_date).getTime() <= new Date(arr[1]).getTime()
  //       )
  //     })
  //     setFilteredData([...updatedData])
  //     setPicker(range)
  //   }
  // }

  return (
    <div id='productsearch'>
      {isLoadingData && 
        <Modal scrollable isOpen={isLoadingData} centered={true}>
          <ModalBody>
            <div className='text-center' style={{height: "80px"}}>
              <Spinner animation="border" variant="primary" style={{height: "70px", width: "70px", color: "blue"}}/>
            </div>
          </ModalBody>
        </Modal>
      }
      {/* <Breadcrumbs title='Product Search' data={[{ title: 'Proudct Search' }]} /> */}
      <div className="">
        <h4 className="card-title">Product Search Results</h4>
      </div>
      <Breadcrumb className='mb-1'>
        {/* <BreadcrumbItem>
          <Link to='#'> Home </Link>
        </BreadcrumbItem> */}
        <BreadcrumbItem>
          <Link to='/search/search'> Product Search </Link>
        </BreadcrumbItem>
        <BreadcrumbItem active>
          <span> Product Search Results </span>
        </BreadcrumbItem>
      </Breadcrumb>
      <Row className='match-height'>
        <Col sm='12'>
        <Card>
        {/* <CardHeader className='border-bottom'>
          <CardTitle tag='h4'>Advance Search</CardTitle>
        </CardHeader> */}
        <CardBody>
          <Row className='mt-1 mb-50 '>
            <p><b>Time Taken To Call API (milliseconds): </b>{timeTaken}</p>
            { searchData !== '' && <p><b>Search Results For</b>: Location: "{searchData.LocationCode}", {searchData.FieldType === "" ? "Catalog/Product No: " :  `${searchData.FieldType}: ` }
              {searchData?.ProductNo !== undefined && <> "{searchData.ProductNo}"</>}
              {searchData?.ProductNo === undefined && <> Min: "{searchData.Min}" Max: "{searchData.Max}"</>}
              </p>
            }
          </Row>
          <Row className='mt-1 mb-50'>
            <Col lg='4' md='6' className='mb-1'>
              <label className='form-label' htmlFor='catalog/product' />
                Search:
              <Input id='name' placeholder='' value={searchName} onChange={handleNameFilter} />
            </Col>
            <Col lg='8' md='6' className='mb-1 m-auto'>
            {!isLoadingData && <div className='float-right'>
              <CsvDownload
                filename="Products-Data"
                extension=".csv"
                separator=","
                columns={CsvDataColumns}
                datas={csvData}
              >Export<Download/></CsvDownload>
            </div>}
            </Col>
            {/* <Col lg='4' md='6' className='mb-1'>
              <label className='form-label' htmlFor='drawingnumber ' />
                Drawing Number:
              <Input id='post' placeholder='' value={searchPost} onChange={handlePostFilter} />
            </Col>
            <Col lg='4' md='6' className='mb-1'>
              <label className='form-label' htmlFor='drawingversion'/>
                Drawing Version:
              <Input id='city' placeholder='' value={searchCity} onChange={handleCityFilter} />
            </Col> */}
            {/* <Col lg='4' md='6' className='mb-1'>
              <label className='form-label' htmlFor='date'>
                Date:
              </label>
              <Flatpickr
                className='form-control'
                id='date'
                value={Picker}
                options={{ mode: 'range', dateFormat: 'm/d/Y' }}
                onChange={date => handleDateFilter(date)}
              />
            </Col> */}
            {/* <Col lg='4' md='6' className='mb-1'>
              <label className='form-label' htmlFor='salary'>
                Salary:
              </label>
              <Input id='salary' placeholder='10000' value={searchSalary} onChange={handleSalaryFilter} />
            </Col> */}
          </Row>
        </CardBody>
        {isLoadingData && <p className='text-center'>Loading.....</p>}
        {!isLoadingData && <div className='react-dataTable'>
          <DataTable
            noHeader
            pagination
            columns={advSearchColumns}
            paginationPerPage={10}
            className='react-dataTable'
            sortIcon={<ChevronDown size={10} />}
            paginationDefaultPage={currentPage + 1}
            paginationComponentOptions={paginationComponentOptions}
            paginationComponent={CustomPagination}
            data={dataToRender()}
          />
        </div>}
      </Card>
        </Col>
        {/* <Col md='6' sm='12'>
          <InputSizes />
        </Col>
        <Col md='6' sm='12'>
          <InputHorizontalSize />
        </Col>
        <Col sm='12'>
          <InputFloating />
        </Col>
        <Col sm='12'>
          <InputFile />
        </Col>
        <Col sm='12'>
          <InputState />
        </Col> */}
      </Row>
      {/* <Modal scrollable isOpen={isOpenModel} toggle={() => setScrollInnerModal(!isOpenModel)}>
        <ModalHeader toggle={() => setScrollInnerModal(!isOpenModel)}>Properties</ModalHeader>
        <ModalBody>
          <p></p>
        </ModalBody>
        <ModalFooter>
          <Button color='primary' onClick={() => setScrollInnerModal(!scrollInnerModal)}/>
        </ModalFooter>
      </Modal> */}
      <br/><br/><br/><br/><br/><br/><br/><br/>
    </div>
  )
}

export default ProductSearch
