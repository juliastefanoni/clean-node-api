import { AddAccountModel } from '../../domain/usecases/add-account'

export interface AddAccountRepository {
  add: (data: AddAccountRepository.Params) => Promise<AddAccountRepository.Result>
}
export namespace AddAccountRepository {
  export type Params = AddAccountModel.Params
  export type Result = boolean
}
