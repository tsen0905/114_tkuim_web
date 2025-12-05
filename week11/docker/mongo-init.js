// 這個檔在容器啟動時自動執行，建立集合跟唯一索引
db.createCollection('participants');

db.participants.createIndex(
  { email: 1 },
  { unique: true }
);

