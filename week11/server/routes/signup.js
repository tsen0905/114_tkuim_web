const express = require('express');
const Participant = require('../repositories/participantModel');

const router = express.Router();

/**
 * POST /api/signup
 * 建立報名並回傳 _id
 */
router.post('/', async (req, res) => {
  try {
    const result = await Participant.create(req.body);
    res.status(201).json({ _id: result._id });
  } catch (err) {
    // duplicate key（email 重複）
    if (err.code === 11000) {
      return res
        .status(400)
        .json({ message: '這個 email 已經報名過了，請不要重複報名。' });
    }

    res.status(400).json({ message: err.message });
  }
});

/**
 * GET /api/signup?page=1&limit=10
 * 回傳清單 + total，含分頁
 */
router.get('/', async (req, res) => {
  try {
    const page = parseInt(req.query.page || '1', 10);
    const limit = parseInt(req.query.limit || '10', 10);

    const skip = (page - 1) * limit;

    const [data, total] = await Promise.all([
      Participant.find().sort({ createdAt: -1 }).skip(skip).limit(limit),
      Participant.countDocuments(),
    ]);

    res.json({ data, total, page, limit });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

/**
 * PATCH /api/signup/:id
 */
router.patch('/:id', async (req, res) => {
  try {
    const allowed = {};
    if (req.body.phone !== undefined) allowed.phone = req.body.phone;
    if (req.body.status !== undefined) allowed.status = req.body.status;

    const result = await Participant.findByIdAndUpdate(
      req.params.id,
      allowed,
      { new: true }
    );

    if (!result) {
      return res.status(404).json({ message: '找不到這筆報名資料' });
    }

    res.json({ message: '更新成功', data: result });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

/**
 * DELETE /api/signup/:id
 * 刪除特定報名
 */
router.delete('/:id', async (req, res) => {
  try {
    const result = await Participant.findByIdAndDelete(req.params.id);

    if (!result) {
      return res.status(404).json({ message: '找不到這筆報名資料' });
    }

    res.json({ message: '刪除成功' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;


