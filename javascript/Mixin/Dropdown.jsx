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
    return (
      <div className="dropdown">
        <button
          className="btn btn-default dropdown-toggle"
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
  icon: React.PropTypes.element,
  options: React.PropTypes.array,
  handleClick: React.PropTypes.func
}

export default Dropdown
