import { Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import EmployeesOverview from "./components/EmployeesOverview";
import ManageEmployees from "./components/ManageEmployees";

function App() {
 return (
  <>
   <Routes>
    <Route path="/" element={<Layout />}>
     <Route path="/" element={<EmployeesOverview />} />
     <Route path="/manage" element={<ManageEmployees />} />
    </Route>
   </Routes>
  </>
 );
}

export default App;
