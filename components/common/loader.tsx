import { FaCog } from "react-icons/fa";
const Loader = () => {
  return (
    <main>
      {/* <div className="relative w-[100px] h-[100px] ">
        <FaCog
          className=" animate-spin text-lg w-[100px] absolute right-8 text-theme m-1"
          size={48}
        />
        <FaCog
          className=" animate-spin text-lg w-[100px] absolute text-theme "
          size={28}
        />
        <FaCog
          className=" animate-spin text-lg w-[100px] absolute top-6 right-0 text-theme  m-1"
          size={18}
        />
      </div> */}
      <div className="flex flex-row">
        <FaCog className=" animate-spin text-lg text-theme" size={48} />
        <div>
          <FaCog className=" animate-spin text-lg  text-theme" size={28} />
          <FaCog className=" animate-spin text-lg text-theme" size={18} />
        </div>
      </div>
    </main>
  );
};

export default Loader;
