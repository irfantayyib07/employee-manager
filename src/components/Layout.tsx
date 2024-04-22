import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";
import { AddEmployee } from "./AddEmployee";
import { Toaster } from "./ui/toaster";

function Layout({ }) {
 return (
  <>
   <div className="h-svh flex flex-col md:flex-row">
    <Sidebar />
    <Outlet />
    <AddEmployee />
    <Toaster />
   </div>
  </>
 );
}

export default Layout;
