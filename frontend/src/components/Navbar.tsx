import {
  FaTasks,
  FaClipboardCheck,
  FaSignOutAlt,
  FaUserCircle,
} from "react-icons/fa";

import {
  NavLink,
  useNavigate,
} from "react-router-dom";

import {
  useContext,
} from "react";

import {
  AuthContext,
} from "../context/AuthContext";

const Navbar = () => {

  const {
    logout,
    user,
  } = useContext(AuthContext);

  const navigate =
    useNavigate();

  const handleLogout =
    () => {

      logout();

      navigate("/");
    };

  return (

    <nav
      className="
        sticky
        top-0
        z-50
        bg-gradient-to-r
        from-teal-700
        to-teal-500
        shadow-lg
        border-b
        border-teal-300
      "
    >

      <div
        className="
          max-w-7xl
          mx-auto
          px-4
          sm:px-6
          lg:px-8
        "
      >

        <div
          className="
            flex
            items-center
            justify-between
            h-16
            sm:h-20
          "
        >

          {/* LOGO */}

          <div
            className="
              flex
              items-center
              gap-3
            "
          >

            {/* <div
              className="
                w-10
                h-10
                sm:w-12
                sm:h-12
                rounded-2xl
                bg-white/20
                flex
                items-center
                justify-center
                backdrop-blur-lg
              "
            >

               <FaTasks
                className="
                  text-white
                  text-lg
                  sm:text-2xl
                "
              /> 
            </div> */}

            <div>

              <h1
                className="
                  text-lg
                  sm:text-2xl
                  font-bold
                  text-white
                  leading-none
                "
              >
                SurgeonsLab
              </h1>

              <p
                className="
                  text-[10px]
                  sm:text-xs
                  text-white/80
                  mt-1
                "
              >
                Task Management
              </p>
            </div>
          </div>

          {/* MENU */}

          <div
            className="
              flex
              items-center
              gap-2
              sm:gap-4
            "
          >

            {/* DASHBOARD */}

            <NavLink
              to="/user"
              className={({
                isActive,
              }) =>
                `
                flex
                items-center
                gap-2
                px-3
                sm:px-5
                py-2
                rounded-2xl
                text-sm
                sm:text-base
                font-medium
                transition-all
                duration-300
                ${
                  isActive
                    ? "bg-white text-teal-700 shadow-lg"
                    : "text-white hover:bg-white/15"
                }
              `
              }
            >

              <FaTasks />

              {/* <span className="hidden sm:block">
                Dashboard
              </span> */}
            </NavLink>

            {/* UPDATE TASK */}

            <NavLink
              to="/user/tasks"
              className="
                flex
                items-center
                gap-2
                px-3
                sm:px-5
                py-2
                rounded-2xl
                text-sm
                sm:text-base
                font-medium
                text-white
                hover:bg-white/15
                transition-all
                duration-300
              "
            >

              <FaClipboardCheck />

              {/* <span className="hidden sm:block">
                Update Task
              </span> */}
            </NavLink>

            {/* USER */}

            <div
              className="
                hidden
                md:flex
                items-center
                gap-2
                bg-white/15
                px-4
                py-2
                rounded-2xl
                backdrop-blur-lg
              "
            >

              <FaUserCircle
                className="
                  text-white
                  text-xl
                "
              />

              <span
                className="
                  text-white
                  text-sm
                  font-medium
                "
              >
                {user?.name}
              </span>
            </div>

            {/* LOGOUT */}

            <button
              onClick={
                handleLogout
              }
              className="
                flex
                items-center
                gap-2
                bg-red-500
                hover:bg-red-600
                text-white
                px-3
                sm:px-5
                py-2
                rounded-2xl
                transition-all
                duration-300
                hover:scale-105
                text-sm
                sm:text-base
                shadow-lg
              "
            >

              <FaSignOutAlt />

              <span className="hidden sm:block">
                Logout
              </span>
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;