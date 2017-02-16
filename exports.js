exports.path = require('path')
exports.APP_DIR = exports.path.resolve(__dirname, 'javascript')

exports.entry = {
  manager: exports.APP_DIR + '/Manager/index.jsx',
  property: exports.APP_DIR + '/Property/index.jsx',
  propertyform: exports.APP_DIR + '/PropertyForm/index.jsx',
  propertyimage: exports.APP_DIR + '/PropertyImage/index.jsx',
  photo: exports.APP_DIR + '/Photo/index.jsx',
  managersignup: exports.APP_DIR + '/ManagerSignup/index.jsx',
  managerapproval: exports.APP_DIR + '/ManagerApproval/index.jsx',
  managersignin: exports.APP_DIR + '/ManagerSignin/index.jsx',
  managerdesktop: exports.APP_DIR + '/ManagerDesktop/index.jsx',
  sublease: exports.APP_DIR + '/Sublease/index.jsx',
  subleaseform: exports.APP_DIR + '/SubleaseForm/index.jsx',
  manageredit: exports.APP_DIR + '/ManagerEdit/index.jsx',
  vendor: ['react', 'react-dom']
}
