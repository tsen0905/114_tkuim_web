＊啟動指令
1. 啟動 MongoDB
進入 docker 資料夾：
cd docker
docker compose up -d
確認 MongoDB 是否成功啟動：docker ps
看到 mongo-week11表示成功。

2. 啟動後端 API
進入 server 資料夾：
cd server
npm install
npm run dev
成功會看到：
MongoDB connected
Server running on http://localhost:3000

3. .env 設定（必要）
請將 .env 放在 server/ 資料夾底下：
MONGO_URI=mongodb://root:rootpassword@localhost:27017/week11db?authSource=admin
PORT=3000
.env.example 可提供空白欄位：
MONGO_URI=
PORT=

＊API 測試方式（VSCode REST Client）
使用 VSCode 套件 REST Client
以下為測試指令在 tests/api.http 中的示範：

1. 建立報名資料（POST）
POST http://localhost:3000/api/signup
Content-Type: application/json

{
  "name": "Test User",
  "email": "test@example.com",
  "phone": "0987654321",
  "status": "pending"
}

成功回傳：
{
  "_id": "6932dfa9a5a018edf2363c34"
}

2. 查詢報名資料（GET，含分頁）
GET http://localhost:3000/api/signup?page=1&limit=5

3. 更新資料（PATCH）
PATCH http://localhost:3000/api/signup/你的_id
Content-Type: application/json

{
  "phone": "0912345678",
  "status": "confirmed"
}

4. 刪除資料（DELETE）
DELETE http://localhost:3000/api/signup/你的_id
Mongo Shell 指令
連線至 MongoDB：
docker exec -it mongo-week11 mongosh -u root -p rootpassword
切換資料庫：
use week11db

查詢集合內容：
db.participants.find().pretty()

清空集合：
db.participants.deleteMany({})

＊常見問題 FAQ
1. API 無法連線 MongoDB
確認Docker是否啟動：docker ps
如未啟動：docker compose up -d

2. .env 沒有作用
請確認：.env 放在 server 資料夾
已在 app.js 最上方加入 dotenv.config()

3. 出現 duplicate key error
表示email已註冊過，此行為符合唯一索引設計。
換新的 email 測試。
4. PATCH 或 DELETE 出現 "Cast to ObjectId failed"
可能使用錯誤的 id 先用GET查詢正確id再測試。

5. Mongo URI 錯誤
使用以下格式：mongodb://root:rootpassword@localhost:27017/week11db?authSource=admin

*MongoDB Compass 截圖
![](image.png) 

*docker ps、mongosh 查詢結果、API 測試成功畫面。
![](A59FB66D-719A-4361-9EA3-1E9E493D3EA3.jpeg)
![alt text](A4290553-3701-466E-9B92-40B00320EF21.jpeg)
![alt text](BEFF64AD-1E60-4663-8989-0186FFFF62AE.jpeg)
![alt text](D2D041CE-343D-48C4-A204-29087EABA55D.jpeg)
![](34FDBEBA-2FEC-4033-97E4-A1EA1BD00706.jpeg)
![alt text](4104D413-7789-4540-AF1F-A3D835DF6D6A.jpeg)
![alt text](020446E0-B848-4BCC-8392-B58610C42BF5.jpeg)
![alt text](970EC898-778F-4F19-B113-862CE84579DB.jpeg)
![alt text](4461FA68-6EEA-40D7-A9D6-B2E2F3B66D8B.jpeg)

