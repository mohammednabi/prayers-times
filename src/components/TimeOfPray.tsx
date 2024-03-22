import { ReactNode } from "react";

interface iprops {
  title: string;
  icon: ReactNode;
  time?: string;
}

const TimeOfPray = ({ title, icon, time }: iprops) => {
  return (
    <div className="flex flex-col items-center justify-center gap-2 text-beige">
      <h1>{title}</h1>
      <div className="flex justify-center items-center">{icon}</div>
      <h1>{time}</h1>
    </div>
  );
};

export default TimeOfPray;
