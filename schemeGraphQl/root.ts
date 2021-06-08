const User = require("../db/users/scheme");
const users: any[] = [{ id: 1, username: "Masonovv", age: 25 },{ id: 1, username: "Masonovv", age: 25 }];


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
    return users.find(user => user.id === +id);
  },
  getLoginData: async ({input} :any) => {
    const {username, password} = input;
    const data = await User.find({username, password});
    return data?.[0];
  },
  createUser: ({input}: any) =>
  {
    const {username, email, password} = input;

    const user = new User({
      username,
      password,
      email,
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
