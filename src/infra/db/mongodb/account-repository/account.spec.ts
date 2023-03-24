import { MongoHelper } from '../helpers/mongo-helper'
import { AccountMongoRepository } from './account'

describe('Account Mongo Repository', () => {
  beforeAll(async () => {
    await MongoHelper.connect(process.env.MONGO_URL ?? '')
  })

  afterAll(async () => {
    await MongoHelper.disconnect()
  })

  test('Should return an account on success', async () => {
    const sut = new AccountMongoRepository()
    const accountData = {
      name: 'any_name',
      email: 'any_email',
      password: 'any_password'
    }

    const account = await sut.add(accountData)

    expect(account).toBe(true)
  })
})
