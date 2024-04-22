import SectionHeading from "./ui/section-heading";
import Tree from "react-d3-tree";
import { createNestedHierarchy } from "@/lib/utils";
import { useSelector } from "react-redux";
import { selectAllEmployees } from "@/app/employeeApiSlice";
import { useEffect } from "react";

function OrgChartTree() {
 const employees = useSelector(selectAllEmployees);

 const orgChart = createNestedHierarchy(
  employees,
  employees.find((item) => item.supervisorId === "—"),
 );

 return (
  <>
   {!orgChart && <p>Add employees in the Manage section to see the hierarchy here</p>}
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
    <div className="">
     <SectionHeading>Hierarchy</SectionHeading>
    </div>
    <OrgChartTree />
   </main>

  </>
 );
}

export default Hierarchy;
