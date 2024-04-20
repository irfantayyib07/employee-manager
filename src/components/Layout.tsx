import { Outlet } from "react-router-dom";
import Header from "./Header";
import Sidebar from "./Sidebar";
import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button"
import { AddEmployee } from "./AddEmployee";

function Layout({ }) {
 return (
  <>
   <div className="flex max-h-screen">
    <Sidebar />
    <div className="flex flex-col w-full">
     {/* <Header /> */}
     <main className="bg-slate-100 p-4 h-screen overflow-auto">
      <Outlet />
     </main>
     <AddEmployee />
    </div>
   </div>
  </>
 );
}

export default Layout;
