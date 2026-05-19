import {
  useEffect,
  useState,
} from "react";

import {
  useLocation,
  useNavigate,
  useParams,
} from "react-router-dom";

import { motion } from "framer-motion";

import API from "../../services/api";

import { useAdmin } from "../../context/AdminContext";

const EditTaskPage = () => {

  const { id } =
    useParams();

  const navigate =
    useNavigate();

  const location =
    useLocation();

  const {
    users,
    fetchData,
  } = useAdmin();

  const task =
    location.state?.task;

  const [title, setTitle] =
    useState("");

  const [
    description,
    setDescription,
  ] = useState("");

  const [
    assignedTo,
    setAssignedTo,
  ] = useState("");

  const [status, setStatus] =
    useState("");

  useEffect(() => {

    if (task) {

      setTitle(task.title);

      setDescription(
        task.description
      );

      setAssignedTo(
        task.assignedTo?._id
      );

      setStatus(task.status);
    }

  }, [task]);

  const updateTask = async (
    e: React.FormEvent
  ) => {

    e.preventDefault();

    try {

      await API.put(
        `/tasks/${id}`,
        {
          title,
          description,
          assignedTo,
          status,
        }
      );

      fetchData();

      alert(
        "Task Updated Successfully"
      );

      navigate(
        "/admin/tasks"
      );

    } catch (error) {

      console.log(error);

      alert("Update Failed");
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
      className="bg-white rounded-3xl shadow-lg p-8"
    >

      <h2 className="text-3xl font-bold text-teal-700 mb-8">
        Edit Task
      </h2>

      <form
        onSubmit={updateTask}
        className="space-y-6"
      >

        {/* TITLE */}

        <input
          type="text"
          placeholder="Task Title"
          value={title}
          onChange={(e) =>
            setTitle(
              e.target.value
            )
          }
          className="w-full border-2 border-gray-200 p-4 rounded-2xl outline-none focus:border-teal-500"
        />

        {/* DESCRIPTION */}

        <textarea
          placeholder="Task Description"
          value={description}
          onChange={(e) =>
            setDescription(
              e.target.value
            )
          }
          className="w-full border-2 border-gray-200 p-4 rounded-2xl h-40 outline-none focus:border-teal-500"
        />

        {/* USER */}

        <select
          value={assignedTo}
          onChange={(e) =>
            setAssignedTo(
              e.target.value
            )
          }
          className="w-full border-2 border-gray-200 p-4 rounded-2xl outline-none focus:border-teal-500"
        >

          <option value="">
            Select User
          </option>

          {users.map((user) => (

            <option
              key={user._id}
              value={user._id}
            >
              {user.name}
            </option>
          ))}
        </select>

        {/* STATUS */}

        <select
          value={status}
          onChange={(e) =>
            setStatus(
              e.target.value
            )
          }
          className="w-full border-2 border-gray-200 p-4 rounded-2xl outline-none focus:border-teal-500"
        >

          <option value="">
            Select Status
          </option>

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

        {/* BUTTON */}

        <button
          type="submit"
          className="bg-gradient-to-r from-teal-700 to-teal-500 text-white px-10 py-4 rounded-2xl hover:scale-105 transition-all duration-300"
        >
          Update Task
        </button>
      </form>
    </motion.div>
  );
};

export default EditTaskPage;