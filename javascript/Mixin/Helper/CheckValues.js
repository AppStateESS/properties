class CheckValues {
  static isEmpty(value) {
    return value === '' || value === null || typeof value === undefined
  }

  static isEmail(value) {
    if (this.isEmpty(value)) {
      return false
    }
    return value.match(/^[\w.%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/i)
  }

  static isPhone(value) {
    if (this.isEmpty(value)) {
      return false
    }
    return (value.replace(/[^\d]/g, '').length == 10)
  }

  static randomId() {
    return (Math.random().toString(36) + '00000000000000000').slice(2, 10)
  }
}

export default CheckValues
