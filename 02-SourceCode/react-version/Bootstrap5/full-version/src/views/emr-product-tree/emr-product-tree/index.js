import React from 'react'
import {  Card, CardHeader, CardBody, CardTitle, Input, Row, Col, Breadcrumb, BreadcrumbItem } from 'reactstrap'
import { Link } from 'react-router-dom'
import Tree from 'react-animated-tree'

const data = { 
  id: 1,
  name: "8210G002-016",
  children: [
    {
      id: 11,
      name: "143490-001",
      children: []
    },
    {
      id: 12,
      name: "238212-032",
      children: []
    },
    {
      id: 13,
      name: "238754-502",
      children: [
        {
          id: 131,
          name: "000006-583-R",
          children: []
        },
        {
          id: 132,
          name: "000006-950-R",
          children: []
        },
        {
          id: 133,
          name: "073103-068-A2",
          children: []
        },
        {
          id: 134,
          name: "143220-001",
          children: []
        },
        {
          id: 135,
          name: "236857-001",
          children: []
        },
        {
          id: 136,
          name: "238450-001",
          children: []
        },
        {
          id: 137,
          name: "260689-001",
          children: []
        },
        {
          id: 138,
          name: "266458-001",
          children: []
        },
        {
          id: 139,
          name: "88122602",
          children: []
        }
      ]
    },
    {
      id: 14,
      name: "240350-001",
      children: [
        {
          id: 141,
          name: "039619-033-70",
          children: []
        },
        {
          id: 142,
          name: "039998-078",
          children: [
            {
              id: 1421,
              name: "073102-003-G1",
              children: []
            },
            {
              id: 1422,
              name: "126299-001",
              children: []
            }
          ]
        },
        {
          id: 143,
          name: "095487-001",
          children: [
            {
              id: 1431,
              name: "039619-001-50",
              children: []
            },
            {
              id: 1432,
              name: "254706-001",
              children: []
            },
            {
              id: 1433,
              name: "254708-001",
              children: []
            },
            {
              id: 1434,
              name: "258205-002",
              children: []
            },
            {
              id: 1435,
              name: "WC[R]ASSLY",
              children: []
            }
          ]
        },
        {
          id: 144,
          name: "102045-001",
          children: [
            {
              id: 1441,
              name: "176332-001",
              children: []
            },
            {
              id: 1442,
              name: "176333-001",
              children: []
            },
            {
              id: 1443,
              name: "WC[R]ASSLY",
              children: []
            }
          ]
        },
        {
          id: 145,
          name: "103032",
          children: []
        },
        {
          id: 146,
          name: "123620-573",
          children: []
        },
        {
          id: 147,
          name: "123620-573-RU",
          children: []
        },
        {
          id: 148,
          name: "212860",
          children: []
        },
        {
          id: 149,
          name: "222999-001",
          children: [
            {
              id: 1491,
              name: "126058",
              children: []
            }
          ]
        },
        {
          id: 1410,
          name: "226156-001",
          children: [
            {
              id: 14101,
              name: "089634-002",
              children: []
            },
            {
              id: 14102,
              name: "091248-002",
              children: []
            },
            {
              id: 14103,
              name: "204242-003-A",
              children: []
            },
            {
              id: 14104,
              name: "204244-001",
              children: []
            },
            {
              id: 14105,
              name: "WC[R]ASSLY",
              children: []
            }
          ]
        }
      ]
    },
    {
      id: 15,
      name: "432941-001",
      children: []
    },
    {
      id: 16,
      name: "WC[R]ASSLY",
      children: []
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
      <div style={{height: '100%', width: "2000px", overflowY: "auto" }}>
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