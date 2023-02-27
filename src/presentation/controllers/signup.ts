import { MissingParamError, InvalidParamError } from '../errors'
import { badRequest, serverError } from '../helpers'
import { HttpRequest, HttpResponse, Controller, EmailValidator } from '../protocols'

export class SignUpController implements Controller {
  private readonly emailValidator: EmailValidator

  constructor (emailValidator: EmailValidator) {
    this.emailValidator = emailValidator
  }

  handle (httpRequest: HttpRequest): HttpResponse {
    try {
      const requiredFields = ['name', 'email', 'password', 'passwordConfirmation']

      for (const field of requiredFields) {
        if (!httpRequest.body[field]) {
          return badRequest(new MissingParamError(field))
        }
      }

      const { email, password, passwordConfirmation } = httpRequest.body

      if (password !== passwordConfirmation) {
        return badRequest(new InvalidParamError('passwordConfirmation'))
      }

      const isValidEmail = this.emailValidator.isvalid(email)

      if (!isValidEmail) {
        return badRequest(new InvalidParamError('email'))
      }

      return {
        statusCode: 200,
        body: {}
      }
    } catch (err) {
      return serverError()
    }
  }
}
