'use strict'
import React from 'react'
import bindMethods from '../Bind.js'
import DecodeUrl from '../DecodeUrl.js'
import setIfDefined from '../setIfDefined.js'

export default class Place extends React.Component {
  constructor(props) {
    super(props)
    this.state = {}

    this.delay
    this.search
    this.searchVars = {
      beds: '1',
      baths: '1',
      minprice: '0',
      maxprice: '0'
    }
    this.loadAmenities()

    bindMethods([
      'toggle',
      'clearAmenities',
      'clearSearch',
      'updateSearchVars',
      'updateSearchString',
    ], this)
  }

  clearSearch() {
    this.search = ''
    this.load()
  }

  resetConditions() {
    this.searchVars = {
      beds: '1',
      baths: '1',
      minprice: '0',
      maxprice: '0'
    }
    this.load()
    this.updateLink()
  }

  clearAmenities() {
    this.searchVars.furnished = null
    this.searchVars.ac = null
    this.searchVars.pets = null
    this.searchVars.utils = null
    this.searchVars.appalcart = null
    this.searchVars.campus = null
    this.searchVars.dishwasher = null
    this.searchVars.laundry = null
    this.searchVars.clubhouse = null
    this.searchVars.efficiency = null
    this.searchVars.apartment = null
    this.searchVars.house = null
    this.searchVars.condo = null
    this.searchVars.townhouse = null
    this.searchVars.duplex = null
    this.searchVars.workout = null
    this.load()
    this.updateLink()
  }

  updateSearchString(e) {
    clearTimeout(this.delay)
    const search = e.target.value
    if (search.length < 4 && search.length > 0) {
      return
    }
    this.delay = setTimeout(function () {
      this.search = search
      this.load()
    }.bind(this, search), 500)
  }

  updateSearchVars(varname, value)
  {
    this.searchVars[varname] = value
    this.load()
    this.updateLink()
  }

  toggle(type) {
    this.updateSearchVars(type, this.searchVars[type] === '1'
      ? undefined
      : '1')
  }

  loadAmenities() {
    const url = new DecodeUrl

    this.searchVars = {
      beds: setIfDefined(url.values, 'beds', '1'),
      baths: setIfDefined(url.values, 'baths', '1'),
      furnished: setIfDefined(url.values, 'furnished'),
      ac: setIfDefined(url.values, 'ac'),
      pets: setIfDefined(url.values, 'pets'),
      utils: setIfDefined(url.values, 'utils'),
      minprice: setIfDefined(url.values, 'minprice', '0'),
      maxprice: setIfDefined(url.values, 'maxprice', '0'),
      appalcart: setIfDefined(url.values, 'appalcart', '0'),
      campus: setIfDefined(url.values, 'campus', '0'),
      dishwasher: setIfDefined(url.values, 'dishwasher', '0'),
      laundry: setIfDefined(url.values, 'laundry', '0'),
      clubhouse: setIfDefined(url.values, 'clubhouse', '0'),
      efficiency: setIfDefined(url.values, 'efficiency', '0'),
      apartment: setIfDefined(url.values, 'apartment', '0'),
      house: setIfDefined(url.values, 'house', '0'),
      condo: setIfDefined(url.values, 'condo', '0'),
      townhouse: setIfDefined(url.values, 'townhouse', '0'),
      duplex: setIfDefined(url.values, 'duplex', '0')
    }
  }

  render() {
    return(
      <div></div>
    )
  }
}

Place.propTypes = {}
