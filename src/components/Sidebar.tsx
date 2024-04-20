import { Link } from "react-router-dom";
import { SIDEBAR_NAV_LINKS } from "../constants/sidebarNavLinks";

function Sidebar({  }) {
 return (
  <>
   <aside className="bg-slate-200 h-screen p-4 basis-1/4">
    <div className="mb-4 select-none space-x-2"><img src="/logo.svg" alt="app logo" className="size-6 inline" /><span className="whitespace-nowrap">Employee Manager</span></div>
    <ul className="space-y-2">
     {
      SIDEBAR_NAV_LINKS.map(link => (
       <li key={link.path}>
        <Link to={link.path} className="inline-block w-full hover:bg-slate-300 p-2 transition rounded-md focus:bg-slate-300">{link.name}</Link>
       </li>
      ))
     }
    </ul>
   </aside>
  </>
 )
}

export default Sidebar
