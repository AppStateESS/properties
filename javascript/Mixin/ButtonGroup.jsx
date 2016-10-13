'use strict'
import React from 'react'
import classnames from 'classnames'

class ButtonGroup extends React.Component {
  constructor(props) {
    super(props)
  }

  render() {
    let buttons = this.props.buttons.map(function (value, key) {
      const activeColor = 'btn-' + this.props.activeColor
      let cn = classnames('btn', 'btn-default')
      if (this.props.match !== null) {
        if (typeof this.props.match === 'object' && this.props.match.indexOf(value.value) !== -1) {
          cn = classnames('btn', 'active', activeColor)
        } else if (this.props.match === value.value) {
          cn = classnames('btn', 'active', activeColor)
        }
      }
      return (
        <button
          type="button"
          key={key}
          className={cn}
          value={value.value}
          onClick={this.props.handle.bind(this, value.value)}>
          {value.label}
        </button>
      )
    }.bind(this))
    const buttonClass = this.props.vertical === true ? 'btn-group-vertical' : 'btn-group'
    return (
      <div className={buttonClass} role="group" aria-label="lease type">
        {buttons}
      </div>
    )
  }
}

ButtonGroup.propTypes = {
  buttons: React.PropTypes.array.isRequired,
  handle: React.PropTypes.func.isRequired,
  activeColor: React.PropTypes.string,
  match: React.PropTypes.oneOfType([React.PropTypes.string, React.PropTypes.number, React.PropTypes.array]),
  vertical: React.PropTypes.bool
}

ButtonGroup.defaultProp = {
  activeColor: 'default',
  match: null
}

export default ButtonGroup
