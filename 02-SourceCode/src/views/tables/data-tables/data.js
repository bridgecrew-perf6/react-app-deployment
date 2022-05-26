// ** Custom Components
import { Fragment } from 'react'
import Avatar from '@components/avatar'

// ** Third Party Components
import axios from 'axios'
import { MoreVertical, Edit, FileText, Archive, Trash, ArrowDownCircle, ArrowUpCircle, Image, Send, CheckCircle, Save, Info, PieChart } from 'react-feather'

// ** Reactstrap Imports
import { Badge, UncontrolledDropdown, DropdownToggle, DropdownMenu, DropdownItem, UncontrolledTooltip } from 'reactstrap'

// ** Vars
const states = ['light-success', 'light-danger', 'light-warning', 'light-info', 'light-primary', 'light-secondary']

const status = {
  1: { title: 'Current', color: 'light-primary' },
  2: { title: 'Professional', color: 'light-success' },
  3: { title: 'Rejected', color: 'light-danger' },
  4: { title: 'Resigned', color: 'light-warning' },
  5: { title: 'Applied', color: 'light-info' }
}

export let data

// ** Get initial Data
axios.get('/api/datatables/initial-data').then(response => {
  data = response.data
  console.log(response.data)
})

// ** Table Zero Config Column
export const basicColumns = [
  {
    name: 'ID',
    sortable: true,
    maxWidth: '100px',
    selector: row => row.id
  },
  {
    name: 'Name',
    sortable: true,
    minWidth: '225px',
    selector: row => row.full_name
  },
  {
    name: 'Email',
    sortable: true,
    minWidth: '310px',
    selector: row => row.email
  },
  {
    name: 'Position',
    sortable: true,
    minWidth: '250px',
    selector: row => row.post
  },
  {
    name: 'Age',
    sortable: true,
    minWidth: '100px',
    selector: row => row.age
  },
  {
    name: 'Salary',
    sortable: true,
    minWidth: '175px',
    selector: row => row.salary
  }
]
// ** Table ReOrder Column
export const reOrderColumns = [
  {
    name: 'ID',
    reorder: true,
    sortable: true,
    maxWidth: '100px',
    selector: row => row.id
  },
  {
    name: 'Name',
    reorder: true,
    sortable: true,
    minWidth: '225px',
    selector: row => row.full_name
  },
  {
    name: 'Email',
    reorder: true,
    sortable: true,
    minWidth: '310px',
    selector: row => row.email
  },
  {
    name: 'Position',
    reorder: true,
    sortable: true,
    minWidth: '250px',
    selector: row => row.post
  },
  {
    name: 'Age',
    reorder: true,
    sortable: true,
    minWidth: '100px',
    selector: row => row.age
  },
  {
    name: 'Salary',
    reorder: true,
    sortable: true,
    minWidth: '175px',
    selector: row => row.salary
  }
]

// ** Expandable table component
const ExpandableTable = ({ data }) => {
  return (
    <div className='expandable-content p-2'>
      <p>
        <span className='fw-bold'>City:</span> {data.city}
      </p>
      <p>
        <span className='fw-bold'>Experience:</span> {data.experience}
      </p>
      <p className='m-0'>
        <span className='fw-bold'>Post:</span> {data.post}
      </p>
    </div>
  )
}

