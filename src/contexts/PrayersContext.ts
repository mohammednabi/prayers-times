import { createContext } from "react";
import { prayTime } from "../specificTypes";

const value = {
  todayTimes: {} as prayTime | undefined,
  today: new Date(),
};

export const PrayersContext = createContext(value);
