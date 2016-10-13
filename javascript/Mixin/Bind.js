export default function bindMethods(bindable, object) {
  bindable.map(function (v) {
    object[v] = this[v].bind(object)
  }.bind(object))
}
