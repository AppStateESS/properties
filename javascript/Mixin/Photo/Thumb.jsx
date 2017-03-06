'use strict'
import React from 'react'

export default class Thumb extends React.Component {
  constructor(props) {
    super(props)
    this.delete = this.delete.bind(this)
  }

  delete(e) {
    e.preventDefault()
    e.stopPropagation()
    this.props.delete()
  }

  render() {
    const outer = {
      width: '184px',
      height: '184px',
      margin: '0px 8px 8px 0',
      textAlign: 'center',
      backgroundColor: '#e3e3e3',
      borderWidth: '2px',
      borderStyle: 'solid',
      borderColor: this.props.main_pic === '1'
        ? 'blue'
        : '#bbb',
      position: 'relative'
    }

    const inner = {
      position: 'absolute',
      display: 'block',
      bottom: '0px',
      left: '72px',
      cursor: 'pointer'
    }

    const main = {
      position: 'absolute',
      top: '0px',
      width: '100%',
      backgroundColor: 'rgba(0,0,255,0.4)',
      color: 'white'
    }

    const listStyle = {
      listStyleType : 'none',
      display: 'inline',
      float: 'left',
    }
    return (
      <li style={listStyle}>
        <div style={outer} onClick={this.props.setMain}>
          {this.props.main_pic === '1'
            ? <div style={main}>Main photo</div>
            : null}
          <img src={this.props.thumbnail}/>
          <span className="fa-stack fa-lg" style={inner} onClick={this.delete}>
            <i className="text-danger fa fa-circle fa-stack-2x"></i>
            <i className="text-danger fa fa-trash-o fa-stack-1x fa-inverse"></i>
          </span>
        </div>
      </li>
    )
  }
}

Thumb.propTypes = {
  thumbnail: React.PropTypes.string,
  main_pic: React.PropTypes.string,
  id: React.PropTypes.oneOfType([React.PropTypes.number, React.PropTypes.string]),
  delete: React.PropTypes.func,
  setMain: React.PropTypes.func
}

Thumb.defaultProps = {
  main: false
}
