import BreakFormContainer from "@/components/break/breakFormContainer";
import BreakFormListContainer from "@/components/break/breakFormListContainer";
import LayoutContainer from "@/components/common/layout-container";

const Break = () => {
  // const session = await auth();

  return (
    <LayoutContainer>
      <div className="w-full h-auto ">
        <BreakFormContainer />
      </div>
      <div className="flex-1 w-[99%] mb-1 justify-center items-center flex bg-white">
        <BreakFormListContainer />
      </div>
    </LayoutContainer>
  );
};

export default Break;
