export interface User {
  _id: string;
  name: string;
  email: string;
  role: string;
}

export interface Task {
  _id: string;
  title: string;
  description: string;
  status: string;
  assignedTo?: User;
}