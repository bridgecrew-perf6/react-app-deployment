import { Fragment, useState, useEffect} from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'
import { ChevronDown, Download} from 'react-feather'
import CsvDownload from 'react-csv-downloader'
import ReactPaginate from 'react-paginate'
import DataTable from 'react-data-table-component'
import {  Card, CardHeader, CardBody, CardTitle, Input, Row, Col, Breadcrumb, BreadcrumbItem } from 'reactstrap'
import '@styles/base/pages/ui-feather.scss'
import '@styles/react/apps/app-invoice.scss'
import { apiUrl } from '../../../serviceWorker'


export const advSearchColumns = [
  {
    name: 'Drawing Number',
    sortable: true,
    minWidth: '200px',
    selector: row => row.drawing_number
  },
  {
    name: 'Drawing Revision',
    sortable: true,
    minWidth: '50px',
    selector: row => row.drawing_revision
  },
  {
    name: 'Intellectual Owner',
    sortable: true,
    minWidth: '50px',
    selector: row => row.organization
  },
  {
    name: 'IsCatalog',
    sortable: true,
    minWidth: '100px',
    selector: row => row.isCatalog
  },
  {
    name: 'Drawing Name',
    sortable: true,
    minWidth: '100px',
    selector: row => row.name
  }
]
export const CsvDataColumns = [
  {
    id: 'drawing_number',
    displayName: 'Drawing Number'
  },
  {
    id: 'drawing_revision',
    name: 'Drawing Revision'
  },
  {
    id: 'organization',
    displayName: 'Intellectual Owner'
  },
  {
    id: 'isCatalog',
    name: 'IsCatalog'
  },
  {
    id: 'name',
    displayName: 'Drawing Name'
  }
]

const DrawingSearchResults = () => {
  const [data, setData] = useState([])
  const [isLoadingData, SetIsLoadingData] = useState(true)
  const [searchName, setSearchName] = useState('')
  const [currentPage, setCurrentPage] = useState(0)
  const [filteredData, setFilteredData] = useState([])
  const [csvData, setcsvData] = useState([])

  // ** Function to handle Pagination
  const handlePagination = page => setCurrentPage(page.selected)
  // const [searchData, setSearchData] = useState('')
  const [timeTaken, setTimeTaken] = useState(0)

  // ** SET CSV Data
  const onSetCSVData = (CsvData) => {
    const csvdata = []
    CsvData.map(item => {
      csvdata.push({
        drawing_number: item.drawing_number,
        drawing_revision: item.drawing_revision,
        organization: item.organization,
        isCatalog: item.isCatalog,
        name: item.name
      })
    })
    setcsvData(csvdata)
  }
  useEffect(() => {
    const prodNo = new URLSearchParams(window.location.search).get("productNo")
    if (prodNo === undefined || prodNo === null) {
      window.location.href = '/drawingsearch/drawingsearch'
    } else {
      const pNo = atob(prodNo)
      console.log(pNo)
      const timer = setInterval(() => {
        setTimeTaken(timeTaken => timeTaken + 1)
      }, 1)
      const url = `${apiUrl}/drawing/by_product?product_number=${pNo}`
      console.log(url)
      axios.get(url).then(response => {
        setData(response.data._documents)
        onSetCSVData(response.data._documents)
        SetIsLoadingData(false)
        SetIsLoadingData(false)
        clearInterval(timer)
        console.log(response)
      }).catch(err => {
        SetIsLoadingData(false)
        alert("Not valid product no.")
        console.log(err)
        clearInterval(timer)
        window.location.href = '/drawingsearch/drawingsearch'
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

  // ** Function to handle name filter
  const handleSearchFilter = e => {
    const value = e.target.value
    let updatedData = []
    setSearchName(value)
    if (value.length) {
      updatedData = data.filter(item => {
        const drawingno = typeof item.drawing_number  === "string" ? item.drawing_number : item.drawing_number.toString()
        const drawingRevi = typeof item.drawing_revision  === "string" ? item.drawing_revision : item.drawing_revision.toString()
        const drawingName = typeof item.name  === "string" ? item.name : item.name.toString()
        const includes = (drawingno.toLowerCase().includes(value.toLowerCase())  ||
        (item.drawing_revision !== null && item.drawing_revision !== "" && drawingRevi.toLowerCase().includes(value.toLowerCase())) ||
        (item.organization !== null && item.organization !== "" && item.organization.toLowerCase().includes(value.toLowerCase())) ||
        (item.name !== null && item.name !== "" && drawingName.toLowerCase().includes(value.toLowerCase())))

        if (includes) {
          return includes
        } else return null
      })
      setFilteredData([...updatedData])
    }
  }
  
  return (
    <div id='drawingsearchresults'>
      <div className="">
        <h4 className="card-title">Drawing Search Results</h4>
      </div>
      <Breadcrumb className='mb-1'>
        <BreadcrumbItem>
          <Link to='/drawingsearch/drawingsearch'> Drawing Search </Link>
        </BreadcrumbItem>
        <BreadcrumbItem active>
          <span> Drawing Search Results </span>
        </BreadcrumbItem>
      </Breadcrumb>
      {/* { searchData !== '' && <p><b>Search data</b>:
        {searchData?.drawingNo !== '' && <> DrawingNo : "{searchData.drawingNo}"</>}
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
                filename="drawings-data"
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
export default DrawingSearchResults