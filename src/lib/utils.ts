import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
 return twMerge(clsx(inputs));
}

function idToEmployee(employees, id) {
 return employees.find((employee) => employee.id === id);
}

export function createNestedHierarchy(employees, parent) {
 if (!parent) {
  return null;
 }

 const result = { name: parent.name };

 if (parent.subordinates && parent.subordinates.length > 0) {
  result.children = parent.subordinates.map((subordinateId) => {
   return createNestedHierarchy(employees, idToEmployee(employees, subordinateId));
  });
 }

 return result;
}

export function getSubordinates(employees, employee) {
 const subordinates = [];
 employee.subordinates.map(subordinateId => {
  subordinates.push(idToEmployee(employees, subordinateId));
 })
 return subordinates
}