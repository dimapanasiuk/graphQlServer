interface ILoginData {
  username?: string
  password?: string
}

interface ILoginDataReturn {
  todos?: Array<any>
  _id?: string
  id?: number
  username?: string
  password?: string
  email?: string
}

interface IAddNewTodo {
  username: string
  todos: Array<any>
}

interface ICreateUser {
  username: string
  email:string
  password: string
  id: number
}

interface  ICreateUserReturn {
  username: string
  password: string
  email: string
}

export { ILoginData , ILoginDataReturn, IAddNewTodo, ICreateUser, ICreateUserReturn };
