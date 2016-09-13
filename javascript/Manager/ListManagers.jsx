'use strict'
import React from 'react'
import ManagerRow from './ManagerRow.jsx'

class ListManagers extends React.Component {
  constructor(props) {
    super(props)
  }

  render() {
    let listRows = null
    if (!this.props.managers || this.props.managers.length === 0) {
      return <h2>No managers found.</h2>
    } else {
      listRows = this.props.managers.map(function (value, key) {
        return <ManagerRow key={key} {...value} fillForm={this.props.fillForm.bind(this, value)}/>
      }.bind(this))
    }
    return (
      <div>
        <table className="table table-striped">
          <thead>
            <tr>
              <th><input type="checkbox"/></th>
              <th>&nbsp;</th>
              <th>Company</th>
              <th>Contact</th>
              <th>Last logged</th>
              <th>&nbsp;</th>
            </tr>
          </thead>
          <tbody>
            {listRows}
          </tbody>
        </table>
      </div>
    )
  }
}

ListManagers.propTypes = {
  managers: React.PropTypes.array,
  fillForm: React.PropTypes.func
}

export default ListManagers
