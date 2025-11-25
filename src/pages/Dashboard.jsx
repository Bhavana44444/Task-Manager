import { useEffect, useState } from "react";

const Dashboard = ({ setIsLoggedIn }) => {
  const [tasks, setTasks] = useState([]);
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [priority, setPriority] = useState("Low");
  const [dueDate, setDueDate] = useState("");
  const [search, setSearch] = useState("");
  const [filterStatus, setFilterStatus] = useState("All");
  const [filterPriority, setFilterPriority] = useState("All");
  const [editId, setEditId] = useState(null);
  const [debouncedSearch, setDebouncedSearch] = useState("");

  // Debounce search
  useEffect(() => {
    const handler = setTimeout(() => setDebouncedSearch(search), 300);
    return () => clearTimeout(handler);
  }, [search]);

  // Task automation (simulated cron)
  useEffect(() => {
    const interval = setInterval(() => {
      tasks.forEach((task) => {
        if (!task.completed) console.log(`Reminder: ${task.title} is pending!`);
      });
    }, 20000);
    return () => clearInterval(interval);
  }, [tasks]);

  const handleAddTask = () => {
    if (!title || !desc || !dueDate) {
      alert("Please fill all required fields!");
      return;
    }
    if (editId) {
      setTasks((prev) =>
        prev.map((t) =>
          t.id === editId ? { ...t, title, desc, priority, dueDate } : t
        )
      );
      setEditId(null);
    } else {
      setTasks([
        ...tasks,
        { id: Date.now(), title, desc, priority, dueDate, completed: false },
      ]);
    }
    setTitle("");
    setDesc("");
    setPriority("Low");
    setDueDate("");
  };

  const handleEdit = (task) => {
    setEditId(task.id);
    setTitle(task.title);
    setDesc(task.desc);
    setPriority(task.priority);
    setDueDate(task.dueDate);
  };

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this task?")) {
      setTasks(tasks.filter((t) => t.id !== id));
    }
  };

  const toggleComplete = (id) => {
    setTasks((prev) =>
      prev.map((t) => (t.id === id ? { ...t, completed: !t.completed } : t))
    );
  };

  const handleLogout = () => {
    sessionStorage.removeItem("user");
    setIsLoggedIn(false);
  };

  const filteredTasks = tasks
    .filter((t) => {
      if (filterStatus === "Completed") return t.completed;
      if (filterStatus === "Pending") return !t.completed;
      return true;
    })
    .filter((t) =>
      filterPriority === "All" ? true : t.priority === filterPriority
    )
    .filter(
      (t) =>
        t.title.toLowerCase().includes(debouncedSearch.toLowerCase()) ||
        t.desc.toLowerCase().includes(debouncedSearch.toLowerCase())
    );

  return (
    <div className="p-8 min-h-screen">
      {/* Top Navbar */}
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-4xl font-bold text-purple-600">Task Manager</h1>
        <button
          onClick={handleLogout}
          className="bg-red-500 text-white px-4 py-2 rounded-2xl hover:bg-red-600 transition duration-300"
        >
          Logout
        </button>
      </div>

      {/* Add/Edit Task */}
      <div className="bg-white p-6 rounded-3xl shadow-lg mb-6 border border-gray-200">
        <h2 className="text-2xl font-semibold mb-4 text-purple-600">
          {editId ? "Edit Task" : "Add Task"}
        </h2>
        <div className="flex flex-col md:flex-row gap-4">
          <input
            className="border p-3 rounded-2xl flex-1 focus:outline-none focus:ring-2 focus:ring-purple-400 transition"
            placeholder="Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <input
            className="border p-3 rounded-2xl flex-1 focus:outline-none focus:ring-2 focus:ring-purple-400 transition"
            placeholder="Description"
            value={desc}
            onChange={(e) => setDesc(e.target.value)}
          />
          <select
            className="border p-3 rounded-2xl focus:outline-none focus:ring-2 focus:ring-purple-400 transition"
            value={priority}
            onChange={(e) => setPriority(e.target.value)}
          >
            <option>Low</option>
            <option>Medium</option>
            <option>High</option>
          </select>
          <input
            type="date"
            className="border p-3 rounded-2xl focus:outline-none focus:ring-2 focus:ring-purple-400 transition"
            value={dueDate}
            onChange={(e) => setDueDate(e.target.value)}
          />
          <button
            className="bg-purple-600 text-white px-6 py-3 rounded-2xl hover:bg-purple-700 transition duration-300"
            onClick={handleAddTask}
          >
            {editId ? "Update" : "Add"}
          </button>
        </div>
      </div>

      {/* Filters & Search */}
      <div className="flex flex-col md:flex-row justify-between items-center mb-6 gap-4">
        <div className="flex gap-3">
          <select
            className="border p-2 rounded-2xl focus:outline-none focus:ring-2 focus:ring-purple-400 transition"
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
          >
            <option>All</option>
            <option>Completed</option>
            <option>Pending</option>
          </select>
          <select
            className="border p-2 rounded-2xl focus:outline-none focus:ring-2 focus:ring-purple-400 transition"
            value={filterPriority}
            onChange={(e) => setFilterPriority(e.target.value)}
          >
            <option>All</option>
            <option>Low</option>
            <option>Medium</option>
            <option>High</option>
          </select>
        </div>
        <input
          className="border p-2 rounded-2xl w-full md:w-1/3 focus:outline-none focus:ring-2 focus:ring-purple-400 transition"
          placeholder="Search tasks..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      {/* Task List */}
      <div className="grid md:grid-cols-2 gap-6">
        {filteredTasks.map((task) => (
          <div
            key={task.id}
            className={`bg-white p-6 rounded-3xl shadow-xl transition transform hover:scale-105 duration-300 ${
              task.completed ? "opacity-50 line-through" : ""
            }`}
          >
            <h3 className="text-2xl font-bold mb-2 text-purple-600">
              {task.title}
            </h3>
            <p className="mb-2 text-gray-700">{task.desc}</p>
            <p className="mb-1">
              <span className="font-semibold">Priority:</span>{" "}
              <span
                className={`px-3 py-1 rounded-full text-white text-sm ${
                  task.priority === "High"
                    ? "bg-red-500"
                    : task.priority === "Medium"
                    ? "bg-yellow-500"
                    : "bg-green-500"
                }`}
              >
                {task.priority}
              </span>
            </p>
            <p className="mb-1">
              <span className="font-semibold">Due:</span> {task.dueDate}
            </p>
            <p className="mb-2">
              <span className="font-semibold">Status:</span>{" "}
              {task.completed ? "Completed" : "Pending"}
            </p>
            <div className="flex gap-3 mt-3">
              <button
                className="bg-green-500 text-white px-3 py-1 rounded-full hover:bg-green-600 transition duration-300"
                onClick={() => toggleComplete(task.id)}
              >
                Toggle
              </button>
              <button
                className="bg-yellow-500 text-white px-3 py-1 rounded-full hover:bg-yellow-600 transition duration-300"
                onClick={() => handleEdit(task)}
              >
                Edit
              </button>
              <button
                className="bg-red-500 text-white px-3 py-1 rounded-full hover:bg-red-600 transition duration-300"
                onClick={() => handleDelete(task.id)}
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Dashboard;
