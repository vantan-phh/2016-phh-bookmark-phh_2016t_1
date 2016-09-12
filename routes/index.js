var routes = {
  top: require('./top'),
  register: require('./register'),
  login: require('./login'),
  create: require('./create'),
  contents: require('./contents'),
  setting: require('./setting'),
  delete: require('./delete'),
  createorg: require('./createorg'),
  org: require('./org/org'),
  search: require('./search'),
  searchResult: require('./searchResult'),
  icon: require('./setting/icon'),
  iconfile: require('./icon'),
  members: require('./org/members'),
  orglist: require('./orglist'),
};

module.exports = routes;
