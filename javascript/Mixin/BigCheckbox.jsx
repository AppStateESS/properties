'use strict'
import React from 'react'

export default class BigCheckbox extends React.Component {
  constructor(props) {
    super(props)
    this.handle = this.handle.bind(this)
  }

  handle()
  {
    this.props.handle(!this.props.checked)
  }

  render() {
    const mute = {
      color: '#666'
    }
    const point = {
      cursor: 'pointer',
      display: 'inline-block'
    }
    const labelText = {
      fontSize : '20px',
      display: 'inline-block',
      marginTop: '4px'
    }

    return (
      <div onClick={this.handle} style={point}>
        <div className="fa-stack fa-lg pull-left">
          <i className="fa fa-square-o fa-stack-2x" style={mute}></i>
          {this.props.checked ?
          <i className="fa fa-check text-success fa-stack-2x"></i> : null}
        </div>&nbsp;
        <div style={labelText} className={this.props.checked ? 'text-success' : 'text-muted'}>{this.props.label}</div>
      </div>
    )
  }
}

BigCheckbox.propTypes = {
  label: React.PropTypes.string,
  checked: React.PropTypes.bool,
  handle: React.PropTypes.func.isRequired
}

BigCheckbox.defaultProps = {
  checked: false
}
