import express from "express";
const router = express.Router();

// 暫存資料（不用加分項目 → 存記憶體即可）
const signupList = [];

// 驗證類別
function validateSignup(data) {
  if (!data.name) return "姓名必填";
  if (!data.email || !data.email.includes("@")) return "Email 格式錯誤";
  if (!data.phone || !/^\d{10}$/.test(data.phone)) return "手機格式錯誤（10位數字）";
  if (!data.password || data.password.length < 8)
    return "密碼至少 8 碼";
  if (data.password !== data.confirmPassword)
    return "密碼與確認密碼不一致";

  return null; // 驗證通過
}

// POST /api/signup
router.post("/", (req, res) => {
  console.log("後端收到：", req.body);

  const error = validateSignup(req.body);
  if (error) {
    return res.status(400).json({ success: false, message: error });
  }

  const newUser = {
    name: req.body.name,
    email: req.body.email,
    phone: req.body.phone
  };

  signupList.push(newUser);

  res.json({
    success: true,
    message: "報名成功！",
    data: newUser
  });
});

// GET /api/signup
router.get("/", (req, res) => {
  res.json({
    total: signupList.length,
    list: signupList
  });
});

export default router;
