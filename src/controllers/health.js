const { db } = require(`${__app}/init/db`);

/**
 * Get service health
 * @route GET /health
 *
 * @return {Response}
 */
module.exports = function (req, res) {
  const services = {
    db: db.readyState === 1,
  };

  if (services.db) {
    console.log('Connection has been established successfully.');
  } else {
    console.error('Unable to connect to database');
  }

  return res.json(services)
};
