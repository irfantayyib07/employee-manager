import React from "react";
import { Separator } from "@/components/ui/separator";

function SectionHeading({ children }: { children: React.ReactNode }) {
 return (
  <>
   <div className="mb-4">
    <h1 className="text-2xl mb-4 font-bold md:h-10">{children}</h1>
    <Separator />
   </div>
  </>
 );
}

export default SectionHeading;
