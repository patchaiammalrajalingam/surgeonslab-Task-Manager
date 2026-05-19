import { Outlet } from "react-router-dom";

import Sidebar from "../../components/Sidebar";

const AdminDashboard = () => {

  return (

    <div className="flex">

      <Sidebar />

      <div className="flex-1 bg-slate-100 min-h-screen p-6">

        <Outlet />

      </div>
    </div>
  );
};

export default AdminDashboard;