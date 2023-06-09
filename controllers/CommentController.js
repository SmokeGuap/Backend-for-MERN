import Comment from '../models/Comment.js';

export const getLastComments = async (req, res) => {
  try {
    const comments = await Comment.find()
      .populate({
        path: 'author',
        select: ['fullName', 'avatarUrl'],
      })
      .limit(5);
    res.json(comments.reverse());
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: 'Не удалось получить комментарии' });
  }
};

export const getCommentsByPost = async (req, res) => {
  try {
    const postId = req.params.id;
    const comments = await Comment.find({ post: postId }).populate({
      path: 'author',
      select: ['fullName', 'avatarUrl'],
    });
    res.json(comments.reverse());
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: 'Не удалось получить комментарии' });
  }
};

export const remove = async (req, res) => {
  try {
    const commentId = req.params.id;
    const comment = await Comment.findByIdAndRemove({ _id: commentId });
    if (!comment) {
      return res
        .status(404)
        .json({ message: 'Такого комментария не существует' });
    }
    res.json({ success: true });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: 'Не удалось удалить комментарий' });
  }
};

export const create = async (req, res) => {
  try {
    const postId = req.params.id;
    const doc = new Comment({
      text: req.body.text,
      author: req.userId,
      post: postId,
    });
    const comment = await doc.save();
    res.json(comment);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: 'Не удалось создать комментарий' });
  }
};

export const update = async (req, res) => {
  try {
    const commentId = req.params.id;
    const comment = await Comment.updateOne(
      { _id: commentId },
      {
        text: req.body.text,
      }
    );
    if (!comment) {
      return res
        .status(404)
        .json({ message: 'Такого комментария не существует' });
    }
    res.json({ success: true });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: 'Не удалось обновить комментарий' });
  }
};
