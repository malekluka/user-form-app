export interface User {
    id: number;
    firstName: string;
    lastName: string;
    username: string;
    email: string;
    birthdate: string;
    address1: string;
    address2: string;
    phoneNumber: string;
    department: number;
    jobTitle: number;
    profilePic: string; // Store Base64 Image
  }
  
  export const departments = [
    { id: 1, name: 'HR' },
    { id: 2, name: 'IT' },
    { id: 3, name: 'Finance' },
    {id: 4, name: 'Marketing' },
    {id: 5 , name: 'Sales' },
    {id: 6 , name: 'Production' }
  ];
  
  export const jobTitles = [
    { id: 1, title: 'Manager' },
    { id: 2, title: 'Developer' },
    { id: 3, title: 'Accountant' },
    { id: 4, title: 'Analyst' },
    { id: 5, title: 'Database Administrator' },
    { id: 6, title: 'Security Analyst' },
    { id: 7, title: 'Help Desk Technician' },
  ];
  