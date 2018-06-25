import React, {Component} from 'react'
import PropTypes from 'prop-types'

/* global $ */

class Modal extends Component {
  constructor(props) {
    super(props)
    this.state = {
      header: null,
      body: null,
      footer: null
    }
  }

  componentDidMount() {
    if (this.props.onClose) {
      $('#' + this.props.modalId).on('hidden.bs.modal', function () {
        this.props.onClose()
      }.bind(this))
    }
  }

  render() {
    return (
      <div id={this.props.modalId} className="modal fade" tabIndex="-1" role="dialog">
        <div className="modal-dialog" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <h4 className="modal-title">{this.props.header}</h4>
              <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div className="modal-body">
              {this.props.body}
            </div>
            <div className="modal-footer">
              {this.props.footer}
              <button type="button" className="btn btn-outline-dark" data-dismiss="modal">Close</button>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

Modal.defaultProps = {
  header: null,
  body: null,
  footer: null,
  modalId: 'reactModal',
  onClose: null
}

Modal.propTypes = {
  header: PropTypes.oneOfType([PropTypes.string, PropTypes.element]),
  body: PropTypes.oneOfType([PropTypes.string, PropTypes.element]),
  footer: PropTypes.oneOfType([PropTypes.string, PropTypes.element]),
  modalId: PropTypes.string,
  onClose: PropTypes.func
}

export default Modal
