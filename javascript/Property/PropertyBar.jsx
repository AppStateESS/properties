'use strict'
import React from 'react'
import Dropdown from '../Mixin/Dropdown.jsx'
import Amenities from './Amenities.jsx'

export default class PropertyBar extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      fullSize: true
    }
    this.clearSearch = this.clearSearch.bind(this)
  }

  componentDidUpdate() {
    const minprice = this.props.searchVars['minprice']
    const maxprice = this.props.searchVars['maxprice']
    if (maxprice !== '0' && minprice !== '0' && parseInt(maxprice) < parseInt(minprice)) {
      this.props.updateSearchVars('minprice', maxprice)
      this.props.updateSearchVars('maxprice', minprice)
    }
  }

  clearSearch() {
    this.refs.propertySearch.value = ''
    this.props.clear()
  }

  render() {
    const beds = [
      {
        label: '1+ beds',
        handleClick: this.props.updateSearchVars.bind(null, 'beds', '1')
      }, {
        label: '2+ beds',
        handleClick: this.props.updateSearchVars.bind(null, 'beds', '2')
      }, {
        label: '3+ beds',
        handleClick: this.props.updateSearchVars.bind(null, 'beds', '3')
      }, {
        label: '4+ beds',
        handleClick: this.props.updateSearchVars.bind(null, 'beds', '4')
      }, {
        label: '5+ beds',
        handleClick: this.props.updateSearchVars.bind(null, 'beds', '5')
      }
    ]

    const baths = [
      {
        label: '1+ baths',
        handleClick: this.props.updateSearchVars.bind(null, 'baths', '1')
      }, {
        label: '2+ baths',
        handleClick: this.props.updateSearchVars.bind(null, 'baths', '2')
      }, {
        label: '3+ baths',
        handleClick: this.props.updateSearchVars.bind(null, 'baths', '3')
      }, {
        label: '4+ baths',
        handleClick: this.props.updateSearchVars.bind(null, 'baths', '4')
      }, {
        label: '5+ baths',
        handleClick: this.props.updateSearchVars.bind(null, 'baths', '5')
      }
    ]

    const minprice = [
      {
        label: 'Min. Price',
        handleClick: this.props.updateSearchVars.bind(null, 'minprice', '0')
      }, {
        label: '$100',
        handleClick: this.props.updateSearchVars.bind(null, 'minprice', '100')
      }, {
        label: '$200',
        handleClick: this.props.updateSearchVars.bind(null, 'minprice', '200')
      }, {
        label: '$300',
        handleClick: this.props.updateSearchVars.bind(null, 'minprice', '300')
      }, {
        label: '$400',
        handleClick: this.props.updateSearchVars.bind(null, 'minprice', '400')
      }, {
        label: '$500',
        handleClick: this.props.updateSearchVars.bind(null, 'minprice', '500')
      }, {
        label: '$750',
        handleClick: this.props.updateSearchVars.bind(null, 'minprice', '750')
      }, {
        label: '$1000',
        handleClick: this.props.updateSearchVars.bind(null, 'minprice', '1000')
      }
    ]

    const maxprice = [
      {
        label: 'Max price',
        handleClick: this.props.updateSearchVars.bind(null, 'maxprice', '0')
      }, {
        label: '$200',
        handleClick: this.props.updateSearchVars.bind(null, 'maxprice', '200')
      }, {
        label: '$300',
        handleClick: this.props.updateSearchVars.bind(null, 'maxprice', '300')
      }, {
        label: '$400',
        handleClick: this.props.updateSearchVars.bind(null, 'maxprice', '400')
      }, {
        label: '$500',
        handleClick: this.props.updateSearchVars.bind(null, 'maxprice', '500')
      }, {
        label: '$750',
        handleClick: this.props.updateSearchVars.bind(null, 'maxprice', '750')
      }, {
        label: '$1000',
        handleClick: this.props.updateSearchVars.bind(null, 'maxprice', '1000')
      }, {
        label: '$2000',
        handleClick: this.props.updateSearchVars.bind(null, 'maxprice', '2000')
      }
    ]

    const bedLabel = `${this.props.searchVars.beds}+ beds`
    const bathLabel = `${this.props.searchVars.baths}+ baths`
    const minpriceLabel = this.props.searchVars.minprice === '0' ? 'Min. price' : `$${this.props.searchVars.minprice}`
    const maxpriceLabel = this.props.searchVars.maxprice === '0' ? 'Max. price' :`$${this.props.searchVars.maxprice}`

    return (
      <div className="panel panel-default marginBottom">
        <div className="panel-body">
          <div className="row">
            <div className="col-sm-4">
              <div className="input-group">
                <input
                  ref="propertySearch"
                  className="form-control input-sm"
                  type="text"
                  placeholder="Search for properties..."
                  onChange={this.props.updateSearchString}/>
                <span className="input-group-btn">
                  <button
                    className="btn btn-default btn-sm"
                    type="button"
                    onClick={this.clearSearch}>Clear</button>
                </span>
              </div>
            </div>
            <div className="col-sm-8">
              <div className="pull-left"><Dropdown label={bedLabel} options={beds}/></div>
              <div className="pull-left"><Dropdown label={bathLabel} options={baths}/></div>
              <div className="pull-left"><Dropdown label={minpriceLabel} options={minprice}/></div>
              <div className="pull-left"><Dropdown label={maxpriceLabel} options={maxprice}/></div>
            </div>
          </div>
          {this.state.fullSize === true
            ? <Amenities toggle={this.props.toggle} searchVars={this.props.searchVars}/>
            : null}
        </div>
      </div>
    )
  }
}

PropertyBar.propTypes = {
  updateSearchString: React.PropTypes.func,
  clear: React.PropTypes.func,
  updateSearchVars: React.PropTypes.func,
  searchVars: React.PropTypes.object,
  toggle: React.PropTypes.func
}
