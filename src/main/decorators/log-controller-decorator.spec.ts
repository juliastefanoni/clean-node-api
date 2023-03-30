import { HttpRequest, HttpResponse, Controller } from '../../presentation/protocols'
import { LogControllerDecorator } from './log-controller-decorator'

interface SutTypes {
  controllerStub: Controller
  sut: LogControllerDecorator
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

const makeSut = (): SutTypes => {
  const controllerStub = makeController()
  const sut = new LogControllerDecorator(controllerStub)

  return {
    controllerStub,
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
})
