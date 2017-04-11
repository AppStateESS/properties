'use strict'
import React from 'react'
import moment from 'moment'
import bindMethods from '../Mixin/Helper/Bind.js'

export default class ManagerRow extends React.Component {
  constructor(props) {
    super(props)
    this.state = {checked: false}
    bindMethods(['toggleAll'], this)
  }

  toggleAll() {
    this.setState({checked: !this.state.checked})
  }

  render() {
    const {value} = this.props
    if (value === undefined) {
      return null
    }

    const lastLog = moment(value.last_log*1000).format('YYYY-MM-DD')

    return (
      <tr>
        <td style={{width:'100px'}}><input type="checkbox" onClick={this.props.toggle} value="1" checked={value.checked}/></td>
        <td>{value.active === '1' ? <span className="text-success">Yes</span> : <span className="text-danger">No</span>}</td>
        <td><a target="_blank" href={`properties/Manager/${value.id}`}>{value.company_name}</a></td>
        <td>{lastLog}</td>
      </tr>
    )
  }
}

ManagerRow.propTypes = {
  value: React.PropTypes.object,
  toggle: React.PropTypes.func,
  checked: React.PropTypes.bool
}

ManagerRow.defaultProps = {
  checked : false
}
