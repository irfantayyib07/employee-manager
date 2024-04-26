import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
 return twMerge(clsx(inputs));
}

function idToEmployee(employees: Employee[], id: string) {
 return employees.find((employee) => employee.id === id);
}

type HierarchyNode = {
 name: string;
 children?: HierarchyNode[];
};

export function createNestedHierarchy(employees: Employee[], parent: Employee): HierarchyNode {
 if (!parent) {
  return null;
 }

 const result: HierarchyNode = {
  name: parent.name,
 };

 if (parent.subordinates && parent.subordinates.length > 0) {
  result.children = parent.subordinates.map((subordinateId: string) => {
   return createNestedHierarchy(employees, idToEmployee(employees, subordinateId));
  });
 }

 return result;
}

export function getSubordinates(employees: Employee[], employee: Employee) {
 const subordinates = [];
 employee.subordinates.map((subordinateId) => {
  subordinates.push(idToEmployee(employees, subordinateId));
 });
 return subordinates;
}
