import { MissingParamError } from '../../errors'
import { badRequest } from '../../helpers'
import { Controller, HttpResponse, HttpRequest } from '../../protocols'
import { EmailValidator } from '../signup/signup-protocols'

export class LoginController implements Controller {
  private readonly emailValidator: EmailValidator
  constructor (emailValidator: EmailValidator) {
    this.emailValidator = emailValidator
  }

  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    if (!httpRequest.body.email) {
      return await Promise.resolve(badRequest(new MissingParamError('email')))
    }

    if (!httpRequest.body.password) {
      return await Promise.resolve(badRequest(new MissingParamError('password')))
    }

    this.emailValidator.isValid(httpRequest.body.email)

    return await Promise.resolve({
      statusCode: 200,
      body: {}
    })
  }
}
