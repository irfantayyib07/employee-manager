import SectionHeading from "./ui/section-heading";
import Tree from "react-d3-tree";
import { createNestedHierarchy } from "@/lib/utils";
import { useAppSelector } from "@/app/store";
import { selectAllEmployees, useGetEmployeesQuery } from "@/app/employeeApiSlice";
import Loader from "./ui/loader";

function OrgChartTree() {
 const { isLoading, isSuccess } = useGetEmployeesQuery();
 const employees = useAppSelector(selectAllEmployees);

 const orgChart = createNestedHierarchy(
  employees,
  employees.find((item) => item.supervisorId === "-"),
 );

 return (
  <>
   {isLoading && <Loader />}
   {!isLoading && !orgChart && (
    <p>
     Add employees in the Manage section or have some employee with no supervisor to see the hierarchy here
    </p>
   )}
   {isSuccess && orgChart && (
    <div id="treeWrapper" className="h-full border border-slate-300 rounded-md overflow-hidden">
     <Tree
      data={orgChart}
      orientation="vertical"
      depthFactor={200}
      separation={{ nonSiblings: 2, siblings: 2 }}
     />
    </div>
   )}
  </>
 );
}

function Hierarchy({}) {
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