// ** Table Common Column
export const columns = [
  {
    name: 'Name',
    minWidth: '250px',
    sortable: row => row.full_name,
    cell: row => (
      <div className='d-flex align-items-center'>
        {row.avatar === '' ? (
          <Avatar color={`light-${states[row.status]}`} content={row.full_name} initials />
        ) : (
          <Avatar img={require(`@src/assets/images/portrait/small/avatar-s-${row.avatar}`).default} />
        )}
        <div className='user-info text-truncate ms-1'>
          <span className='d-block fw-bold text-truncate'>{row.full_name}</span>
          <small>{row.post}</small>
        </div>
      </div>
    )
  },
  {
    name: 'Email',
    sortable: true,
    minWidth: '250px',
    selector: row => row.email
  },
  {
    name: 'Date',
    sortable: true,
    minWidth: '150px',
    selector: row => row.start_date
  },

  {
    name: 'Salary',
    sortable: true,
    minWidth: '150px',
    selector: row => row.salary
  },
  {
    name: 'Age',
    sortable: true,
    minWidth: '100px',
    selector: row => row.age
  },
  {
    name: 'Status',
    minWidth: '150px',
    sortable: row => row.status.title,
    cell: row => {
      return (
        <Badge color={status[row.status].color} pill>
          {status[row.status].title}
        </Badge>
      )
    }
  },
  {
    name: 'Actions',
    allowOverflow: true,
    cell: () => {
      return (
        <div className='d-flex'>
          <UncontrolledDropdown>
            <DropdownToggle className='pe-1' tag='span'>
              <MoreVertical size={15} />
            </DropdownToggle>
            <DropdownMenu end>
              <DropdownItem tag='a' href='/' className='w-100' onClick={e => e.preventDefault()}>
                <FileText size={15} />
                <span className='align-middle ms-50'>Details</span>
              </DropdownItem>
              <DropdownItem tag='a' href='/' className='w-100' onClick={e => e.preventDefault()}>
                <Archive size={15} />
                <span className='align-middle ms-50'>Archive</span>
              </DropdownItem>
              <DropdownItem tag='a' href='/' className='w-100' onClick={e => e.preventDefault()}>
                <Trash size={15} />
                <span className='align-middle ms-50'>Delete</span>
              </DropdownItem>
            </DropdownMenu>
          </UncontrolledDropdown>
          <Edit size={15} />
        </div>
      )
    }
  }
]

// ** Table Intl Column
export const multiLingColumns = [
  {
    name: 'Name',
    sortable: true,
    minWidth: '200px',
    selector: row => row.full_name
  },
  {
    name: 'Position',
    sortable: true,
    minWidth: '250px',
    selector: row => row.post
  },
  {
    name: 'Email',
    sortable: true,
    minWidth: '250px',
    selector: row => row.email
  },
  {
    name: 'Date',
    sortable: true,
    minWidth: '150px',
    selector: row => row.start_date
  },

  {
    name: 'Salary',
    sortable: true,
    minWidth: '150px',
    selector: row => row.salary
  },
  {
    name: 'Status',
    sortable: true,
    minWidth: '150px',
    selector: row => row.status,
    cell: row => {
      return (
        <Badge color={status[row.status].color} pill>
          {status[row.status].title}
        </Badge>
      )
    }
  },
  {
    name: 'Actions',
    allowOverflow: true,
    cell: () => {
      return (
        <div className='d-flex'>
          <UncontrolledDropdown>
            <DropdownToggle className='pe-1' tag='span'>
              <MoreVertical size={15} />
            </DropdownToggle>
            <DropdownMenu end>
              <DropdownItem>
                <FileText size={15} />
                <span className='align-middle ms-50'>Details</span>
              </DropdownItem>
              <DropdownItem>
                <Archive size={15} />
                <span className='align-middle ms-50'>Archive</span>
              </DropdownItem>
              <DropdownItem>
                <Trash size={15} />
                <span className='align-middle ms-50'>Delete</span>
              </DropdownItem>
            </DropdownMenu>
          </UncontrolledDropdown>
          <Edit size={15} />
        </div>
      )
    }
  }
]

