import { Outlet } from "react-router-dom";
import Header from "./Header";
import Sidebar from "./Sidebar";

function Layout({ }) {
 return (
  <>
   <div className="flex">
    <Sidebar />
    <div className="flex flex-col w-full">
     {/* <Header /> */}
     <main className="bg-slate-100 p-4 h-full">
     <Outlet />
     </main>
    </div>
   </div>
  </>
 );
}

export default Layout;
