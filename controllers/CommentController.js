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
  
//   export const getLastTags = async (req, res) => {
//     try {
//       const posts = await Post.find()
//         .populate({
//           path: 'author',
//           select: ['fullName', 'avatarUrl', 'createdAt'],
//         })
//         .limit(5);
  
//       const tags = posts.map((item) => item.tags).flat();
  
//       const uniqTags = tags.reduce((acc, item) => {
//         if (acc.includes(item)) {
//           return acc;
//         }
//         return [...acc, item];
//       }, []);
//       res.json(uniqTags.slice(0, 5));
//     } catch (error) {
//       console.log(error);
//       res.status(500).json({ message: 'Не удалось получить статьи' });
//     }
//   };
  
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
  
//   export const remove = async (req, res) => {
//     try {
//       const postId = req.params.id;
//       const post = await Post.findByIdAndRemove({ _id: postId });
//       if (!post) {
//         return res.status(404).json({ message: 'Такой статьи не существует' });
//       }
//       res.json({ success: true });
//     } catch (error) {
//       console.log(error);
//       res.status(500).json({ message: 'Не удалось удалить статью' });
//     }
//   };
  
  export const create = async (req, res) => {
    try {
      const doc = new Comment({
        text: req.body.text,
        author: req.userId,
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