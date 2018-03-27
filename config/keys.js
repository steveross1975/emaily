if (process.env.NODE_ENV === 'production') {
  //Production Environment: return the production keys
  module.exports = require('./prod');
} else {
  //Development Environment: return the development keys
  module.exports = require('./dev');
}
