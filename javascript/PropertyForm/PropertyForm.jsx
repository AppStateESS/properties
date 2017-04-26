'use strict'
import React, {Component} from 'react'
import PropTypes from 'prop-types'
import bindMethods from '../Mixin/Helper/Bind.js'
import empty from '../Mixin/Helper/Empty.js'

import Dollarize from '../Mixin/Form/Dollarize.jsx'
import Message from '../Mixin/Html/Message.jsx'
import Nav from '../Mixin/Html/Nav.jsx'
import Basic from './Basic.jsx'
import Pets from './Pets.jsx'
import Fees from './Fees.jsx'
import Features from './Features.jsx'
import Utilities from './Utilities.jsx'
import Overlay from '../Mixin/Html/Overlay.jsx'
import SubmitForm from '../Mixin/Form/SubmitForm.jsx'
import {StickyContainer, Sticky} from 'react-sticky'

import 'react-date-picker/index.css'

/* global $, property, deleteProperty */

export default class PropertyForm extends Component {
  constructor() {
    super()

    this.state = {
      message: null,
      property: property,
      errors: {},
      activeTab: 0,
      saving: false,
      deleteOverlay: false
    }
    const methods = [
      'delete',
      'setTab',
      'setValue',
      'setError',
      'activate',
      'deactivate',
      'checkForm',
      'openDelete',
      'closeDelete',
      'unsetMessage',
      'setIntegerValue'
    ]
    bindMethods(methods, this)
  }

  componentDidMount() {
    deleteProperty.callback = this.openDelete
  }

  openDelete() {
    this.setState({deleteOverlay: true})
  }

  closeDelete() {
    this.setState({deleteOverlay: false})
  }

  setValue(varname, value) {
    if (typeof value === 'object' && value.target !== undefined) {
      value = value.target.value
    }
    if (value.length > 0) {
      this.setError(varname, false)
    }
    let property = this.state.property
    property[varname] = value
    this.setState({property})
  }

  setError(varname, value) {
    let errors = this.state.errors
    errors[varname] = value
    this.setState({errors})
  }

  setIntegerValue(varname, value) {
    if (typeof value === 'object' && value.target !== undefined) {
      value = value.target.value
    }
    this.setValue(varname, parseInt(value))
  }

  select(e) {
    e.target.select()
  }

  dollarize(input) {
    return <Dollarize>{input}</Dollarize>
  }

  setTab(tab) {
    if (this.basicComplete()) {
      this.setState({activeTab: tab})
    }
  }

  setMessage(text, type) {
    const message = {
      text: text,
      type: type
    }
    this.setState({message: message})
    this.scrollUp()
  }

  unsetMessage() {
    this.setState({message: null})
  }

  navButtons() {
    return ['Basic', 'Utilities', 'Features', 'Pets', 'Deposits and Fees']
  }

  checkForm(e) {
    e.preventDefault()
    const property = this.state.property
    let errors = this.state.errors
    let errorFound = false
    if (property.name.length === 0) {
      errors.name = true
      errorFound = true
    } else {
      errors.name = false
    }

    if (property.address.length === 0) {
      errors.address = true
      errorFound = true
    } else {
      errors.address = false
    }

    if (empty(property.monthly_rent)) {
      errors.monthly_rent = true
      errorFound = true
    } else {
      errors.monthly_rent = false
    }

    if (errorFound) {
      this.setState({errors: errors, activeTab: 0})
      this.scrollUp()
    } else {
      this.save()
    }
  }

  delete() {
    $.ajax({
      url: './properties/Property/' + this.state.property.id,
      dataType: 'json',
      method: 'DELETE',
      success: function () {
        window.location.href = './properties/Property/'
      }.bind(this),
      error: function () {
        this.setMessage('Sorry, something went wrong and the property was not deleted.', 'danger')
        this.closeDelete()
      }.bind(this)
    })
  }
  activate() {
    $.ajax({
      url: './properties/Property/' + this.state.property.id,
      data: {
        varname: 'active',
        value: 1
      },
      dataType: 'json',
      type: 'patch'
    }).done(function () {
      this.setValue('active', true)
    }.bind(this))
  }

  deactivate() {
    $.ajax({
      url: './properties/Property/' + this.state.property.id,
      data: {
        varname: 'active',
        value: 0
      },
      dataType: 'json',
      type: 'patch'
    }).done(function () {
      this.setValue('active', false)
    }.bind(this))
  }

