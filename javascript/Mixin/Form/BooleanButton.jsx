'use strict'
import React, {Component} from 'react'
import PropTypes from 'prop-types'

class BooleanButton extends Component {
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

  componentWillUpdate(props) {
    if (props.current !== this.state.status) {
      this.setState({
        status: !this.state.status
      })
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
    let className = 'fas fa-check'
    if (this.props.icon === true) {
      return className
    } else if (this.props.icon !== null && typeof this.props.icon === 'object') {
      return this.props.icon[0]
    } else {
      return null
    }
  }

  negativeIcon() {
    let className = 'fas fa-times'
    if (this.props.icon === true) {
      return className
    } else if (this.props.icon !== null && typeof this.props.icon === 'object') {
      return this.props.icon[1]
    } else {
      return null
    }
  }

  getIcon() {
    return this.positiveIcon() + this.negativeIcon()
  }

  getLabel() {
    return this.state.status
      ? this.props.label[0]
      : this.props.label[1]
  }

  render() {
    let label = this.getLabel()
    if (this.props.icon) {
      label = (
        <span>
          <span
            className={this.state.status
              ? 'd-none'
              : null}>
            <i className={this.negativeIcon()}></i>
          </span>
          <span
            className={this.state.status
              ? null
              : 'd-none'}>
            <i className={this.positiveIcon()}></i>
          </span>&nbsp;{label}
        </span>
      )
    }
    let className = this.state.status
      ? 'btn btn-success'
      : 'btn btn-danger'

    if (this.props.small) {
      className = className + ' btn-sm'
    }

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
    'Yes', 'No',
  ],
  icon: null
}

BooleanButton.propTypes = {
  label: PropTypes.array,
  icon: PropTypes.oneOfType([PropTypes.array, PropTypes.bool,]),
  handleClick: PropTypes.func,
  current: PropTypes.oneOfType([PropTypes.bool, PropTypes.string,]),
  name: PropTypes.string,
  small: PropTypes.bool
}

BooleanButton.defaultProps = {
  name: null,
  small: false
}

export default BooleanButton
