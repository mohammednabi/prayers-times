import NewDayForm from "../components/NewDayForm";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const AdminDashboard = () => {
  return (
    <div
      id="dashboard"
      className="flex justify-center items-center h-screen w-full"
    >
      <NewDayForm />
      <ToastContainer />
    </div>
  );
};

export default AdminDashboard;
