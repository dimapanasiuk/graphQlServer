const User = require("../db/users/scheme"); // [TODO:STAS] how to make this with import

import {
  ICreateUser,
  ICreateUserReturn,
  ILoginData,
  ILoginDataReturn,
  IAddNewTodo
} from "./types";

export const root = {
  getLoginData: async ({ input }: ILoginData | any) : Promise<undefined | ILoginDataReturn>   => {
    const { username, password } = input;
    const data = await User.find({ username, password });
    return data?.[0];
  },
  addNewTodo: async ({ input }: IAddNewTodo | any) : Promise<ILoginDataReturn> => { //[TODO:STAS]  I want create Interface for arguments without any
    const { todos, username } = input;
    const filter : {username: string} = { username };
    const update: {todos: Array<any>} = { todos };

    const res = await User.findOneAndUpdate(filter, update, { new: true });
    return res;
  },
  createUser: ({ input }: ICreateUser | any) : ICreateUserReturn | {data: string} => { //[TODO:STAS]  I want create Interface for arguments without any
    const { username, email, password, id } = input;
    const user = new User({
      id,
      username,
      password,
      email,
      todos: [],
    });

    user.save((e: any) => { //[TODO:STAS] e what is a type in TS
      if (e) return ({ data: "error" });
    });

    return {
      username,
      password,
      email,
    };
  }
};
