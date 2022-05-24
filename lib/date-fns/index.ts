import { addMinutes } from "date-fns";

const getExpirationDate = (): Date => addMinutes(new Date(), 20);

export default getExpirationDate;
