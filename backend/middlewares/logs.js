const logger = (req, res, next) => {
  console.log(`[${new Date().toISOString()}] ${req.ip} ${req.method} ${req.originalUrl}`);
  next();
};

module.exports = logger;

// toISOString pone la fecha así: YYYY-MM-DDTHH:mm:ss.sssZ