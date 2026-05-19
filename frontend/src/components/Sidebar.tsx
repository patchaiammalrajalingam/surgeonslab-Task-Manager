import {
  useState,
} from "react";

import {
  FaTasks,
  FaPlus,
  FaClipboardList,
  FaUserMd,
  FaBars,
  FaUser,
  FaSignOutAlt,
} from "react-icons/fa";

import {
  Link,
  useLocation,
  useNavigate,
} from "react-router-dom";

const Sidebar = () => {

  const location =
    useLocation();

  const navigate =
    useNavigate();

  const [
    sidebarOpen,
    setSidebarOpen,
  ] = useState(true);

  const menuItems = [
    {
      title: "Dashboard",
      icon: <FaTasks />,
      path: "/admin",
    },

    {
      title: "New Task",
      icon: <FaPlus />,
      path: "/admin/new-task",
    },

    {
      title: "Task List",
      icon:
        <FaClipboardList />,
      path: "/admin/tasks",
    },

    {
      title: "User List",
      icon: <FaUser />,
      path: "/admin/users",
    },

    {
      title: "New User",
      icon: <FaUserMd />,
      path: "/admin/new-user",
    },
  ];

  /* LOGOUT FUNCTION */

  const handleLogout = () => {

    // REMOVE TOKEN

    localStorage.removeItem(
      "token"
    );

    localStorage.removeItem(
      "user"
    );

    // REDIRECT LOGIN

    navigate("/");

    // REFRESH APP

    window.location.reload();
  };

  return (

    <div
      className={`
        h-screen
        sticky top-0
        bg-gradient-to-b
        from-[#0F766E]
        to-[#115E59]
        text-white
        shadow-2xl
        transition-all
        duration-300
        flex
        flex-col
        
        ${
         sidebarOpen
  ? "w-[220px]"
  : "w-[75px]"
        }
      `}
    >

      {/* HEADER */}

      <div className="h-20 flex items-center justify-between px-5 border-b border-white/10">

        {sidebarOpen && (

          <div>

            <h1 className="text-xl font-bold">
              Surgeons Lab
            </h1>

          </div>
        )}

        <button
          onClick={() =>
            setSidebarOpen(
              !sidebarOpen
            )
          }
          className="text-xl"
        >
          <FaBars />
        </button>
      </div>

      {/* MENU */}

      <div className="flex-1 p-3 space-y-2">

  {menuItems.map(
    (item) => (

      <Link
        key={item.title}
        to={item.path}
        className={`
          flex items-center
          gap-3
          p-3
          rounded-xl
          transition-all
          duration-300
          
          ${
            location.pathname ===
            item.path
              ? "bg-white text-[#0F766E]"
              : "hover:bg-white/10"
          }
        `}
      >

        {/* ICON */}

        <div className="text-lg min-w-[24px] flex justify-center">

          {item.icon}

        </div>

        {/* TEXT */}

        {sidebarOpen && (

          <span className="font-medium text-sm whitespace-nowrap">

            {item.title}

          </span>
        )}
      </Link>
    )
  )}
</div>
      {/* FOOTER */}

     <div className="p-3 border-t border-white/10 space-y-3">

  {/* ADMIN */}

  <div
    className={`
      flex items-center gap-2
      
      ${
        sidebarOpen
          ? "justify-start"
          : "justify-center"
      }
    `}
  >

    <div className="w-10 h-10 rounded-full bg-white text-[#0F766E] flex items-center justify-center font-bold text-sm">

      A

    </div>

    {sidebarOpen && (

      <div>

        <h2 className="font-medium text-sm">
          Admin
        </h2>
      </div>
    )}
  </div>

  {/* LOGOUT */}

  <button
    onClick={handleLogout}
    className="w-full flex items-center gap-3 bg-red-500 hover:bg-red-600 transition-all duration-300 p-3 rounded-xl"
  >

    <div className="text-lg min-w-[24px] flex justify-center">

      <FaSignOutAlt />

    </div>

    {sidebarOpen && (

      <span className="font-medium text-sm">

        Logout

      </span>
    )}
  </button>
</div>
    </div>
  );
};

export default Sidebar;