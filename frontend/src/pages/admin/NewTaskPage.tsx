import {
  useState,
} from "react";

import API from "../../services/api";

import { motion } from "framer-motion";

import { useAdmin } from "../../context/AdminContext";

const NewTaskPage = () => {

  const {
    users,
    fetchData,
  } = useAdmin();

  const [title, setTitle] =
    useState("");
const [successMessage, setSuccessMessage] = useState("");
const [errorMessage, setErrorMessage] = useState("");
  const [
    description,
    setDescription,
  ] = useState("");

  const [
    assignedTo,
    setAssignedTo,
  ] = useState("");

  const createTask = async (
    e: React.FormEvent
  ) => {

    e.preventDefault();

    try {

      await API.post(
        "/tasks",
        {
          title,
          description,
          assignedTo,
        }
      );

      setTitle("");

      setDescription("");

      setAssignedTo("");

      fetchData();

       setErrorMessage("");
        setSuccessMessage("Task assigned successfully!");

    } catch (error) {

      console.log(error);

      setSuccessMessage("");
      setErrorMessage("Failed to assign task,Try again");
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
      transition={{
        duration: 0.3,
      }}
      className="w-full"
    >

      {/* MAIN CARD */}

      <div className="
        bg-white
        rounded-3xl
        border
        border-teal-200
        shadow-[0_0_25px_rgba(13,148,136,0.15)]
        p-5
        sm:p-6
        lg:p-8
      ">

        {/* HEADER */}
        {successMessage && (
           <div className="mb-4 bg-green-100 text-green-700 border border-green-300 p-3 rounded-xl">
            {successMessage}
          </div>
        )}

          {errorMessage && (
            <div className="mb-4 bg-red-100 text-red-700 border border-red-300 p-3 rounded-xl">
               {errorMessage}
            </div>
          )}

        <div className="mb-6">

          <h2 className="text-2xl sm:text-3xl font-bold text-teal-700">
            Create Task
          </h2>

          <p className="text-teal-500 mt-1 text-sm">
            Assign tasks to staff members
          </p>
        </div>

        {/* FORM */}

        <form
          onSubmit={createTask}
          className="space-y-5"
        >

          {/* TITLE */}

          <div>

            {/* <label className="block text-sm font-semibold text-teal-700 mb-2">
              Task Title
            </label> */}

            <input
              type="text"
              placeholder="Enter task title"
              value={title}
              onChange={(e) =>
                setTitle(
                  e.target.value
                )
              }
              className="
                w-full
                bg-white
                text-black
                border
                border-teal-200
                shadow-[0_0_10px_rgba(13,148,136,0.08)]
                p-3
                rounded-2xl
                outline-none
                transition-all
                duration-300
                focus:border-teal-500
                focus:shadow-[0_0_15px_rgba(13,148,136,0.25)]
              "
            />
          </div>

          {/* DESCRIPTION */}

          <div>

            {/* <label className="block text-sm font-semibold text-teal-700 mb-2">
              Task Description
            </label> */}

            <textarea
              placeholder="Enter task description"
              value={description}
              onChange={(e) =>
                setDescription(
                  e.target.value
                )
              }
              className="
                w-full
                h-32
                bg-white
                text-black
                border
                border-teal-200
                shadow-[0_0_10px_rgba(13,148,136,0.08)]
                p-3
                rounded-2xl
                outline-none
                resize-none
                transition-all
                duration-300
                focus:border-teal-500
                focus:shadow-[0_0_15px_rgba(13,148,136,0.25)]
              "
            />
          </div>

          {/* USER SELECT */}

          <div>

            {/* <label className="block text-sm font-semibold text-teal-700 mb-2">
              Assign User
            </label> */}

            <select
              value={assignedTo}
              onChange={(e) =>
                setAssignedTo(
                  e.target.value
                )
              }
              className="
                w-full
                bg-white
                text-black
                border
                border-teal-200
                shadow-[0_0_10px_rgba(13,148,136,0.08)]
                p-3
                rounded-2xl
                outline-none
                transition-all
                duration-300
                focus:border-teal-500
                focus:shadow-[0_0_15px_rgba(13,148,136,0.25)]
              "
            >

              <option value="">
                Select User
              </option>

              {users.map(
                (user) => (

                  <option
                    key={user._id}
                    value={user._id}
                    
                  >
                    {user.name}
                  </option>
                )
              )}
            </select>
          </div>

          {/* BUTTON */}

          <div className="pt-2">

            <button
              type="submit"
              className="
                bg-teal-600
                text-white
                px-8
                py-3
                rounded-2xl
                font-semibold
                shadow-[0_0_20px_rgba(13,148,136,0.25)]
                transition-all
                duration-300
                hover:bg-teal-700
                hover:scale-[1.03]
                hover:shadow-[0_0_25px_rgba(13,148,136,0.4)]
                active:scale-95
              "
            >
              Create Task
            </button>
          </div>
        </form>
      </div>
    </motion.div>
  );
};

export default NewTaskPage;