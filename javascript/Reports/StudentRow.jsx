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
    return (
      <tr>
        <td style={{
          width: '100px'
        }}><input
          type="checkbox"
          defaultValue="1"
          onChange={this.props.toggle}
          defaultChecked={value.checked}/></td>
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
