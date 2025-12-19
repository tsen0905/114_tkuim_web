import { test, expect } from 'vitest';
import request from 'supertest';
import app from '../src/app.js';

let adminToken;
let studentToken;
let studentDataId;

test(
  '完整流程',
  async () => {
    // 建立 admin
    await request(app).post('/auth/signup').send({
      username: 'admin',
      password: '123456',
      role: 'admin',
    });

    // 建立 student
    await request(app).post('/auth/signup').send({
      username: 'student',
      password: '123456',
      role: 'student',
    });

    // admin login
    const adminLogin = await request(app).post('/auth/login').send({
      username: 'admin',
      password: '123456',
    });
    adminToken = adminLogin.body.token;
    expect(adminToken).toBeDefined();

    // student login
    const studentLogin = await request(app).post('/auth/login').send({
      username: 'student',
      password: '123456',
    });
    studentToken = studentLogin.body.token;
    expect(studentToken).toBeDefined();

    // student 新增資料
    const create = await request(app)
      .post('/api/signup')
      .set('Authorization', `Bearer ${studentToken}`)
      .send({ name: 'student data' });

    expect(create.status).toBe(201);
    studentDataId = create.body._id;
    expect(studentDataId).toBeDefined();

    // admin 刪除 student 資料
    const del = await request(app)
      .delete(`/api/signup/${studentDataId}`)
      .set('Authorization', `Bearer ${adminToken}`);

    expect(del.status).toBe(200);
  },
  15000 // 給充裕時間，但實際會很快結束
);


