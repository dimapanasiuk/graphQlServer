const { buildSchema } = require("graphql");

const schema = buildSchema(`
  type User {
    id: ID
    username: String
    age: Int
    password: String
    email: String
    posts: [Post]
  }
  type Post {
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
      posts: [PostInput]
  }
  input PostInput {
      id: ID
      title: String!
      content: String!
  }
  input LoginData {
    username: String!
    password: String!
  }
  type Query {
      getAllUsers: [User]
      getUser(id: ID): User
      getLoginData(input: LoginData): User
  }
  type Mutation {
      createUser(input: UserInput): User
  }
`);

module.exports = schema;
