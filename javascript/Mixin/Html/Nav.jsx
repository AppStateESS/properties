'use strict'
import React, {Component} from 'react'
import PropTypes from 'prop-types'
import classnames from 'classnames'

export default class Nav extends Component {
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
        disabled: disabled.indexOf(key) !== -1,
        pointer: true
      })

      return (
        <li
          role="presentation"
          key={key}
          className={cn}
          onClick={this.props.click.bind(null, key)}>
          <a>{value}</a>
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
  active: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  buttons: PropTypes.array,
  click: PropTypes.func,
  disable: PropTypes.oneOfType([PropTypes.number, PropTypes.array])
}

Nav.defaultProp = {
  disable: null
}
