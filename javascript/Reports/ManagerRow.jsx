'use strict'
import React, {Component} from 'react'
import PropTypes from 'prop-types'
import moment from 'moment'

export default class ManagerRow extends Component {
  constructor(props) {
    super(props)
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
  value: PropTypes.object,
  toggle: PropTypes.func
}
