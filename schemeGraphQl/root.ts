const User = require("../db/users/scheme");
const bcrypt = require("bcrypt");
const users: any[] = [{ id: 1, username: "Masonovv", age: 25 },{ id: 1, username: "Masonovv", age: 25 }];

const salt = bcrypt.genSaltSync(10);

const createUser = (input: any) => {
  const id: number = Date.now();
  return { id, ...input };
};

export const root = {
  findAllUser: () => User.find({}, (err : any, dogs: any) => {
    if(err)  return console.log("errrrrrrrrrrrrrrrrrrrrrrrr",err);
    return dogs;
  }),
  getAllUsers: () => users,
  getUser: ({ id }: any): any => {
    return users.find(user => user.id === id);
  },
  createUser: ({input}: any) =>
  {
    const {username, email, password} = input;

    const user = new User({
      name: username,
      password: bcrypt.hashSync(password, salt),
      email,
    });

    user.save((e: any) => {
      if (e) return ({ data: "error" });
    });

    return {
      name: username,
      email,
    };
  }
};
