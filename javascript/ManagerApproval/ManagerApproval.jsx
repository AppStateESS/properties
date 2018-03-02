'use strict'
import React, {Component} from 'react'
import RefuseModal from './RefuseModal.jsx'
import InquiryModal from './InquiryModal.jsx'
import empty from '../Mixin/Helper/Empty.js'
import Message from '../Mixin/Html/Message.jsx'
import ErrorPage from '../Mixin/Html/ErrorPage.jsx'
import Waiting from '../Mixin/Html/Waiting.jsx'

/* global $ */

export default class ManagerApproval extends Component {
  constructor(props) {
    super(props)
    this.state = {
      managers: null,
      message: null,
      messageType: 'danger',
      modal: false,
      modalType: '',
      errorPage: null,
      emailWarning: false
    }
    this.currentManager = {}
    this.currentKey = null
    this.refuseReason = this.refuseReason.bind(this)
    this.inquiryType = this.inquiryType.bind(this)
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
      this.setState({modal: false, modalType: ''})
    }.bind(this))
    this.setState({modal: true})
  }

  closeModal() {
    $('#reactModal').modal('hide')
    this.setState({modal: false, modalType: ''})
  }

  load() {
    $.getJSON('properties/Manager/approval').done(function (data) {
      this.setState({managers: data['managerList'], emailWarning: data['email_warning']})
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
      url: './properties/Manager/' + managerId + '/approve',
      data: {
        values: [
          {
            varname: 'approved',
            value: true
          }, {
            varname: 'active',
            value: true
          }
        ]
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
    managers.splice(key, 1)
    this.setState({managers: managers})
  }

  refuse(manager, key) {
    this.setState({modal: true, modalType: 'refuse'})
    this.currentManager = manager
    this.currentKey = key
  }

  inquiry(manager, key) {
    this.setState({modal: true, modalType: 'inquiry'})
    this.currentManager = manager
    this.currentKey = key
  }

  inquiryType(e) {
    const type = e.target.dataset.inquiryType
    $.ajax({
      url: `./properties/Manager/inquiry/`,
      data: {
        managerId: this.currentManager.id,
        inquiryType: type
      },
      dataType: 'json',
      type: 'put'
    }).done(function () {
      this.closeModal()
      this.load()
      this.setMessage('Inquiry sent')
    }.bind(this)).error(function (data) {
      this.closeModal()
      this.setState({'errorPage': data.responseText})
    }.bind(this))
  }

  refuseReason(e) {
    const reason = e.target.dataset.reason
    $.ajax({
      url: './properties/Manager/refuse',
      data: {
        managerId: this.currentManager.id,
        reason: reason
      },
      dataType: 'json',
      type: 'put'
    }).done(function () {
      this.closeModal()
      if (this.state.managers.length === 1) {
        window.location.href = 'properties/Manager/'
      } else {
        this.removeManager(this.currentKey)
        this.resetCurrentManager()
      }
    }.bind(this)).error(function (data) {
      this.closeModal()
      this.setState({'errorPage': data.responseText})
    }.bind(this))

  }

  resetCurrentManager() {
    this.currentManager = {}
    this.currentKey = null
  }

  cancelReason() {
    this.resetCurrentManager()
  }

  inquiryTypeOptions(manager) {
    switch (manager.inquiry_type) {
      case 'sublease':
        return 'Made sublease inquiry on'

      case 'information':
        return 'Property information requested on'
    }
  }

  listing() {
    let listing
    let companyAddress
    let websiteAddress
    if (this.state.managers === null) {
      return <Waiting label="landlords"/>
    } else if (this.state.managers.length === 0 || this.state.managers[0] === undefined) {
      return <div>No managers need approving.</div>
    }

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
                disabled={this.state.emailWarning}
                onClick={this.approve.bind(this, value.id, key)}>
                <i className="fa fa-check"></i>&nbsp;Accept</button>&nbsp;{value.inquiry_date
                ? null
                : (
                  <span>
                    <button disabled={this.state.emailWarning} className="btn btn-info" onClick={this.inquiry.bind(this, value, key)}>
                      <i className="fa fa-question"></i>&nbsp;Inquiry</button>&nbsp;
                  </span>
                )}
              <button className="btn btn-danger" onClick={this.refuse.bind(this, value, key)} disabled={this.state.emailWarning}>
                <i className="fa fa-ban"></i>&nbsp;Refuse</button>
            </div>
          </div>
          <div className="panel-body">
            <div className="row">
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
              </div>
            </div>
          </div>
          {value.inquiry_date
            ? <div className="panel-footer">
                <strong>
                  <i className="fa fa-exclamation-circle"></i>&nbsp; {this.inquiryTypeOptions(value)}&nbsp;{value.inquiry_date}
                </strong>
              </div>
            : null}
        </div>
      )
    }.bind(this))
    return listing
  }

  render() {
    if (this.state.errorPage !== null) {
      return <ErrorPage message={this.state.errorPage}/>
    }
    const message = this.getMessage()
    let errorWarning
    let modal

    if (this.state.emailWarning) {
      errorWarning = <div className="alert alert-danger">
        <i className="fa fa-exclamation-circle"></i>&nbsp;<a href="./properties/Settings/">Site email address is not set.</a>&nbsp; You will not be able to perform any actions until it is entered.</div>
    } else {
      if (this.state.modal) {
        if (this.state.modalType === 'refuse') {
          modal = <RefuseModal reason={this.refuseReason} manager={this.currentManager}/>
        } else if (this.state.modalType === 'inquiry') {
          modal = <InquiryModal inquiry={this.inquiryType} manager={this.currentManager}/>
        }
      }
    }
    return (
      <div>
        <h2>Manager Approval</h2>
        {modal}
        {message}
        {errorWarning}
        {this.listing()}
      </div>
    )
  }
}
