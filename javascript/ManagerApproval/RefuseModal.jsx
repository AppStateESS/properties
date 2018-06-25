import React, {Component} from 'react'
import PropTypes from 'prop-types'
import Modal from '../Mixin/Html/Modal.jsx'

export default class RefuseModal extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    const header = `Refuse manager request for: ${this.props.manager.company_name}`
    const body = (
      <div>
        <button
          className="btn btn-primary mb-1 d-block"
          onClick={this.props.reason}
          data-reason="duplicate">Using duplicate company name</button>
        <button
          className="btn btn-primary mb-1 d-block"
          onClick={this.props.reason}
          data-reason="bad_data">Improper information</button>
        {this.props.manager.inquiry_date !== null
          ? <button
              className="btn btn-primary mb-1 d-block"
              onClick={this.props.reason}
              data-reason="no_response">No response to inquiry since {this.props.manager.inquiry_date}</button>
          : null}
      </div>
    )
    return (<Modal body={body} header={header}/>)
  }
}

RefuseModal.propTypes = {
  reason: PropTypes.func,
  manager: PropTypes.object
}
