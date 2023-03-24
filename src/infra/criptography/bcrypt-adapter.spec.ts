import bcrypt from 'bcrypt'
import { BcryptAdapter } from './bcrypt-adapter'

jest.mock('bcrypt', () => ({
  async hash (): Promise<string> {
    return await new Promise(resolve => { resolve('hashed_value') })
  }
}))

const salt = 12

const makeSut = (): BcryptAdapter => {
  return new BcryptAdapter(salt)
}

describe('Bcrypt Adapter', () => {
  test('Should call Bcrypt with correct values', async () => {
    const sut = makeSut()
    const hashSpy = jest.spyOn(bcrypt, 'hash')
    await sut.encrypt('valid_password')

    expect(hashSpy).toHaveBeenCalledWith('valid_password', salt)
  })

  test('Should return a hash on success', async () => {
    const sut = makeSut()
    const hash = await sut.encrypt('valid_password')

    expect(hash).toBe('hashed_value')
  })

  test('Should throw if bcrypt throws', async () => {
    const sut = makeSut()

    jest.spyOn<any, string>(bcrypt, 'hash').mockReturnValueOnce(
      new Promise((resolve, reject) => { reject(new Error('Teste')) })
    )

    const promise = sut.encrypt('valid_password')

    await expect(promise).rejects.toThrow()
  })
})
