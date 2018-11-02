// auth controller

const jwt = require('jsonwebtoken');

exports.validJWTNeeded = (req, res, next) => {
  if (req.headers['authorization']) {
    try {
        if (!req.token) {
            return res.status(401).send();
        } else {
          req.jwt = jwt.verify(req.token, process.env.TOKEN_SECRET);
          return next();
        }
    } catch (err) {
      console.error(err);
        return res.status(403).send();
    }
  } else {
    return res.status(401).send();
  }
};
