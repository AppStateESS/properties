'use strict'
import React from 'react'
import Message from '../Mixin/Message.jsx'
import Modal from '../Mixin/Modal.jsx'
import empty from '../Mixin/Empty.js'
import ErrorPage from '../Mixin/ErrorPage.jsx'
//import bindMethods from '../Mixin/Bind.js'

/* global $ */

export default class ManagerApproval extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      managers: null,
      message: null,
      messageType: 'danger',
      modal: false,
      errorPage: null
    }
    this.currentManager = {
      managerId: 0,
      inquiryDate: 0,
      key: null
    }
    this.refuseReason = this.refuseReason.bind(this)
  }

  componentDidMount() {
    this.load()
  }

  componentDidUpdate(props, state) {
    if (state.modal !== this.state.modal && this.state.modal) {
      this.openModal()
    }
  }

  openModal() {
    $('#reactModal').modal('show')
    $('#reactModal').on('hidden.bs.modal', function () {
      this.setState({modal: false})
    }.bind(this))
    this.setState({modal: true})
  }

  closeModal() {
    $('#reactModal').modal('hide')
    this.setState({modal: false})
  }

  load() {
    $.getJSON('properties/ManagerApproval').done(function (data) {
      this.setState({managers: data['managerList']})
    }.bind(this)).fail(function (data) {
      this.setState({managers: null})
      this.setState({'errorPage': data.responseText})
    }.bind(this))
  }

  setMessage(message, type) {
    this.setState({message: message, messageType: type})
  }

  getMessage() {
    if (this.state.message !== null) {
      setTimeout(function () {
        this.setState({message: null, messageType: 'danger'})
      }.bind(this), 4000)
      return <Message message={this.state.message} type={this.state.messageType}/>
    } else {
      return null
    }
  }

  approve(managerId, key) {
    $.ajax({
      url: './properties/Manager',
      data: {
        managerId: managerId,
        param: 'approved',
        approved: 1
      },
      dataType: 'json',
      type: 'patch'
    }).done(function (data) {
      if (data.success) {
        this.removeManager(key)
        this.setMessage('Manager approved', 'success')
      } else {
        this.setMessage('Could not approve manager', 'danger')
      }
    }.bind(this)).error(function (data) {
      this.closeModal()
      this.setState({'errorPage': data.responseText})
    }.bind(this))
  }

  removeManager(key)
  {
    let managers = this.state.managers
    delete(managers[key])
    this.setState({managers: managers})
  }

  refuse(managerId, inquiryDate, key) {
    this.setState({modal: true})
    this.currentManager = {
      managerId: managerId,
      inquiryDate: inquiryDate,
      key: key
    }
  }

  refuseReason(e) {
    const reason = e.target.dataset.reason
    $.ajax({
      url: `./properties/Manager/${this.currentManager.managerId}/refuse/`,
      data: {
        reason: reason
      },
      dataType: 'json',
      type: 'put'
    }).done(function () {
      this.closeModal()
      if (this.state.managers.length === 1) {
        window.location.href = './properties/Manager/'
      } else {
        this.removeManager(this.currentManager.key)
        this.resetCurrentManager()
      }
    }.bind(this)).error(function (data) {
      this.closeModal()
      this.setState({'errorPage': data.responseText})
    }.bind(this)).complete(function () {})

  }

  resetCurrentManager() {
    this.currentManager = {
      managerId: 0,
      inquiryDate: 0,
      key: null
    }
  }

  cancelReason() {
    this.resetCurrentManager()

  }

  inquiry() {}

  render() {
    if (this.state.errorPage !== null) {
      return <ErrorPage message={this.state.errorPage}/>
    }
    let listing = <p>No managers waiting for approval</p>
    let companyAddress
    let websiteAddress
    const message = this.getMessage()
    let modal
    if (this.state.modal) {
      modal = <RefuseModal
        reason={this.refuseReason}
        inquiryDate={this.currentManager.inquiryDate}/>
    }

    if (this.state.managers !== null) {
      listing = this.state.managers.map(function (value, key) {
        companyAddress = empty(value.company_address)
          ? <em>No physical address</em>
          : (
            <span>{value.company_address}&nbsp;
              <a href={value.company_map_address} target="_index">
                <i className="fa fa-map"></i>
              </a>
            </span>
          )

        const searchLink = `https://www.google.com/search?q=${value.company_name.replace(/ /g, '+')}`
        websiteAddress = empty(value.company_url)
          ? <span>
              <em>No website address</em>&nbsp;
              <a target="_index" href={searchLink}>
                <i className="fa fa-search"></i>
              </a>
            </span>
          : <a href={value.company_url} target="_index">{value.company_url}</a>
        const email = `mailto:${value.email_address}`
        return (
          <div className="panel panel-info" key={key}>
            <div className="panel-heading">
              <span style={{
                fontSize: '2em'
              }}>{value.company_name}</span>
              <div className="pull-right">
                <button
                  className="btn btn-success"
                  onClick={this.approve.bind(this, value.id, key)}>
                  <i className="fa fa-check"></i>&nbsp;Accept</button>&nbsp; {value.last_inquiry_date
                  ? null
                  : (
                    <span>
                      <button
                        className="btn btn-info"
                        onClick={this.inquiry.bind(this, value.id, key)}>
                        <i className="fa fa-question"></i>&nbsp;Inquiry</button>&nbsp;</span>
                  )}
                <button
                  className="btn btn-danger"
                  onClick={this.refuse.bind(this, value.id, value.last_inquiry_date, key)}>
                  <i className="fa fa-ban"></i>&nbsp;Refuse</button>
              </div>
            </div>
            <div className="row panel-body">
              <div className="col-sm-4">
                <h4>Company</h4>
                {websiteAddress}
                <br/> {empty(value.times_available)
                  ? <em>No contact times given</em>
                  : <div>{value.times_available}</div>}
                <div>{companyAddress}</div>
              </div>
              <div className="col-sm-4">
                <h4>Contact</h4>
                <strong>Name:</strong>&nbsp;{value.first_name}&nbsp;{value.last_name}<br/>
                <strong>Username:</strong>&nbsp;{value.username}<br/>
                <a href={value.phone_tel}>{value.phone}</a><br/>
                <a href={email}>{value.email_address}</a>
              </div>
              <div className="col-sm-4">
                <h4>Request date</h4>
                {value.last_log_date}
                {value.last_inquiry_date
                  ? <div>
                      <h4>Inquiry made</h4>
                      <span>{value.last_inquiry_date}</span>
                    </div>
                  : null}
              </div>
            </div>
          </div>
        )
      }.bind(this))
    }
    return (
      <div>
        {modal}
        {message}
        {listing}
      </div>
    )
  }
}

class RefuseModal extends React.Component {
  constructor(props) {
    super(props)
  }

  render() {
    const spacing = {
      marginBottom: '10px',
      display: 'block'
    }
    const header = 'Refusal reason'
    const body = (
      <div>
        <button
          style={spacing}
          className="btn btn-info"
          onClick={this.props.reason}
          data-reason="duplicate">Using duplicate company name</button>
        <button
          style={spacing}
          className="btn btn-info"
          onClick={this.props.reason}
          data-reason="bad_data">Improper information</button>
        {this.props.inquiryDate !== null
          ? <button
              style={spacing}
              className="btn btn-info"
              onClick={this.props.reason}
              data-reason="no_response">No response to inquiry since {this.props.inquiryDate}</button>
          : null}
      </div>
    )
    return (<Modal body={body} header={header}/>)
  }
}

RefuseModal.propTypes = {
  reason: React.PropTypes.func,
  inquiryDate: React.PropTypes.string
}
