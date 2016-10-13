'use strict'
import React from 'react'

export default class InputField extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      placeholder: null,
      errorMessage: null
    }
    this.handleBlur = this.handleBlur.bind(this)
  }

  componentDidMount() {
    this.setState({placeholder: this.props.placeholder, errorMessage: this.props.errorMessage})
  }

  componentWillUpdate(props, state) {
    if (props.errorMessage !== null && props.errorMessage.length > 0 && props.errorMessage !== state.errorMessage) {
      this.setState({errorMessage: props.errorMessage})
    }
  }

  handleBlur(e) {
    if (e.target.value.length === 0 && this.props.required) {
      if (this.props.label.length > 0) {
        this.setState({
          errorMessage: this.props.label + ' may not be empty'
        })
      } else {
        this.setState({errorMessage: 'Field may not be empty'})
      }
    } else {
      this.setState({errorMessage: this.props.errorMessage})
      if (this.props.blur) {
        this.props.blur()
      }
    }
  }

  render() {
    let inputClass
    if (this.state.errorMessage !== null && this.state.errorMessage.length > 0) {
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
      onChange={this.props.change}
      onBlur={this.handleBlur}
      disabled={this.props.disabled}
      size={this.props.size}
      maxLength={this.props.maxLength}
      placeholder={this.state.placeholder}
      autoComplete={this.props.autocomplete}/>)

    if (this.props.wrap) {
      input = this.props.wrap(input)
    }

    return (
      <div className="form-group">
        {this.props.label.length > 0
          ? <label htmlFor={this.props.iid}>{this.props.label} {required}</label>
          : undefined}
        {input}
        {this.state.errorMessage
          ? <div className="label label-danger">{this.state.errorMessage}</div>
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
  wrap: null
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
  wrap: React.PropTypes.func
}

export const RequiredIcon = () => {
  return <i className="fa fa-asterisk required"></i>
}
