import SectionHeading from "./ui/SectionHeading";
import Tree from 'react-d3-tree';
import { createNestedHierarchy } from "@/lib/utils";
import { useSelector } from "react-redux";
import { selectAllEmployees } from "@/app/employeeApiSlice";

function OrgChartTree() {
 const employees = useSelector(selectAllEmployees);

 const orgChart = createNestedHierarchy(employees, employees.find(item => item.supervisorId === "—"));
 // console.log(JSON.stringify(result, null, 3));

 return (
  // `<Tree />` will fill width/height of its container; in this case `#treeWrapper`.
  <div id="treeWrapper" style={{ width: '100%', height: '100%' }}>
   {orgChart && <Tree data={orgChart} />}
  </div>
 );
}

function Hierarchy({ }) {
 return (
  <>
   <SectionHeading>
    Hierarchy
   </SectionHeading>
   <OrgChartTree />
  </>
 );
}

export default Hierarchy;
