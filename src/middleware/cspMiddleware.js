const cspMiddleware = (req, res, next) => {
    res.setHeader("Content-Security-Policy", "default-src 'self' https://cdn.ngrok.com https://www.gstatic.com 'unsafe-eval' 'unsafe-inline'");
    next();
  };
  
  module.exports = cspMiddleware;
  