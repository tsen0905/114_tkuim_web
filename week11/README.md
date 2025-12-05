## CRUD 說明
CRUD 指的是建立（Create）、讀取（Read）、更新（Update）、刪除（Delete）四種資料操作，是後端系統最基本的資料管理流程。本報名系統透過 POST、GET、PATCH、DELETE API 完成上述功能。

---

## 啟動指令

### 一、啟動 MongoDB（Docker Compose）
進入 docker 資料夾：

cd docker
docker compose up -d

確認 MongoDB 是否成功啟動：
docker ps

看到 `mongo-week11` 表示成功。

---

### 二、啟動後端 API（Node.js）
進入 server 資料夾：

cd server
npm install
npm run dev


成功會顯示：
MongoDB connected
Server running on http://localhost:3000

---

## .env 設定（必要）
將 `.env` 放在 `server/` 資料夾：

MONGO_URI=mongodb://root:rootpassword@localhost:27017/week11db?authSource=admin
PORT=3000

`.env.example` 範例：

MONGO_URI=
PORT=

---

## API 測試方式（VSCode REST Client）
本專案使用 VSCode 的 **REST Client** 進行 API 測試。  
指令示範位於 `tests/api.http`。

### 1. 建立報名資料（POST）

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

---

### 2. 查詢報名資料（GET，含分頁）

GET http://localhost:3000/api/signup?page=1&limit=5

---

### 3. 更新資料（PATCH）

PATCH http://localhost:3000/api/signup/你的_id
Content-Type: application/json

{
"phone": "0912345678",
"status": "confirmed"
}

---

### 4. 刪除資料（DELETE）

DELETE http://localhost:3000/api/signup/你的_id


---

## Mongo Shell 指令

連線至 MongoDB：

docker exec -it mongo-week11 mongosh -u root -p rootpassword

切換資料庫：

use week11db


查詢集合：

db.participants.find().pretty()

清空集合：

db.participants.deleteMany({})


---

## 常見問題 FAQ

### 1. API 無法連線 MongoDB  
確認 Docker 是否啟動：

docker ps

若未啟動：

docker compose up -d

---

### 2. .env 無作用  
請確認：
- `.env` 位於 `server/`
- `app.js` 頂端有 `dotenv.config()`

---

### 3. duplicate key error  
原因：email 重複，不符合唯一索引。  
請使用新的 email 測試。

---

### 4. PATCH 或 DELETE 顯示 "Cast to ObjectId failed"  
通常是 id 格式錯誤。  
請先用 GET 查出正確 `_id`。

---

### 5. Mongo URI 錯誤  
請使用：

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

