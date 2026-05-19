import {
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";

import API from "../services/api";

import type {
  Task,
  User,
} from "../types";

interface AdminContextType {
  users: User[];
  tasks: Task[];
  fetchData: () => void;
  setTasks: React.Dispatch<
    React.SetStateAction<Task[]>
  >;
}

const AdminContext =
  createContext<AdminContextType>(
    {} as AdminContextType
  );

export const AdminProvider = ({
  children,
}: any) => {

  const [users, setUsers] =
    useState<User[]>([]);

  const [tasks, setTasks] =
    useState<Task[]>([]);

  const fetchData = async () => {

    try {

      const userRes =
        await API.get("/users");

      const taskRes =
        await API.get("/tasks");

      setUsers(userRes.data);

      setTasks(taskRes.data);

    } catch (error) {

      console.log(error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (

    <AdminContext.Provider
      value={{
        users,
        tasks,
        fetchData,
        setTasks,
      }}
    >
      {children}
    </AdminContext.Provider>
  );
};

export const useAdmin =
  () => useContext(AdminContext);