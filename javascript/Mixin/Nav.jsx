'use strict'
import React from 'react'
import classnames from 'classnames'

export default class Nav extends React.Component {
  constructor(props) {
    super(props)
    this.state = {}
  }

  render() {
    let disabled = []
    if (this.props.disable !== undefined && this.props.disable !== null) {
      if (this.props.disable.constructor === Array) {
        disabled = this.props.disable
      } else {
        disabled.push(this.props.disable)
      }
    }
    let cn
    let tabs = this.props.buttons.map(function (value, key) {
      cn = classnames({
        active: this.props.active === key,
        disabled: disabled.indexOf(key) !== -1
      })

      return (
        <li
          role="presentation"
          key={key}
          className={cn}
          onClick={this.props.click.bind(null, key)}>
          <a className="pointer">{value}</a>
        </li>
      )
    }.bind(this))
    return <div className="form-section">
      <ul className="nav nav-pills">
        {tabs}
      </ul>
    </div>
  }
}

Nav.propTypes = {
  active: React.PropTypes.oneOfType([React.PropTypes.number, React.PropTypes.string]),
  buttons: React.PropTypes.array,
  click: React.PropTypes.func,
  disable: React.PropTypes.oneOfType([React.PropTypes.number, React.PropTypes.array])
}

Nav.defaultProp = {
  disable: null
}
