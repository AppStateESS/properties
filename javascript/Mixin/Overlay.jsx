import React from 'react'

export default class Overlay extends React.Component {
  constructor(props) {
    super(props)
    this.state = {}
    this.lighten = this.lighten.bind(this)
    this.normal = this.normal.bind(this)
  }

  overlayStyle() {
    return {
      width: '100%',
      height: '100%',
      position: 'fixed',
      top: '0px',
      left: '0px',
      backgroundColor: 'white',
      'zIndex': '100',
    }
  }

  closeButtonStyle() {
    return {padding: '5px', float: 'right'}
  }

  headerStyle() {
    return {backgroundColor: '#F2F2F2', border : '1px solid #D9D9D9', marginBottom: '1em'}
  }

  normal() {
    this.refs.closebutton.style.backgroundColor = 'inherit'
  }

  lighten() {
    this.refs.closebutton.style.backgroundColor = '#e3e3e3'
  }

  render() {
    const close = {position: 'absolute', bottom: '5px', textAlign: 'center', width: '100%'}
    return (
      <div style={this.overlayStyle()}>
        <div style={this.headerStyle()}>
          <div ref="closebutton" style={this.closeButtonStyle()} onMouseEnter={this.lighten} onMouseLeave={this.normal}><i className=" fa fa-2x fa-times pointer" onClick={this.props.close}></i></div>
          <div style={{padding: '9px', fontSize: '14px', fontWeight: 'bold'}}>{this.props.title}</div>
        </div>
        <div style={{clear:'both', padding: '2em'}}>
          {this.props.children}
        </div>
        <div style={close}><button type="button" className="btn btn-danger btn-lg" onClick={this.props.close}>Cancel</button></div>
      </div>
    )
  }
}

Overlay.propTypes = {
  children: React.PropTypes.oneOfType([React.PropTypes.string, React.PropTypes.element]),
  close: React.PropTypes.func,
  title: React.PropTypes.string
}
