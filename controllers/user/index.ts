import { User } from "models";

export const getUserData = async ({ userId }: { userId: string }): Promise<any> => {
  const user = new User(userId);
  await user.pull();
  return user.data;
};

export const updateUserData = async ({ data, userId }): Promise<string> => {
  const user = await new User(userId);
  user.setData(data);
  await user.push();
  return "User data updated";
};
