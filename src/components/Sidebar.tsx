import { NavLink } from "react-router-dom";
import { SIDEBAR_NAV_LINKS } from "../constants/sidebarNavLinks";

function Sidebar({}) {
 return (
  <>
   <aside className="bg-slate-200 md:h-screen p-4 md:basis-1/3 md:max-w-80">
    <div className="mb-4 select-none space-x-2 md:h-10">
     <img src="/logo.svg" alt="app logo" className="max-w-72" />
    </div>
    <ul className="space-y-2">
     {SIDEBAR_NAV_LINKS.map((link) => (
      <li key={link.path}>
       <NavLink
        to={link.path}
        className={({ isActive }) =>
         [
          "inline-block w-full hover:bg-slate-300 p-2 transition rounded-md focus:bg-slate-300 focus:outline-none",
           isActive ? "bg-slate-300 outline-none" : "",
         ].join(" ")
       }
       >
        {link.name}
       </NavLink>
      </li>
     ))}
    </ul>
   </aside>
  </>
 );
}

export default Sidebar;
