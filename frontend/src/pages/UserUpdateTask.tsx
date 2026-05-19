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

const UserUpdateTask = () => {

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

  const updateStatus =
    async (
      id: string,
      status: string
    ) => {

      try {

        await API.put(
          `/tasks/${id}`,
          {
            status,
          }
        );

        fetchTasks();

      } catch (error) {

        console.log(error);
      }
    };

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


        {/* TASK LIST */}

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
            bg-white
            rounded-[30px]
            border
            border-teal-100
            shadow-[0_0_25px_rgba(13,148,136,0.08)]
            overflow-hidden
          "
        >

          {/* HEADER */}

          <div className="
            bg-gradient-to-r
            from-teal-700
            to-teal-500
            text-white
            p-5
            sm:p-6
          ">

            <h2 className="
              text-2xl
              sm:text-3xl
              font-bold
              text-center
            ">
              Assigned Tasks
            </h2>

            <p className="
              text-center
              text-white/80
              mt-2
              text-sm
              sm:text-base
            ">
              View and update your
              assigned tasks
            </p>
          </div>

          {/* TASK CARDS */}

        <div className="
  p-4
  sm:p-6
  grid
  grid-cols-1
  xl:grid-cols-2
  gap-6
">

  {tasks.length > 0 ? (

    tasks.map((task) => (

      <div
        key={task._id}
        className="
          bg-white
          rounded-3xl
          border
          border-teal-100
          shadow-[0_8px_30px_rgba(13,148,136,0.08)]
          hover:shadow-[0_12px_40px_rgba(13,148,136,0.15)]
          transition-all
          duration-300
          overflow-hidden
          group
        "
      >

        {/* TOP STATUS BAR */}

        <div
          className={`
            h-2
            ${
              task.status === "Completed"
                ? "bg-gradient-to-r from-green-500 to-emerald-400"
                : task.status === "In Progress"
                ? "bg-gradient-to-r from-yellow-400 to-orange-400"
                : "bg-gradient-to-r from-red-400 to-pink-400"
            }
          `}
        ></div>

        {/* CONTENT */}

        <div className="p-6">

          {/* TITLE */}

          <div className="
            flex
            items-start
            justify-between
            gap-4
            mb-4
          ">

            <h2 className="
              text-2xl
              font-bold
              text-slate-800
              group-hover:text-teal-600
              transition-colors
            ">
              {task.title}
            </h2>

            {/* STATUS BADGE */}



            <span
              className={`
                px-4
                py-1.5
                rounded-full
                text-sm
                font-semibold
                shadow-sm
                ${
                  task.status === "Completed"
                    ? "bg-green-100 text-green-700"
                    : task.status === "In Progress"
                    ? "bg-yellow-100 text-yellow-700"
                    : "bg-red-100 text-red-700"
                }
              `}
            >
             
             
            <select
              value={task.status}
              onChange={(e) =>
                updateStatus(
                  task._id,
                  e.target.value
                )
              }
              className={`
                px-4
                py-2.5
                rounded-xl
                text-sm
                font-semibold
                border-0
                outline-none
                cursor-pointer
                transition-all
                duration-300
                ${
                  task.status === "Completed"
                    ? "bg-green-100 text-green-700"
                    : task.status === "In Progress"
                    ? "bg-yellow-100 text-yellow-700"
                    : "bg-red-100 text-red-700"
                }
              `}
            >

              <option value="Pending">
                Pending
              </option>

              <option value="In Progress">
                In Progress
              </option>

              <option value="Completed">
                Completed
              </option>

            </select>
            </span>

          </div>

          {/* DESCRIPTION */}

          <p className="
            text-slate-600
            leading-relaxed
            text-sm
            sm:text-base
            mb-6
          ">
            {task.description}
          </p>

          {/* FOOTER */}

          <div className="
            flex
            items-center
            justify-between
            flex-wrap
            gap-4
            pt-4
            border-t
            border-slate-100
          ">

            {/* PRIORITY */}

            <div className="
              flex
              items-center
              gap-2
            ">


            </div>

            {/* STATUS SELECT */}


          </div>

        </div>

      </div>
    ))

  ) : (

    <div className="
      col-span-full
      text-center
      py-20
      bg-white
      rounded-3xl
      border
      border-dashed
      border-teal-200
    ">

      <div className="
        text-6xl
        mb-4
      ">
        📋
      </div>

      <h2 className="
        text-3xl
        font-bold
        text-slate-700
      ">
        No Tasks Found
      </h2>

      <p className="
        text-slate-500
        mt-3
      ">
        No tasks assigned yet.
      </p>

    </div>
  )}

</div>
        </motion.div>
      </div>
    </div>
  );
};

export default UserUpdateTask;