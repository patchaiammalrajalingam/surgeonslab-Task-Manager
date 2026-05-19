import { motion } from "framer-motion";

import {
  FaTasks,
  FaUsers,
  FaClipboardList,
  FaSpinner,
} from "react-icons/fa";

import { useAdmin } from "../../context/AdminContext";

const DashboardPage = () => {

  const {
    users,
    tasks,
  } = useAdmin();

  const completedTasks =
    tasks.filter(
      (task) =>
        task.status ===
        "Completed"
    ).length;

  const pendingTasks =
    tasks.filter(
      (task) =>
        task.status ===
        "Pending"
    ).length;

  const inProgressTasks =
    tasks.filter(
      (task) =>
        task.status ===
        "In Progress"
    ).length;

  const dashboardCards = [
    {
      title: "Total Users",
      count: users.length,
      icon: <FaUsers />,
      bg: "from-cyan-500 to-teal-500",
    },

    {
      title: "Total Tasks",
      count: tasks.length,
      icon: <FaTasks />,
      bg: "from-indigo-500 to-blue-500",
    },

    {
      title: "Completed",
      count: completedTasks,
      icon:
        <FaClipboardList />,
      bg: "from-green-500 to-emerald-500",
    },

    {
      title: "Pending",
      count: pendingTasks,
      icon: <FaTasks />,
      bg: "from-red-500 to-pink-500",
    },

    {
      title: "In Progress",
      count: inProgressTasks,
      icon: <FaSpinner />,
      bg: "from-orange-400 to-amber-500",
    },
  ];

  return (

    <motion.div
      initial={{
        opacity: 0,
        y: 20,
      }}
      animate={{
        opacity: 1,
        y: 0,
      }}
      transition={{
        duration: 0.4,
      }}
      className="space-y-8"
    >

      {/* HEADER */}

      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">

        <div>

          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-teal-700">
            Dashboard
          </h1>

          <p className="text-gray-500 mt-2 text-sm sm:text-base">
            Welcome back Admin
          </p>
        </div>
      </div>

      {/* HERO CARD */}

      <div className="bg-gradient-to-r from-teal-700 to-teal-500 rounded-3xl p-6 sm:p-8 lg:p-10 text-white shadow-2xl relative overflow-hidden">

        <div className="absolute top-0 right-0 w-72 h-72 bg-white/10 rounded-full blur-3xl"></div>

     <div className="relative z-10 flex flex-col items-center justify-center text-center h-full">

          <h2 className="text-2xl sm:text-3xl lg:text-5xl font-bold leading-tight">
            Surgeons Lab
          </h2>
             <p className="mt-4 text-sm sm:text-base md:text-md text-white/80 max-w-2xl leading-6">
            Advanced Medical Task
            Management Dashboard
            for Admin Monitoring
            and Staff Management.
          </p>
          
        </div>
      </div>

      {/* STATS CARDS */}

      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-5 gap-5">

        {dashboardCards.map(
          (card, index) => (

            <motion.div
              key={index}
              whileHover={{
                y: -5,
              }}
              className="bg-white rounded-3xl p-5 sm:p-6 shadow-lg hover:shadow-2xl transition-all duration-300 border border-slate-100"
            >

              <div className="flex items-center justify-between">

                <div>

                  <p className="text-gray-500 text-sm sm:text-base">
                    {card.title}
                  </p>

                  <h2 className="text-3xl sm:text-4xl font-bold text-slate-800 mt-3">
                    {card.count}
                  </h2>
                </div>

                <div
                  className={`w-14 h-14 sm:w-16 sm:h-16 rounded-2xl bg-gradient-to-r ${card.bg} text-white flex items-center justify-center text-2xl shadow-lg`}
                >

                  {card.icon}

                </div>
              </div>
            </motion.div>
          )
        )}
      </div>

      {/* TASK STATUS SECTION */}

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

        {/* COMPLETED */}

        {/* <div className="bg-white rounded-3xl p-6 shadow-lg border-l-[6px] border-green-500">

          <h2 className="text-lg font-semibold text-slate-700">
            Completed Tasks
          </h2>

          <p className="text-5xl font-bold text-green-500 mt-5">
            {completedTasks}
          </p>
        </div> */}

        {/* PENDING */}

        {/* <div className="bg-white rounded-3xl p-6 shadow-lg border-l-[6px] border-red-500">

          <h2 className="text-lg font-semibold text-slate-700">
            Pending Tasks
          </h2>

          <p className="text-5xl font-bold text-red-500 mt-5">
            {pendingTasks}
          </p>
        </div> */}

        {/* IN PROGRESS */}

        {/* <div className="bg-white rounded-3xl p-6 shadow-lg border-l-[6px] border-orange-500">

          <h2 className="text-lg font-semibold text-slate-700">
            In Progress
          </h2>

          <p className="text-5xl font-bold text-orange-500 mt-5">
            {inProgressTasks}
          </p>
        </div> */}
      </div>
    </motion.div>
  );
};

export default DashboardPage;