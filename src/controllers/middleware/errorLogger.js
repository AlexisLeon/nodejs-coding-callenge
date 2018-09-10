module.exports = (err, req, res, next) => {
  // TODO: Log errors to errors.log
  // TODO: Use logger like winston

  console.error(`${err.name}: ${err.message || ''}`, JSON.stringify(err, 0, 2));
  // console.error(err);

  next(err);
};
