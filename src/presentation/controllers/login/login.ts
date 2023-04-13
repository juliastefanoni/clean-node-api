import { MissingParamError } from '../../errors'
import { badRequest } from '../../helpers'
import { Controller, HttpResponse, HttpRequest } from '../../protocols'

export class LoginController implements Controller {
  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    if (!httpRequest.body.email) {
      return await Promise.resolve(badRequest(new MissingParamError('email')))
    }
    if (!httpRequest.body.password) {
      return await Promise.resolve(badRequest(new MissingParamError('password')))
    }

    return await Promise.resolve({
      statusCode: 200,
      body: {}
    })
  }
}
