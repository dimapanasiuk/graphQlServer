const User = require("../db/users/scheme");
const users: any[] = [{ id: 1, username: "Masonovv", age: 25 }, { id: 1, username: "Masonovv", age: 25 }];

const createUser = (input: any) => {
  const id: number = Date.now();
  return { id, ...input };
};

export const root = {
  findAllUser: () => User.find({}, (err: any, dogs: any) => {
    if (err) return console.log("errrrrrrrrrrrrrrrrrrrrrrrr", err);
    return dogs;
  }),
  getAllUsers: () => {
    return users;
  },
  getUser: ({ id }: any): any => {
    return users.find(user => user.id === +id);
  },
  getLoginData: async ({ input }: any) => {
    const { username, password } = input;
    const data = await User.find({ username, password });
    return data?.[0];
  },
  addNewTodo: async ({ input }: any) => {
    const { todos, username, id } = input;

    const filter = { username };
    const update = { todos }; //fix todos and todo

    const res = await User.findOneAndUpdate(filter, update, { new: true });
    return res;
  },
  createUser: ({ input }: any) => {
    const { username, email, password, id } = input;
    const user = new User({
      id,
      username,
      password,
      email,
      todos: [],
    });

    user.save((e: any) => {
      if (e) return ({ data: "error" });
    });

    return {
      username,
      password,
      email,
    };
  }
};
