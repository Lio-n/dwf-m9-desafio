import { NextApiResponse } from "next";
import methods from "micro-method-router";
import { Auth } from "models";
import * as yup from "yup";
import { schemaMiddleware } from "middleware";

// # POST /auth/token
// # Recibe un email y un código y valida que sean los correctos.
// # En el caso de que sean correctos, y que el código no esté vencido, devuelve un token e invalida el código.
const bodySchema = yup.object().shape({
  email: yup.string().email().required(),
  code: yup.number().positive().required(), // Transforma de string a number.
});

const postToken = async (res: NextApiResponse, { email, code }) => {
  const result = await Auth.findByEmailAndCode({ email, code });

  if (result?.token) {
    res.status(200).json({ token: result.token });
  }

  if (result?.message) {
    res.status(401).json({ message: result.message });
  }
};

export default methods({
  post: schemaMiddleware({ schema: bodySchema, callback: postToken, request: "body" }),
});
