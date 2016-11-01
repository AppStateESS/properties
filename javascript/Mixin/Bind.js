export default function bindMethods(bindable, object) {
  bindable.map(function (v) {
    if (object[v] === undefined) {
      throw new Error(`Cannot bind undefined method: ${v}`)
    }
    object[v] = this[v].bind(object)
  }.bind(object))
}
