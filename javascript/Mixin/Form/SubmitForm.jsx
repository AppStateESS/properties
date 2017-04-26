import React, {Component} from 'react'
import PropTypes from 'prop-types'

const SubmitForm = ({check, saving, label}) => {
  if (saving) {
    return (
      <div className="submit-form">
        <button type="button" className="btn btn-primary btn-lg">
          <i className="fa fa-cog fa-spin fa-lg"></i>&nbsp;Saving...</button>
      </div>
    )
  } else {
    return (
      <div className="submit-form">
        <button type="button" className="btn btn-primary btn-lg" onClick={check}>
          <i className="fa fa-save"></i>&nbsp;Save {label}</button>
      </div>
    )
  }
}

SubmitForm.propTypes = {
  check: PropTypes.func,
  saving: PropTypes.bool,
  label: PropTypes.string,
}

export default SubmitForm
