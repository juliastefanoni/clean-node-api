import { InvalidParamError, MissingParamError } from '../../errors'
import { badRequest } from '../../helpers'
import { Controller, HttpResponse, HttpRequest } from '../../protocols'
import { EmailValidator } from '../signup/signup-protocols'

export class LoginController implements Controller {
  private readonly emailValidator: EmailValidator
  constructor (emailValidator: EmailValidator) {
    this.emailValidator = emailValidator
  }

  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    const { email, password } = httpRequest.body
    if (!email) {
      return await Promise.resolve(badRequest(new MissingParamError('email')))
    }

    if (!password) {
      return await Promise.resolve(badRequest(new MissingParamError('password')))
    }

    const isValidEmail = this.emailValidator.isValid(email)

    if (!isValidEmail) {
      return await Promise.resolve(badRequest(new InvalidParamError('email')))
    }

    return await Promise.resolve({
      statusCode: 200,
      body: {}
    })
  }
}
