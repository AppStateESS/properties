export default function setIfDefined(value, varname, defaultVar=null, forceval=null) {
  if (forceval !== null) {
    if (defaultVar !== null) {
      return (value[varname] !== undefined) ? forceval : defaultVar
    } else {
      return (value[varname] !== undefined) ? forceval : undefined
    }
  } else {
    if (defaultVar !== null) {
      return (value[varname] !== undefined) ? value[varname] : defaultVar
    } else {
      return (value[varname] !== undefined) ? value[varname] : undefined
    }
  }
}
