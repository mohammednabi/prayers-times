type timeObj = {
  seconds: number;
  nanoseconds: number;
};

export type prayTime = {
  fajr: timeObj;
  sunrise: timeObj;
  duhr: timeObj;
  asr: timeObj;
  mgrb: timeObj;
  asha: timeObj;
};
