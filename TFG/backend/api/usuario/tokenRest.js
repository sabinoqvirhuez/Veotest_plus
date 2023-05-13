const jwt = require ('jsonwebtoken');
function verifyToken(req, res, next) {
  try {
    const token = req.get('token').split(' ')[1];
    const decodedToken = jwt.verify(token, 'secretKey');
    req.userId = decodedToken.id;
    next();
  } catch {
    res.status(401).send('Unauthorized Request');
  }
}

exports.verifyToken=verifyToken;
