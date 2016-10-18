'use strict'
import React from 'react'
import bindMethods from '../Mixin/Bind.js'

import DecodeUrl from '../Mixin/DecodeUrl.js'
import PropertyObject from '../Mixin/PropertyObject.js'
import ErrorPage from '../Mixin/ErrorPage.jsx'
import Dollarize from '../Mixin/Dollarize.jsx'
import Nav from '../Mixin/Nav.jsx'
import Basic from './Basic.jsx'
import Pets from './Pets.jsx'
import Fees from './Fees.jsx'
import Features from './Features.jsx'
import Utilities from './Utilities.jsx'
import UtilityImbursement from './UtilityImbursement.jsx'

import 'react-date-picker/index.css'

/* global $ */

export default class PropertyForm extends React.Component {
  constructor() {
    super()
    const url = new DecodeUrl
    this.managerId = url.values['managerId']
    this.state = {
      property: PropertyObject,
      manager: {},
      petForm: PropertyObject.pets_allowed,
      activeTab: 0
    }
    const methods = [
      'half',
      'setValue',
      'setTab',
      'setIntegerValue',
      'checkForm'
    ]
    bindMethods(methods, this)
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
      this.setState({errors: errors})
      this.refs.PropertyForm.scrollIntoView()
    } else {
      this.refs.PropertyForm.submit()
    }
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
    this.setState({activeTab: tab})
  }

  navButtons() {
    return ['Basic', 'Utilities', 'Amenities', 'Pets', 'Deposits and Fees']
  }

  visability() {
    this.refs.basic.style = {visability: 'hidden'}
    this.refs.utilities.style = {visability: 'hidden'}
    this.refs.amen.style = {visability: 'hidden'}
    this.refs.pets.style = {visability: 'hidden'}
    this.refs.fees.style = {visability: 'hidden'}
  }

  render() {
    if (this.managerId === undefined || this.managerId === 0) {
      return <ErrorPage message="I can't go for that"/>
    }
    const property = this.state.property

    return (
      <form
        ref="PropertyForm"
        className="property-form"
        method="post"
        action="./properties/Property">
        <h2>Property for {this.state.manager.company_name}</h2>
        <Nav
          buttons={this.navButtons()}
          active={this.state.activeTab}
          click={this.setTab}/>
        <Basic property={property} setValue={this.setValue} setIntegerValue={this.setIntegerValue} />
        <div ref="utilities">
          <Utilities
            property={property}
            setValue={this.setValue}
            setIntegerValue={this.setIntegerValue}/>
          <UtilityImbursement property={property} setValue={this.setValue}/>
        </div>
        <div ref="amen">
          <Features property={property} setValue={this.setValue}/>
        </div>
        <div ref="pets">
          <Pets
            property={this.state.property}
            setValue={this.setValue}
            show={this.state.petForm}/>
        </div>
        <div ref="fees">
          <Fees property={property} setValue={this.setValue}/>
        </div>
        <SubmitForm check={this.checkForm}/>
      </form>
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
