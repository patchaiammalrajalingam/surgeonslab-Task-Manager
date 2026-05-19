import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";

import Login from "./pages/Login";

import UserDashboard from "./pages/UserDashboard";

import ProtectedRoute from "./components/ProtectedRoute";

import AdminDashboard from "./pages/admin/AdminDashboard";

import DashboardPage from "./pages/admin/DashboardPage";

import TaskListPage from "./pages/admin/TaskListPage";

import NewTaskPage from "./pages/admin/NewTaskPage";

import UserListPage from "./pages/admin/UserListPage";

import NewUserPage from "./pages/admin/NewUserPage";

import EditTaskPage from "./pages/admin/EditTaskPage";

import { AdminProvider } from "./context/AdminContext";
import UserUpdateTask from "./pages/UserUpdateTask";

function App() {

  return (

    <BrowserRouter>
  <Routes>

    {/* LOGIN */}
    <Route
      path="/"
      element={<Login />}
    />

    {/* ADMIN */}
    <Route
      path="/admin"
      element={
        <AdminProvider>
          <ProtectedRoute>
            <AdminDashboard />
          </ProtectedRoute>
        </AdminProvider>
      }
    >
      <Route index element={<DashboardPage />} />
      <Route path="tasks" element={<TaskListPage />} />
      <Route path="new-task" element={<NewTaskPage />} />
      <Route path="users" element={<UserListPage />} />
      <Route path="new-user" element={<NewUserPage />} />
      <Route path="edit-task/:id" element={<EditTaskPage />} />
    </Route>

    {/* USER */}
    <Route
      path="/user"
      element={
        <ProtectedRoute>
          <UserDashboard />
        </ProtectedRoute>
      }
    />

    <Route
      path="/user/tasks"
      element={
        <ProtectedRoute>
          <UserUpdateTask />
        </ProtectedRoute>
      }
    />

  </Routes>
</BrowserRouter>
  );
}

export default App;