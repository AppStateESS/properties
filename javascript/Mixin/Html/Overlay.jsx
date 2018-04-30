import React, {Component} from 'react'
import PropTypes from 'prop-types'
/* global $ */

export default class Overlay extends Component {
  constructor(props) {
    super(props)
    this.state = {}
    this.lighten = this.lighten.bind(this)
    this.normal = this.normal.bind(this)
    this.unlockBody = this.unlockBody.bind(this)
    this.close = this.close.bind(this)
  }

  componentDidMount() {
    this.lockBody()
  }

  lockBody() {
    $('body').css('overflow', 'hidden')
  }

  unlockBody() {
    $('body').css('overflow', 'inherit')
  }

  normal() {
    this.refs.closebutton.style.color = 'inherit'
  }

  lighten() {
    this.refs.closebutton.style.color = '#ff3737'
  }

  close() {
    this.unlockBody()
    this.props.close()
  }

  render() {
    const overlayStyle = {
      width: '100%',
      position: 'fixed',
      top: '0px',
      bottom: '0px',
      left: '0px',
      backgroundColor: 'white',
      zIndex: '100',
      overflowY: 'scroll',
      overflowX: 'hidden',
      padding: '10px'
    }

    const headerStyle = {
      backgroundColor: '#F2F2F2',
      border: '1px solid #D9D9D9',
      height: '45px'
    }

    const titleStyle = {
      padding: '9px',
      fontSize: '14px',
      fontWeight: 'bold'
    }

    const closeButton = {
      padding: '5px',
      float: 'right'
    }

    const childrenStyle = {
      paddingBottom: '50px'
    }
    return (
      <div style={overlayStyle}>
        <div className="mb-1" style={headerStyle}>
          <div
            ref="closebutton"
            style={closeButton}
            onMouseEnter={this.lighten}
            onMouseLeave={this.normal}
            onClick={this.close}>
            <i className="fas fa-2x fa-times pointer"></i>
          </div>
          <div style={titleStyle}>{this.props.title}</div>
        </div>
        <div style={childrenStyle}>
          {this.props.children}
        </div>
      </div>
    )
  }
}

Overlay.propTypes = {
  children: PropTypes.oneOfType([PropTypes.string, PropTypes.element,]),
  close: PropTypes.func,
  title: PropTypes.string
}
