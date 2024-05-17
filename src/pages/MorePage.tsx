/* eslint-disable react-refresh/only-export-components */
import { Container } from "@mui/material";
import MoreElementCircle from "../components/MoreElementCircle";
import transition from "../components/transition";

const MorePage = () => {
  const elements = [
    {
      title: "السبحة الالكترونية",
      imgsrc: "/tasbih (1).png",
      link: "/tasbih",
    },
    {
      title: "دعاء ختم القرآن",
      imgsrc: "/open-hands.png",
      link: "/khatm",
    },
  ];

  return (
    <Container maxWidth="sm" className="overflow-x-hidden py-10 ">
      <div className="grid grid-cols-1 gap-5">
        {elements.map((item) => (
          <MoreElementCircle
            key={item.title}
            title={item.title}
            imgSrc={item.imgsrc}
            link={item.link}
          />
        ))}
      </div>
    </Container>
  );
};

export default MorePage;
