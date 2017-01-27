'use strict'
import React from 'react'

/* global $ */

export default class Help extends React.Component {
  constructor(props) {
    super(props)
  }

  componentDidMount() {
    $('.help').tooltip()
  }

  render() {
    return (
      <i
        className="fa fa-question-circle text-primary help pointer"
        data-toggle="tooltip"
        data-placement={this.props.placement}
        title={this.props.title}></i>
    )
  }
}

Help.propTypes = {
  placement: React.PropTypes.string,
  title: React.PropTypes.string.isRequired
}

Help.defaultProps = {
  placement: 'right'
}
