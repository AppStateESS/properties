import React from 'react'

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
  children: React.PropTypes.oneOfType([React.PropTypes.string,React.PropTypes.element])
}

export default Dollarize
