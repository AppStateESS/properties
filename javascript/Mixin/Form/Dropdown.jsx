import React, {Component} from 'react'
import PropTypes from 'prop-types'

class Dropdown extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    let options = null
    let optionList = null
    if (this.props.options !== null) {
      options = this.props.options.map(function (value, key) {
        let navClass = 'nav-link pointer'
        if (value.hidden) {
          navClass = navClass.concat(' d-none')
        }
        if (value.divider !== undefined && value.divider === true) {
          return <hr key={key}/>
        }
        if (value.link !== null) {
          return <a key={key} onClick={value.handleClick} className={navClass} href={value.link}>{value.icon} {value.label}</a>
        } else {
          return <a key={key} onClick={value.handleClick} className={navClass}>{value.icon} {value.label}</a>
        }
      })
      optionList = <div className="dropdown-menu">{options}</div>
    } else {
      optionList = null
    }
    let buttonClass = 'btn btn-outline-dark dropdown-toggle'
    if (this.props.color) {
      buttonClass = `btn btn-${this.props.color} dropdown-toggle`
    }

    if (this.props.small) {
      buttonClass = buttonClass.concat(' btn-sm')
    }


    return (
      <div className="dropdown">
        <button
          className={buttonClass}
          type="button"
          data-toggle="dropdown"
          aria-haspopup="true"
          aria-expanded="true">
          {this.props.label}&nbsp;
          <span className="caret"></span>
        </button>
        {optionList}
      </div>
    )
  }
}

Dropdown.propTypes = {
  label: PropTypes.string,
  options: PropTypes.array,
  small: PropTypes.bool,
  color: PropTypes.string,
  hidden: PropTypes.bool
}

Dropdown.defaultProps = {
  small: false,
  color: null,
  hidden: false
}

export default Dropdown
