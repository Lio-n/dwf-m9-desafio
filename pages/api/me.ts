import { NextApiResponse } from "next";
import methods from "micro-method-router";
import { authMiddleware } from "middleware";
import { getUserData } from "controllers";

// # GET /me
// # Devuelve info del user asociado a ese token
const postAuth = async (res: NextApiResponse, { id }) => {
  try {
    const userData = await getUserData({ id });
    res.status(200).json(userData);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

export default methods({
  get: authMiddleware(postAuth),
});
