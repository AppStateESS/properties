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

    const lastLog = moment(value.last_log * 1000).format('YYYY-MM-DD')

    const active = value.active === '1'
      ? <span className="text-success">Yes</span>
      : <span className="text-danger">No</span>

    const cbStyle = {
      width: '80px'
    }

    const activeStyle = {
      width: '100px'
    }

    return (
      <tr>
        <td style={cbStyle}><input
          type="checkbox"
          onClick={this.props.toggle}
          value="1"
          checked={value.checked}/></td>
        <td style={activeStyle}>{active}</td>
        <td>
          <a target="_index" href={`properties/Manager/${value.id}`}>{value.company_name}</a>
        </td>
        <td>{value.count}</td>
        <td>{lastLog}</td>
      </tr>
    )
  }
}

ManagerRow.propTypes = {
  value: PropTypes.object,
  toggle: PropTypes.func
}
