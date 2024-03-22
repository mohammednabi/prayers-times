import { Container } from "@mui/material";
import { useState } from "react";
import { GrPowerReset } from "react-icons/gr";

const Tasbih = () => {
  const [count, setCount] = useState(0);

  const increse = () => {
    setCount((c) => c + 1);
  };

  const reset = () => {
    setCount(0);
  };

  return (
    <Container maxWidth="sm" className="overflow-x-hidden py-10 ">
      <div className="w-full pt-20 px-5 flex flex-col gap-5 justify-center items-center">
        <h1 className="text-center text-darkGreen select-none text-5xl text-bold">
          السبحة الالكترونية
        </h1>
        <GrPowerReset
          className="text-darkGreen text-3xl select-none cursor-pointer"
          onClick={reset}
        />
        <div
          className="bg-lightBeige select-none cursor-pointer border-8 border-solid border-darkGreen w-1/2 aspect-square rounded-full flex justify-center items-center"
          onClick={increse}
        >
          <h1 className="text-center text-darkGreen text-5xl ">{count}</h1>
        </div>
      </div>
    </Container>
  );
};

export default Tasbih;
