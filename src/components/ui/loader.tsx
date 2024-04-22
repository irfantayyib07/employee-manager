import { Oval } from "react-loader-spinner";

function Loader({ }) {
 return (
  <>
   <Oval
    visible={true}
    height="40"
    width="40"
    color="#94a3b8"
    secondaryColor="#94a3b8"
    ariaLabel="oval-loading"
    wrapperClass="absolute left-1/2 top-[40%] -translate-x-1/2 -translate-y-[40%]"
   />
  </>
 );
}

export default Loader;
