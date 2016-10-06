'use strict'
import React from 'react'
import classnames from 'classnames'

class ButtonGroup extends React.Component {
  constructor(props) {
    super(props)
  }

  render() {
    let buttons = this.props.buttons.map(function (value, key) {
      let cn = classnames('btn', 'btn-default',{
        active : value.active
      })
      return (
        <button
          key={key}
          className={cn}
          onClick={value.onClick}
          value={value.value}>
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
  buttons: React.PropTypes.array
}

export default ButtonGroup
