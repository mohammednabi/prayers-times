/* eslint-disable react-refresh/only-export-components */
import { Container } from "@mui/material";
import SalahTime from "../components/SalahTime";
import TopTime from "../components/TopTime";
import SalawatAllTimes from "../components/SalawatAllTimes";
import transition from "../components/transition";

const Home = () => {
  return (
    <Container maxWidth="sm" className="overflow-x-hidden pb-10">
      {/* <div className="w-full h-full absolute mix-blend-multiply opacity-25">
        <img
          src="/overlay.jpg"
          alt=""
          className="w-full h-full object-contain"
        />
      </div> */}
      <div className="w-full h-full px-10 py-5 relative">
        <TopTime />
        <SalahTime />
        <SalawatAllTimes />
      </div>
    </Container>
  );
};

export default transition(Home);
