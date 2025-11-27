"use client";

import React from "react";
import { Task } from "./ToDoList";

type TaskItemProps = {
  task: Task;
  toggleTask: (id: number) => void;
  deleteTask: (id: number) => void;
};

const TaskItem: React.FC<TaskItemProps> = ({
  task,
  toggleTask,
  deleteTask,
}) => {
  return (
    <li className="flex justify-between py-2 mt-7">
      <div className="flex items-center gap-[10px]">
        <input
          type="checkbox"
          checked={task.completed}
          onChange={() => toggleTask(task.id)}
          className="w-6 h-6 accent-blue-500 cursor-pointer ml-[-20px] "
        />
        <span
          className={`transition-all duration-300 ${
            task.completed ? "line-through text-gray-300" : "text-gray-800"
          }`}
        >
          {task.text}
        </span>
      </div>
      <button
        onClick={() => deleteTask(task.id)}
        className="px-[15px] py-[10px] mr-[20px] border border-gray-500 rounded-[5px] bg-red-300 text-black cursor-pointer transition-colors duration-300 hover:bg-red-200"
      >
        Delete
      </button>
    </li>
  );
};

export default TaskItem;
