import { DbAddAccount } from '../../data/usecases/add-account/db-add-account'
import { SignUpController } from '../../presentation/controllers/signup/signup'
import { EmailValidatorAdapter } from '../../utils/email-validator-adapter'
import { BcryptAdapter } from '../../infra/criptography/bcrypt-adapter'
import { AccountMongoRepository } from '../../infra/db/mongodb/account-repository/account'
import { LogControllerDecorator } from '../decorators/log-controller-decorator'
import { Controller } from '../../presentation/protocols'
import { LogMongoRepository } from '../../infra/db/mongodb/log-repository/log-repository'

export const makeSignUpController = (): Controller => {
  const salt = 12
  const bcryptAdapter = new BcryptAdapter(salt)
  const accountMongoRepository = new AccountMongoRepository()

  const addAccount = new DbAddAccount(bcryptAdapter, accountMongoRepository)
  const emailValidatorAdapter = new EmailValidatorAdapter()

  const signupController = new SignUpController(emailValidatorAdapter, addAccount)
  const logMongoRepository = new LogMongoRepository()

  return new LogControllerDecorator(signupController, logMongoRepository)
}
