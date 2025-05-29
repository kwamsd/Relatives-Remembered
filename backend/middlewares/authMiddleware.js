const jwt = require('jsonwebtoken');
require('dotenv').config();

exports.protect = (req, res, next) => {
  let token;

  // 1) Récupère le token soit dans l'en-tête Authorization, soit dans le cookie 'token'
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer ')
  ) {
    token = req.headers.authorization.split(' ')[1];
  } else if (req.cookies && req.cookies.token) {
    token = req.cookies.token;
  }

  // 2) Si pas de token, on refuse l’accès
  if (!token) {
    return res.status(401).json({ error: 'Non autorisé, token manquant' });
  }

  // 3) Vérification et décodage
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    // tu peux adapter decoded selon ce que tu mets dans le payload
    req.user = { id: decoded.userId, mail: decoded.mail };
    next();
  } catch (err) {
    return res.status(401).json({ error: 'Token invalide' });
  }
};