'use strict'
import React from 'react'

export default class Thumb extends React.Component {
  constructor(props) {
    super(props)
  }

  render() {
    const outer = {
      width: '180px',
      height: '180px',
      float: 'left',
      margin: '0px 8px 8px 0',
      textAlign: 'center',
      backgroundColor: '#e3e3e3',
      border: '1px solid #bbb',
      position: 'relative'
    }

    const inner = {
      position: 'absolute',
      display: 'block',
      bottom: '0px',
      left: '82px',
      cursor: 'pointer'
    }
    return (
      <div style={outer}>
        <img src={this.props.thumbnail}/>
        <span className="fa-stack fa-lg" style={inner} onClick={this.props.delete}>
          <i className="text-danger fa fa-circle fa-stack-2x"></i>
          <i className="text-danger fa fa-trash-o fa-stack-1x fa-inverse"></i>
        </span>
      </div>
    )
  }
}

Thumb.propTypes = {
  thumbnail: React.PropTypes.string,
  id : React.PropTypes.oneOfType([React.PropTypes.number, React.PropTypes.string]),
  delete: React.PropTypes.func
}
