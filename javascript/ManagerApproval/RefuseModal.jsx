import React from 'react'
import Modal from '../Mixin/Html/Modal.jsx'

export default class RefuseModal extends React.Component {
  constructor(props) {
    super(props)
  }

  render() {
    const spacing = {
      marginBottom: '10px',
      display: 'block'
    }
    const header = `Refuse manager request for: ${this.props.manager.company_name}`
    const body = (
      <div>
        <button
          style={spacing}
          className="btn btn-primary"
          onClick={this.props.reason}
          data-reason="duplicate">Using duplicate company name</button>
        <button
          style={spacing}
          className="btn btn-primary"
          onClick={this.props.reason}
          data-reason="bad_data">Improper information</button>
        {this.props.manager.inquiry_date !== null
          ? <button
              style={spacing}
              className="btn btn-primary"
              onClick={this.props.reason}
              data-reason="no_response">No response to inquiry since {this.props.manager.inquiry_date}</button>
          : null}
      </div>
    )
    return (<Modal body={body} header={header}/>)
  }
}

RefuseModal.propTypes = {
  reason: React.PropTypes.func,
  manager: React.PropTypes.object
}
