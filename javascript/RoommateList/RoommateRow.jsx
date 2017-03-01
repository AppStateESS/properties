'use strict'
import React from 'react'

export default class RoommateRow extends React.Component {
  constructor(props) {
    super(props)
    this.state = {}
  }

  render() {
    const {roommate} = this.props
    return (
      <div>
        <div>{roommate.move_in_date}</div>
        <div>{roommate.description}</div>
        <div>{roommate.politics}</div>
        <div>{roommate.major}</div>
        <div>{roommate.focus}</div>
        <div>{roommate.wake_time}</div>
        <div>{roommate.sleep_time}</div>
        <div>{roommate.overnighter}</div>
        <div>{roommate.free_time}</div>
        <div>{roommate.cleanliness}</div>
        <div>{roommate.loudness}</div>
        <div>{roommate.study_time}</div>
        <div>{roommate.languages}</div>
        <div>{roommate.music}</div>
        <div>{roommate.hobbies}</div>
        <div>{roommate.smoking}</div>
        <div>{roommate.pets}</div>
      </div>
    )
  }
}

RoommateRow.propTypes = {
  roommate: React.PropTypes.object
}
