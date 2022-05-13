import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Row, Col, Button, Breadcrumb, BreadcrumbItem  } from 'reactstrap'
import '@styles/base/pages/ui-feather.scss'

const DrawingSearch = () => {
  const [drawing, setDrawing] = useState('')
  const [draErrMsg, setDraErrMsg] = useState('')
  
  const onChangeDrawing = (e) => {
    setDrawing(e.target.value)
    setDraErrMsg('')
  }
  const onSearch = (e) => {
    e.preventDefault()
    if (drawing === '') {
      setDraErrMsg("Please enter drawing number!")
      return
    }
    window.location.href = `/drawingsearch/drawingsearchresults?productNo=${btoa(drawing)}`
  }

  return (
    <div id='drawingsearch'>
      <div className="">
        <h4 className="card-title">Drawing Search</h4>
      </div>
      <Breadcrumb className='mb-1'>
        <BreadcrumbItem>
          <Link to='#'> Home </Link>
        </BreadcrumbItem>
        <BreadcrumbItem active>
          <span> Drawing Search </span>
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
                    <span className='astrix'>*</span> Product/Part Number {/* <span className='f-10 float-right'>Solenoid Values only</span> */}
                  </label>
                  <input type='text' id='suplierInput' className='form-control' placeholder='Enter Product/Part Number' onChange={onChangeDrawing} />
                </div>
                <span className='text-danger'>{draErrMsg}</span>
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

export default DrawingSearch