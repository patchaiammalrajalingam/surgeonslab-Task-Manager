import type { Task } from "../types";

interface Props {
  task: Task;
  onUpdate?: (
    id: string,
    status: string
  ) => void;
}

const TaskCard = ({
  task,
  onUpdate,
}: Props) => {
  return (
    <div className="bg-white p-4 rounded shadow mb-4">
      <h2 className="text-xl font-bold">
        {task.title}
      </h2>

      <p className="mt-2">
        {task.description}
      </p>

      <p className="mt-2 font-semibold">
        Status: {task.status}
      </p>

      {task.assignedTo && (
        <p className="mt-2">
          Assigned To: {task.assignedTo.name}
        </p>
      )}

      {onUpdate && (
        <select
          value={task.status}
          onChange={(e) =>
            onUpdate(
              task._id,
              e.target.value
            )
          }
          className="border p-2 mt-4"
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
      )}
    </div>
  );
};

export default TaskCard;