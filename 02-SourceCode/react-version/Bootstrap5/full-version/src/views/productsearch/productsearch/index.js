// ** React Imports
import { Fragment, useState} from 'react'
import { Link } from 'react-router-dom'
import Prism from 'prismjs'

// ** Icons Imports
// import Select from 'react-select'
// import ReactSelect from './SelectReact'
import { data, advSearchColumns } from '../../tables/data-tables/data'
import ModalFormAndScroll from './ModalFormAndScroll'
// import { modalForm } from '../ModalSourceCode'

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

import Flatpickr from 'react-flatpickr'
import ReactPaginate from 'react-paginate'
import { ChevronDown } from 'react-feather'
import DataTable from 'react-data-table-component'
// import TableAdvSearch from './TableAdvSearch'


// ** Reactstrap Imports
import {  Card, CardHeader, CardBody, CardTitle, Button, ModalHeader, ModalBody, ModalFooter, Modal, Input, Row, Col, Breadcrumb, BreadcrumbItem } from 'reactstrap'
// import Breadcrumbs from '@components/breadcrumbs'
import '@styles/base/pages/ui-feather.scss'
import '@styles/react/apps/app-invoice.scss'

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


const Modals = () => {
  useEffect(() => {
    Prism.highlightAll()
  }, [])
}
const ProductSearch = () => {
  
  // const [Picker, setPicker] = useState('')
  const [searchName, setSearchName] = useState('')
  const [searchPost, setSearchPost] = useState('')
  const [searchCity, setSearchCity] = useState('')
  const [currentPage, setCurrentPage] = useState(0)
  // const [searchEmail, setSearchEmail] = useState('')
  // const [searchSalary, setSearchSalary] = useState('')
  const [filteredData, setFilteredData] = useState([])
  const [scrollInnerModal, setScrollInnerModal] = useState(false)


  // ** Function to handle Pagination
  const handlePagination = page => setCurrentPage(page.selected)

  // ** Table data to render
  const dataToRender = () => {
    if (
      searchName.length ||
      searchPost.length ||
      
      searchCity.length 
      // searchSalary.length
      // Picker.length
    ) {
      return filteredData
    } else {
      return data
    }
  }

  // ** Custom Pagination
  const CustomPagination = () => (
    <ReactPaginate
      previouslabel={''}
      nextlabel={''}
      forcePage={currentPage}
      onPageChange={page => handlePagination(page)}
      pageCount={Math.ceil(dataToRender().length / 7) || 1}
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
    const dataToFilter = () => {
      if (searchPost.length || searchCity.length) {
        return filteredData
      } else {
        return data
      }
    }

    setSearchName(value)
    if (value.length) {
      updatedData = dataToFilter().filter(item => {
        const startsWith = item.full_name.toLowerCase().startsWith(value.toLowerCase())

        const includes = item.full_name.toLowerCase().includes(value.toLowerCase())

        if (startsWith) {
          return startsWith
        } else if (!startsWith && includes) {
          return includes
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
  const handlePostFilter = e => {
    const value = e.target.value
    let updatedData = []
    const dataToFilter = () => {
      if (searchName.length || searchCity.length) {
        return filteredData
      } else {
        return data
      }
    }

    setSearchPost(value)
    if (value.length) {
      updatedData = dataToFilter().filter(item => {
        const startsWith = item.post.toLowerCase().startsWith(value.toLowerCase())

        const includes = item.post.toLowerCase().includes(value.toLowerCase())

        if (startsWith) {
          return startsWith
        } else if (!startsWith && includes) {
          return includes
        } else return null
      })
      setFilteredData([...updatedData])
      setSearchPost(value)
    }
  }

  // ** Function to handle city filter
  const handleCityFilter = e => {
    const value = e.target.value
    let updatedData = []
    const dataToFilter = () => {
      if (searchName.length || searchPost.length) {
        return filteredData
      } else {
        return data
      }
    }

    setSearchCity(value)
    if (value.length) {
      updatedData = dataToFilter().filter(item => {
        const startsWith = item.city.toLowerCase().startsWith(value.toLowerCase())

        const includes = item.city.toLowerCase().includes(value.toLowerCase())

        if (startsWith) {
          return startsWith
        } else if (!startsWith && includes) {
          return includes
        } else return null
      })
      setFilteredData([...updatedData])
      setSearchCity(value)
    }
  }

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
      {/* <Breadcrumbs title='Product Search' data={[{ title: 'Proudct Search' }]} /> */}
      {/* <Card title='Form & Scrolling Modals' code={modalForm}>
            <ModalFormAndScroll />
      </Card> */}

<Modal scrollable isOpen={scrollInnerModal} toggle={() => setScrollInnerModal(!scrollInnerModal)}>
          <ModalHeader toggle={() => setScrollInnerModal(!scrollInnerModal)}>Modal Title</ModalHeader>
          <ModalBody>
            <p>
              Biscuit powder jelly beans. Lollipop candy canes croissant icing chocolate cake. Cake fruitcake powder
              pudding pastry.
            </p>
            <p>
              Tootsie roll oat cake I love bear claw I love caramels caramels halvah chocolate bar. Cotton candy gummi
              bears pudding pie apple pie cookie. Cheesecake jujubes lemon drops danish dessert I love caramels powder.
            </p>
            <p>
              Chocolate cake icing tiramisu liquorice toffee donut sweet roll cake. Cupcake dessert icing dragée
              dessert. Liquorice jujubes cake tart pie donut. Cotton candy candy canes lollipop liquorice chocolate
              marzipan muffin pie liquorice.
            </p>
            <p>
              Powder cookie jelly beans sugar plum ice cream. Candy canes I love powder sugar plum tiramisu. Liquorice
              pudding chocolate cake cupcake topping biscuit. Lemon drops apple pie sesame snaps tootsie roll carrot
              cake soufflé halvah. Biscuit powder jelly beans. Lollipop candy canes croissant icing chocolate cake. Cake
              fruitcake powder pudding pastry.
            </p>
            <p>
              Tootsie roll oat cake I love bear claw I love caramels caramels halvah chocolate bar. Cotton candy gummi
              bears pudding pie apple pie cookie. Cheesecake jujubes lemon drops danish dessert I love caramels powder.
            </p>
            <p>
              Chocolate cake icing tiramisu liquorice toffee donut sweet roll cake. Cupcake dessert icing dragée
              dessert. Liquorice jujubes cake tart pie donut. Cotton candy candy canes lollipop liquorice chocolate
              marzipan muffin pie liquorice.
            </p>
            <p>
              Powder cookie jelly beans sugar plum ice cream. Candy canes I love powder sugar plum tiramisu. Liquorice
              pudding chocolate cake cupcake topping biscuit. Lemon drops apple pie sesame snaps tootsie roll carrot
              cake soufflé halvah. Biscuit powder jelly beans. Lollipop candy canes croissant icing chocolate cake. Cake
              fruitcake powder pudding pastry.
            </p>
            <p>
              Tootsie roll oat cake I love bear claw I love caramels caramels halvah chocolate bar. Cotton candy gummi
              bears pudding pie apple pie cookie. Cheesecake jujubes lemon drops danish dessert I love caramels powder.
            </p>
            <p>
              Chocolate cake icing tiramisu liquorice toffee donut sweet roll cake. Cupcake dessert icing dragée
              dessert. Liquorice jujubes cake tart pie donut. Cotton candy candy canes lollipop liquorice chocolate
              marzipan muffin pie liquorice.
            </p>
            <p>
              Powder cookie jelly beans sugar plum ice cream. Candy canes I love powder sugar plum tiramisu. Liquorice
              pudding chocolate cake cupcake topping biscuit. Lemon drops apple pie sesame snaps tootsie roll carrot
              cake soufflé halvah. Biscuit powder jelly beans. Lollipop candy canes croissant icing chocolate cake. Cake
              fruitcake powder pudding pastry.
            </p>
            <p>
              Tootsie roll oat cake I love bear claw I love caramels caramels halvah chocolate bar. Cotton candy gummi
              bears pudding pie apple pie cookie. Cheesecake jujubes lemon drops danish dessert I love caramels powder.
            </p>
            <p>
              Chocolate cake icing tiramisu liquorice toffee donut sweet roll cake. Cupcake dessert icing dragée
              dessert. Liquorice jujubes cake tart pie donut. Cotton candy candy canes lollipop liquorice chocolate
              marzipan muffin pie liquorice.
            </p>
            <p>
              Powder cookie jelly beans sugar plum ice cream. Candy canes I love powder sugar plum tiramisu. Liquorice
              pudding chocolate cake cupcake topping biscuit. Lemon drops apple pie sesame snaps tootsie roll carrot
              cake soufflé halvah.
            </p>
          </ModalBody>
          <ModalFooter>
            <Button color='primary' onClick={() => setScrollInnerModal(!scrollInnerModal)}>
              Accept
            </Button>
          </ModalFooter>
        </Modal>

      <div className="">
        <h4 className="card-title">Product Search</h4>
      </div>
      <Breadcrumb className='mb-1'>
        <BreadcrumbItem>
          <Link to='#'> Home </Link>
        </BreadcrumbItem>
        {/* <BreadcrumbItem>
          <Link to='#'> Search </Link>
        </BreadcrumbItem> */}
        <BreadcrumbItem active>
          <span> Product Search </span>
        </BreadcrumbItem>
      </Breadcrumb>
      <Row className='match-height'>
        <Col sm='12'>
        <Card>
        {/* <CardHeader className='border-bottom'>
          <CardTitle tag='h4'>Advance Search</CardTitle>
        </CardHeader> */}
        <CardBody>
          <Row className='mt-1 mb-50'>
            <Col lg='4' md='6' className='mb-1'>
              <label className='form-label' for='catalog/product' />
                Catalog/Product #:
              <Input id='name' placeholder='' value={searchName} onChange={handleNameFilter} />
            </Col>
            {/* <Col lg='4' md='6' className='mb-1'>
              <label className='form-label' for='email'>
                Email:
              </label>
              <Input
                type='email'
                id='email'
                placeholder='Bwayne@email.com'
                value={searchEmail}
                onChange={handleEmailFilter}
              />
            </Col> */}
            <button onClick={() => setScrollInnerModal(!scrollInnerModal)}>sd</button>
            <Col lg='4' md='6' className='mb-1'>
              <label className='form-label' for='drawingnumber ' />
                Drawing Number:
              <Input id='post' placeholder='' value={searchPost} onChange={handlePostFilter} />
            </Col>
            <Col lg='4' md='6' className='mb-1'>
              <label className='form-label' for='drawingversion'/>
                Drawing Version:
              <Input id='city' placeholder='' value={searchCity} onChange={handleCityFilter} />
            </Col>
            {/* <Col lg='4' md='6' className='mb-1'>
              <label className='form-label' for='date'>
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
              <label className='form-label' for='salary'>
                Salary:
              </label>
              <Input id='salary' placeholder='10000' value={searchSalary} onChange={handleSalaryFilter} />
            </Col> */}
          </Row>
        
        </CardBody>
        <div className='react-dataTable'>
          <DataTable
            noHeader
            pagination
            columns={advSearchColumns}
            paginationPerPage={7}
            className='react-dataTable'
            sortIcon={<ChevronDown size={10} />}
            paginationDefaultPage={currentPage + 1}
            paginationComponent={CustomPagination}
            data={dataToRender()}
          />
        </div>
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
    </div>
  )
}

export default ProductSearch
