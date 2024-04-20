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
import { Plus } from "lucide-react";
import {
 Select,
 SelectContent,
 SelectGroup,
 SelectItem,
 SelectLabel,
 SelectTrigger,
 SelectValue,
} from "@/components/ui/select";
import { useAddNewEmployeeMutation } from "@/features/employeeApiSlice";
import { useState } from "react";

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

export function AddEmployee() {
 const [name, setName] = useState("");

 const onAddEmployeeClicked = async () => {
  try {
   await useAddNewEmployeeMutation({  }).unwrap();
  } catch (err) {
   console.error('Failed to add the employee', err);
  }
 };

 return (
  <Dialog>
   <DialogTrigger asChild>
    <Button className="rounded-full size-10 aspect-square p-0 absolute bottom-8 right-8"><Plus className="size-6" /></Button>
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
       value={name}
       onChange={e => setName(e.target.value)}
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
     <Button type="submit" onClick={onAddEmployeeClicked}>Add</Button>
    </DialogFooter>
   </DialogContent>
  </Dialog>
 );
}
