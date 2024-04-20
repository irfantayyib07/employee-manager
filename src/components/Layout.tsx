import { Outlet } from "react-router-dom";
import Header from "./Header";
import Sidebar from "./Sidebar";

function Layout({ }) {
 return (
  <>
   <div className="grid grid-cols-4 grid-rows-10 h-screen">
    <Header />
    <Outlet />
    <Sidebar />
   </div>
  </>
 );
}

export default Layout;
