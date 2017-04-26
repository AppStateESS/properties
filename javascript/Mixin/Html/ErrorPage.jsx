'use strict'
import React, {Component} from 'react'
import PropTypes from 'prop-types'

class ErrorPage extends Component {
  constructor(props) {
    super(props)
    this.state = {}
  }

  render() {
    return <div>
      <h2>Uh oh</h2>
      <p>Something went wrong</p>
      <pre>{this.props.message}</pre>
    </div>
  }
}

ErrorPage.propTypes = {
  message : PropTypes.string
}

export default ErrorPage
