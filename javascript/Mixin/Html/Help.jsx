'use strict'
import React, {Component} from 'react'
import PropTypes from 'prop-types'
import ReactTooltip from 'react-tooltip'

export default class Help extends Component {
  constructor(props) {
    super(props)
  }

  componentDidMount() {}

  render() {
    return (
      <span data-tip={this.props.title} data-placement={this.props.placement} className={this.props.classes}>
        <i className="fas fa-question-circle text-info help pointer"></i>
        <ReactTooltip type="info"/>
      </span>
    )
  }
}

Help.propTypes = {
  placement: PropTypes.string,
  title: PropTypes.string.isRequired,
  classes: PropTypes.string,
}

Help.defaultProps = {
  placement: 'right',
  classes : ''
}
