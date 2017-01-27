import React from 'react'

class Message extends React.Component {
  constructor(props) {
    super(props)
  }

  render() {
    let icon = ''
    switch (this.props.type) {
      case 'danger':
        icon = 'fa fa-exclamation-triangle'
        break

      case 'success':
        icon = 'fa fa-thumbs-o-up'
        break

      case 'info':
        icon = 'fa fa-info-circle'
        break

      case 'warning':
        icon = 'fa fa-hand-paper-o'
        break
    }

    let messageType = 'lead alert alert-dismissible alert-' + this.props.type
    return (
      <div className={messageType} role="alert">
        <button
          type="button"
          onClick={this.props.onClose}
          className="close"
          data-dismiss="alert"
          aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </button>
        <i className={icon}></i>&nbsp;
        {this.props.message}
      </div>
    )
  }
}

Message.propTypes = {
  type: React.PropTypes.string,
  message: React.PropTypes.oneOfType([React.PropTypes.string,React.PropTypes.element]),
  onClose: React.PropTypes.func
}

Message.defaultProps = {
  type: 'info'
}

export default Message
