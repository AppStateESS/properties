import React from 'react'
import PropTypes from 'prop-types'

const Dollarize = ({children}) => {
  return (
    <div className="input-group">
      <div className="input-group-prepend">
        <div className="input-group-text">$</div>
      </div>
      {children}
      <div className="input-group-append">
        <div className="input-group-text">.00</div>
      </div>
    </div>
  )
}

Dollarize.propTypes = {
  children: PropTypes.oneOfType([PropTypes.string,PropTypes.element])
}

export default Dollarize
