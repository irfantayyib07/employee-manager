import { Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import Overview from "./components/Overview";
import Manage from "./components/Manage";

function App() {
 return (
  <>
   <Routes>
    <Route path="/" element={<Layout />}>
     <Route path="/" element={<Overview />} />
     <Route path="/manage" element={<Manage />} />
    </Route>
   </Routes>
  </>
 );
}

export default App;
