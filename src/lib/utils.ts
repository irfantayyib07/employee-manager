import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
 return twMerge(clsx(inputs));
}

// export function createNestedHierarchy(hierarchy) {
//  const root = hierarchy[0];

//  function buildHierarchy(node) {
//   const result = { name: node.name };

//   if (node.subordinates.length > 0) {
//    result.children = [];
//    node.subordinates.forEach(subordinate => {
//     result.children.push(buildHierarchy(subordinate));
//    });
//   }

//   return result;
//  }

//  return buildHierarchy(root);
// }

function idToEmployee(employees, id) {
 return employees.find(employee => employee.id === id);
}

export function createNestedHierarchy(employees, parent) {
 if (!parent) {
  return null;
 }

 const result = { name: parent.name };

 if (parent.subordinates && parent.subordinates.length > 0) {
  result.children = parent.subordinates.map(subordinateId => {
   return createNestedHierarchy(employees, idToEmployee(employees, subordinateId));
  });
 }

 return result;
}