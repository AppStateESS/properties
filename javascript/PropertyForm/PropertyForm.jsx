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
import SubmitForm from '../Mixin/Form/SubmitForm.jsx'
import {StickyContainer, Sticky} from 'react-sticky'

import 'react-date-picker/index.css'

/* global $, property */

export default class PropertyForm extends Component {
  constructor() {
    super()

    this.state = {
      message: null,
      property: property,
      errors: {},
      activeTab: 0,
      saving: false
    }
    const methods = [
      'setTab',
      'setValue',
      'setError',
      'activate',
      'deactivate',
      'checkForm',
      'unsetMessage',
      'setIntegerValue'
    ]
    bindMethods(methods, this)
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

    let activateButton

    if (property.id > 0) {
      if (property.active) {
        activateButton = (
          <div onClick={this.deactivate} className="lead pointer text-success">
            <i className="fa fa-toggle-on"></i>&nbsp; Property active
          </div>
        )
      } else {
        activateButton = (
          <div onClick={this.activate} className="lead pointer text-muted">
            <i className="fa fa-toggle-off"></i>&nbsp; Property inactive
          </div>
        )
      }
    }

    return (
      <StickyContainer>
        <div ref="PageTop" className="property-form">
          {message}
          <h2>Property for {this.state.property.company_name}</h2>
          <div>{activateButton}</div>
          <Sticky style={{
            zIndex: '100'
          }}>
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
