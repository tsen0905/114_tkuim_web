const express = require('express');
const Participant = require('../repositories/participantModel');
const router = express.Router();

// POST /api/signup
router.post('/', async (req, res) => {
  try {
    const result = await Participant.create(req.body);
    res.json({ _id: result._id });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// GET /api/signup?page=1&limit=10
router.get('/', async (req, res) => {
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 10;

  const skip = (page - 1) * limit;

  const data = await Participant.find().skip(skip).limit(limit);
  const total = await Participant.countDocuments();

  res.json({ data, total, page, limit });
});

// PATCH /api/signup/:id
router.patch('/:id', async (req, res) => {
  try {
    const result = await Participant.findByIdAndUpdate(req.params.id, req.body, { new: true });

    if (!result) return res.status(404).json({ message: '找不到資料' });

    res.json({ message: '更新成功', data: result });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// DELETE /api/signup/:id
router.delete('/:id', async (req, res) => {
  try {
    const result = await Participant.findByIdAndDelete(req.params.id);

    if (!result) return res.status(404).json({ message: '找不到資料' });

    res.json({ message: '刪除成功' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;


