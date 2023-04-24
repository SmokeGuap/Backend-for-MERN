import { validationResult } from 'express-validator';
import Post from '../models/Post.js';

export const getAll = async (req, res) => {
  try {
    const posts = await Post.find().populate('author');
    res.json(posts);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: 'Не удалось получить статьи' });
  }
};

export const getOne = async (req, res) => {
  try {
    const postId = req.params.id;
    const post = await Post.findByIdAndUpdate(
      { _id: postId },
      { $inc: { viewCount: 1 } },
      { returnDocument: 'after' }
    );
    if (!post) {
      return res.status(404).json({ message: 'Такой статьи не существует' });
    }
    res.json(post);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: 'Не удалось получить статью' });
  }
};

export const remove = async (req, res) => {
  try {
    const postId = req.params.id;
    const post = await Post.findByIdAndRemove({ _id: postId });
    if (!post) {
      return res.status(404).json({ message: 'Такой статьи не существует' });
    }
    res.json({ success: true });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: 'Не удалось удалить статью' });
  }
};

export const create = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json(errors.array());
    }
    const doc = new Post({
      title: req.body.title,
      text: req.body.text,
      imageUrl: req.body.imageUrl,
      tags: req.body.tags,
      author: req.userId,
    });
    console.log(doc);
    const post = await doc.save();
    res.json(post);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: 'Не удалось создать статью' });
  }
};

export const update = async (req, res) => {
  try {
    const postId = req.params.id;
    const post = await Post.updateOne(
      { _id: postId },
      {
        title: req.body.title,
        text: req.body.text,
        imageUrl: req.body.imageUrl,
        tags: req.body.tags,
        author: req.userId,
      }
    );
    if (!post) {
      return res.status(404).json({ message: 'Такой статьи не существует' });
    }
    res.json({ success: true });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: 'Не удалось обновить статью' });
  }
};