import { Link } from "react-router-dom";

interface iProps {
  imgSrc: string;
  title: string;
  link: string;
}

const MoreElementCircle = ({ imgSrc, title, link }: iProps) => {
  return (
    <Link to={link}>
      <div className="flex flex-col gap-2 justify-center items-center cursor-pointer">
        <div className="w-20 aspect-square border-[3px] border-solid border-darkGreen rounded-full overflow-hidden bg-lightBeige p-3">
          <img src={imgSrc} alt="" className="w-full h-full" />
        </div>
        <h1 className="text-xl text-darkGreen text-center">{title}</h1>
      </div>
    </Link>
  );
};

export default MoreElementCircle;
