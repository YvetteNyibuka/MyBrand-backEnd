import request from 'supertest';
import { connectToMongoDB, disconnectFromMongoDB } from '../services/mongoConnection';
import app from '../app';
// import {
//   movieData,
//   movieWithoutDirector,
//   movieWithoutTitle,
// } from '../mock/static';
import dotenv from 'dotenv'
dotenv.config()
const devDatabaseURI = process.env.TEST_DATABASE_URL as string;

jest.setTimeout(10000);

describe('Welcome to my blog', () => {
  beforeAll(async () => {
    await connectToMongoDB(devDatabaseURI);
  });

  afterAll(async () => {
    await disconnectFromMongoDB();
  });
  describe('Welcome API message', () => {
    test('it should return 200 and welcome message ', async () => {
      const { body } = await request(app)
        .get('/api/v1')
        .expect('Content-Type', /json/)
        .expect(200);
        expect(body.message).toStrictEqual('Welcome to my blogs API');
    });
})
describe('Users Api crud', () => {
  test('it should return 403 if is not authorized', async () => {
    const { body } = await request(app).get('/api/v1/auth/register')
    .expect('Content-Type', /json/)
    .expect(403);
    expect(body.message).toStrictEqual('access denied')
  });
})

    


})