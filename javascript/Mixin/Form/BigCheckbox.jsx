'use strict'
import React from 'react'
import PropTypes from 'prop-types'

const BigCheckbox = ({handle, checked, label,}) => {

  const handleIt = () => {
    handle(empty(checked))
  }

  if (typeof checked == 'boolean') {
    checked = checked ? 1 : 0
  }

  const checkBox = (
    <span className={parseInt(checked) == 1
        ? 'd-inline'
        : 'd-none'}>
      <i className="fas fa-2x fa-check-square mr-1 text-success"></i>
    </span>
  )
  const uncheckBox = (
    <span className={parseInt(checked) == 1
        ? 'd-none'
        : 'd-inline'}>
      <i className="far fa-2x fa-square mr-1 text-muted"></i>
    </span>
  )

  return (
    <div onClick={handleIt} className="pointer d-flex align-items-center">
      {checkBox}{uncheckBox}
      <span
        className={!empty(checked)
          ? 'text-success'
          : 'text-muted'}>{label}</span>
    </div>
  )
}

const empty = (value) => {
  return (value === undefined || value === null || value === 0 || value === '0' || value.length === 0 || value === false)
}


BigCheckbox.propTypes = {
  label: PropTypes.string,
  checked: PropTypes.oneOfType(
    [PropTypes.bool, PropTypes.string, PropTypes.number,]
  ),
  handle: PropTypes.func.isRequired
}

BigCheckbox.defaultProps = {
  checked: false
}

export default BigCheckbox
