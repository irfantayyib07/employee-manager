import { Link, useLocation, useParams } from "react-router-dom";
import { SIDEBAR_NAV_LINKS } from "../constants/sidebarNavLinks";
import { useEffect } from "react";

function Sidebar({}) {
 const { pathname } = useLocation();

 useEffect(() => {
  const links = document.querySelectorAll("aside a") as NodeListOf<HTMLAnchorElement>;
  for (let i = 0; i < links.length; i++) {
   if (links[i].pathname === "/") links[i].focus();
   if (links[i].pathname === pathname) links[i].focus();
  }
 }, [pathname]);

 return (
  <>
   <aside className="bg-slate-200 md:h-screen p-4 md:basis-1/3 md:max-w-80">
    <div className="mb-4 select-none space-x-2 md:h-10">
     <img src="/logo.svg" alt="app logo" className="max-w-72" />
    </div>
    <ul className="space-y-2">
     {SIDEBAR_NAV_LINKS.map((link) => (
      <li key={link.path}>
       <Link
        to={link.path}
        className="inline-block w-full hover:bg-slate-300 p-2 transition rounded-md focus:bg-slate-300 focus:outline-none"
       >
        {link.name}
       </Link>
      </li>
     ))}
    </ul>
   </aside>
  </>
 );
}

export default Sidebar;
