import { body } from 'express-validator';

export const register = [
  body('email', 'Неверный формат почты').isEmail(),
  body('password', 'Пароль должен быть минимум 8 симоволов').isLength({
    min: 8,
  }),
  body('fullName', 'Укажите имя').isLength({ min: 3 }),
  body('avatarUrl', 'Неверная ссылка на аватарку').optional().isURL(),
];

export const login = [
  body('email', 'Неверный формат почты').isEmail(),
  body('password', 'Пароль должен быть минимум 8 симоволов').isLength({
    min: 8,
  }),
];

export const post = [
  body('title', 'Введите заголовок статьи').isLength({ min: 5 }).isString(),
  body('text', 'Введите текст статьи').isLength({ min: 5 }).isString(),
  body('tags', 'Неверный формат тегов').optional().isString(),
  body('imageUrl', 'Неверная ссылка на изображение').optional().isString(),
];
