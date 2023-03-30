import { HttpRequest, HttpResponse, Controller } from '../../presentation/protocols'
import { LogControllerDecorator } from './log-controller-decorator'
import { serverError } from '../../presentation/helpers'
import { LogErrorRepository } from '../../data/protocols/log-error-repository'

const makeLogErrorRepository = (): LogErrorRepository => {
  class LogErrorRepositoryStub implements LogErrorRepository {
    async log (stack: string): Promise<void> {
      await new Promise(resolve => { resolve(null) })
    }
  }

  const logErrorRepositoryStub = new LogErrorRepositoryStub()

  return logErrorRepositoryStub
}

const makeController = (): Controller => {
  class ControllerStub implements Controller {
    async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
      const httpResponse: HttpResponse = {
        statusCode: 200,
        body: {
          name: 'Júlia'
        }
      }

      return await new Promise(resolve => { resolve(httpResponse) })
    }
  }

  const controllerStub = new ControllerStub()

  return controllerStub
}

interface SutTypes {
  controllerStub: Controller
  sut: LogControllerDecorator
  logErrorRepositoryStub: LogErrorRepository
}

const makeSut = (): SutTypes => {
  const controllerStub = makeController()
  const logErrorRepositoryStub = makeLogErrorRepository()
  const sut = new LogControllerDecorator(controllerStub, logErrorRepositoryStub)

  return {
    controllerStub,
    logErrorRepositoryStub,
    sut
  }
}

describe('Log Decorator', () => {
  test('Should call controller handle', async () => {
    const { controllerStub, sut } = makeSut()
    const handleSpy = jest.spyOn(controllerStub, 'handle')

    const httpRequest = {
      body: {
        email: 'any_email@gmail.com',
        name: 'any_name',
        password: 'any_password',
        passwordConfirmation: 'any_password'
      }
    }

    await sut.handle(httpRequest)

    expect(handleSpy).toHaveBeenCalledWith(httpRequest)
  })

  test('Should return the same result of the controller', async () => {
    const { sut } = makeSut()

    const httpRequest = {
      body: {
        email: 'any_email@gmail.com',
        name: 'any_name',
        password: 'any_password',
        passwordConfirmation: 'any_password'
      }
    }

    const httpResponse = await sut.handle(httpRequest)

    expect(httpResponse).toEqual({
      statusCode: 200,
      body: {
        name: 'Júlia'
      }
    })
  })

  test('Should call LogErrorRepository with correct error if controller returns a server error', async () => {
    const { sut, controllerStub, logErrorRepositoryStub } = makeSut()
    const fakeError = new Error()
    fakeError.stack = 'any_stack'

    jest.spyOn(controllerStub, 'handle').mockReturnValueOnce(new Promise(resolve => {
      resolve(serverError(fakeError))
    }))

    const logSpy = jest.spyOn(logErrorRepositoryStub, 'log')

    const httpRequest = {
      body: {
        email: 'any_email@gmail.com',
        name: 'any_name',
        password: 'any_password',
        passwordConfirmation: 'any_password'
      }
    }

    await sut.handle(httpRequest)

    expect(logSpy).toHaveBeenCalledWith('any_stack')
  })
})
