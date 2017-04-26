import React, {Component} from 'react'
import PropTypes from 'prop-types'
import Modal from '../Mixin/Html/Modal.jsx'

export default class InquiryModal extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    const spacing = {
      marginBottom: '10px',
      display: 'block'
    }
    const header = `Send inquiry to ${this.props.manager.company_name} c/o ${this.props.manager.first_name} ${this.props.manager.last_name}`
    const body = (
      <div>
        <button
          style={spacing}
          className="btn btn-primary"
          onClick={this.props.inquiry}
          data-inquiry-type="sublease">Appears to be a sublease</button>
        <button
          style={spacing}
          className="btn btn-primary"
          onClick={this.props.inquiry}
          data-inquiry-type="information">Need more property information</button>
        <button
          style={spacing}
          className="btn btn-primary"
          onClick={this.props.inquiry}
          data-inquiry-type="phone_number">Out of state phone number</button>
      </div>
    )
    return (<Modal body={body} header={header}/>)
  }
}

InquiryModal.propTypes = {
  inquiry: PropTypes.func,
  manager: PropTypes.object
}
