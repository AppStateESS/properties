'use strict'
import React, {Component} from 'react'
import PropTypes from 'prop-types'
import Dropdown from '../Mixin/Form/Dropdown.jsx'

export default class SearchBar extends Component {
  constructor(props) {
    super(props)
    this.state = {
      fullSize: false
    }
    this.togglePanel = this.togglePanel.bind(this)
  }

  togglePanel() {
    this.setState({
      fullSize: !this.state.fullSize
    })
  }

  render() {
    const focus = [
      {
        label: 'My academic and intellectual growth',
        handleClick: this.props.updateSearchVars.bind(null, 'focus', 'academic')
      }, {
        label: 'The friends and relationships I create at college',
        handleClick: this.props.updateSearchVars.bind(null, 'focus', 'relationships')
      }, {
        label: 'Both my academics and relationships equally',
        handleClick: this.props.updateSearchVars.bind(null, 'focus', 'both')
      }
    ]

    const wakeTime = [
      {
        handleClick: this.props.updateSearchVars.bind(null, 'wake_time', 'six_or_earlier'),
        label: 'Before 6:00AM'
      }, {
        handleClick: this.props.updateSearchVars.bind(null, 'wake_time', 'six_to_eight'),
        label: 'Between 6:00AM and 8:00AM'
      }, {
        handleClick: this.props.updateSearchVars.bind(null, 'wake_time', 'eight_to_ten'),
        label: 'Between 8:00AM and 10:00AM'
      }, {
        handleClick: this.props.updateSearchVars.bind(null, 'wake_time', 'ten_to_noon'),
        label: 'Between 10:00AM and Noon'
      }, {
        handleClick: this.props.updateSearchVars.bind(null, 'wake_time', 'noon_or_later'),
        label: 'Between Noon or later'
      }
    ]

    const sleepTime = [
      {
        handleClick: this.props.updateSearchVars.bind(null, 'sleep_time', 'eight_or_earlier'),
        label: '8:00pm or earlier'
      }, {
        handleClick: this.props.updateSearchVars.bind(null, 'sleep_time', 'eight_to_ten'),
        label: '8:00pm to 10:00pm'
      }, {
        handleClick: this.props.updateSearchVars.bind(null, 'sleep_time', 'ten_to_midnight'),
        label: '10:00pm to midnight'
      }, {
        handleClick: this.props.updateSearchVars.bind(null, 'sleep_time', 'after_midnight'),
        label: 'After midnight'
      }
    ]

    const pets = [
      {
        handleClick: this.props.updateSearchVars.bind(null, 'pets', 'none'),
        label: 'I do not want pets'
      }, {
        handleClick: this.props.updateSearchVars.bind(null, 'pets', 'want'),
        label: 'Do not have a pet, but want one'
      }, {
        handleClick: this.props.updateSearchVars.bind(null, 'pets', 'have'),
        label: 'I have a pet'
      }, {
        handleClick: this.props.updateSearchVars.bind(null, 'pets', 'accept'),
        label: 'I can room with someone with a pet'
      }
    ]

    const smoking = [
      {
        handleClick: this.props.updateSearchVars.bind(null, 'smoking', 'never'),
        label: 'I never smoke'
      }, {
        handleClick: this.props.updateSearchVars.bind(null, 'smoking', 'sometimes'),
        label: 'I sometimes smoke'
      }, {
        handleClick: this.props.updateSearchVars.bind(null, 'smoking', 'outside'),
        label: 'I smoke, but do so outside'
      }, {
        handleClick: this.props.updateSearchVars.bind(null, 'smoking', 'inside'),
        label: 'I smoke inside'
      }
    ]

    const freeTime = [
      {
        handleClick: this.props.updateSearchVars.bind(null, 'free_time', 'go_out'),
        label: 'I like to go out with friends'
      }, {
        handleClick: this.props.updateSearchVars.bind(null, 'free_time', 'stay_in_friends'),
        label: 'I like to stay in with friends'
      }, {
        handleClick: this.props.updateSearchVars.bind(null, 'free_time', 'time_alone'),
        label: 'I like relaxing alone'
      }
    ]

    const {labels} = this.props

    const buttonstyle = {
      clear: 'both',
      paddingTop: '1em',
      marginTop: '1em'
    }

    const margin = {
      marginRight : '.5em'
    }

    return (
      <div className="panel panel-default marginBottom">
        <div className="panel-body">
          <div>
            <div className="pull-left" style={margin}>
              <Dropdown small={true} label={labels.focus} options={focus}/>
            </div>
            <div className="pull-left" style={margin}>
              <Dropdown small={true} label={labels.wake_time} options={wakeTime}/>
            </div>
            <div className="pull-left" style={margin}>
              <Dropdown small={true} label={labels.pets} options={pets}/>
            </div>
            <div className="pull-left" style={margin}>
              <Dropdown small={true} label={labels.free_time} options={freeTime}/>
            </div>
            <div className="pull-left" style={margin}>
              <Dropdown small={true} label={labels.sleep_time} options={sleepTime}/>
            </div>
            <div className="pull-left" style={margin}>
              <Dropdown small={true} label={labels.smoking} options={smoking}/>
            </div>
          </div>
          <div className="text-center" style={buttonstyle}>
            <button type="button" className="btn btn-success" onClick={this.props.reset}>Reset</button>
          </div>
        </div>
      </div>
    )
  }
}

SearchBar.propTypes = {
  updateSearchVars: PropTypes.func,
  searchVars: PropTypes.object,
  reset: PropTypes.func,
  labels: PropTypes.object
}
