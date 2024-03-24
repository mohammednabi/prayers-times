/* eslint-disable react-refresh/only-export-components */
import { useContext, useState } from "react";
import { useForm } from "react-hook-form";

import { FaEye, FaEyeSlash } from "react-icons/fa";
import { StoreContext } from "../contexts/StoreContext";
import { observer } from "mobx-react-lite";

const Admin = () => {
  const { user } = useContext(StoreContext);
  const [showPassword, setShowPassword] = useState(false);

  const { register, handleSubmit } = useForm();

  const togglePassword = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div
      id="admin-body"
      className="container w-full h-screen bg-darkGreen flex  justify-center items-center "
    >
      <form
        onSubmit={handleSubmit((data) => {
          user.signIn(data.email, data.password);
        })}
        className="flex flex-col gap-5 w-1/3"
      >
        <label htmlFor="user-email" className="text-lightBeige">
          الحساب الالكتروني
        </label>
        <input
          {...register("email")}
          id="user-email"
          type="email"
          inputMode="email"
          required
          className="bg-lightBeige p-2 border-none outline-none font-bold font-mono "
        />
        <label htmlFor="user-pass" className="text-lightBeige">
          كلمة المرور
        </label>
        <div className="w-full flex items-center ">
          <input
            {...register("password")}
            id="user-pass"
            type={showPassword ? "text" : "password"}
            required
            className="bg-lightBeige w-full  p-2 border-none outline-none font-bold font-mono"
          />
          <div
            className="bg-lightBeige p-3   cursor-pointer"
            onClick={togglePassword}
          >
            {showPassword ? <FaEyeSlash /> : <FaEye />}
          </div>
        </div>
        <h1 className="text-red-500 text-lg ">{user.errorMessage}</h1>
        <button className="text-lightBeige bg-black w-1/4 p-2">ادخال</button>
      </form>
    </div>
  );
};

export default observer(Admin);
