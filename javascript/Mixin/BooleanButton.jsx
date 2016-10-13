'use strict'
import React from 'react'

class BooleanButton extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      status: this.props.current
    }
    this.flip = this.flip.bind(this)
  }

  flip() {
    const status = !this.state.status
    this.setState({status: status})
    if (this.props.handleClick) {
      this.props.handleClick(status)
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

  render() {
    if (this.state.status === true) {
      return <Positive
        label={this.props.label[0]}
        icon={this.positiveIcon()}
        flip={this.flip}/>
    } else {
      return <Negative
        label={this.props.label[1]}
        icon={this.negativeIcon()}
        flip={this.flip}/>
    }
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
  current: React.PropTypes.bool
}

export default BooleanButton

class Positive extends React.Component {
  constructor(props) {
    super(props)
  }

  render() {
    let label = this.props.label
    if (this.props.icon) {
      label = <span>
        <i className={this.props.icon}></i>&nbsp;{label}</span>
    }
    return <button type="button" className="btn btn-success" onClick={this.props.flip}>{label}</button>
  }
}

Positive.propTypes = {
  label: React.PropTypes.oneOfType([React.PropTypes.string, React.PropTypes.element]),
  flip: React.PropTypes.func,
  icon: React.PropTypes.string
}

class Negative extends React.Component {
  constructor(props) {
    super(props)
  }

  render() {
    let label = this.props.label
    if (this.props.icon) {
      label = <span>
        <i className={this.props.icon}></i>&nbsp;{label}</span>
    }
    return <button type="button" className="btn btn-danger" onClick={this.props.flip}>{label}</button>
  }
}

Negative.propTypes = {
  label: React.PropTypes.oneOfType([React.PropTypes.string, React.PropTypes.element]),
  flip: React.PropTypes.func,
  icon: React.PropTypes.string
}
