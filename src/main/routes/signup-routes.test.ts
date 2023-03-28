import request from 'supertest'
import app from '../config/app'

describe('SignUp Routes', () => {
  test('Should return true on success', async () => {
    await request(app)
      .post('/api/signup')
      .send({
        name: 'Valid Name',
        email: 'valid_email@gmail.com',
        password: 'valid_password',
        passwordConfirmation: 'valid_password'
      })
      .expect(200)
  })
})
