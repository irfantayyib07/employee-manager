import { Button } from "@/components/ui/button";
import {
 Dialog,
 DialogContent,
 DialogDescription,
 DialogFooter,
 DialogHeader,
 DialogTitle,
 DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Pencil } from "lucide-react";
import {
 Select,
 SelectContent,
 SelectGroup,
 SelectItem,
 SelectLabel,
 SelectTrigger,
 SelectValue,
} from "@/components/ui/select";

export function SelectDemo() {
 return (
  <Select>
   <SelectTrigger className="w-[180px]">
    <SelectValue placeholder="Select a supervisor" />
   </SelectTrigger>
   <SelectContent>
    <SelectGroup>
     <SelectLabel>Supervisors</SelectLabel>
     <SelectItem value="apple">Apple</SelectItem>
     <SelectItem value="banana">Banana</SelectItem>
     <SelectItem value="blueberry">Blueberry</SelectItem>
     <SelectItem value="grapes">Grapes</SelectItem>
     <SelectItem value="pineapple">Pineapple</SelectItem>
    </SelectGroup>
   </SelectContent>
  </Select>
 );
}

export function EditEmployee({ employee }) {
 return (
  <Dialog>
   <DialogTrigger asChild>
   <Button className="rounded-full size-8 aspect-square p-0"><Pencil className="size-4" /></Button>
   </DialogTrigger>
   <DialogContent className="sm:max-w-[425px]">
    <DialogHeader>
     <DialogTitle>Add an employee</DialogTitle>
     <DialogDescription>
      Fill in the details of your employee. Click save when you're done.
     </DialogDescription>
    </DialogHeader>
    <div className="grid gap-4 py-4">
     <div className="grid grid-cols-4 items-center gap-4">
      <Label htmlFor="name" className="text-right">
       Name
      </Label>
      <Input
       id="name"
       defaultValue={employee.name}
       className="col-span-3"
      />
     </div>
     <div className="grid grid-cols-4 items-center gap-4">
      <Label htmlFor="username" className="text-right">
       Username
      </Label>
      <SelectDemo />
     </div>
    </div>
    <DialogFooter>
     <Button type="submit">Add</Button>
    </DialogFooter>
   </DialogContent>
  </Dialog>
 );
}
