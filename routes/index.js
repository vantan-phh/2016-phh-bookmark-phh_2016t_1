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
<<<<<<< 17e0bff53d5f937f6c530e61554198a706450ccb
  iconfile: require('./icon'),
  members: require('./org/members')
=======
  entry: require('./entry')
>>>>>>> entry を開くところまで
};

module.exports = routes;
