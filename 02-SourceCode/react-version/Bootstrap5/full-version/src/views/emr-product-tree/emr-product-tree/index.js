import React from 'react'
import {  Card, CardHeader, CardBody, CardTitle, Input, Row, Col, Breadcrumb, BreadcrumbItem } from 'reactstrap'
import { Link } from 'react-router-dom'
import Tree from 'react-animated-tree'

const data = { 
  id: 1,
  name: "Dynamic Products",
  children: [
    {
      id: 2,
      name: "Product",
      children: [
        {
          id: 4,
          name: "Product",
          children: []
        },
        {
          id: 5,
          name: "Product",
          children: [
            {
              id: 8,
              name: "Product",
              children: []
            }
          ]
        },
        {
          id: 6,
          name: "Product",
          children: []
        },
        {
          id: 7,
          name: "Product",
          children: [
            {
              id: 9,
              name: "Product",
              children: []
            },
            {
              id: 10,
              name: "Product",
              children: [
                {
                  id: 12,
                  name: "Product",
                  children: []
                }
              ]
            },
            {
              id: 11,
              name: "Product",
              children: [
                {
                  id: 13,
                  name: "Product",
                  children: []
                }
              ]
            }
          ]
        }
      ]
    },
    {
      id: 3,
      name: "Product",
      children: [
        {
          id: 14,
          name: "Product",
          children: []
        },
        {
          id: 15,
          name: "Product",
          children: [
            {
              id: 17,
              name: "Product",
              children: []
            }
          ]
        },
        {
          id: 16,
          name: "Product",
          children: [
            {
              id: 18,
              name: "Product",
              children: []
            }
          ]
        }
      ]
    }
  ]
}
const TreeNode = (obj) => {
  if (obj.children.length === 0) {
    return <Tree key={obj.id} content={obj.name}/>
  } else {
    return <Tree key={obj.id} content={obj.name} visible>
      {obj.children.map(item => {
        return TreeNode(item)
      })}
    </Tree>
  }
}
const ProductTree = () => {
  return (
    <div id='producttree'>
      <div className=""> 
        <h4 className="card-title">Product Tree Structure</h4>
      </div>
      <Breadcrumb className='mb-1'>
        <BreadcrumbItem>
          <Link to='/search/search'> Product Search </Link>
        </BreadcrumbItem>
        <BreadcrumbItem active>
          <span> Product Tree Structure</span>
        </BreadcrumbItem>
      </Breadcrumb>
      {/* <div style={{height: '400px', width: "2000px" }}>
        <Tree content="Product" open  visible onClick={console.log("Clicked On Tree")}>
          <Tree content="Contents" visible>
            <Tree content="Seeds" />
            <Tree content="Contents">
              <Tree content="Seeds" />
            </Tree>
            <Tree content="Contents">
              <Tree content="Seeds" />
              <Tree content="Contents">
                <Tree content="Seeds" />
              </Tree>
              <Tree content="Contents">
                <Tree content="Seeds" />
              </Tree>
            </Tree>
            <Tree content="Seeds" />
          </Tree>
          <Tree content="Contents" visible>
            <Tree content="Seeds"/>
            <Tree content="Contents">
              <Tree content="Seeds" />
            </Tree>
            <Tree content="Contents">
              <Tree content="Seeds" />
            </Tree>
          </Tree>
        </Tree>
      </div> */}
      <div style={{height: '1000px', width: "2000px" }}>
        { data.children.length === 0 && <Tree content={data.name}/>}
        { data.children.length >= 0 && <Tree key={data.id} content={data.name}  visible>
            {data.children.map(item => {
              return TreeNode(item)
            })}
          </Tree> }
      </div>
    </div>
  )
}
export default  ProductTree