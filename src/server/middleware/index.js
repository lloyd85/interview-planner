import config from '../config';
import jwt from 'jsonwebtoken';

export const isAuthenticated = async (req, res, next) => {
  const authHeader = req.headers.authorization;
  const token = authHeader ? authHeader.split(' ')[1] : null;

  if (process.env.NODE_ENV === 'testing') {
    return next();
  }

  try {
    if (!token) {
      return res.status(403).json({ error: new Error('No token provided') });
    }
    req.currentUser = await jwt.verify(token, config.jwtSecret);
    next();
  } catch (error) {
    return res.status(401).json({ error: 'Failed to authenticated' });
  }
};
