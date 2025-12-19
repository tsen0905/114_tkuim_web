import express from 'express';
import Signup from '../models/Signup.js';
import { auth } from '../middleware/auth.js';

const router = express.Router();

// GET
router.get('/', auth, async (req, res) => {
  const query =
    req.user.role === 'admin'
      ? {}
      : { ownerId: req.user.id };

  res.json(await Signup.find(query));
});

// POST
router.post('/', auth, async (req, res) => {
  const item = await Signup.create({
    name: req.body.name,
    ownerId: req.user.id
  });
  res.status(201).json(item);
});

// DELETE
router.delete('/:id', auth, async (req, res) => {
  const item = await Signup.findById(req.params.id);

  if (
    req.user.role !== 'admin' &&
    item.ownerId.toString() !== req.user.id
  ) {
    return res.status(403).json({ msg: '權限不足' });
  }

  await item.deleteOne();
  res.json({ msg: '刪除成功' });
});

export default router;
