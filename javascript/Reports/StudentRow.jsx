'use strict'
import React, {Component} from 'react'
import PropTypes from 'prop-types'
import moment from 'moment'

export default class StudentRow extends Component {
  constructor(props) {
    super(props)
    this.state = {}
  }

  render() {
    const {value} = this.props
    let lastLog
    if (value.last_logged === '0') {
      lastLog = 'Never'
    } else {
      lastLog = moment(value.last_logged * 1000).format('YYYY-MM-DD')
    }
    const colStyle = {width: '100px'}
    return (
      <tr>
        <td style={colStyle}>
          <input
            type="checkbox"
            value={value.id}
            onChange={this.props.toggle}
            checked={value.checked}
          />
        </td>
        <td>{value.username}</td>
        <td>{lastLog}</td>
      </tr>
    )
  }
}

StudentRow.propTypes = {
  value: PropTypes.object,
  toggle: PropTypes.func
}
