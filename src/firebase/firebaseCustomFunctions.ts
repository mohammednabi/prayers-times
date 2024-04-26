import { collection, getDocs } from "firebase/firestore";
import { db } from "./configration";
import { prayTime } from "../specificTypes";
import { SummerTimeStore } from "../stores/SummerTimeStore";

export const allMonths = [
  "jan",
  "feb",
  "mar",
  "apr",
  "may",
  "june",
  "july",
  "aug",
  "sept",
  "oct",
  "nov",
  "dec",
];

export const getAllDocuments = async () => {
  //   const allData: { id: string; data: DocumentData }[] = [];
  const querySnapshot = await getDocs(collection(db, "months"));
  //   querySnapshot.forEach((doc) => {
  //     // doc.data() is never undefined for query doc snapshots
  //     // console.log(doc.id, " => ", doc.data());
  //     allData.push({ id: doc.id, data: doc.data() });
  //   });

  return querySnapshot;
};

// export const getSpecificDoc = async (month: number) => {
//   const docRef = doc(db, "months", allMonths[month]);
//   const docSnap = await getDoc(docRef);

//   //   if (docSnap.exists()) {
//   //     console.log("Document data:", docSnap.data());
//   //   } else {
//   //     // docSnap.data() will be undefined in this case
//   //     console.log("No such document!");
//   //   }

//   return docSnap;
// };

export const getThePrayTime = (timeInSeconds?: number) => {
  const summerTime = new SummerTimeStore();
  summerTime.getTheSummerTime();

  if (timeInSeconds) {
    return new Date(
      (summerTime.isSummerTime ? timeInSeconds + 3600 : timeInSeconds) * 1000
    ).toLocaleTimeString("ar-EG", {
      hour: "numeric",
      minute: "numeric",
      hourCycle: "h12",
      // timeZone: "Africa/Cairo",
    });
  }
};

export const getTheTimeDifference = (timeInSeconds?: number) => {
  const today = new Date();
  const targetDate = timeInSeconds
    ? new Date((timeInSeconds + 3600) * 1000)
    : new Date();
  const differenceInSeconds = Math.floor(
    targetDate.getTime() - today.getTime()
  );

  console.log("this is the difference in seconds: ", differenceInSeconds);

  return new Date(differenceInSeconds).toLocaleTimeString("ar-EG", {
    hourCycle: "h24",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
  });
};

export const checkNextPray = (todayTimes: prayTime | undefined) => {
  const today = new Date();

  const praysSeconds = [
    { time: todayTimes?.fajr.seconds, title: "صلاة الفجر" },
    { time: todayTimes?.duhr.seconds, title: "صلاة الظهر" },
    { time: todayTimes?.asr.seconds, title: "صلاة العصر" },
    { time: todayTimes?.mgrb.seconds, title: "صلاة المغرب" },
    { time: todayTimes?.asha.seconds, title: "صلاة العشاء" },
  ];

  if (todayTimes) {
    const nextPray = praysSeconds.find((pray) => {
      if (pray.time) {
        if (today.getSeconds() < pray.time) {
          return pray;
        }
      }
    });

    return {
      nextPray: nextPray?.title ?? "",
      nextPrayTime: nextPray?.time
        ? new Date(nextPray?.time * 1000).toLocaleTimeString("ar-EG", {
            hourCycle: "h12",
            hour: "2-digit",
            minute: "2-digit",
            // second: "2-digit",
          })
        : new Date().toLocaleTimeString("ar-EG", {
            hourCycle: "h12",
            hour: "2-digit",
            minute: "2-digit",
            // second: "2-digit",
          }),
      nextPrayTimeSeconds: nextPray?.time,
    };
  }

  return {
    nextPray: "",
    nextPrayTime: new Date().toLocaleTimeString("ar-EG", {
      hourCycle: "h12",
      hour: "2-digit",
      minute: "2-digit",
      // second: "2-digit",
    }),
    nextPrayTimeSeconds: 0,
  };
};
