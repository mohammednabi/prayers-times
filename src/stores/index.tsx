import { PrayersStore } from "./PrayersStore";

const prayersInstance = new PrayersStore();

export const store = {
  prayers: prayersInstance,
};
