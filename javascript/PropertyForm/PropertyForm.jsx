'use strict'
import React from 'react'
import bindMethods from '../Mixin/Bind.js'

import DecodeUrl from '../Mixin/DecodeUrl.js'
import PropertyObject from '../Mixin/PropertyObject.js'
import ErrorPage from '../Mixin/ErrorPage.jsx'
import Dollarize from '../Mixin/Dollarize.jsx'
import Message from '../Mixin/Message.jsx'
import Nav from '../Mixin/Nav.jsx'
import Basic from './Basic.jsx'
import Pets from './Pets.jsx'
import Fees from './Fees.jsx'
import Features from './Features.jsx'
import Utilities from './Utilities.jsx'

import 'react-date-picker/index.css'

/* global $ */

export default class PropertyForm extends React.Component {
  constructor() {
    super()
    const url = new DecodeUrl
    this.managerId = url.values['managerId']
    this.state = {
      message: null,
      property: PropertyObject,
      manager: {},
      petForm: PropertyObject.pets_allowed,
      errors: {},
      activeTab: 0
    }
    const methods = ['half', 'setValue', 'setTab', 'setIntegerValue', 'checkForm', 'unsetMessage']
    bindMethods(methods, this)
  }

  componentDidMount() {
    $.getJSON('./properties/Manager/' + this.managerId, {}).done(function (data) {
      this.setState({manager: data})
    }.bind(this))
  }

  setValue(varname, value) {
    if (typeof value === 'object' && value.target !== undefined) {
      value = value.target.value
    }
    let property = this.state.property
    property[varname] = value
    this.setState({property})
  }

  setIntegerValue(varname, value) {
    this.setValue(varname, parseInt(value))
  }

  select(e) {
    e.target.select()
  }

  half() {
    this.setState({
      half: !this.state.half
    })
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
    return ['Basic', 'Utilities', 'Amenities', 'Pets', 'Deposits and Fees']
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

    if (property.monthly_rent.length === 0) {
      errors.monthly_rent = true
      errorFound = true
    } else {
      errors.monthly_rent = false
    }

    if (errorFound) {
      this.setState({errors: errors, activeTab: 0})
      this.scrollUp()
    } else {
      let property = this.readyPost()
      $.post('./properties/Property', property, null, 'json').done(function (data) {
        if (data.error !== undefined) {
          this.setMessage(data.error, 'danger')
        }
      }.bind(this)).fail(function (data) {
        this.setMessage(data.responseText, 'danger')
      })
    }
    //this.refs.PropertyForm.submit()
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
    return (this.state.property.name.length > 0 && this.state.property.address.length > 0 && this.state.property.monthly_rent.length > 0)
  }

  render() {
    if (this.managerId === undefined || this.managerId === 0) {
      return <ErrorPage message="I can't go for that"/>
    }
    const property = this.state.property

    let section
    switch (this.state.activeTab) {
      case 0:
        section = <Basic
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
        section = <Pets
          property={this.state.property}
          setValue={this.setValue}
          show={this.state.petForm}/>
        break

      case 4:
        section = <Fees property={property} setValue={this.setValue}/>
        break
    }
    let message
    if (this.state.message !== null) {
      message = <Message message={this.state.message.text} type={this.state.message.type} onClose={this.unsetMessage} />
    }
    return (
      <div ref="PageTop">
        {message}
        <form
          ref="PropertyForm"
          className="property-form"
          method="post"
          action="./properties/Property">
          <h2>Property for {this.state.manager.company_name}</h2>
          <Nav
            buttons={this.navButtons()}
            active={this.state.activeTab}
            disable={this.basicComplete()
            ? null
            : [1, 2, 3, 4]}
            click={this.setTab}/> {section}
          <SubmitForm check={this.checkForm}/>
        </form>
      </div>
    )
  }
}
PropertyForm.propTypes = {
  address: React.PropTypes.string
}

const SubmitForm = ({check}) => {
  return (
    <div className="submit-form">
      <button type="submit" className="btn btn-primary btn-lg" onClick={check}>
        <i className="fa fa-save"></i>&nbsp;Save property</button>
    </div>
  )
}

SubmitForm.propTypes = {
  check: React.PropTypes.func
}
