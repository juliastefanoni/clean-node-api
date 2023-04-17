import { Authentication } from '../../../domain/usecases/authentication'
import { InvalidParamError, MissingParamError } from '../../errors'
import { badRequest, serverError } from '../../helpers'
import { Controller, HttpResponse, HttpRequest } from '../../protocols'
import { EmailValidator } from '../signup/signup-protocols'

export class LoginController implements Controller {
  private readonly emailValidator: EmailValidator
  private readonly authentication: Authentication

  constructor (emailValidator: EmailValidator, authentication: Authentication) {
    this.emailValidator = emailValidator
    this.authentication = authentication
  }

  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
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

      await this.authentication.auth(email, password)

      return await Promise.resolve({
        statusCode: 200,
        body: {}
      })
    } catch (error) {
      return serverError(error)
    }
  }
}
