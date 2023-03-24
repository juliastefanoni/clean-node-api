import { AccountModel, AddAccount, AddAccountModel, AddAccountRepository, Encrypter } from './db-add-account-protocols'
export class DbAddAccount implements AddAccount {
  private readonly encrypter: Encrypter
  private readonly addAccountRepository: AddAccountRepository

  constructor (encrypter: Encrypter, addAccountRepository: AddAccountRepository) {
    this.encrypter = encrypter
    this.addAccountRepository = addAccountRepository
  }

  async add (accountData: AddAccountModel): Promise<AccountModel.Result> {
    const hashedPassword = await this.encrypter.encrypt(accountData.password)
    const accountWithHashedPassword = Object.assign({}, accountData, { password: hashedPassword })

    const account = await this.addAccountRepository.add(accountWithHashedPassword)

    return account
  }
}
