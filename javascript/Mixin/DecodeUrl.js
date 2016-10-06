/**
 * Adapted from http://ideasandpixels.com/get-post-variables-with-javascript
 */

class DecodeUrl {
  constructor() {
    this.url = document.location.search
    this.values = []
    this.process()
  }

  process() {
    this.url.replace(/\??(?:([^=]+)=([^&]*)&?)/g, function () {
      function decode(s) {
        return decodeURIComponent(s.split("+").join(" "))
      }

      this.values[decode(arguments[1])] = decode(arguments[2])
    }.bind(this))
  }
}

export default DecodeUrl
