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
        if (this.props.match.constructor === Array && this.props.match.indexOf(value.value) !== -1) {
          cn = classnames('btn', 'active', activeColor)
        } else if (this.props.match == value.value) {
          cn = classnames('btn', 'active', activeColor)
        }
      }

      return (
        <button
          type="button"
          key={key}
          className={cn}
          value={value.value}
          onClick={this.props.handle.bind(null, value.value)}>
          {value.label}
        </button>
      )
    }.bind(this))

    const buttonClass = this.props.vertical === true
      ? 'btn-group-vertical'
      : 'btn-group'

    let hidden
    if (this.props.match.constructor === Array) {
      hidden = this.props.match.map(function (value, key) {
        let name = this.props.name + '[]'
        return <input type="hidden" name={name} value={value} key={key}/>
      }.bind(this))
    } else {
      hidden = <input type="hidden" name={this.props.name} value={this.props.match}/>
    }

    return (
      <div className={buttonClass} role="group">
        {buttons}
        {hidden}
      </div>
    )
  }
}

ButtonGroup.propTypes = {
  buttons: React.PropTypes.array.isRequired,
  handle: React.PropTypes.func.isRequired,
  activeColor: React.PropTypes.string,
  match: React.PropTypes.oneOfType([React.PropTypes.string, React.PropTypes.number, React.PropTypes.array]),
  vertical: React.PropTypes.bool,
  name: React.PropTypes.string
}

ButtonGroup.defaultProp = {
  activeColor: 'default',
  match: null,
  name: null
}

export default ButtonGroup
