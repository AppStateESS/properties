'use strict'
import React, {Component} from 'react'
import PropTypes from 'prop-types'
import Dropdown from '../Form/Dropdown.jsx'
import Amenities from '../Edit/Amenities.jsx'
import ReactCSSTransitionGroup from 'react-addons-css-transition-group'

export default class SearchBar extends Component {
  constructor(props) {
    super(props)
    this.state = {
      fullSize: false
    }

    this.hideInactive = false

    this.sortTypes = {
      rentall: 'Monthy rent',
      rentunit: 'Monthly rent by unit',
      rentindiv: 'Monthly rent by renter',
      alpha: 'Alphabetical',
      creatednew: 'Newest',
      createdold: 'Oldest',
      updated: 'Last update'
    }

    this.clearSearch = this.clearSearch.bind(this)
    this.togglePanel = this.togglePanel.bind(this)
  }

  componentDidUpdate() {
    const minprice = this.props.searchVars.minprice
    const maxprice = this.props.searchVars.maxprice
    if (maxprice !== '0' && minprice !== '0' && parseInt(maxprice) < parseInt(minprice)) {
      this.props.updateSearchVars('minprice', maxprice)
      this.props.updateSearchVars('maxprice', minprice)
    }
  }

  clearSearch() {
    this.refs.propertySearch.value = ''
    this.props.clear()
  }

  togglePanel() {
    this.setState({
      fullSize: !this.state.fullSize
    })
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
    const minpriceLabel = this.props.searchVars.minprice === '0'
      ? 'Min. price'
      : `$${this.props.searchVars.minprice}`
    const maxpriceLabel = this.props.searchVars.maxprice === '0'
      ? 'Max. price'
      : `$${this.props.searchVars.maxprice}`

    const panelButton = this.state.fullSize
      ? <span>Less search options
          <i className="fa fa-caret-up"></i>
        </span>
      : <span>More search options
        <i className="fa fa-caret-down"></i>
      </span>

    let sortLabel = 'Sort results by...'
    if (this.props.searchVars.sortBy) {
      sortLabel = 'Sort results by: ' + this.sortTypes[this.props.searchVars.sortBy]
    }

    const sortby = [
      {
        label: this.sortTypes.rentall,
        handleClick: this.props.updateSortBy.bind(null, 'rentall')
      }, {
        label: this.sortTypes.rentunit,
        handleClick: this.props.updateSortBy.bind(null, 'rentunit')
      }, {
        label: this.sortTypes.rentindiv,
        handleClick: this.props.updateSortBy.bind(null, 'rentindiv')
      }, {
        label: this.sortTypes.alpha,
        handleClick: this.props.updateSortBy.bind(null, 'alpha')
      }, {
        label: this.sortTypes.creatednew,
        handleClick: this.props.updateSortBy.bind(null, 'creatednew')
      }, {
        label: this.sortTypes.createdold,
        handleClick: this.props.updateSortBy.bind(null, 'createdold')
      }, {
        label: this.sortTypes.updated,
        handleClick: this.props.updateSortBy.bind(null, 'updated')
      }
    ]

    let activeButton
    if (this.props.showActiveButton) {
      if (this.props.searchVars.showinactive === true) {
        activeButton = <button
          className="btn btn-info btn-sm marginLeft"
          onClick={this.props.updateSearchVars.bind(null, 'showinactive', false)}>Hide inactive</button>
      } else {
        activeButton = <button
          className="btn btn-info btn-sm marginLeft"
          onClick={this.props.updateSearchVars.bind(null, 'showinactive', true)}>Show inactive</button>
      }
    }

    const searchStyle = {
      maxWidth: '300px'
    }

    return (
      <div>
        <div className="panel panel-default marginBottom">
          <div className="panel-body">
            <div className="pull-left" style={searchStyle}>
              <div className="input-group">
                <input
                  ref="propertySearch"
                  className="form-control input-sm"
                  type="text"
                  placeholder="Search..."
                  onChange={this.props.updateSearchString}/>
                <span className="input-group-btn">
                  <button
                    className="btn btn-default btn-sm"
                    type="button"
                    onClick={this.clearSearch}>Clear</button>
                </span>
              </div>
            </div>
            <div className="pull-left"><Dropdown small={true} label={bedLabel} options={beds}/></div>
            <div className="pull-left"><Dropdown small={true} label={bathLabel} options={baths}/></div>
            <div className="pull-left"><Dropdown small={true} label={minpriceLabel} options={minprice}/></div>
            <div className="pull-left"><Dropdown small={true} label={maxpriceLabel} options={maxprice}/></div>
            <div className="pull-left">
              <button className="btn btn-success btn-sm" onClick={this.props.resetConditions}>Reset</button>
            </div>
            {activeButton}
            <div className="row" style={{
              marginTop: '1em'
            }}>
              <div className="col-sm-12 text-center">
                <button className="btn btn-default btn-sm" onClick={this.togglePanel}>{panelButton}</button>
              </div>
            </div>
            <ReactCSSTransitionGroup
              transitionName="trans"
              transitionEnterTimeout={500}
              transitionLeaveTimeout={300}>
              {this.state.fullSize === true
                ? (
                  <div>
                    <Amenities toggle={this.props.toggle} searchVars={this.props.searchVars}/>
                    <div className="text-center">
                      <button className="btn btn-success" onClick={this.props.clearAmenities}>Uncheck above</button>
                    </div>
                  </div>
                )
                : null}
            </ReactCSSTransitionGroup>
          </div>
        </div>
        <div><Dropdown label={sortLabel} options={sortby}/></div>
        <hr />
      </div>
    )
  }
}

SearchBar.propTypes = {
  updateSearchString: PropTypes.func,
  clear: PropTypes.func,
  updateSearchVars: PropTypes.func,
  searchVars: PropTypes.object,
  toggle: PropTypes.func,
  clearAmenities: PropTypes.func,
  updateSortBy: PropTypes.func,
  resetConditions: PropTypes.func,
  showActiveButton: PropTypes.bool
}
