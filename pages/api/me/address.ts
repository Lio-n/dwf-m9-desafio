import methods from "micro-method-router";
import { updateUserData } from "controllers";
import { authMiddleware } from "middleware";

/*  
  $ PATCH /me/address
  # Permite modificar un dato puntual del usuario al que pertenezca el token usado en el request.
  # En este caso el objeto que describe la dirección.
*/
const patchMeAddress = async ({ req, res, userId }: CustomEndpoint) => {
  try {
    const { address } = req.body;
    if (!address) throw "address is a required field";
    if (address) {
      const message = await updateUserData({ data: { address }, userId });
      res.status(200).json({ message });
    }
  } catch (err) {
    res.status(400).json({ message: err });
  }
};

export default methods({
  patch: authMiddleware(patchMeAddress),
});