// ** Table Server Side Column
export const serverSideColumns = [
  {
    sortable: true,
    name: 'Full Name',
    minWidth: '225px',
    selector: row => row.full_name
  },
  {
    sortable: true,
    name: 'Email',
    minWidth: '250px',
    selector: row => row.email
  },
  {
    sortable: true,
    name: 'Position',
    minWidth: '250px',
    selector: row => row.post
  },
  {
    sortable: true,
    name: 'Office',
    minWidth: '150px',
    selector: row => row.city
  },
  {
    sortable: true,
    name: 'Start Date',
    minWidth: '150px',
    selector: row => row.start_date
  },
  {
    sortable: true,
    name: 'Salary',
    minWidth: '150px',
    selector: row => row.salary
  }
]


const invoiceStatusObj = {
  Edit: { color: 'light-secondary', icon: Edit },
  Paid: { color: 'light-success', icon: CheckCircle },
  Draft: { color: 'light-primary', icon: Save },
  Downloaded: { color: 'light-info', icon: ArrowDownCircle },
  UpArrow: { color: 'light-info', icon: ArrowUpCircle },
  'Past Due': { color: 'light-danger', icon: Info },
  'Partial Payment': { color: 'light-warning', icon: PieChart }
}
const onSelectProperties = (val) => {
  // console.log(row.full_name)
  console.log(val)
}

