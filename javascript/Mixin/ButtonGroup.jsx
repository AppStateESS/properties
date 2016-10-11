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
      let cn = classnames('btn', value.active ? activeColor + ' active' : 'btn-default')
      return (
        <button
          key={key}
          className={cn}
          value={value.value}
          onClick={this.props.handle.bind(this, value.value)}>
          {value.label}
        </button>
      )
    }.bind(this))
    return (
      <div className="btn-group" role="group" aria-label="lease type">
        {buttons}
      </div>
    )
  }
}

ButtonGroup.propTypes = {
  buttons: React.PropTypes.array.isRequired,
  handle: React.PropTypes.func.isRequired,
  activeColor: React.PropTypes.string
}

ButtonGroup.defaultProp = {
  activeColor : 'default'
}

export default ButtonGroup
