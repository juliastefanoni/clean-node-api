import { Encrypter } from '../../protocols/encrypter'
import { DbAddAccount } from './db-add-account'

interface sutTypes {
  encrypterStub: Encrypter
  sut: DbAddAccount
}

const makeSut = (): sutTypes => {
  class EncrypterStub {
    async encrypt (value: string): Promise<string> {
      return await new Promise((resolve) => { resolve('hashed_password') })
    }
  }

  const encrypterStub = new EncrypterStub()
  const sut = new DbAddAccount(encrypterStub)

  return {
    encrypterStub,
    sut
  }
}
describe('Db AddAccount UseCase', () => {
  test('Should call Encrypter with correct password', async () => {
    const { encrypterStub, sut } = makeSut()
    const encryptSpy = jest.spyOn(encrypterStub, 'encrypt')

    const accountData = {
      name: 'valid_name',
      email: 'valid_email@email.com',
      password: 'valid_password'
    }

    await sut.add(accountData)

    expect(encryptSpy).toHaveBeenCalledWith('valid_password')
  })
})
