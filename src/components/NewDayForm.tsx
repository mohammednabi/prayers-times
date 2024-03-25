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
          //   toast.success(`${data}`);
          //   console.log({ data });
          //   console.log();

          prayers
            .addDayTimes(new Date(data.fajr).getMonth(), data)
            .then(() => {
              toast.success("added succesfully");
            })
            .catch(() => {
              toast.error("failed to add");
            });
        })}
        className="flex flex-col items-center gap-5"
      >
        <div className="flex flex-col gap-2">
          <label className="text-xl">الفجر</label>
          <input
            {...register("fajr")}
            required
            type="datetime-local"
            className="p-2 border-darkGreen border-solid border-2 outline-none"
          />
        </div>
        <div className="flex flex-col gap-2">
          <label className="text-xl">الشروق</label>
          <input
            {...register("sunrise")}
            required
            type="datetime-local"
            className="p-2 border-darkGreen border-solid border-2 outline-none"
          />
        </div>
        <div className="flex flex-col gap-2">
          <label className="text-xl">الظهر</label>
          <input
            {...register("duhr")}
            required
            type="datetime-local"
            className="p-2 border-darkGreen border-solid border-2 outline-none"
          />
        </div>
        <div className="flex flex-col gap-2">
          <label className="text-xl">العصر</label>
          <input
            {...register("asr")}
            required
            type="datetime-local"
            className="p-2 border-darkGreen border-solid border-2 outline-none"
          />
        </div>
        <div className="flex flex-col gap-2">
          <label className="text-xl">المغرب</label>
          <input
            {...register("mgrb")}
            required
            type="datetime-local"
            className="p-2 border-darkGreen border-solid border-2 outline-none"
          />
        </div>
        <div className="flex flex-col gap-2">
          <label className="text-xl">العشاء</label>
          <input
            {...register("asha")}
            required
            type="datetime-local"
            className="p-2 border-darkGreen border-solid border-2 outline-none"
          />
        </div>

        <button className="text-lightBeige bg-black p-3 w-full">ادخال</button>
      </form>
    </div>
  );
};

export default observer(NewDayForm);
