import { User, Auth } from "models";
import { getExpirationDate, getRandomNum, sendCodeToEmail } from "lib";

// * Envía el código por email (usando sendgrid)
export const sendCode = async ({ email }: { email: string }): Promise<{ message }> => {
  const auth = await findOrCreateAuth({ email });

  const code = getRandomNum();
  const expires = getExpirationDate(); // * 20 minutes
  auth.data = { ...auth.data, code, expires };

  auth.push();
  await sendCodeToEmail({ email, code }); // * Sendgrid

  return { message: "Codígo enviado al email" };
};

const findOrCreateAuth = async ({ email }: { email: string }): Promise<Auth> => {
  const resAuth = await Auth.findByEmail({ email });
  if (resAuth) return resAuth;

  const newUser = await User.createNewUser({ email });
  const newAuth = await Auth.createNewAuth({
    email,
    userId: newUser.id,
  });

  return newAuth;
};
