'use strict'
import React from 'react'

export default class ViewRow extends React.Component {
  constructor(props) {
    super(props)
  }

  petsAllowed(petsAllowed) {
    if (petsAllowed === '1') {
      return (
        <span
          className="fa-stack fa-lg text-success"
          data-toggle="tooltip"
          data-placement="top"
          title="Pet friendly">
          <i className="fa fa-square fa-stack-2x"></i>
          <i className="fa fa-paw fa-stack-1x fa-inverse"></i>
        </span>
      )
    }
  }

  furnished(furnished) {
    if (furnished === '1') {
      return (
        <span
          className="fa-stack fa-lg text-success"
          data-toggle="tooltip"
          data-placement="top"
          title="Furnished">
          <i className="fa fa-square fa-stack-2x"></i>
          <i className="fa fa-bed fa-stack-1x fa-inverse"></i>
        </span>
      )
    }
  }

  appalcart(appalcart) {
    if (appalcart === '1') {
      return (
        <span
          className="fa-stack fa-lg text-success"
          data-toggle="tooltip"
          data-placement="top"
          title="On AppalCART route">
          <i className="fa fa-square fa-stack-2x"></i>
          <i className="fa fa-bus fa-stack-1x fa-inverse"></i>
        </span>
      )
    }
  }

  dishwasher(dishwasher) {
    if (dishwasher === '1') {
      return (
        <span
          className="fa-stack fa-lg text-success"
          data-toggle="tooltip"
          data-placement="top"
          title="Dishwasher">
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
          className="fa-stack fa-lg text-success"
          data-toggle="tooltip"
          data-placement="top"
          title="Washer/Dryer in unit">
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
          className="fa-stack fa-lg text-success"
          data-toggle="tooltip"
          data-placement="top"
          title="Utilities included in rent">
          <i className="fa fa-square fa-stack-2x"></i>
          <i className="fa fa-plug fa-stack-1x fa-inverse"></i>
        </span>
      )
    }
  }

  airconditioner(airconditioning) {
    if (airconditioning === '1') {
      return (
        <span
          className="fa-stack fa-lg text-success"
          data-toggle="tooltip"
          data-placement="top"
          title="Air conditioning in unit">
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
