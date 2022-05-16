import { Fragment, useState, useEffect} from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'
import { ChevronDown, Download } from 'react-feather'
import CsvDownload from 'react-csv-downloader'
import ReactPaginate from 'react-paginate'
import DataTable from 'react-data-table-component'
import {  Card, CardHeader, CardBody, CardTitle, Input, Row, Col, Breadcrumb, BreadcrumbItem } from 'reactstrap'
import '@styles/base/pages/ui-feather.scss'
import '@styles/react/apps/app-invoice.scss'

import { apiUrl } from '../../../serviceWorker'
const GenerateUrl = (x) => {
  let url = null
  if (x.searchType === "Normal") {
    if (x.suppliername === "") {
      const prodno = x.ProductNo
      url = `${apiUrl}/supplier?product_number=${prodno}`
    } else if (x.ProductNo === "") {
      const supName = x.suppliername
      url = `${apiUrl}/supplier?supplier_name=${supName}`
    } else {
      const supName = x.suppliername
      const prodno = x.ProductNo
      url = `${apiUrl}/supplier?supplier_name=${supName}&product_number=${prodno}`
    }
  } else {
    const supName = x.suppliername
    url = `${apiUrl}/arangosearch/supplier_name?supplier_name=${supName}`
  }
  console.log(url)
  return url
}
export const advSearchColumns = [
  {
    name: 'Catalog/Product #',
    sortable: true,
    minWidth: '200px',
    selector: row => row.PartNo
  },
  {
    name: 'MPN',
    sortable: true,
    minWidth: '200px',
    selector: row => row.MPN
  },
  // {
  //   name: 'Intellectual Owner',
  //   sortable: true,
  //   minWidth: '50px',
  //   selector: row => row.Part_Location
  // },
  {
    name: 'Assy. Item Status',
    sortable: true,
    minWidth: '50px',
    selector: row => row.Status
  },
  {
    name: 'Supplier',
    sortable: true,
    minWidth: '100px',
    selector: row => row.Supplier
  },
  {
    name: 'Supplier Location',
    sortable: true,
    minWidth: '100px',
    selector: row => row.Supplier_Location
  }
]
export const CsvDataColumns = [
  {
    id: 'PartNo',
    displayName: 'Catalog/Product #'
  },
  {
    id: 'MPN',
    displayName: 'MPN'
  },
  // {
  //   id: 'Part_Location',
  //   displayName: 'Intellectual Owner'
  // },
  {
    id: 'Status',
    name: 'Status'
  },
  {
    id: 'Supplier',
    name: 'Supplier'
  },
  {
    id: 'Supplier_Location',
    displayName: 'Supplier Location'
  }
]

