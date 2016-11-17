'use strict'
import React from 'react'

export default class Amenities extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      drop: false
    }
    this.toggleDrop = this.toggleDrop.bind(this)
  }

  stop(e) {
    e.stopPropagation()
  }

  toggleDrop()
  {
    this.setState({
      drop: !this.state.drop
    })
  }

  render() {
    /*
    const dropped = (this.state.drop === true)
      ? 'btn-group open'
      : 'btn-group'
      */
    const {searchVars} = this.props
    return (
      <div style={{
        clear: 'both'
      }}>
        <div className="row">
          <div className="col-sm-4">
            <h4>Features</h4>
            <ul className="list-unstyled">
              <li>
                <label><input
                  type="checkbox"
                  checked={searchVars.furnished === '1'}
                  onChange={this.props.toggle.bind(null, 'furnished')}/>&nbsp; Furnished</label>
              </li>
              <li>
                <label><input type="checkbox"
                  checked={searchVars.pets === '1'} onChange={this.props.toggle.bind(null, 'pets')}/>&nbsp; Pets allowed</label>
              </li>
              <li>
                <label><input type="checkbox"
                  checked={searchVars.appalcart === '1'} onChange={this.props.toggle.bind(null, 'appalcart')}/>&nbsp; AppalCART</label>
              </li>
              <li>
                <label><input type="checkbox"
                  checked={searchVars.campus === '1'} onChange={this.props.toggle.bind(null, 'campus')}/>&nbsp; Close to campus</label>
              </li>
              <li>
                <label><input type="checkbox"
                  checked={searchVars.utils === '1'} onChange={this.props.toggle.bind(null, 'utils')}/>&nbsp; Utilities included</label>
              </li>
            </ul>
          </div>
          <div className="col-sm-4">
            <h4>Amenities</h4>
            <ul className="list-unstyled">
              <li>
                <label><input type="checkbox"
                  checked={searchVars.ac === '1'} onChange={this.props.toggle.bind(null, 'ac')}/>&nbsp; Air conditioning</label>
              </li>
              <li>
                <label><input type="checkbox"
                  checked={searchVars.dishwasher === '1'} onChange={this.props.toggle.bind(null, 'dishwasher')}/>&nbsp; Dishwasher</label>
              </li>
              <li>
                <label><input type="checkbox"
                  checked={searchVars.laundry === '1'} onChange={this.props.toggle.bind(null, 'laundry')}/>&nbsp; Washer/Dryer</label>
              </li>
              <li>
                <label><input type="checkbox"
                  checked={searchVars.clubhouse === '1'} onChange={this.props.toggle.bind(null, 'clubhouse')}/>&nbsp; Club House</label>
              </li>
              <li>
                <label><input type="checkbox"
                  checked={searchVars.workout === '1'} onChange={this.props.toggle.bind(null, 'workout')}/>&nbsp; Workout Room</label>
              </li>
            </ul>
          </div>
          <div className="col-sm-4">
            <h4>Property type</h4>
            <ul className="list-unstyled">
              <li>
                <label><input type="checkbox"
                  checked={searchVars.efficiency === '1'} onChange={this.props.toggle.bind(null, 'efficiency')}/>&nbsp; Efficiency</label>
              </li>
              <li>
                <label><input type="checkbox"
                  checked={searchVars.apartment === '1'} onChange={this.props.toggle.bind(null, 'apartment')}/>&nbsp; Apartment</label>
              </li>
              <li>
                <label><input type="checkbox"
                  checked={searchVars.house === '1'} onChange={this.props.toggle.bind(null, 'house')}/>&nbsp; House</label>
              </li>
              <li>
                <label><input type="checkbox"
                  checked={searchVars.condo === '1'} onChange={this.props.toggle.bind(null, 'condo')}/>&nbsp; Condo</label>
              </li>
              <li>
                <label><input type="checkbox"
                  checked={searchVars.townhouse === '1'} onChange={this.props.toggle.bind(null, 'townhouse')}/>&nbsp; Townhouse</label>
              </li>
              <li>
                <label><input type="checkbox"
                  checked={searchVars.duplex === '1'} onChange={this.props.toggle.bind(null, 'duplex')}/>&nbsp; Duplex</label>
              </li>
            </ul>
          </div>
        </div>
      </div>
    )
  }
}

Amenities.propTypes = {
  toggle: React.PropTypes.func,
  searchVars: React.PropTypes.object
}
