import { User } from "models";

export const getUserData = async ({ id }: { id: string }): Promise<User> => {
  const user = await new User(id);
  await user.pull();
  return user.data;
};
