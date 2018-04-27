'use strict'
import React, {Component} from 'react'
import ListManagers from './ListManagers.jsx'
import ManagerForm from './ManagerForm.jsx'
import Message from '../Mixin/Html/Message.jsx'
import Waiting from '../Mixin/Html/Waiting.jsx'
import bindMethods from '../Mixin/Helper/Bind.js'
import ManagerObject from '../Mixin/Objects/ManagerObject.js'

/* global $ */

class Manager extends Component {
  constructor(props) {
    super(props)
    this.delay
    this.admin = false
    this.offset = 0
    this.state = {
      managers: null,
      message: null,
      currentManager: ManagerObject,
      moreRows : true
    }
    this.search = ''
    const bindable = [
      'clearSearch',
      'dropManager',
      'getMessage',
      'load',
      'fillForm',
      'searchManager',
      'setMessage',
      'updateManager',
      'showMore'
    ]

    bindMethods(bindable, this)
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

  showMore() {
    this.offset = this.offset + 1
    this.load()
  }

  load() {
    $.getJSON('properties/Manager', {search: this.search, offset: this.offset}).done(function (data) {
      this.admin = data.admin
      if (this.offset > 0) {
        this.setState({managers: this.state.managers.concat(data.managerList), moreRows: data.more_rows})
      } else {
        this.setState({managers: data.managerList, moreRows: data.more_rows})
      }
    }.bind(this)).fail(function () {
      this.setState({managers: null})
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

  searchLetter(letter) {
    this.search = letter
    this.refs.managerSearch.value = ''
    this.load()
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
    if (this.admin) {
      managerForm = <ManagerForm manager={this.state.currentManager} reload={this.load} message={this.setMessage}/>
    }
    if (this.state.managers === null) {
      return (<Waiting label="landlords"/>)
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
                  placeholder="Search for landlords..."
                  onChange={this.searchManager}/>
                <span className="input-group-btn">
                  <button className="btn btn-outline-dark" type="button" onClick={this.clearSearch}>Clear</button>
                </span>
              </div>
            </div>
            <div className="col-sm-2">
              {this.admin
                ? (<button
                    className="btn btn-success"
                    data-toggle="modal"
                    data-target="#reactModal">
                    <i className="fa fa-plus"></i>&nbsp; Add manager</button>
                ) : null}
            </div>
          </div>
          <div className="row mt-1">
            <div className="col-sm-12 text-center">
              <button className="btn btn-sm btn-outline-dark" onClick={this.searchLetter.bind(this, null)}>All</button>
              <button className="btn btn-sm btn-outline-dark" onClick={this.searchLetter.bind(this, 'a')}>A</button>
              <button className="btn btn-sm btn-outline-dark" onClick={this.searchLetter.bind(this, 'b')}>B</button>
              <button className="btn btn-sm btn-outline-dark" onClick={this.searchLetter.bind(this, 'c')}>C</button>
              <button className="btn btn-sm btn-outline-dark" onClick={this.searchLetter.bind(this, 'd')}>D</button>
              <button className="btn btn-sm btn-outline-dark" onClick={this.searchLetter.bind(this, 'e')}>E</button>
              <button className="btn btn-sm btn-outline-dark" onClick={this.searchLetter.bind(this, 'f')}>F</button>
              <button className="btn btn-sm btn-outline-dark" onClick={this.searchLetter.bind(this, 'g')}>G</button>
              <button className="btn btn-sm btn-outline-dark" onClick={this.searchLetter.bind(this, 'h')}>H</button>
              <button className="btn btn-sm btn-outline-dark" onClick={this.searchLetter.bind(this, 'i')}>I</button>
              <button className="btn btn-sm btn-outline-dark" onClick={this.searchLetter.bind(this, 'j')}>J</button>
              <button className="btn btn-sm btn-outline-dark" onClick={this.searchLetter.bind(this, 'k')}>K</button>
              <button className="btn btn-sm btn-outline-dark" onClick={this.searchLetter.bind(this, 'l')}>L</button>
              <button className="btn btn-sm btn-outline-dark" onClick={this.searchLetter.bind(this, 'm')}>M</button>
              <button className="btn btn-sm btn-outline-dark" onClick={this.searchLetter.bind(this, 'n')}>N</button>
              <button className="btn btn-sm btn-outline-dark" onClick={this.searchLetter.bind(this, 'o')}>O</button>
              <button className="btn btn-sm btn-outline-dark" onClick={this.searchLetter.bind(this, 'p')}>P</button>
              <button className="btn btn-sm btn-outline-dark" onClick={this.searchLetter.bind(this, 'q')}>Q</button>
              <button className="btn btn-sm btn-outline-dark" onClick={this.searchLetter.bind(this, 'r')}>R</button>
              <button className="btn btn-sm btn-outline-dark" onClick={this.searchLetter.bind(this, 's')}>S</button>
              <button className="btn btn-sm btn-outline-dark" onClick={this.searchLetter.bind(this, 't')}>T</button>
              <button className="btn btn-sm btn-outline-dark" onClick={this.searchLetter.bind(this, 'u')}>U</button>
              <button className="btn btn-sm btn-outline-dark" onClick={this.searchLetter.bind(this, 'v')}>V</button>
              <button className="btn btn-sm btn-outline-dark" onClick={this.searchLetter.bind(this, 'w')}>W</button>
              <button className="btn btn-sm btn-outline-dark" onClick={this.searchLetter.bind(this, 'xyz')}>XYZ</button>
            </div>
          </div>
          <hr />
          <ListManagers
            managers={this.state.managers}
            fillForm={this.fillForm}
            reload={this.updateManager}
            remove={this.dropManager}
            message={this.setMessage}
            admin={this.admin}/>
            {this.state.moreRows === true ?
            <div className="text-center"><button className="btn btn-primary" onClick={this.showMore}>Show more results</button></div> : null}
        </div>
      )
    }
  }
}

export default Manager
