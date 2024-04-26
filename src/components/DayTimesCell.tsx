/* eslint-disable no-empty-pattern */
import { v4 as uuidv4 } from "uuid";

interface DayTimesCellProps {
  // Define your props here
  day: string;
  times: string[];
}

const DayTimesCell = ({ day, times }: DayTimesCellProps) => {
  return (
    <div className="grid grid-cols-7 bg-darkGreen rounded-r-xl rounded-l-xl p-2 text-lg px-5 text-lightBeige select-none">
      <h1 className="text-center">{day}</h1>
      {times.map((time) => (
        <h1 key={uuidv4()} className="text-center">
          {time}
        </h1>
      ))}
    </div>
  );
};

export default DayTimesCell;
