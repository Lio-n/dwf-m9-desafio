// * Los controllers no se comunican con la Base de datos directamente.
import { getUserData, updateUserData } from "./user";
import { findUserByEmailAndCode, sendCode } from "./auth";

export { getUserData, sendCode, findUserByEmailAndCode, updateUserData };
