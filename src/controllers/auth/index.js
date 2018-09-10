module.exports = {
  validator: {
    getAccessToken: require('./validations/getAccessToken'),
    // refreshAccessToken: require('./validations/refreshAccessToken'),
  },

  // POST
  getAccessToken: require('./modules/getAccessToken'),
  // refreshAccessToken: require('./modules/refreshAccessToken'),
};
