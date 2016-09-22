'use strict'
import React from 'react'
import ListManagers from './ListManagers.jsx'
import ManagerForm from './ManagerForm.jsx'
import Message from '../Mixin/Message.jsx'
import Loading from '../Mixin/Loading.jsx'
import ManagerObject from '../Mixin/ManagerObject'

/* global $ */

class Manager extends React.Component {
  constructor(props) {
    super(props)
    let manager = new ManagerObject
    this.state = {
      managers: null,
      admin: true,
      message: null,
      currentManager : manager
    }

    let bindable = ['load', 'fillForm', 'searchManager']

    bindable.map(function (v) {
      this[v] = this[v].bind(this)
    }.bind(this))
  }

  componentDidMount() {
    this.load()
  }

  fillForm(manager) {
    this.setState({currentManager: manager})
    $('#reactModal').modal('show')
  }

  setMessage(message) {
    this.setState({'message': message})
  }

  getMessage() {
    if (this.state.message != null) {
      return <Message message={this.state.message}/>
    } else {
      return null
    }
  }

  load() {
    $.getJSON('properties/Manager', {}).done(function (data) {
      this.setState({managers: data, loading: false})
    }.bind(this)).fail(function () {
      this.setState({managers: null, loading: false})
      this.setMessage('Error: failure pulling managers')
    }.bind(this))
  }

  searchManager() {
    clearTimeout(delay)
    let delay = setTimeout(function () {
      //console.log('hi')
    }, 2000)
  }

  render() {
    if (this.state.managers === null) {
      return (<Loading label="managers"/>)
    } else {
      let message = this.getMessage()

      return (
        <div>
          <ManagerForm manager={this.state.currentManager} reload={this.load}/>
          {message}
          <div className="row">
            <div className="col-sm-6">
              <input
                className="form-control"
                type="text"
                placeholder="Search for managers..."
                onChange={this.searchManager}/>
            </div>
            <div className="col-sm-2">
              {this.state.admin
                ? (
                  <button
                    className="btn btn-success"
                    data-toggle="modal"
                    data-target="#reactModal">
                    <i className="fa fa-plus"></i>&nbsp; Add manager</button>
                )
                : null}
            </div>
          </div>
          <ListManagers managers={this.state.managers} fillForm={this.fillForm}/>
        </div>
      )
    }
  }
}

export default Manager
