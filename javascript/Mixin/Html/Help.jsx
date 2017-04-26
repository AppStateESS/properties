'use strict'
import React, {Component} from 'react'
import PropTypes from 'prop-types'
import ReactTooltip from 'react-tooltip'

export default class Help extends Component {
  constructor(props) {
    super(props)
  }

  componentDidMount() {
  }

  render() {
    return (
      <span>
      <i
        className="fa fa-question-circle text-primary help pointer"
        data-tip={this.props.title}
        data-placement={this.props.placement}></i>
        <ReactTooltip type="info" />
      </span>
    )
  }
}

Help.propTypes = {
  placement: PropTypes.string,
  title: PropTypes.string.isRequired
}

Help.defaultProps = {
  placement: 'right'
}
