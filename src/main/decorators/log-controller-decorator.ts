import { Controller, HttpRequest, HttpResponse } from '../../presentation/protocols'
import { LogErrorRepository } from '../../data/protocols/log-error-repository'

export class LogControllerDecorator implements Controller {
  private readonly controller: Controller
  private readonly logErrorRepository: LogErrorRepository

  constructor (controller: Controller, logErrorRepository: LogErrorRepository) {
    this.controller = controller
    this.logErrorRepository = logErrorRepository
  }

  async handle (HttpRequest: HttpRequest): Promise<HttpResponse> {
    const httpResponse = await this.controller.handle(HttpRequest)

    if (httpResponse.statusCode === 500) {
      await this.logErrorRepository.log(httpResponse.body.stack)
    }

    return httpResponse
  }
}
