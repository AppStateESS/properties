'use strict'
import React from 'react'
import empty from '../Mixin/Helper/Empty.js'

export default class RoommateRow extends React.Component {
  constructor(props) {
    super(props)
    this.state = {}
  }

  paragraphIfNotEmpty(value, label = null) {
    if (empty(value)) {
      return null
    } else {
      return <div>
        <strong>{label}</strong>{value}</div>
    }
  }

  render() {
    const {roommate} = this.props
    const para = this.paragraphIfNotEmpty
    let {description} = roommate
    if (description.length > 50) {
      description = description.substring(0, 50) + '...'
    }

    return (
      <div className="panel panel-default">
        <div className="panel-body">
          <div className="row">
            <div className="col-sm-4">
              <div>
                <strong>Move in:</strong>&nbsp;
                {roommate.move_in_date}</div>
              <div>
                <strong>Created:</strong>&nbsp;
                {roommate.created}</div>
              {para(description, 'Description: ')}
            </div>
            <div className="col-sm-4">{para(roommate.major, 'Major: ')}{para(roommate.study_time, 'Study time: ')}{para(roommate.focus, 'Focus: ')}</div>
            <div className="col-sm-4">{para(roommate.free_time, 'Free time: ')}{para(roommate.music, 'Music: ')}{para(roommate.hobbies, 'Hobbies: ')}</div>
          </div>
        </div>
        <div className="panel-footer text-center">
          <a className="btn btn-primary" href={`./properties/Roommate/${roommate.id}`}>Full details</a>
        </div>
      </div>
    )
  }
}

RoommateRow.propTypes = {
  roommate: React.PropTypes.object
}
