"use client";
import { useState, useEffect, useMemo, ChangeEvent } from "react";
import TaskItem from "./TaskItem";

export type Task = {
  id: number;
  text: string;
  completed: boolean;
};

export default function ToDoList() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [newTask, setNewTask] = useState<string>("");
  const [filter, setFilter] = useState<"all" | "completed" | "pending">("all");
  const [showDropdown, setShowDropdown] = useState(false);
  const [loading, setLoading] = useState(true);

  //function to restore user's previous session after 1 minute
  useEffect(() => {
    const savedTasks = localStorage.getItem("tasks");
    if (savedTasks) {
      setTasks(JSON.parse(savedTasks) as Task[]);
    }

    const timer = setTimeout(() => {
      setLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  //save every change to the local storage so nothing happen to user's task list after refresh
  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  function handleInputChange(e: ChangeEvent<HTMLInputElement>) {
    setNewTask(e.target.value);
  }

  //add a new task to the to-do list
  function addTask() {
    if (newTask.trim() === "") {
      alert("Cannot add empty task!"); // when you add empty task popup message like this
      return; // also stop the function
    }

    const newTaskObj: Task = {
      id: Date.now(),
      text: newTask,
      completed: false,
    };

    setTasks((prev) => [...prev, newTaskObj]);
    setNewTask("");

    console.clear();
    console.log("Added task:", newTaskObj);
  }

  //function to mark newly added task as completed or pending
  function toggleTask(id: number) {
    setTasks((prev) =>
      prev.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    );

    const updatedTask = tasks.find((task) => task.id === id);
    if (updatedTask) {
      console.clear();
      console.log("Toggled task:", {
        ...updatedTask,
        completed: !updatedTask.completed,
      });
    }
  }

  //function to remove the task from the list
  function deleteTask(id: number) {
    setTasks((prev) => prev.filter((task) => task.id !== id));
    console.clear();
    console.log("Deleted task ID:", id);
  }

  //filtering tasks to 'All', 'Completed' and 'Pending'
  const filteredTasks = useMemo(() => {
    return tasks.filter((task) => {
      if (filter === "completed") return task.completed; //show only completed tasks
      if (filter === "pending") return !task.completed; //show only pending tasks
      return true; //show all tasks
    });
  }, [tasks, filter]);

  const filterLabel =
    filter === "completed"
      ? "Completed"
      : filter === "pending"
      ? "Pending"
      : "All";

  if (loading) {
    return (
      <div className="text-center mt-40 text-3xl font-bold animate-pulse">
        Loading...
      </div>
    );
  }

  return (
    <div className="bg-emerald-100 p-10 rounded-lg shadow-md w-250 h-100vh text-center mt-20 mb-20">
      <h1 className="text-5xl font-bold mb-10">To-Do List App</h1>

      <div className="flex items-center gap-4 mb-6">
        <input
          type="text"
          placeholder="Enter a new task..."
          value={newTask}
          onChange={handleInputChange}
          className="flex-grow border border-emerald-900 rounded-lg px-4 py-2"
        />

        <button
          onClick={addTask}
          className="px-8 py-2 font-bold text-xl border border-b-black-800 rounded-lg bg-green-200 text-black transition hover:bg-green-300 cursor-pointer"
        >
          Add
        </button>
      </div>

      {/* filter dropdown menu */}
      <div className="relative inline-block mb-8">
        <button
          onClick={() => setShowDropdown(!showDropdown)}
          className="px-6 py-2 font-bold text-xl border border-black-800 rounded-lg bg-green-200 w-50 cursor-pointer"
        >
          {filterLabel} ▼
        </button>

        {showDropdown && (
          <div className="absolute mt-2 w-full font-bold text-xl bg-green-200 border border-black rounded-lg shadow-md">
            <button
              onClick={() => {
                setFilter("all");
                setShowDropdown(false);
              }}
              className="block w-full px-4 py-2 rounded-lg hover:bg-green-300 cursor-pointer"
            >
              All
            </button>

            <button
              onClick={() => {
                setFilter("completed");
                setShowDropdown(false);
              }}
              className="block w-full px-4 py-2 rounded-lg hover:bg-green-300 cursor-pointer"
            >
              Completed
            </button>

            <button
              onClick={() => {
                setFilter("pending");
                setShowDropdown(false);
              }}
              className="block w-full px-4 py-2 rounded-lg hover:bg-green-300 cursor-pointer"
            >
              Pending
            </button>
          </div>
        )}
      </div>

      <ol className="text-center text-xl pl-6 mt-10">
        {filteredTasks.length === 0 ? (
          <li className="text-gray-500 italic">No tasks yet.</li>
        ) : (
          filteredTasks.map((task) => (
            <TaskItem
              key={task.id}
              task={task}
              toggleTask={toggleTask}
              deleteTask={deleteTask}
            />
          ))
        )}
      </ol>
    </div>
  );
}
