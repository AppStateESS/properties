'use strict'
import React from 'react'

export default class Nav extends React.Component {
  constructor(props) {
    super(props)
    this.state = {}
  }

  render() {
    let tabs = this.props.buttons.map(function (value, key) {
      return (
        <li
          role="presentation"
          key={key}
          className={this.props.active === key
          ? 'active'
          : null}
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
  click: React.PropTypes.func
}
