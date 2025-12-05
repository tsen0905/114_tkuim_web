
db.createCollection('participants');

db.participants.createIndex(
  { email: 1 },
  { unique: true }
);

