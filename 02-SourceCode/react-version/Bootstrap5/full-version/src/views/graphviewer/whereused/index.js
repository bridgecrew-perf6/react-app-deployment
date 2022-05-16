// ** React Imports
import { Link } from 'react-router-dom'
import '@styles/base/pages/ui-feather.scss'
import React, { Fragment, useState, useEffect} from 'react'
import axios from 'axios'
import Avatar from '@components/avatar'
import { ChevronDown, MoreVertical, Edit, FileText, Archive, Trash, ArrowDownCircle, ArrowUpCircle, Image, Send, CheckCircle, Save, Info, PieChart, Download } from 'react-feather'
import CsvDownload from 'react-csv-downloader'
import DataTable from 'react-data-table-component'
import ReactPaginate from 'react-paginate'
import {  Card, CardHeader, CardBody, CardTitle, Input, Row, Col, Breadcrumb, BreadcrumbItem, Modal, ModalBody, ModalHeader } from 'reactstrap'
import '@styles/react/apps/app-invoice.scss'
import '@styles/react/libs/tables/react-dataTable-component.scss'
import { apiUrl } from '../../../serviceWorker'

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
  const color = invoiceStatusObj[row.ProductNo] ? invoiceStatusObj[row.ProductNo].color : 'light-danger',
  Icon = invoiceStatusObj[row.ProductNo] ? invoiceStatusObj[row.ProductNo].icon : Edit

  return (
    <Fragment>
      <Avatar color={color} icon={<Icon size={14} />} id={`av-tooltip-${row.ProductNo}`} onClick={() => { setScrollInnerModal(true) }}/>
      <Modal scrollable isOpen={isOpenModel} toggle={() => { setScrollInnerModal(false) }}>
        <ModalHeader toggle={() => { setScrollInnerModal(false) }}>PROPERTIES</ModalHeader>
        <ModalBody>
          <p><span className='fw-bold'>Catalog/Product #:</span> {row.ProductNo}</p>
          <p><span className='fw-bold'>Description:</span> {row.Description}</p>
          <p><span className='fw-bold'>Quantity:</span> {row.Quantity}</p>
        </ModalBody>
      </Modal>
    </Fragment>
  )
}
export const advSearchColumns = [
  {
    name: 'Catalog/Product #',
    sortable: true,
    minWidth: '200px',
    selector: row => row.ProductNo
  },
  {
    name: 'Description',
    sortable: true,
    minWidth: '200px',
    selector: row => row.Description
  },
  {
    name: 'Properties',
    sortable: true,
    minWidth: '50px',
    sortField: 'properties',
    cell: row => {
      return (
        <Fragment>
          <PropertiesWindow row={row}/>
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
      const color = invoiceStatusObj[row.ProductNo] ? invoiceStatusObj[row.ProductNo].color : 'light-primary',
        Icon = invoiceStatusObj[row.ProductNo] ? invoiceStatusObj[row.ProductNo].icon : ArrowDownCircle
      return (
        <Fragment>
          <Avatar color={color} icon={<Icon size={14} />} id={`av-tooltip-${row._id}`} onClick={() => { onSelcetProductStructure(row) }}/>
        </Fragment>
      )
    }
  },
  {
    name: 'Where Used',
    sortable: true,
    minWidth: '100px',
    sortField: 'whereused',
    cell: row => {
      const color = invoiceStatusObj[row.ProductNo] ? invoiceStatusObj[row.ProductNo].color : 'light-success',
        Icon = invoiceStatusObj[row.ProductNo] ? invoiceStatusObj[row.ProductNo].icon : ArrowUpCircle
      return (
        <Fragment>
          <Avatar color={color} icon={<Icon size={14} />} id={`av-tooltip-${row._id}`} onClick={() => { onSelcetWhereUsed(row) }}/>
        </Fragment>
      )
    }
  },
  {
    name: 'Quantity',
    sortable: true,
    minWidth: '200px',
    selector: row => row.Quantity
  }
]
export const CsvDataColumns = [
  {
    id: 'ProductNo',
    displayName: 'Catalog/Product #'
  },
  {
    id: 'Description',
    displayName: 'Description'
  },
  {
    id: 'Quantity',
    name: 'Quantity'
  }
]
const WhereUsed = () => {
  const [data, setData] = useState([])
  const [csvData, setcsvData] = useState([])
  const [isLoadingData, SetIsLoadingData] = useState(true)
  const [searchName, setSearchName] = useState('')
  const [currentPage, setCurrentPage] = useState(0)
  const [filteredData, setFilteredData] = useState([])
  const handlePagination = page => setCurrentPage(page.selected)
  
  useEffect(() => {
    const prodNo = new URLSearchParams(window.location.search).get("productNo")
    // console.log(prodNo)
    if (prodNo === undefined || prodNo === null) {
      window.location.href = '/search/search'
    } else {
      const pNo = atob(prodNo)
      axios.get(`${apiUrl}/part/whereused?product_number=${pNo}`).then(response => {
        setData(response.data.result._documents)
        setcsvData(response.data.result._documents)
        SetIsLoadingData(false)
        console.log(response)
      }).catch(err => {
        SetIsLoadingData(false)
        console.log(err)
      })
    }
    // return () => {
    //   second
    // }
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
  const handleNameFilter = e => {
    const value = e.target.value
    let updatedData = []
    setSearchName(value)
    if (value.length) {
      updatedData = data.filter(item => {
        const productName = typeof item.ProductNo === "string" ? item.ProductNo : item.ProductNo.toString()
        const includes = (productName.toLowerCase().includes(value.toLowerCase()) 
        || item.Description.toLowerCase().includes(value.toLowerCase())
        || item.Quantity.toLowerCase().includes(value.toLowerCase()))

        if (includes) {
          return includes
        } else return null
      })
      setFilteredData([...updatedData])
      setSearchName(value)
    }
  }

  return (
    <div id='graphviewer'>
      <div className="">
        <h4 className="card-title">Product Where Used</h4>
      </div>
      <Breadcrumb className='mb-1'>
      <BreadcrumbItem>
          <Link to='/search/search'> Product Search </Link>
        </BreadcrumbItem>
        <BreadcrumbItem active>
          <span> Product where used </span>
        </BreadcrumbItem>
      </Breadcrumb>
      <Row className='match-height'>
        <Col sm='12'>
          <Card>
            <CardBody>
              <Row className='mt-1 mb-50'>
                <Col lg='4' md='6' className='mb-1'>
                  <label className='form-label' htmlFor='catalog/product' />
                    Search:
                  <Input id='name' placeholder='' value={searchName} onChange={handleNameFilter} />
                </Col>
                <Col lg='8' md='6' className='mb-1 m-auto'>
                  {!isLoadingData && <div className='float-right'>
                    <CsvDownload
                      filename="whereUsed_Data"
                      extension=".csv"
                      separator=","
                      columns={CsvDataColumns}
                      datas={csvData}
                    >Export<Download/></CsvDownload>
                  </div>}
                </Col>
              </Row>
            </CardBody>
            {isLoadingData && <div className='text-center'> Loading.....</div>}
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
      </Row>
    </div>
  )
}

export default WhereUsed
