'use strict'
import React, {Component} from 'react'

export default class Row extends Component {
  constructor(props) {
    super(props)
  }

  petsAllowed(petsAllowed) {
    if (petsAllowed === '1') {
      return (
        <span
          className="fa-3x amenity-icon"
          data-placement="top"
          data-tip="Pet friendly">
          <i
            className="fas fa-paw"
            data-fa-transform="shrink-8"
            data-fa-mask="fas fa-square"></i>
        </span>
      )
    }
  }

  furnished(furnished) {
    if (furnished === '1') {
      return (
        <span className="fa-3x amenity-icon" data-placement="top" data-tip="Furnished">
          <i
            className="fas fa-bed"
            data-fa-transform="shrink-8"
            data-fa-mask="fas fa-square"></i>
        </span>
      )
    }
  }

  closeToCampus(close) {
    if (close === true) {
      return (
        <span
          className="fa-3x amenity-icon"
          data-placement="top"
          data-tip="Walking distance to campus">
          <i
            className="fas fa-street-view"
            data-fa-transform="shrink-8"
            data-fa-mask="fas fa-square"></i>
        </span>
      )
    }
  }

  appalcart(appalcart) {
    if (appalcart === '1') {
      return (
        <span
          className="fa-3x amenity-icon"
          data-placement="top"
          data-tip="On AppalCART route">
          <i
            className="fas fa-bus"
            data-fa-transform="shrink-8"
            data-fa-mask="fas fa-square"></i>
        </span>
      )
    }
  }

  dishwasher(dishwasher) {
    if (dishwasher === '1') {
      return (
        <span className="fa-3x amenity-icon" data-placement="top" data-tip="Dishwasher">
          <i
            className="fas fa-utensils"
            data-fa-transform="shrink-8"
            data-fa-mask="fas fa-square"></i>
        </span>
      )
    }
  }

  washer(washer) {
    if (washer === true) {
      return (
        <span
          className="fa-3x amenity-icon"
          data-placement="top"
          data-tip="Washer/Dryer in unit">
          <i
            className="fas fa-archive"
            data-fa-transform="shrink-8"
            data-fa-mask="fas fa-square"></i>
        </span>
      )
    }
  }

  utilities(included) {
    if (included === '1') {
      return (
        <span
          className="fa-3x amenity-icon"
          data-placement="top"
          data-tip="Utilities included in rent">
          <i
            className="fas fa-plug"
            data-fa-transform="shrink-8"
            data-fa-mask="fas fa-square"></i>
        </span>
      )
    }
  }

  smoking(smoke_free) {
    if (smoke_free === true) {
      return (
        <span
          className="fa-3x amenity-icon"
          data-placement="bottom"
          data-tip="Smoke free">
          <i
            className="fas fa-fire-extinguisher"
            data-fa-transform="shrink-8"
            data-fa-mask="fas fa-square"></i>
        </span>
      )
    }
  }

  airconditioner(airconditioning) {
    if (airconditioning === '1') {
      return (
        <span className="fa-3x amenity-icon" data-placement="top" data-tip="Dishwasher">
          <i
            className="fas fa-snowflake"
            data-fa-transform="shrink-8"
            data-fa-mask="fas fa-square"></i>
        </span>
      )
    }
  }

  urlTitle(title) {
    return title.replace(/[^\w]/g, '-').substring(0, 20).toLowerCase()
  }
}
