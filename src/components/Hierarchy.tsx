import SectionHeading from "./ui/section-heading";
import Tree from "react-d3-tree";
import { createNestedHierarchy } from "@/lib/utils";
import { useSelector } from "react-redux";
import { selectAllEmployees, useGetEmployeesQuery } from "@/app/employeeApiSlice";
import Loader from "./ui/loader";

function OrgChartTree() {
 const { isLoading } = useGetEmployeesQuery();
 const employees = useSelector(selectAllEmployees);

 const orgChart = createNestedHierarchy(
  employees,
  employees.find((item) => item.supervisorId === "—"),
 );

 return (
  <>
   {isLoading &&
    <Loader />
   }
   {!isLoading && !orgChart && <p>Add employees in the Manage section to see the hierarchy here</p>}
   {orgChart &&
    <div id="treeWrapper" className="flex-stretch border border-slate-300 rounded-md overflow-hidden">
     <Tree data={orgChart} orientation="vertical" depthFactor={170} />
    </div>
   }
  </>
 );
}

function Hierarchy({ }) {
 return (
  <>
   <main className="bg-slate-100 p-4 basis-2/3 grow flex flex-col">
    <SectionHeading>Hierarchy</SectionHeading>
    <div className="relative flex-stretch">
     <OrgChartTree />
    </div>
   </main>

  </>
 );
}

export default Hierarchy;