const SupplierSearchResults = () => {
  const [data, setData] = useState([])
  const [isLoadingData, SetIsLoadingData] = useState(true)
  const [searchName, setSearchName] = useState('')
  const [currentPage, setCurrentPage] = useState(0)
  const [filteredData, setFilteredData] = useState([])
  const [csvData, setcsvData] = useState([])
  const [timeTaken, setTimeTaken] = useState(0)

  // ** Function to handle Pagination
  const handlePagination = page => setCurrentPage(page.selected)
  // const [searchData, setSearchData] = useState('')

  // ** SET CSV Data
  const onSetCSVData = (CsvData) => {
    const csvdata = []
    CsvData.map(item => {
      const  suplier = item.Supplier !== null ? item.Supplier.replaceAll(',', ' ') : item.Supplier
      const  suplierLoc = item.Supplier_Location !== null ? item.Supplier_Location.replaceAll(',', ' ') : item.Supplier_Location
      csvdata.push({
        PartNo: item.PartNo,
        MPN: item.MPN,
        // Part_Location: item.Part_Location,
        Status: item.Status,
        Supplier: suplier,
        Supplier_Location: suplierLoc
      })
    })
    setcsvData(csvdata)
  }

  useEffect(() => {
    const searchdata = localStorage.getItem('supplierSearchData')
    if (searchdata === undefined || searchdata === null) {
      window.location.href = '/suppliersearch/suppliersearch'
    } else {
      const x = JSON.parse(atob(searchdata))
      // setSearchData(x)
      const url = GenerateUrl(x)
      if (url !== null) {
        const timer = setInterval(() => {
          setTimeTaken(timeTaken => timeTaken + 1)
        }, 1)
        axios.get(url).then(response => {
          if (response.data?.result) {
            setData(response.data.result._documents)
            onSetCSVData(response.data.result._documents)
          } else {
            setData(response.data)
            onSetCSVData(response.data)
          }
          SetIsLoadingData(false)
          clearInterval(timer)
          console.log(response)
        }).catch(err => {
          SetIsLoadingData(false)
          clearInterval(timer)
          console.log(err)
        })
      } else {
        alert("Not valid search.")
        window.location.href = '/suppliersearch/suppliersearch'
      }
    }
  }, [])

  // ** Table data to render
  const dataToRender = () => {
    if (
      searchName.length
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
  const handleSearchFilter = e => {
    const value = e.target.value
    let updatedData = []
    setSearchName(value)
    if (value.length) {
      updatedData = data.filter(item => {
        const partno = typeof item.PartNo  === "string" ? item.PartNo : item.PartNo.toString()
        const mpn = typeof item.MPN  === "string" ? item.MPN : item.MPN.toString()
        const includes = (partno.toLowerCase().includes(value.toLowerCase())  ||
        (item.MPN !== null && item.MPN !== "" && mpn.toLowerCase().includes(value.toLowerCase())) ||
        // (item.Part_Location !== null && item.Part_Location !== "" && item.Part_Location.toLowerCase().includes(value.toLowerCase())) ||
        (item.Status !== null && item.Status !== "" && item.Status.toLowerCase().includes(value.toLowerCase())) ||
        (item.Supplier !== null && item.Supplier !== "" && item.Supplier.toLowerCase().includes(value.toLowerCase())) ||
        (item.Supplier_Location !== null && item.Supplier_Location !== "" && item.Supplier_Location.toLowerCase().includes(value.toLowerCase())))

        if (includes) {
          return includes
        } else return null
      })
      setFilteredData([...updatedData])
    }
  }

  return (
    <div id='suppliersearchresults'>
      {/* <Breadcrumbs title='Product Search' data={[{ title: 'Proudct Search' }]} /> */}
      <div className="">
        <h4 className="card-title">Supplier Search Results</h4>
      </div>
      <Breadcrumb className='mb-1'>
        <BreadcrumbItem>
          <Link to='/suppliersearch/suppliersearch'> Supplier Search </Link>
        </BreadcrumbItem>
        <BreadcrumbItem active>
          <span> Supplier Search Results </span>
        </BreadcrumbItem>
      </Breadcrumb>
      {/* { searchData !== '' && <p><b>Search data</b>:
        {searchData?.suppliername !== '' && <> Supplier Name: "{searchData.suppliername}"</>}
        {searchData?.ProductNo !== '' && <> Product/Part No : "{searchData.ProductNo}"</>}
      </p>} */}
      <Row className='mt-1 mb-50 '>
        <p><b>Time Taken To Call API (milliseconds): </b>{timeTaken}</p>
      </Row>
      <Row className='match-height'>
        <Col sm='12'>
        <Card>
        <CardBody>
          <Row className='mt-1 mb-50'>
            <Col lg='4' md='6' className='mb-1'>
              <label className='form-label' htmlFor='catalog/product' />
                Search:
              <Input id='name' placeholder='' value={searchName} onChange={handleSearchFilter} />
            </Col>
            <Col lg='8' md='6' className='mb-1 m-auto'>
            {!isLoadingData && <div className='float-right'>
              <CsvDownload
                filename="suppliers-data"
                extension=".csv"
                separator=","
                columns={CsvDataColumns}
                datas={csvData}
              >Export<Download size={20}/></CsvDownload>
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
      <br/><br/><br/><br/><br/><br/><br/><br/>
    </div>
  )
}

export default SupplierSearchResults
