import React from 'react'

/* global $ */

class Modal extends React.Component {
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
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">&times;</span>
              </button>
              <h4 className="modal-title">{this.props.header}</h4>
            </div>
            <div className="modal-body">
              {this.props.body}
            </div>
            <div className="modal-footer">
              {this.props.footer}
              <button type="button" className="btn btn-default" data-dismiss="modal">Close</button>
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
  header: React.PropTypes.oneOfType([React.PropTypes.string, React.PropTypes.element]),
  body: React.PropTypes.oneOfType([React.PropTypes.string, React.PropTypes.element]),
  footer: React.PropTypes.oneOfType([React.PropTypes.string, React.PropTypes.element]),
  modalId: React.PropTypes.string,
  onClose: React.PropTypes.func
}

export default Modal