  save() {
    let property = this.readyPost()
    let methodName = 'POST'
    this.setState({saving: true})
    let url = './properties/Property'
    if (property.id > 0) {
      methodName = 'PUT'
      url = url + '/' + + this.state.property.id
    }

    $.ajax({
      url: url,
      data: property,
      dataType: 'json',
      method: methodName,
      success: function (data) {
        if (data.error !== undefined) {
          this.setMessage(data.error, 'danger')
        } else {
          window.location.href = './properties/Property/' + data.id
        }
      }.bind(this),
      error: function () {
        this.setMessage('A server error prevented this property from saving.', 'danger')
      }.bind(this)
    })
  }

  scrollUp() {
    this.refs.PageTop.scrollIntoView()
  }

  readyPost() {
    let property = this.state.property
    if (property.heat_type.length === 0) {
      property.heat_type = ''
    }
    return property
  }

  basicComplete() {
    return (!empty(this.state.property.name) && !empty(this.state.property.address) && !empty(this.state.property.monthly_rent))
  }

  render() {
    const property = this.state.property
    let deleteForm
    if (this.state.deleteOverlay === true) {
      deleteForm = <Overlay close={this.closeDelete} title="Delete this property"><DeleteQuestion close={this.closeDelete} delete={this.delete}/></Overlay>
    }

    let section
    switch (this.state.activeTab) {
      case 0:
        section = <Basic
          setError={this.setError}
          property={property}
          setValue={this.setValue}
          setIntegerValue={this.setIntegerValue}
          errors={this.state.errors}/>
        break

      case 1:
        section = <Utilities
          property={property}
          setValue={this.setValue}
          setIntegerValue={this.setIntegerValue}/>
        break

      case 2:
        section = <Features property={property} setValue={this.setValue}/>
        break

      case 3:
        section = <Pets property={this.state.property} setValue={this.setValue}/>
        break

      case 4:
        section = <Fees property={property} setValue={this.setValue}/>
        break
    }
    let message
    if (this.state.message !== null) {
      message = <Message
        message={this.state.message.text}
        type={this.state.message.type}
        onClose={this.unsetMessage}/>
    }

    let deleteButton
    let activateButton
    let goBack = <a className="btn btn-sm btn-default"href={`./properties/Property/${this.state.property.id}`}><i className="fa fa-undo"></i>&nbsp;Back to view</a>

    if (property.id > 0) {
      if (property.active) {
        activateButton = <button className="btn btn-sm btn-warning" onClick={this.deactivate}>
          <i className="fa fa-ban"></i>&nbsp;Deactivate</button>
      } else {
        activateButton = <button className="btn btn-sm btn-success" onClick={this.activate}>
          <i className="fa fa-check"></i>&nbsp;Activate</button>
      }
      deleteButton = (
        <button className="btn btn-sm btn-danger" onClick={this.openDelete}>
          <i className="fa fa-trash-o"></i>&nbsp;Delete property</button>
      )
    }

    return (
      <StickyContainer>
        <div ref="PageTop" className="property-form">
          {deleteForm}
          {message}
          <h2>Property for {this.state.property.company_name}</h2>
          <div>{goBack}&nbsp;{activateButton}&nbsp;{deleteButton}</div>
          <Sticky style={{zIndex:'100'}}>
            <Nav
              buttons={this.navButtons()}
              active={this.state.activeTab}
              disable={this.basicComplete()
              ? null
              : [1, 2, 3, 4]}
              click={this.setTab}/>
          </Sticky>
            {section}
          <SubmitForm check={this.checkForm} saving={this.state.saving} label="Property"/>
        </div>
      </StickyContainer>
    )
  }
}
PropertyForm.propTypes = {
  address: PropTypes.string
}

class DeleteQuestion extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    return (
      <div>
        <h2>Are you sure you want to delete this property?</h2>
        <p>All images associated with this property will also be deleted.</p>
        <div style={{
          marginBottom: '1em'
        }}>
          <button
            className="btn btn-default btn-lg btn-danger"
            onClick={this.props.delete}>Yes, delete this property and all associated images.</button>
        </div>
        <div>
          <button
            className="btn btn-default btn-lg btn-default"
            onClick={this.props.close}>No, I changed my mind</button>
        </div>
      </div>
    )
  }
}

DeleteQuestion.propTypes = {
  close: PropTypes.func,
  delete: PropTypes.func
}
