'use strict'
import React, {Component} from 'react'
import PropTypes from 'prop-types'
import ManagerRow from './ManagerRow.jsx'

class ListManagers extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    let listRows = null
    if (!this.props.managers || this.props.managers.length === 0) {
      return <h2>No managers found.</h2>
    } else {
      listRows = this.props.managers.map(function (value, key) {
        return <ManagerRow
          key={key}
          {...value}
          showProperties={this.props.showProperties}
          fillForm={this.props.fillForm.bind(this, value)}
          reload={this.props.reload.bind(this, key)}
          remove={this.props.remove.bind(this, key)}
          message={this.props.message}
          admin={this.props.admin}/>
      }.bind(this))
    }
    return (
      <div>{listRows}</div>
    )
  }
}

ListManagers.propTypes = {
  managers: PropTypes.array,
  fillForm: PropTypes.func,
  reload: PropTypes.func,
  showProperties: PropTypes.func,
  message: PropTypes.func,
  remove: PropTypes.func,
  admin: PropTypes.bool
}

export default ListManagers
