import { buildSchema } from "graphql";

const schema = buildSchema(`
  type User {
    id: ID
    username: String
    age: Int
    password: String
    email: String
    todos: [Todo]
  }
  type Todo {
      id: ID
      title: String
      content: String
  }
  input UserInput {
      id: ID
      username: String!
      password: String
      email: String
      age: Int
      todos: [TodoData]
  }
  input TodoData {
      id: ID
      title: String
      content: String
  }
  input LoginData {
    username: String!
    password: String!
  }
  type Query {
      getLoginData(input: LoginData): User
  }
  type Mutation {
      createUser(input: UserInput): User
      addNewTodo(input: UserInput): User
  }
`);

export default schema;
