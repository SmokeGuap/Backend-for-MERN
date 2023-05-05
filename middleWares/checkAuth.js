import jwt from 'jsonwebtoken';
import * as dotenv from 'dotenv';
dotenv.config();

const JWT_SECRET = process.env.JWT_SECRET;
export default (req, res, next) => {
  const token = (req.headers.authorization || '').replace(/Bearer\s?/, '');
  if (token != 'null') {
    try {
      const decoded = jwt.verify(token, JWT_SECRET);
      req.userId = decoded._id;
      next();
    } catch {
      return res.status(403).json({
        message: 'Не удалось верифицировать токен',
      });
    }
  } else {
    return res.status(204).json({
      message: 'Нет токена',
      token,
    });
  }
};
