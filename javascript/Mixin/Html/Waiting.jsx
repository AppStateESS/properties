import React from 'react'

class Waiting extends React.Component {
  render() {
    let message
    if (this.props.message.length === 0) {
      message = <span>Loading {this.props.label}...</span>
    } else {
      message = this.props.message
    }
    return (
      <div className="lead text-center">
        <i className="fa fa-cog fa-spin fa-lg"></i>&nbsp;{message}
        </div>
    )
  }
}

Waiting.defaultProps = {
  label : ''
}

Waiting.propTypes = {
  label: React.PropTypes.string,
  message : React.PropTypes.string
}

Waiting.defaultProps = {
  message: '',
  label: 'data'
}

export default Waiting
