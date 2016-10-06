import React from 'react'

class Waiting extends React.Component {
  render() {
    return (
      <div className="lead text-center">
        <i className="fa fa-cog fa-spin fa-lg"></i>&nbsp;
        Loading {this.props.label}...</div>
    )
  }
}

Waiting.defaultProps = {
  label : ''
}

Waiting.propTypes = {
  label: React.PropTypes.string
}

export default Waiting
