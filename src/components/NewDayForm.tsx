/* eslint-disable react-refresh/only-export-components */
import { useContext } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { StoreContext } from "../contexts/StoreContext";
import { observer } from "mobx-react-lite";

const NewDayForm = () => {
  const { register, handleSubmit } = useForm();
  const { prayers } = useContext(StoreContext);

  return (
    <div>
      <form
        onSubmit={handleSubmit((data) => {
          // const fajrDate = new Date(`${data.day} ${data.fajr}`);
          // toast.success(`${data}`);
          // console.log({ data });
          // console.log();
          prayers
            .addDayTimes(new Date(data.day).getMonth(), data)
            .then(() => {
              toast.success("added succesfully");
            })
            .catch(() => {
              toast.error("failed to add");
            });

          // console.log({ data });
          // console.log({ fajrDate });
        })}
        className="grid grid-cols-2  items-center gap-40"
      >
        <div className="flex flex-col gap-2">
          <label className="text-xl">اختر اليوم</label>
          <input
            {...register("day")}
            required
            type="date"
            className="p-2 border-darkGreen border-solid border-2 outline-none"
          />
        </div>
        <div className="flex flex-col gap-5">
          <div className="flex flex-col gap-2">
            <label className="text-xl">الفجر</label>
            <input
              {...register("fajr")}
              required
              type="time"
              className="p-2 border-darkGreen border-solid border-2 outline-none"
            />
          </div>
          <div className="flex flex-col gap-2">
            <label className="text-xl">الشروق</label>
            <input
              {...register("sunrise")}
              required
              type="time"
              className="p-2 border-darkGreen border-solid border-2 outline-none"
            />
          </div>
          <div className="flex flex-col gap-2">
            <label className="text-xl">الظهر</label>
            <input
              {...register("duhr")}
              required
              type="time"
              className="p-2 border-darkGreen border-solid border-2 outline-none"
            />
          </div>
          <div className="flex flex-col gap-2">
            <label className="text-xl">العصر</label>
            <input
              {...register("asr")}
              required
              type="time"
              className="p-2 border-darkGreen border-solid border-2 outline-none"
            />
          </div>
          <div className="flex flex-col gap-2">
            <label className="text-xl">المغرب</label>
            <input
              {...register("mgrb")}
              required
              type="time"
              className="p-2 border-darkGreen border-solid border-2 outline-none"
            />
          </div>
          <div className="flex flex-col gap-2">
            <label className="text-xl">العشاء</label>
            <input
              {...register("asha")}
              required
              type="time"
              className="p-2 border-darkGreen border-solid border-2 outline-none"
            />
          </div>

          <button className="text-lightBeige bg-black p-3 w-full">ادخال</button>
        </div>
      </form>
    </div>
  );
};

export default observer(NewDayForm);
