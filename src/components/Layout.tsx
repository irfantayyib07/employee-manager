import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";
import { AddEmployee } from "./AddEmployee";
import { Toaster } from "./ui/toaster";

function Layout({ }) {
 return (
  <>
   <div className="max-h-screen md:flex">
    <Sidebar />
    <div className="flex flex-col w-full basis-2/3 grow">
     <main className="bg-slate-100 p-4 min-h-screen md:h-screen md:overflow-auto">
      <Outlet />
     </main>
     <AddEmployee />
    </div>
    <Toaster />
   </div>
  </>
 );
}

export default Layout;
