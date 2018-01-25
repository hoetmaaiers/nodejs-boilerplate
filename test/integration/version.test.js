/**
 * cors.test.js
 * test/integration
 */

const request = require('supertest');
const app = require('./../../app');
const { startWithCleanDatabase } = require('./../helpers');

describe('Version routes', () => {
  beforeEach(async (done) => {
    await startWithCleanDatabase();
    return done();
  });

  describe('GET /version', () => {
    it('Should return a formatted validation error object', async () => {
      await request(app)
        .get('/api/version')
        .expect(200);
    });
  });
});
