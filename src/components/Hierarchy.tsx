import SectionHeading from "./ui/SectionHeading";
import { useSelector } from "react-redux";
import Tree from 'react-d3-tree';

const orgChart = {
 name: 'CEO',
 children: [
  {
   name: 'Manager',
   children: [
    {
     name: 'Foreman',
     children: [
      {
       name: 'Worker',
      },
     ],
    },
    {
     name: 'Foreman',
     children: [
      {
       name: 'Worker',
      },
     ],
    },
   ],
  },
 ],
};

function OrgChartTree() {
 return (
  // `<Tree />` will fill width/height of its container; in this case `#treeWrapper`.
  <div id="treeWrapper" style={{ width: '100%', height: '100%' }}>
   <Tree data={orgChart} />
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
