import { User, Auth } from "models";
import { getExpirationDate, getRandomNum, sendCodeToEmail } from "lib";

// * Envía el código por email (usando sendgrid)
export const sendCode = async (email: string): Promise<{ message }> => {
  const auth = await findOrCreateAuth(email);

  const code = getRandomNum();
  const expires = getExpirationDate(); // * 20 minutes
  auth.setData({ code, expires });

  auth.push();
  await sendCodeToEmail({ email, code }); // * Sendgrid

  return { message: "Codígo enviado al email" };
};

const findOrCreateAuth = async (email: string): Promise<Auth> => {
  const resAuth = await Auth.findByEmail(email);
  if (resAuth) return resAuth;

  const newUser = await User.createNewUser(email);
  const newAuth = await Auth.createNewAuth({
    email,
    userId: newUser.id,
  });

  return newAuth;
};

export const findUserByEmailAndCode = async ({ email, code }): Promise<{ token }> =>
  await Auth.findByEmailAndCode({ email, code });
