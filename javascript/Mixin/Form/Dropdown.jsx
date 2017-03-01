import React from 'react'

class Dropdown extends React.Component {
  constructor(props) {
    super(props)
  }

  render() {
    let options = null
    let label = null
    let optionList = null
    if (this.props.options !== null) {
      options = this.props.options.map(function(value, key){
        if (value.divider !== undefined && value.divider === true) {
          return <hr key={key}/>
        }
        if (value.link !== null) {
          label = <a href={value.link}>{value.icon} {value.label}</a>
        } else {
          label = <a>{value.icon}{value.label}</a>
        }
        return <li onClick={value.handleClick} key={key} role="button">{label}</li>
      })
      optionList = <ul className="dropdown-menu">{options}</ul>
    } else {
      optionList = null
    }
    let buttonClass = 'btn btn-default dropdown-toggle'
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
  label: React.PropTypes.string,
  options: React.PropTypes.array,
  small: React.PropTypes.bool
}

Dropdown.defaultProps = {
  small : false
}

export default Dropdown
