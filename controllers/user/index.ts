import { getOrders } from "controllers";
import { User } from "models";

const getUserData = async (userId: string): Promise<UserData> => {
  const user = new User(userId);
  await user.pull();
  return user.data;
};

const updateUserData = async ({ data, userId }: UpdateUserDataParams): Promise<string> => {
  const user = new User(userId);
  user.setData(data);
  await user.push();
  return "User data updated";
};

const setOrderGenerated = async ({ userId, order_id }) => {
  const user = new User(userId);
  user.saveOrderGenerated(order_id);
};

const getOrdersFromUser = async (userId) => {
  const userData = await getUserData(userId);
  const products = await getOrders(userData.orders_generated);

  return products;
};

export { updateUserData, getUserData, setOrderGenerated, getOrdersFromUser };
