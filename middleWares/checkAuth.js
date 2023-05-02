import jwt from 'jsonwebtoken';
import * as dotenv from 'dotenv';
dotenv.config();

const JWT_SECRET = process.env.JWT_SECRET;
export default (req, res, next) => {
  const token = (req.headers.authorization || '').replace(/Bearer\s?/, '');
  if (token) {
    try {
      const decoded = jwt.verify(token, JWT_SECRET);
      req.userId = decoded._id;
      next();
    } catch {
      return res.status(403).json({
        message: 'Нет доступа',
      });
    }
  } else {
    return res.status(403).json({
      message: 'Нет доступа',
      token,
    });
  }
};
