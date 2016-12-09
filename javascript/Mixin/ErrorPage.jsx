'use strict'
import React from 'react'

class ErrorPage extends React.Component {
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
  message : React.PropTypes.string
}

export default ErrorPage
