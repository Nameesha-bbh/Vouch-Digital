const jwt = require('jsonwebtoken');

const verifyToken = async (token) => {
    try {
      const payload = jwt.verify(token, process.env.APP_KEY);
    } catch (e) {
      return e;
    }
};

module.exports = {
    verifyToken
}