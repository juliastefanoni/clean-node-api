import bcrypt from 'bcrypt'
import { BcryptAdapter } from './bcrypt-adapter'

describe('Bcrypt Adapter', () => {
  test('Should call Bcrypt with correct values', async () => {
    const salt = 12
    const sut = new BcryptAdapter(salt)

    const hashSpy = jest.spyOn(bcrypt, 'hash')

    await sut.encrypt('valid_password')

    expect(hashSpy).toHaveBeenCalledWith('valid_password', salt)
  })
})
