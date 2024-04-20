import { Link } from "react-router-dom";
import { SIDEBAR_NAV_LINKS } from "../constants/sidebarNavLinks";

function Sidebar({  }) {
 return (
  <>
   <aside className="bg-slate-100 col-start-1 row-start-1 row-end-13 h-full p-4">
    <div className="whitespace-nowrap mb-4 select-none"><img src="/logo.svg" alt="app logo" className="size-6 inline" /> Employee Manager</div>
    <ul className="space-y-2">
     {
      SIDEBAR_NAV_LINKS.map(link => (
       <li key={link.path}>
        <Link to={link.path} className="">{link.name}</Link>
       </li>
      ))
     }
    </ul>
   </aside>
  </>
 )
}

export default Sidebar
