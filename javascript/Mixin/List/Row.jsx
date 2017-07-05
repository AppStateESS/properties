'use strict'
import React, {Component} from 'react'

export default class Row extends Component {
  constructor(props) {
    super(props)
  }

  petsAllowed(petsAllowed) {
    if (petsAllowed === '1') {
      return (
        <span className="fa-stack fa-lg" data-placement="top" data-tip="Pet friendly">
          <i className="fa fa-square fa-stack-2x"></i>
          <i className="fa fa-paw fa-stack-1x fa-inverse"></i>
        </span>
      )
    }
  }

  furnished(furnished) {
    if (furnished === '1') {
      return (
        <span className="fa-stack fa-lg" data-placement="top" data-tip="Furnished">
          <i className="fa fa-square fa-stack-2x"></i>
          <i className="fa fa-bed fa-stack-1x fa-inverse"></i>
        </span>
      )
    }
  }

  closeToCampus(close) {
    if (close === true) {
      return (
        <span
          className="fa-stack fa-lg"
          data-placement="top"
          data-tip="Walking distance to campus">
          <i className="fa fa-square fa-stack-2x"></i>
          <i className="fa fa-street-view fa-stack-1x fa-inverse"></i>
        </span>
      )

    }
  }

  appalcart(appalcart) {
    if (appalcart === '1') {
      return (
        <span
          className="fa-stack fa-lg"
          data-placement="top"
          data-tip="On AppalCART route">
          <i className="fa fa-square fa-stack-2x"></i>
          <i className="fa fa-bus fa-stack-1x fa-inverse"></i>
        </span>
      )
    }
  }

  dishwasher(dishwasher) {
    if (dishwasher === '1') {
      return (
        <span className="fa-stack fa-lg" data-placement="top" data-tip="Dishwasher">
          <i className="fa fa-square fa-stack-2x"></i>
          <i className="fa fa-cutlery fa-stack-1x fa-inverse"></i>
        </span>
      )
    }
  }

  washer(washer) {
    if (washer === true) {
      return (
        <span
          className="fa-stack fa-lg"
          data-placement="top"
          data-tip="Washer/Dryer in unit">
          <i className="fa fa-square fa-stack-2x"></i>
          <i className="fa fa-archive fa-stack-1x fa-inverse"></i>
        </span>
      )
    }
  }

  utilities(included) {
    if (included === '1') {
      return (
        <span
          className="fa-stack fa-lg"
          data-placement="top"
          data-tip="Utilities included in rent">
          <i className="fa fa-square fa-stack-2x"></i>
          <i className="fa fa-plug fa-stack-1x fa-inverse"></i>
        </span>
      )
    }
  }

  smoking(smoke_free) {
    if (smoke_free === true) {
      return (
        <span
          className="fa-stack fa-lg text-success"
          data-placement="top"
          data-tip="Smoke free">
          <i className="fa fa-square fa-stack-2x"></i>
          <i className="fa fa-fire-extinguisher fa-stack-1x fa-inverse"></i>
        </span>
      )
    }
  }

  airconditioner(airconditioning) {
    if (airconditioning === '1') {
      return (
        <span
          className="fa-stack fa-lg"
          data-placement="top"
          data-tip="Air conditioning in unit">
          <i className="fa fa-square fa-stack-2x"></i>
          <i className="fa fa-snowflake-o fa-stack-1x fa-inverse"></i>
        </span>
      )
    }
  }

  urlTitle(title) {
    return title.replace(/[^\w]/g, '-').substring(0, 20).toLowerCase()
  }
}
