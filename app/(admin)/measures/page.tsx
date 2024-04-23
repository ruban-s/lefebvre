
import LayoutContainer from "@/components/common/layout-container";
import MeasureFormContainer from "@/components/admin/measures/measureFormContainer";
import MeasureListContainer from "@/components/admin/measures/measureListContainer";

const Measures = () => {
  return (
    <LayoutContainer>
      <div className="w-full min-h-[200px] p-2 ">
        <MeasureFormContainer />
      </div>
      <div className="w-full min-h-[400px] p-2 ">
        <MeasureListContainer />
      </div>
    </LayoutContainer>
  );
};

export default Measures;