// ** Table Adv Search Column
export const advSearchColumns = [
  {
    name: 'Catalog/Product #',
    sortable: true,
    minWidth: '200px',
    selector: row => row.full_name
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
    cell: row => {
      const color = invoiceStatusObj[row.properties] ? invoiceStatusObj[row.properties].color : 'light-danger',
        Icon = invoiceStatusObj[row.properties] ? invoiceStatusObj[row.properties].icon : Edit
      return (
        <Fragment>
            <Avatar color={color} icon={<Icon size={14} />} id={`av-tooltip-${row.id}`} onClick={() => { onSelectProperties(row) }}/>
          {/* <UncontrolledTooltip placement='bottom' target={`av-tooltip-${row.id}`}>
            <span className='fw-bold'>Properties</span>
            <br />
            <span className='fw-bold'>Balance:</span>
            <br />
            <span className='fw-bold'>Due Date:</span>
          </UncontrolledTooltip> */}
        </Fragment>
      )
    }
    },
  {
    name: 'Drawing (EU)',
    sortable: false,
    minWidth: '50px',
    sortField: 'drawingeu',
    cell: row => {
      const color = invoiceStatusObj[row.drawingeu] ? invoiceStatusObj[row.drawingeu].color : 'light-warning',
        Icon = invoiceStatusObj[row.drawingeu] ? invoiceStatusObj[row.drawingeu].icon : Image
      return (
        <Fragment>
          <Avatar color={color} icon={<Icon size={14} />} id={`av-tooltip-${row.id}`} />
          {/* <UncontrolledTooltip placement='bottom' target={`av-tooltip-${row.id}`}>
            <span className='fw-bold'>Drawing EU</span>
            <br />
            <span className='fw-bold'>Balance:</span>
            <br />
            <span className='fw-bold'>Due Date:</span>
          </UncontrolledTooltip> */}
        </Fragment>
      )
    }
  },
  {
    name: 'Drawing (US)',
    sortable: true,
    sortField: 'drawingUS',
    minWidth: '50px',
    cell: row => {
      const color = invoiceStatusObj[row.drawingUS] ? invoiceStatusObj[row.drawingUS].color : 'light-warning',
        Icon = invoiceStatusObj[row.drawingUS] ? invoiceStatusObj[row.drawingUS].icon : Image
      return (
        <Fragment>
          <Avatar color={color} icon={<Icon size={14} />} id={`av-tooltip-${row.id}`} />
          {/* <UncontrolledTooltip placement='bottom' target={`av-tooltip-${row.id}`}>
            <span className='fw-bold'>Drawing US</span>
            <br />
            <span className='fw-bold'>Balance:</span>
            <br />
            <span className='fw-bold'>Due Date:</span>
          </UncontrolledTooltip> */}
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
      const color = invoiceStatusObj[row.productStrucuture] ? invoiceStatusObj[row.productStrucuture].color : 'light-primary',
        Icon = invoiceStatusObj[row.productStrucuture] ? invoiceStatusObj[row.productStrucuture].icon : ArrowDownCircle
      return (
        <Fragment>
          <Avatar color={color} icon={<Icon size={14} />} id={`av-tooltip-${row.id}`} />
          {/* <UncontrolledTooltip placement='bottom' target={`av-tooltip-${row.id}`}>
            <span className='fw-bold'>productStrucuture</span>
            <br />
            <span className='fw-bold'>Balance:</span>
            <br />
            <span className='fw-bold'>Due Date:</span>
          </UncontrolledTooltip> */}
        </Fragment>
      )
    }
  },
  {
    name: 'ICS Product Structure',
    sortable: true,
    minWidth: '150px',
    sortField: 'icsproduct',
    cell: row => {
      const color = invoiceStatusObj[row.icsproduct] ? invoiceStatusObj[row.icsproduct].color : 'light-primary',
        Icon = invoiceStatusObj[row.icsproduct] ? invoiceStatusObj[row.icsproduct].icon : ArrowDownCircle
      return (
        <Fragment>
          <Avatar color={color} icon={<Icon size={14} />} id={`av-tooltip-${row.id}`} />
          {/* <UncontrolledTooltip placement='bottom' target={`av-tooltip-${row.id}`}>
            <span className='fw-bold'>ICS Product Structure</span>
            <br />
            <span className='fw-bold'>Balance:</span>
            <br />
            <span className='fw-bold'>Due Date:</span>
          </UncontrolledTooltip> */}
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
      const color = invoiceStatusObj[row.whereused] ? invoiceStatusObj[row.whereused].color : 'light-success',
        Icon = invoiceStatusObj[row.whereused] ? invoiceStatusObj[row.whereused].icon : ArrowUpCircle
      return (
        <Fragment>
          <Avatar color={color} icon={<Icon size={14} />} id={`av-tooltip-${row.id}`} />
          {/* <UncontrolledTooltip placement='bottom' target={`av-tooltip-${row.id}`}>
            <span className='fw-bold'>whereused</span>
            <br />
            <span className='fw-bold'>Balance:</span>
            <br />
            <span className='fw-bold'>Due Date:</span>
          </UncontrolledTooltip> */}
        </Fragment>
      )
    }
  },
  {
    name: 'Impolde',
    sortable: true,
    minWidth: '100px',
    sortField:'Impolde',
    cell: row => {
      const color = invoiceStatusObj[row.Impolde] ? invoiceStatusObj[row.Impolde].color : 'light-success',
        Icon = invoiceStatusObj[row.Impolde] ? invoiceStatusObj[row.Impolde].icon : ArrowUpCircle
      return (
        <Fragment>
          <Avatar color={color} icon={<Icon size={14} />} id={`av-tooltip-${row.id}`} />
          {/* <UncontrolledTooltip placement='bottom' target={`av-tooltip-${row.id}`}>
            <span className='fw-bold'>whereused</span>
            <br />
            <span className='fw-bold'>Balance:</span>
            <br />
            <span className='fw-bold'>Due Date:</span>
          </UncontrolledTooltip> */}
        </Fragment>
      )
    }
  },
  {
    name: 'AGR',
    sortable: true,
    minWidth: '2px',
    selector: row => row.AGR
  },
  {
    name: 'EAU',
    sortable: true,
    minWidth: '2px',
    selector: row => row.EAU
  },
  {
    name: 'OnHand Invnetory',
    sortable: true,
    minWidth: '50px',
    selector: row => row.onhand
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
    selector: row => row.drawing_version
  },
  {
    name: 'Assy. Item Status',
    sortable: true,
    minWidth: '100px',
    selector: row => row.item
  },
  {
    name: 'Intellectual Owner',
    sortable: true,
    minWidth: '100px',
    selector: row => row.i_owner
  }
]

export default ExpandableTable
