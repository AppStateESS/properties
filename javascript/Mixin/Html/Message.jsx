import React, {Component} from 'react'
import PropTypes from 'prop-types'

class Message extends Component {
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
        icon = 'far fa-thumbs-up'
        break

      case 'info':
        icon = 'fa fa-info-circle'
        break

      case 'warning':
        icon = 'far fa-hand-paper'
        break
    }

    let messageType = 'alert alert-dismissible alert-' + this.props.type
    return (
      <div className={messageType} role="alert">
        <button
          type="button"
          onClick={this.props.onClose}
          className="close"
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
  type: PropTypes.string,
  message: PropTypes.oneOfType([PropTypes.string,PropTypes.element]),
  onClose: PropTypes.func
}

Message.defaultProps = {
  type: 'info'
}

export default Message
