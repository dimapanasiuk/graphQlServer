const { buildSchema } = require("graphql");

const schema = buildSchema(`
  type User {
    id: ID
    username: String
    age: Int
    posts: [Post]
  }

  type User2 {
    _id: ID
    name: String
    email: String
    password: String
  }

  type Post {
    id: ID
    title: String
    content: String
  }

  input UserInput {
    id: ID
    username: String!
    age: Int!
    posts: [PostInput]
  }

  input PostInput {
    id: ID
    title: String!
    content: String!
  }

  type Query {
    findAllUser: [User2]
    getAllUsers: [User]
    getUser(id: ID): User
  }

  type Mutation {
    createUser(input: UserInput) : User
  }

`);

module.exports = schema;
