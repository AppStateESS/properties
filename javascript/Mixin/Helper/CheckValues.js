class CheckValues {
  static isEmpty(value) {
    return value === '' || value === null || value === undefined
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

  static isUrl(value, httpRequired=false)
  {
    if (httpRequired) {
      return value.match(/https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/)
    } else {
      return value.match(/[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/)
    }
  }

  static randomId() {
    return (Math.random().toString(36) + '00000000000000000').slice(2, 10)
  }
}

export default CheckValues
