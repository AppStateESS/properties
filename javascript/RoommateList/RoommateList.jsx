'use strict'
import React from 'react'
import RoommateRow from './RoommateRow.jsx'
import Waiting from '../Mixin/Html/Waiting.jsx'
//import bindMethods from '../Mixin/Helper/Bind.js'

/* global $ */

export default class RoommateList extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      roommates: null
    }
    //bindMethods([], this)
  }

  componentDidMount() {
    this.load()
  }

  load() {
    $.getJSON('./properties/Roommate/list').done(function (data) {
      if (data.roommates) {
        this.setState({roommates: data.roommates})
      } else {
        this.setState({roommates: []})
      }
    }.bind(this))
  }

  render() {
    if (this.state.roommates === null) {
      return <Waiting label="Roommates"/>
    }
    let rows = this.state.roommates.map(function (value, key) {
      return (<RoommateRow roommate={value} key={key}/>)
    })

    return (
      <div>
        <h2>Roommate listing</h2>
        <div>{rows}</div>
      </div>
    )
  }
}

RoommateList.propTypes = {}
