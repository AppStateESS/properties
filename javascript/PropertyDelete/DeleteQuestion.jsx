'use strict'
import React, {Component} from 'react'
import PropTypes from 'prop-types'

export default class DeleteQuestion extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    return (
      <div>
        <h3>Are you sure you want to delete this property?</h3>
        <p>All images associated with this property will also be deleted.</p>
        <div className="mb-1">
          <button
            className="btn btn-lg btn-danger"
            onClick={this.props.delete}>Yes, delete this property and all associated images.</button>
        </div>
        <div className="mb-1">
          <button
            className="btn btn-outline-secondary btn-lg btn-warning"
            onClick={this.props.deactivate}>Just deactivate it for now</button>
        </div>
        <div className="mb-1">
          <button
            className="btn btn-outline-secondary btn-lg"
            onClick={this.props.close}>No, I changed my mind</button>
        </div>
      </div>
    )
  }
}

DeleteQuestion.propTypes = {
  close: PropTypes.func,
  delete: PropTypes.func,
  deactivate : PropTypes.func
}
