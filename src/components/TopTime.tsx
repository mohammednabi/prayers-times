const TopTime = () => {
  const todayDate = new Date();

  return (
    <div className="w-full text-darkGreen  flex justify-center">
      <div className="flex flex-col  items-center">
        {/* <h1 className="">{time}</h1> */}
        <div className="flex gap-2 font-bold text-3xl">
          <h1 className="text-center">
            {todayDate.toLocaleDateString("ar-EG", {
              weekday: "long",
              day: "numeric",
              month: "long",
            })}
          </h1>
        </div>
        <div className="flex gap-2 font-bold text-lg opacity-50">
          <h1 className="text-center">
            {todayDate.toLocaleDateString("ar-SA", {
              month: "long",
              day: "numeric",
              year: "numeric",
            })}
          </h1>
        </div>
      </div>
    </div>
  );
};

export default TopTime;
