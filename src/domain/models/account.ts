export interface AccountModel {
  id: string
  name: string
  email: string
  password: string
}

export namespace AccountModel {
  export type Result = boolean
}
