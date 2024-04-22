import React from "react";
import { Separator } from "@/components/ui/separator";

function SectionHeading({ children }: { children: React.ReactNode }) {
 return (
  <>
   <h1 className="text-2xl mb-4 font-bold md:h-10">{children}</h1>
   <Separator className="mb-4" />
  </>
 );
}

export default SectionHeading;
