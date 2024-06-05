import Image from "next/image";

const HoursToComplete = () => {
  // return <div>HoursToComplete</div>;
  return (
    <div className="w-full h-full flex justify-center items-center bg-white">
      <div className="w-[150px] h-150px">
        <Image
          src="/bg-waiting.jpeg"
          width={200}
          height={200}
          alt="LEFEBVRE"
          className="object-contain rounded-lg  "
        />
      </div>
    </div>
  );
};

export default HoursToComplete;
