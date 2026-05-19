import {
  useState,
} from "react";

import { motion } from "framer-motion";

import { useNavigate } from "react-router-dom";

import axios from "axios";

import { useAdmin } from "../../context/AdminContext";

const TaskListPage = () => {

  const {
    tasks,
    setTasks,
  } = useAdmin();

  const navigate =
    useNavigate();

  const [
    searchTerm,
    setSearchTerm,
  ] = useState("");

  const [
    showDeletePopup,
    setShowDeletePopup,
  ] = useState(false);

  const [
    selectedTaskId,
    setSelectedTaskId,
  ] = useState("");

  const handleDeleteTask = (
    id: string
  ) => {

    setSelectedTaskId(id);

    setShowDeletePopup(true);
  };

  const confirmDeleteTask =
    async () => {

      try {

        await axios.delete(
          `/api/tasks/${selectedTaskId}`
        );

        setTasks((prev: any) =>
          prev.filter(
            (task: any) =>
              task._id !==
              selectedTaskId
          )
        );

        setShowDeletePopup(
          false
        );

      } catch (error) {

        console.log(error);
      }
    };

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
      className="
        bg-white
        rounded-3xl
        border
        border-teal-200
        shadow-[0_0_25px_rgba(13,148,136,0.12)]
        overflow-hidden
      "
    >

      {/* HEADER */}

      <div className="
        bg-gradient-to-r
        from-teal-700
        to-teal-500
        text-white
        p-4
        sm:p-6
        flex
        flex-col
        md:flex-row
        md:items-center
        md:justify-between
        gap-4
      ">

        <div>

          <h2 className="text-2xl sm:text-3xl font-bold">
            Task List
          </h2>

          <p className="text-white/80 text-sm mt-1">
            Manage all assigned tasks
          </p>
        </div>

        {/* SEARCH */}

        <input
          type="text"
          placeholder="Search Task..."
          value={searchTerm}
          onChange={(e) =>
            setSearchTerm(
              e.target.value
            )
          }
          className="
            w-full
            md:w-[300px]
            px-4
            py-3
            rounded-2xl
            bg-white
            text-slate-800
            outline-none
            border-2
            border-transparent
            focus:border-teal-200
            transition-all
            duration-300
          "
        />
      </div>

      {/* TABLE */}

      <div className="w-full overflow-x-auto">

        <table className="w-full border-collapse">

          <thead>

            <tr className="bg-teal-600 text-white">

              <th className="
                py-4
                px-3
                text-center
                text-sm
                sm:text-base
                w-[18%]
              ">
                Task
              </th>

              <th className="
                py-4
                px-3
                text-center
                text-sm
                sm:text-base
                w-[32%]
              ">
                Description
              </th>

              <th className="
                py-4
                px-3
                text-center
                text-sm
                sm:text-base
                w-[20%]
              ">
                Assigned User
              </th>

              <th className="
                py-4
                px-3
                text-center
                text-sm
                sm:text-base
                w-[15%]
              ">
                Status
              </th>

              <th className="
                py-4
                px-3
                text-center
                text-sm
                sm:text-base
                w-[15%]
              ">
                Actions
              </th>
            </tr>
          </thead>

          <tbody>

            {tasks
              .filter((task) =>
                task.title
                  .toLowerCase()
                  .includes(
                    searchTerm.toLowerCase()
                  )
              )
              .map((task) => (

                <tr
                  key={task._id}
                  className="
                    border-b
                    border-teal-100
                    hover:bg-teal-50
                    transition-all
                    duration-300
                  "
                >

                  {/* TASK */}

                  <td className="
                    py-4
                    px-3
                    text-center
                    text-xs
                    sm:text-sm
                    md:text-base
                    font-semibold
                    text-slate-800
                    break-words
                  ">

                    {task.title}

                  </td>

                  {/* DESCRIPTION */}

                  <td className="
                    py-4
                    px-3
                    text-center
                    text-xs
                    sm:text-sm
                    md:text-base
                    text-slate-600
                    break-words
                  ">

                    {task.description}

                  </td>

                  {/* ASSIGNED USER */}

                  <td className="
                    py-4
                    px-3
                    text-center
                    text-xs
                    sm:text-sm
                    md:text-base
                    text-slate-700
                    break-words
                  ">

                    {
                      task.assignedTo
                        ?.name
                    }

                  </td>

                  {/* STATUS */}

                  <td className="py-4 px-3 text-center">

                    <span
                      className={`
                        px-3
                        py-1.5
                        rounded-full
                        text-white
                        text-[11px]
                        sm:text-sm
                        font-medium
                        inline-block
                        ${
                          task.status ===
                          "Completed"
                            ? "bg-green-500"
                            : task.status ===
                              "In Progress"
                            ? "bg-yellow-500"
                            : "bg-red-500"
                        }
                      `}
                    >

                      {task.status}

                    </span>
                  </td>

                  {/* ACTIONS */}

                  <td className="py-4 px-3">

                    <div className="
                      flex
                      items-center
                      justify-center
                      gap-2
                      flex-wrap
                    ">

                      {/* EDIT */}

                      <button
                        onClick={() =>
                          navigate(
                            `/admin/edit-task/${task._id}`,
                            {
                              state: {
                                task,
                              },
                            }
                          )
                        }
                        className="
                          bg-blue-500
                          hover:bg-blue-600
                          text-white
                          px-3
                          py-2
                          rounded-xl
                          text-xs
                          sm:text-sm
                          transition-all
                          duration-300
                        "
                      >
                        Edit
                      </button>

                      {/* DELETE */}

                      <button
                        onClick={() =>
                          handleDeleteTask(
                            task._id
                          )
                        }
                        className="
                          bg-red-500
                          hover:bg-red-600
                          text-white
                          px-3
                          py-2
                          rounded-xl
                          text-xs
                          sm:text-sm
                          transition-all
                          duration-300
                        "
                      >
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>

      {/* DELETE POPUP */}

      {showDeletePopup && (

        <div className="
          fixed
          inset-0
          bg-black/40
          flex
          items-center
          justify-center
          z-50
          p-4
        ">

          <div className="
            bg-white
            rounded-3xl
            p-6
            sm:p-8
            w-full
            max-w-md
            border
            border-red-200
            shadow-2xl
          ">

            <h2 className="
              text-2xl
              font-bold
              text-slate-800
              mb-3
            ">
              Delete Task
            </h2>

            <p className="
              text-slate-600
              mb-6
              text-sm
              sm:text-base
            ">
              Are you sure you want
              to delete this task?
            </p>

            <div className="
              flex
              justify-end
              gap-3
            ">

              <button
                onClick={() =>
                  setShowDeletePopup(
                    false
                  )
                }
                className="
                  px-5
                  py-2.5
                  rounded-xl
                  bg-slate-200
                  hover:bg-slate-300
                  text-slate-700
                  transition-all
                  duration-300
                "
              >
                Cancel
              </button>

              <button
                onClick={
                  confirmDeleteTask
                }
                className="
                  px-5
                  py-2.5
                  rounded-xl
                  bg-red-500
                  hover:bg-red-600
                  text-white
                  transition-all
                  duration-300
                "
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </motion.div>
  );
};

export default TaskListPage;