import React, {Component} from 'react'
import PropTypes from 'prop-types'

const Dollarize = ({children}) => {
  return (
    <div className="input-group">
      <span className="input-group-addon">$</span>
      {children}
      <span className="input-group-addon">.00</span>
    </div>
  )
}

Dollarize.propTypes = {
  children: PropTypes.oneOfType([PropTypes.string,PropTypes.element])
}

export default Dollarize
