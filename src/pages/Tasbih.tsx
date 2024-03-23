import {
  Container,
  FormControl,
  FormControlLabel,
  FormLabel,
  Radio,
  RadioGroup,
  SelectChangeEvent,
} from "@mui/material";
import { useState } from "react";
import { BiEdit } from "react-icons/bi";
import { GrPowerReset } from "react-icons/gr";

const Tasbih = () => {
  const [count, setCount] = useState(0);
  const [numberOfCount, setNumberOfCount] = useState(0);
  const [selection, setSelection] = useState("لا محدود");

  const increse = () => {
    if (selection === "33" && count >= 33) {
      setNumberOfCount((n) => n + 1);
      setCount(0);
      navigator.vibrate(500);
    } else if (selection === "99" && count >= 99) {
      setNumberOfCount((n) => n + 1);
      setCount(0);
      navigator.vibrate(500);
    } else {
      setCount((c) => c + 1);
    }
  };

  const reset = () => {
    setCount(0);
    setNumberOfCount(0);
  };

  const handleChange = (event: SelectChangeEvent) => {
    setSelection(event.target.value);
  };

  return (
    <Container maxWidth="sm" className="overflow-x-hidden py-5 ">
      <div className="w-full  px-5 flex flex-col gap-3 justify-center items-center">
        <h1 className="text-center text-darkGreen select-none text-5xl text-bold">
          السبحة الالكترونية
        </h1>
        <div className="grid grid-cols-2 w-full items-center justify-end  ">
          <GrPowerReset
            className="text-darkGreen text-3xl select-none cursor-pointer self-end"
            onClick={reset}
          />

          <FormControl fullWidth className="self-end">
            <FormLabel
              classes={{ focused: "text-lightGreen" }}
              id="demo-row-radio-buttons-group-label"
            >
              عدد التسابيح
            </FormLabel>
            <RadioGroup
              row
              aria-labelledby="demo-row-radio-buttons-group-label"
              name="row-radio-buttons-group"
              onChange={handleChange}
              value={selection}
            >
              <FormControlLabel
                value="لا محدود"
                control={<Radio classes={{ checked: "text-lightGreen" }} />}
                label="لا محدود"
                classes={{}}
              />
              <FormControlLabel
                value="33"
                control={<Radio classes={{ checked: "text-lightGreen" }} />}
                label="33"
              />
              <FormControlLabel
                value="99"
                control={<Radio classes={{ checked: "text-lightGreen" }} />}
                label="99"
              />
            </RadioGroup>
          </FormControl>
        </div>
        <Container maxWidth="xs">
          {selection !== "لا محدود" && (
            <div
              className="bg-lightBeige select-none cursor-pointer border-2 border-solid border-darkGreen w-10 aspect-square rounded-full flex justify-center items-center"
              onClick={increse}
            >
              <h1 className="text-center text-darkGreen text-xl ">
                {numberOfCount}
              </h1>
            </div>
          )}
          <div
            className="bg-lightBeige select-none cursor-pointer border-8 border-solid border-darkGreen w-full aspect-square rounded-full flex justify-center items-center"
            onClick={increse}
          >
            <h1 className="text-center text-darkGreen text-7xl ">{count}</h1>
          </div>

          <div className="flex justify-center items-center">
            <h1 contentEditable className="text-center text-2xl  mt-3">
              سبحان الله
            </h1>
            <BiEdit className="text-center text-xl opacity-25" />
          </div>
        </Container>
      </div>
    </Container>
  );
};

export default Tasbih;
