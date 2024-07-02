"use client";
import CapacityUtilisationListContainer from "@/components/production/report/capacity_utlisation/capacity_utilisationListContainer";
import LayoutContainer from "@/components/common/layout-container";
import BackButton from "@/components/common/back-button";
import Image from "next/image";

const CapacityUtilisation = () => {
  return (
    // <LayoutContainer>
    //   <BackButton />
    //   <div className="w-full min-h-[400px] p-2 ">
    //     <CapacityUtilisationListContainer />
    //   </div>

    // </LayoutContainer>
    <div className="w-full h-full flex flex-col">
      <div className="h-[10%]">
        <BackButton />
      </div>
      <div className="flex-1 flex justify-center items-center bg-white">
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
    </div>
  );
};

export default CapacityUtilisation;
