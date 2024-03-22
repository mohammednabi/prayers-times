import { ReactNode } from "react";
import { StoreContext } from "../contexts/StoreContext";
import { store } from "../stores";

interface iProps {
  children: ReactNode;
}
const StoreContextProvider = ({ children }: iProps) => {
  return (
    <StoreContext.Provider value={store}>{children}</StoreContext.Provider>
  );
};

export default StoreContextProvider;
