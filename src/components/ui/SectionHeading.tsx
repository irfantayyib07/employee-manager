import React from "react";

function SectionHeading({ children }: { children: React.ReactNode; }) {
 return (
  <>
   <h1 className="text-2xl mb-4 font-bold">
    {children}
   </h1>
  </>
 );
}

export default SectionHeading;
