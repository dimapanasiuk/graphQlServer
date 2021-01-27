import express from 'express';
const { graphqlHTTP } = require('express-graphql');
const schema = require('./scheme');
const cors = require('cors');

const app = express();
const PORT: number = 5000;
const basicStr: string = 'Node TS app!'


const users: any[] = [{ id: 1, username: 'Masonovv', age: 25 }];

const root = {
  getAllUsers: () => {
    return users;
  },
  getUser: ({ id }: any): any => {
    return users.find(user => user.id === id)
  }
}

app.use(cors());
app.use('/graphql', graphqlHTTP({
  graphiql: true,
  schema,
  rootValue: root
}));



app.get('/', (req, res) => {
  res.send(basicStr);
});

app.listen(PORT, () => console.log(`Listening on port ${PORT}`));
