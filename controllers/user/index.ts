import { User } from "models";

export const getUserData = async ({ id }: { id: string }): Promise<User> => {
  const user = await new User(id);
  return await user.pull();
};
