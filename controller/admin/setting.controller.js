module.exports.list = async (req, res) => {
  res.render('admin/pages/setting-list', {
    pageTitle: "Cài đặt chung"
  })
}

module.exports.websiteInfo = async (req, res) => {
  res.render('admin/pages/setting-website-info', {
    pageTitle: "Thông tin website"
  })
}

module.exports.accountAdminList = async (req, res) => {
  res.render('admin/pages/setting-account-admin-list', {
    pageTitle: "Tài khoản quản trị"
  })
}

module.exports.accountAdminCreate = async (req, res) => {
  res.render('admin/pages/setting-account-admin-create.pug', {
    pageTitle: "Tài khoản quản trị"
  })
}