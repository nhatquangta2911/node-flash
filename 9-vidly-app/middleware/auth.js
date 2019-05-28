const jwt = require('jsonwebtoken');
const config = require('config');

module.exports = (req, res, next) => {
   const token = req.header('x-auth-token');
   if(!token) return res.status(401).send('Access denied. No token provided.');
   //TODO: return a payload
   try {
      const decodedPayload = jwt.verify(token, config.get('jwtPrivateKey'));
      req.user = decodedPayload;
      next();
   } catch(ex) {
      res.status(400).send('Invalid Token.');
   }
}
 