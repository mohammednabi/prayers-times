import { getAuth } from "firebase/auth";
import { app } from "./configration";

export const auth = getAuth(app);
