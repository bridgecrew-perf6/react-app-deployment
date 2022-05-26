import React, {useState, useEffect, Fragment } from 'react'
import {  Card, CardHeader, CardBody, CardTitle, Input, Row, Col, Breadcrumb, BreadcrumbItem, ModalHeader, ModalBody, ModalFooter, Modal, UncontrolledTooltip } from 'reactstrap'
import { ChevronDown, Download } from 'react-feather'
import { Link } from 'react-router-dom'
import Tree from 'react-animated-tree'
import CsvDownload from 'react-csv-downloader'
import ReactPaginate from 'react-paginate'
import DataTable from 'react-data-table-component'
import axios from 'axios'
import { apiUrl } from '../../../serviceWorker'

import '@styles/base/pages/ui-feather.scss'
import '@styles/react/apps/app-invoice.scss'
import '@styles/react/libs/tables/react-dataTable-component.scss'

const generateNewResults = (resultsData) => {
  const  results = []
  for (const i in resultsData) {
    results.push(resultsData[i])
  }
  return results
}
const GenTreeNode = (alldata, childName) => {
  const findChilds = alldata.find(item => item.name === childName)
  if (findChilds === null || findChilds === undefined) {
    return <Tree key={childName} content={childName}/>
  } else {
    return <Tree key={childName} content={childName} visible>
      {findChilds.children.map(item => {
        return GenTreeNode(alldata, item)
      })}
    </Tree>
  }
}
export const advSearchColumns = [
  {
    name: 'Node Level',
    sortable: true,
    minWidth: '200px',
    selector: row => row.level
  },
  {
    name: 'Catalog/Product #',
    sortable: true,
    minWidth: '50px',
    selector: row => row.name
  }
]
export const CsvDataColumns = [
  {
    id: 'level',
    displayName: 'Node Level'
  },
  {
    id: 'name',
    displayName: 'Catalog/Product #'
  }
]

const csvExportData = []
const GenerateCSVData = (alldata, childName, i) => {
  const newParent = alldata.find(item => item.name === childName)
  if (newParent === undefined || newParent === null) {
    csvExportData.push({level: i, name: childName})
  } else {
    csvExportData.push({level: i, name: childName})
    newParent.children.map((item, j) => {
      GenerateCSVData(alldata, item, `${i}.${j + 1}`)
    })
  }
}

const ProductStructure = () => {
  const [csvData, setcsvData] = useState([])
  const [structureData, setStructureData] = useState([])
  const [isLoadingData, SetIsLoadingData] = useState(true)
  const [searchName, setSearchName] = useState('')
  const [currentPage, setCurrentPage] = useState(0)
  const [filteredData, setFilteredData] = useState([])
  const [timeTaken, setTimeTaken] = useState(0)
  
  useEffect(() => {
    const prodNo = new URLSearchParams(window.location.search).get("productNo")
    if (prodNo === undefined || prodNo === null) {
      window.location.href = '/search/search'
    } else {
      const pNo = atob(prodNo)
      const timer = setInterval(() => {
        setTimeTaken(timeTaken => timeTaken + 1)
      }, 1)
      axios.get(`${apiUrl}/part/bom?product_number=${pNo}`).then(response => {
        console.log(response)
        const results = generateNewResults(response.data)
        setStructureData(results)
        console.log(results)
        if (results.length > 0) {
          csvExportData.push({level: "1", name: results[0].name})
          results[0].children.map((item, j) => {
            GenerateCSVData(results, item, `1.${j + 1}`)
          })
        }
        setcsvData(csvExportData)
        SetIsLoadingData(false)
        clearInterval(timer)
      }).catch(err => {
        SetIsLoadingData(false)
        clearInterval(timer)
        console.log(err)
      })
    }
  }, [])

  // ** Function to handle Pagination
  const handlePagination = page => setCurrentPage(page.selected)
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
      return csvData
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
      updatedData = csvData.filter(item => {
        const includes = (item.level.toLowerCase().includes(value.toLowerCase()) ||
        item.name.toLowerCase().includes(value.toLowerCase()))

        if (includes) {
          return includes
        } else return null
      })
      setFilteredData([...updatedData])
    }
  }

  return (
    <div id='producttree'>
      <div className=""> 
        <h4 className="card-title">Product Structure</h4>
      </div>
      <Breadcrumb className='mb-1'>
        <BreadcrumbItem>
          <Link to='/search/search'> Product Search </Link>
        </BreadcrumbItem>
        <BreadcrumbItem active>
          <span> Product Structure</span>
        </BreadcrumbItem>
      </Breadcrumb>
      <Card>
        <CardBody>
          <Row className='mt-1 mb-50 '>
            <p><b>Time Taken To Call API (milliseconds): </b>{timeTaken}</p>
          </Row>
        </CardBody>
      </Card>
      {isLoadingData && <div className='text-center'> Loading.....</div>}
      {!isLoadingData && <Fragment>
        <Card>
          <CardBody>
          {
            structureData.length > 0 && <Tree key={structureData[0].name} content={structureData[0].name} visible>
            {structureData[0].children.map(item => {
                return GenTreeNode(structureData, item)
              })
            }
            </Tree>
          }
          {
            structureData.length === 0 && <p>There are no records to display product structure</p>
          }
          </CardBody>
        </Card>
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
                      filename="Product_Structure"
                      extension=".csv"
                      separator=","
                      columns={CsvDataColumns}
                      datas={csvData}
                    >Export<Download/></CsvDownload>
                  </div>}
                  </Col>
                </Row>
              </CardBody>
              <div className='react-dataTable'>
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
              </div>
            </Card>
          </Col>
        </Row>
      </Fragment>}
    </div>
  )
}
export default  ProductStructure