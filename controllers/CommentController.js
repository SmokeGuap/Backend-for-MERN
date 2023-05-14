import Comment from '../models/Comment.js';

export const getAll = async (req, res) => {
  try {
    const comments = await Comment.find().populate({
      path: 'author',
      select: ['fullName', 'avatarUrl'],
    });
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

//   export const getOne = async (req, res) => {
//     try {
//       const postId = req.params.id;
//       const post = await Post.findByIdAndUpdate(
//         { _id: postId },
//         { $inc: { viewCount: 1 } },
//         { returnDocument: 'after' }
//       ).populate({
//         path: 'author',
//         select: ['fullName', 'avatarUrl', 'createdAt'],
//       });
//       if (!post) {
//         return res.status(404).json({ message: 'Такой статьи не существует' });
//       }
//       res.json(post);
//     } catch (error) {
//       console.log(error);
//       res.status(500).json({ message: 'Не удалось получить статью' });
//     }
//   };

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

//   export const update = async (req, res) => {
//     try {
//       const postId = req.params.id;
//       const post = await Post.updateOne(
//         { _id: postId },
//         {
//           title: req.body.title,
//           text: req.body.text,
//           imageUrl: req.body.imageUrl,
//           tags: req.body.tags.split(' '),
//           author: req.userId,
//         }
//       );
//       if (!post) {
//         return res.status(404).json({ message: 'Такой статьи не существует' });
//       }
//       res.json({ success: true });
//     } catch (error) {
//       console.log(error);
//       res.status(500).json({ message: 'Не удалось обновить статью' });
//     }
//   };
