import request from 'supertest'
import { MongoHelper } from '../../infra/db/mongodb/helpers/mongo-helper'
import app from '../config/app'

describe('SignUp Routes', () => {
  beforeAll(async () => {
    await MongoHelper.connect(process.env.MONGO_URL ?? '')
  })

  afterAll(async () => {
    await MongoHelper.disconnect()
  })

  beforeEach(async () => {
    const accountCollection = MongoHelper.getCollection('accounts')
    await accountCollection.deleteMany({})
  })

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
