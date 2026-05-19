import {
  useEffect,
  useState,
} from "react";

import API from "../services/api";

import Navbar from "../components/Navbar";
import type { Task } from "../types";

import {
  motion,
} from "framer-motion";

import {
  FaTasks,
  FaCheckCircle,
  FaSpinner,
  FaClock,
} from "react-icons/fa";

const UserDashboard = () => {

  const [tasks, setTasks] =
    useState<Task[]>([]);

  const fetchTasks =
    async () => {

      try {

        const res =
          await API.get(
            "/tasks"
          );

        setTasks(res.data);

      } catch (error) {

        console.log(error);
      }
    };

  useEffect(() => {

    fetchTasks();

  }, []);


  return (

    <div className="
      min-h-screen
      bg-[#F0FDFA]
    ">

      {/* NAVBAR */}

      <Navbar />

      {/* MAIN */}

      <div className="
        p-4
        sm:p-6
        lg:p-8
        max-w-7xl
        mx-auto
      ">

        {/* HERO */}

        <motion.div
          initial={{
            opacity: 0,
            y: 20,
          }}
          animate={{
            opacity: 1,
            y: 0,
          }}
          className="
            bg-gradient-to-r
            from-teal-700
            to-teal-500
            rounded-[30px]
            p-6
            sm:p-8
            lg:p-10
            text-white
            shadow-[0_0_30px_rgba(13,148,136,0.25)]
            relative
            overflow-hidden
            mb-8
          "
        >

          {/* BG EFFECT */}

          <div className="
            absolute
            top-0
            right-0
            w-72
            h-72
            bg-white/10
            rounded-full
            blur-3xl
          "></div>

          <div className="
            relative
            z-10
            text-center
          ">

            <h1 className="
              text-3xl
              sm:text-4xl
              lg:text-5xl
              font-bold
            ">
              User Dashboard
            </h1>

            <p className="
              mt-3
              text-sm
              sm:text-base
              text-white/80
              max-w-2xl
              mx-auto
            ">
              Manage your assigned
              medical tasks and
              update the task
              progress easily.
            </p>
          </div>
        </motion.div>

        {/* STATS */}

        <div className="
          grid
          grid-cols-2
          lg:grid-cols-4
          gap-4
          sm:gap-6
          mb-8
        ">

          {/* TOTAL */}

          <motion.div
            whileHover={{
              y: -5,
            }}
            className="
              bg-white
              rounded-3xl
              p-5
              sm:p-6
              border
              border-teal-100
              shadow-[0_0_20px_rgba(13,148,136,0.08)]
            "
          >

            <FaTasks className="
              text-3xl
              sm:text-4xl
              text-teal-600
              mb-4
            " />

            <h2 className="
              text-2xl
              sm:text-4xl
              font-bold
              text-slate-800
            ">
              {tasks.length}
            </h2>

            <p className="
              text-slate-500
              mt-2
              text-sm
              sm:text-base
            ">
              Total Tasks
            </p>
          </motion.div>

          {/* PENDING */}

          <motion.div
            whileHover={{
              y: -5,
            }}
            className="
              bg-white
              rounded-3xl
              p-5
              sm:p-6
              border
              border-red-100
              shadow-[0_0_20px_rgba(239,68,68,0.08)]
            "
          >

            <FaClock className="
              text-3xl
              sm:text-4xl
              text-red-500
              mb-4
            " />

            <h2 className="
              text-2xl
              sm:text-4xl
              font-bold
              text-slate-800
            ">

              {
                tasks.filter(
                  (task) =>
                    task.status ===
                    "Pending"
                ).length
              }

            </h2>

            <p className="
              text-slate-500
              mt-2
              text-sm
              sm:text-base
            ">
              Pending
            </p>
          </motion.div>

          {/* IN PROGRESS */}

          <motion.div
            whileHover={{
              y: -5,
            }}
            className="
              bg-white
              rounded-3xl
              p-5
              sm:p-6
              border
              border-yellow-100
              shadow-[0_0_20px_rgba(245,158,11,0.08)]
            "
          >

            <FaSpinner className="
              text-3xl
              sm:text-4xl
              text-yellow-500
              mb-4
            " />

            <h2 className="
              text-2xl
              sm:text-4xl
              font-bold
              text-slate-800
            ">

              {
                tasks.filter(
                  (task) =>
                    task.status ===
                    "In Progress"
                ).length
              }

            </h2>

            <p className="
              text-slate-500
              mt-2
              text-sm
              sm:text-base
            ">
              In Progress
            </p>
          </motion.div>

          {/* COMPLETED */}

          <motion.div
            whileHover={{
              y: -5,
            }}
            className="
              bg-white
              rounded-3xl
              p-5
              sm:p-6
              border
              border-green-100
              shadow-[0_0_20px_rgba(34,197,94,0.08)]
            "
          >

            <FaCheckCircle className="
              text-3xl
              sm:text-4xl
              text-green-500
              mb-4
            " />

            <h2 className="
              text-2xl
              sm:text-4xl
              font-bold
              text-slate-800
            ">

              {
                tasks.filter(
                  (task) =>
                    task.status ===
                    "Completed"
                ).length
              }

            </h2>

            <p className="
              text-slate-500
              mt-2
              text-sm
              sm:text-base
            ">
              Completed
            </p>
          </motion.div>
        </div>

       
      </div>
    </div>
  );
};

export default UserDashboard;