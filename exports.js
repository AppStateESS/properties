exports.path = require('path')
exports.APP_DIR = exports.path.resolve(__dirname, 'javascript')

exports.entry = {
  manager: exports.APP_DIR + '/Manager/index.jsx',
  property: exports.APP_DIR + '/Property/index.jsx',
  propertyform: exports.APP_DIR + '/PropertyForm/index.jsx'
}
