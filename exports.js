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
  subleasephoto: exports.APP_DIR + '/SubleasePhoto/index.jsx',
  subleaseimage: exports.APP_DIR + '/SubleaseImage/index.jsx',
  manageredit: exports.APP_DIR + '/ManagerEdit/index.jsx',
  roommatelist: exports.APP_DIR + '/RoommateList/index.jsx',
  roommateform: exports.APP_DIR + '/RoommateForm/index.jsx',
  settings: exports.APP_DIR + '/Settings/index.jsx',
  reports: exports.APP_DIR+ '/Reports/index.jsx',
  passwordchange: exports.APP_DIR + '/PasswordChange/index.jsx',
  banuser: exports.APP_DIR +  '/BanUser/index.jsx',
  propertydelete: exports.APP_DIR + '/PropertyDelete/index.jsx',
  managerpasswordchange : exports.APP_DIR + '/ManagerPasswordChange/index.jsx',
  vendor: ['react', 'react-dom']
}
