import IndirectCodeFormContainer from "@/components/admin/indirect-code/IndirectCodeFormContainer";
import IndirectCodeListContainer from "@/components/admin/indirect-code/IndirectCodeListContainer";
import LayoutContainer from "@/components/common/layout-container";

const User = () => {
  return (
    <LayoutContainer>
      <div className="w-full min-h-[200px] p-2 ">
        <IndirectCodeFormContainer />
      </div>
      <div className="w-full min-h-[400px] p-2 ">
        <IndirectCodeListContainer />
      </div>
      {/* <div className="flex-1 w-[99%] mb-1 justify-center items-center flex bg-white rounded-lg shadow-md ">
        <IndirectCodeListContainer />
      </div> */}
    </LayoutContainer>
  );
};

export default User;
