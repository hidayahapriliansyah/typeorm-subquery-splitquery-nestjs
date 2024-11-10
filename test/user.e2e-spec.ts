import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from './../src/app.module';

const oneMinuteInMils = 60000;

describe('GET /users/subquery and GET /users/splitquery', () => {
  jest.setTimeout(oneMinuteInMils);

  let app: INestApplication;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('subquery should return valid data for users with last chat', async () => {
    const response = await request(app.getHttpServer())
      .get('/users/subquery')
      .timeout(oneMinuteInMils);

    expect(response.status).toBe(200);
    expect(response.body.success).toBe(true);
    expect(Array.isArray(response.body.data)).toBe(true);
    expect(response.body.data.length).toBe(100); // Expect 100 users

    response.body.data.forEach((user) => {
      expect(user).toHaveProperty('id');
      expect(user).toHaveProperty('name');
      expect(user).toHaveProperty('last_chat');
      expect(user.last_chat).toHaveProperty('id');
      expect(user.last_chat).toHaveProperty('created_at');
      expect(user.last_chat).toHaveProperty('message');

      expect(typeof user.id).toBe('number');
      expect(typeof user.name).toBe('string');
      expect(typeof user.last_chat.id).toBe('number');

      expect(typeof user.last_chat.created_at).toBe('string');

      expect(typeof user.last_chat.message).toBe('string');
    });
  });

  it('splitquery should return valid data for users with last chat', async () => {
    const response = await request(app.getHttpServer())
      .get('/users/splitquery')
      .timeout(oneMinuteInMils);

    expect(response.status).toBe(200);
    expect(response.body.success).toBe(true);
    expect(Array.isArray(response.body.data)).toBe(true);
    expect(response.body.data.length).toBe(100); // Expect 100 users

    response.body.data.forEach((user) => {
      expect(user).toHaveProperty('id');
      expect(user).toHaveProperty('name');
      expect(user).toHaveProperty('last_chat');
      expect(user.last_chat).toHaveProperty('id');
      expect(user.last_chat).toHaveProperty('created_at');
      expect(user.last_chat).toHaveProperty('message');

      expect(typeof user.id).toBe('number');
      expect(typeof user.name).toBe('string');
      expect(typeof user.last_chat.id).toBe('number');

      expect(typeof user.last_chat.created_at).toBe('string');

      expect(typeof user.last_chat.message).toBe('string');
    });
  });
});
