module.exports = (err, req, res, next) => {
  res.status(500).json({
    message: 'Sorry! Something went wrong. Please try again later.'
  });
}
