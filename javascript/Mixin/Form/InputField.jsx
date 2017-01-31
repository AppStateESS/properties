'use strict'
import React from 'react'

/**
 * When using errorMessage with required, be sure to clear
 * the errorMessage prop on successful input
 */

export default class InputField extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      empty: false
    }

    this.handleBlur = this.handleBlur.bind(this)
    this.handleChange = this.handleChange.bind(this)
  }

  handleBlur(e) {
    const value = e.target.value
    if (value.length === 0) {
      this.setState({empty: true})
      if (this.props.onEmpty) {
        this.props.onEmpty()
      }
    } else {
      this.setState({empty: false})
    }
    if (this.props.blur) {
      this.props.blur()
    }
  }

  emptyMessage() {
    if (this.props.label.length > 0) {
      return this.props.label + ' may not be empty'
    } else {
      return 'Field may not be empty'
    }
  }

  select(event) {
    event.target.select()
  }

  handleChange(e) {
    const value = e.target.value
    if (value.length > 0) {
      this.setState({empty: false})
    }
    this.props.change(e)
  }

  render() {
    let inputClass
    if ((this.props.errorMessage !== null && this.props.errorMessage !== '') || (this.state.empty && this.props.required)) {
      inputClass = 'form-control error-highlight'
    } else {
      inputClass = 'form-control'
    }
    let required = this.props.required
      ? <RequiredIcon/>
      : null

    let input = (<input
      id={this.props.iid}
      type={this.props.type}
      name={this.props.name}
      value={this.props.value}
      className={inputClass}
      onChange={this.handleChange}
      onBlur={this.handleBlur}
      onClick={this.props.selectOnClick === true
      ? this.select
      : null}
      disabled={this.props.disabled}
      size={this.props.size}
      maxLength={this.props.maxLength}
      placeholder={this.props.placeholder}
      autoComplete={this.props.autocomplete}/>)

    if (this.props.wrap) {
      input = this.props.wrap(input)
    }

    let errorMessage
    if (this.props.errorMessage) {
      errorMessage = this.props.errorMessage
    } else if (this.state.empty && this.props.required) {
      errorMessage = this.emptyMessage()
    }

    return (
      <div className="form-group">
        {this.props.label.length > 0
          ? <label htmlFor={this.props.iid}>{this.props.label} {required}</label>
          : undefined}
        {input}
        {errorMessage
          ? <div className="label label-danger">{errorMessage}</div>
          : null}
      </div>
    )
  }
}

InputField.defaultProps = {
  label: '',
  type: 'text',
  name: '',
  value: '',
  change: null,
  blur: null,
  required: false,
  id: null,
  autocomplete: false,
  placeholder: null,
  errorMessage: '',
  disabled: false,
  size: null,
  maxLength: null,
  selectOnClick: true,
  wrap: null,
  onEmpty: null,
  flagEmpty: true
}

InputField.propTypes = {
  name: React.PropTypes.string,
  label: React.PropTypes.string,
  type: React.PropTypes.string,
  value: React.PropTypes.oneOfType([React.PropTypes.string, React.PropTypes.number]),
  change: React.PropTypes.func,
  blur: React.PropTypes.func,
  placeholder: React.PropTypes.string,
  errorMessage: React.PropTypes.string,
  iid: React.PropTypes.string,
  autocomplete: React.PropTypes.bool,
  required: React.PropTypes.bool,
  disabled: React.PropTypes.bool,
  size: React.PropTypes.number,
  maxLength: React.PropTypes.number,
  wrap: React.PropTypes.func,
  selectOnClick: React.PropTypes.bool,
  onEmpty: React.PropTypes.func,
  flagEmpty: React.PropTypes.bool
}

export const RequiredIcon = () => {
  return <i className="fa fa-asterisk text-danger"></i>
}
