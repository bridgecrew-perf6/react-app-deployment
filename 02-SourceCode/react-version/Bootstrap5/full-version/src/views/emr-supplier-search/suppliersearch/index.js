import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Row, Col, Button, Breadcrumb, BreadcrumbItem  } from 'reactstrap'
import '@styles/base/pages/ui-feather.scss'

const SupplierSearch = () => {
  const [supplier, setSupplier] = useState('')
  const [productNo, setProductNo] = useState('')
  const [suppErrMsg, setSupErrMsg] = useState('')
  
  const onChangeSupplier = (e) => {
    setSupplier(e.target.value)
    setSupErrMsg('')
  }
  const onChangeProductNo = (e) => {
    setProductNo(e.target.value)
    setSupErrMsg('')
  }
  const validateForm = () => {
    let isValid = true
    if (supplier === '' && productNo === '') {
      isValid = false
      setSupErrMsg("Please enter supplier name or product number or both!")
    }
    return isValid
  }
  const onSearch = (e) => {
    e.preventDefault()
    if (!validateForm()) {
      return
    }
    const searchData = {
      suppliername: supplier,
      ProductNo: productNo
    }
    console.log(searchData)
    localStorage.setItem('supplierSearchData', btoa(JSON.stringify(searchData)))
    window.location.href = '/suppliersearch/suppliersearchresults'
  }

  return (
    <div id='supliersearch'>
      <div className="">
        <h4 className="card-title">Supplier Search</h4>
      </div>
      <Breadcrumb className='mb-1'>
        <BreadcrumbItem>
          <Link to='#'> Home </Link>
        </BreadcrumbItem>
        <BreadcrumbItem active>
          <span> Supplier Search </span>
        </BreadcrumbItem>
      </Breadcrumb>
      <Row className='match-height'>
        <Col sm='12'>
          <div className="col-md-12 col-lg-12">
            <div className="card">
              <div className="card-header"></div>
              <div className="card-body row">
                <div className="col-md-5 mb-1 mt-1">
                  <label className='form-label w-100'>
                    {/* <span className='astrix'>*</span> */} Supplier Name {/* <span className='f-10 float-right'>Solenoid Values only</span> */}
                  </label>
                  <input type='text' id='suplierInput' className='form-control' placeholder='Enter supplier name' onChange={onChangeSupplier} />
                </div><div className="col-md-2 mb-1 mt-2 text-center">
                  <br/>
                  <span className='astrix'>*</span>(OR)
                </div>
                <div className="col-md-5 mb-1 mt-1">
                  <label className='form-label w-100'>
                    {/* <span className='astrix'>*</span> */} Product/Part Number {/* <span className='f-10 float-right'>Solenoid Values only</span> */}
                  </label>
                  <input type='text' id='prodInput' className='form-control' placeholder='Enter Product or Part Number' onChange={onChangeProductNo} />
                </div>
                <span className='text-danger'>{suppErrMsg}</span>
              </div>
            </div>
          </div>
          <div className="">
            <Button.Ripple color='primary' className="float-right" type="submit" onClick={onSearch} >Search</Button.Ripple>
          </div>
        </Col>
      </Row>
    </div>
  )
}

export default SupplierSearch