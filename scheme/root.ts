const users: any[] = [{ id: 1, username: "Masonovv", age: 25 }];

const createUser = (input: any) => {
  const id: number = Date.now();
  return { id, ...input };
};

export const root = {
  getAllUsers: () => users,
  getUser: ({ id }: any): any => {
    return users.find(user => user.id === id);
  },
  createUser: ({ input }: any) => {
    const user = createUser(input);
    users.push(user);
    return user;
  }
};
