'use strict'
import React from 'react'
import ListManagers from './ListManagers.jsx'
import ManagerForm from './ManagerForm.jsx'
import Message from '../Mixin/Message.jsx'
import Loading from '../Mixin/Loading.jsx'

/* global $ */

class Manager extends React.Component {
  constructor(props) {
    super(props)
    this.delay
    this.addManager = false
    this.state = {
      managers: null,
      message: null,
      currentManager: {}
    }
    this.search = ''
    let bindable = [
      'clearSearch',
      'dropManager',
      'getMessage',
      'load',
      'fillForm',
      'searchManager',
      'setMessage',
      'updateManager'
    ]

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
    if (this.state.message !== null) {
      setTimeout(function(){
        this.setState({message: null})
      }.bind(this), 4000)
      return <Message message={this.state.message}/>
    } else {
      return null
    }
  }

  load() {
    $.getJSON('properties/Manager', {search: this.search}).done(function (data) {
      this.addManager = data.addManager
      this.setState({managers: data['managerList'], loading: false})
    }.bind(this)).fail(function () {
      this.setState({managers: null, loading: false})
      this.setMessage('Error: failure pulling managers')
    }.bind(this))
  }

  updateManager(key) {
    let managers = this.state.managers
    let manager = this.state.managers[key]
    $.getJSON('properties/Manager/' + manager.id).done(function (data) {
      managers[key] = data
      this.setState({managers: managers})
    }.bind(this))
  }

  dropManager(key) {
    let managers = this.state.managers
    managers.splice(key, 1)
    this.setState({managers: managers})
  }

  searchManager(e) {
    clearTimeout(this.delay)
    const search = e.target.value
    if (search.length < 3 && search.length > 0) {
      return
    }
    this.delay = setTimeout(function () {
      this.search = search
      this.load()
    }.bind(this, search), 500)
  }

  clearSearch() {
    this.refs.managerSearch.value = ''
    this.search = ''
    this.load()
  }

  render() {
    let managerForm = null
    let message = this.getMessage()

    if (this.addManager) {
      managerForm = <ManagerForm manager={this.state.currentManager} reload={this.load} message={this.setMessage}/>
    }
    if (this.state.managers === null) {
      return (<Loading label="managers"/>)
    } else {
      return (
        <div>
          {managerForm}
          {message}
          <div className="row">
            <div className="col-sm-6">
              <div className="input-group">
                <input
                  ref="managerSearch"
                  className="form-control"
                  type="text"
                  placeholder="Search for managers..."
                  onChange={this.searchManager}/>
                <span className="input-group-btn">
                  <button className="btn btn-default" type="button" onClick={this.clearSearch}>Clear</button>
                </span>
              </div>
            </div>
            <div className="col-sm-2">
              {this.addManager
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
          <hr />
          <ListManagers
            managers={this.state.managers}
            fillForm={this.fillForm}
            reload={this.updateManager}
            remove={this.dropManager}
            message={this.setMessage}
            admin={this.addManager}/>
        </div>
      )
    }
  }
}

export default Manager
