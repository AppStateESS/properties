'use strict'
import React from 'react'

class BooleanButton extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      status: this.props.current
    }
    this.flip = this.flip.bind(this)
    this.getHidden = this.getHidden.bind(this)
  }

  flip() {
    const status = !this.state.status
    this.setState({status: status})
    if (this.props.handleClick) {
      this.props.handleClick(status)
    }
  }

  getHidden() {
    if (this.props.name !== null && this.props.name.length > 0) {
      return <input type="hidden" name={this.props.name} value={this.state.status}/>
    } else {
      return null
    }
  }

  positiveIcon() {
    if (this.props.icon === true) {
      return 'fa fa-check'
    } else if (this.props.icon !== null && typeof this.props.icon === 'object') {
      return this.props.icon[0]
    } else {
      return null
    }
  }

  negativeIcon() {
    if (this.props.icon === true) {
      return 'fa fa-times'
    } else if (this.props.icon !== null && typeof this.props.icon === 'object') {
      return this.props.icon[1]
    } else {
      return null
    }
  }

  getIcon() {
    return this.state.status ? this.positiveIcon() : this.negativeIcon()
  }

  getLabel() {
    return this.state.status ? this.props.label[0] : this.props.label[1]
  }

  render() {
    let label = this.getLabel()
    if (this.props.icon) {
      label = <span>
        <i className={this.getIcon()}></i>&nbsp;{label}</span>
    }
    let className = this.state.status
      ? 'btn btn-success'
      : 'btn btn-danger'

    return (
      <span>
        <button
          type="button"
          name={this.props.name}
          value={this.state.status}
          className={className}
          onClick={this.flip}>{label}</button>
        {this.getHidden()}
      </span>
    )
  }
}

BooleanButton.defaultProps = {
  label: [
    'Yes', 'No'
  ],
  icon: null
}

BooleanButton.propTypes = {
  label: React.PropTypes.array,
  icon: React.PropTypes.oneOfType([React.PropTypes.array, React.PropTypes.bool]),
  handleClick: React.PropTypes.func,
  current: React.PropTypes.bool,
  name: React.PropTypes.string
}

BooleanButton.defaultProps = {
  name: null
}

export default BooleanButton
