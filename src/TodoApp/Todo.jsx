import React, { useEffect, useState } from "react";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import SearchIcon from "@mui/icons-material/Search";
import { useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";

const Todo = () => {
  const navigate = useNavigate();
  const todokey = "values";

  const [data, setData] = useState({ newtask: "", duedate: "", type: "" });
  const [trackdata, setTrackdata] = useState(() => {
    const rawItems = localStorage.getItem(todokey);
    if (!rawItems) return [];
    return JSON.parse(rawItems);
  });

  const [editid, setEditid] = useState("");
  const [showdata, setShowdata] = useState("all");
  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState();

  useEffect(() => {
    localStorage.setItem(todokey, JSON.stringify(trackdata));
  }, [trackdata]);

  const handleClick = (e) => {
    e.preventDefault();

    if (editid) {
      const updatedData = trackdata.map((item) => {
        if (item.id === editid) {
          return { ...data, id: editid };
        }
        return item;
      });
      setTrackdata(updatedData);
      toast.success("Task updated ✏️");
      setEditid("");
      setData({
        newtask: "",
        duedate: "",
        type: "",
      });
    } else {
      const newtask = { ...data, id: Date.now() };
      setTrackdata([...trackdata, newtask]);
      setData({
        newtask: "",
        duedate: "",
        type: "",
      });
      toast.success("Task added");
    }
  };

  const handleFilter = (item) => {
    if (item === "pending") return "bg-purple-300";
    if (item === "complete") return "bg-orange-300";
    if (item === "running") return "bg-red-300";
    if (item === "") return "bg-white";
  };
  const handleShow = (item) => {
    setShowdata(item);
    console.log("handle show value is", item);
    setOpen(false);
  };

  const handleEdit = (id) => {
    const editData = trackdata.find((item) => item.id === id);
    setData(editData);
    setEditid(id);
  };

  const handleDelete = (id) => {
    const newdata = trackdata.filter((item) => item.id !== id);
    setTrackdata(newdata);
    toast.error("Task deleted ❌ ");
  };

  return (
    <>
      <div className="min-h-screen bg-gradient-to-r from-purple-800 via-blue-800 to-indigo-900 text-white w-full">
        <h1 className="text-3xl md:text-4xl font-bold text-center pt-6 tracking-wide">
          Todo List
        </h1>

        <div className="w-full max-w-5xl mx-auto mt-8 px-4 grid grid-cols-1 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-4 gap-4 items-end">
          <div className="flex flex-col gap-1">
            <label className="font-semibold">Task Name</label>
            <input
              type="text"
              placeholder="Enter your task"
              value={data.newtask}
              onChange={(e) =>
                setData((prev) => ({ ...prev, newtask: e.target.value }))
              }
              className="p-2 rounded-xl bg-pink-200 text-black focus:ring-2 focus:ring-orange-400 transition duration-300"
            />
          </div>

          <div className="flex flex-col gap-1">
            <label className="font-semibold">Due Date</label>
            <input
              type="date"
              value={data.duedate}
              onChange={(e) =>
                setData((prev) => ({ ...prev, duedate: e.target.value }))
              }
              className="p-2 rounded-xl bg-pink-200 text-black focus:ring-2 focus:ring-orange-400 transition duration-300"
            />
          </div>

          <div className="flex flex-col gap-1 relative">
            <label className="font-semibold">Status</label>
            <select
              value={data.type}
              onChange={(e) =>
                setData((prev) => ({ ...prev, type: e.target.value }))
              }
              className="p-2 rounded-xl bg-pink-200 text-black focus:ring-2 focus:ring-orange-400 transition duration-300 hover:scale-105"
            >
              <option value="complete">Complete</option>
              <option value="pending">Pending</option>
              <option value="running">Running</option>
            </select>
          </div>
          <div className="flex flex-col gap-1 justify-end">
            <button
              onClick={(e) => handleClick(e)}
              className="h-[42px] bg-black rounded-xl hover:bg-gray-900 hover:scale-105 transition duration-300 shadow-lg sm:w-[92px]"
            >
              {editid ? "Update" : "Add Task"}
            </button>
          </div>
        </div>

        <div className="w-full max-w-5xl mx-auto mt-8 px-4 flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="relative">
            <div
              onClick={() => setOpen(!open)}
              className="flex items-center gap-2 px-4 py-2 bg-pink-200 text-black rounded-xl cursor-pointer hover:scale-105 transition duration-300"
            >
              {showdata} <KeyboardArrowDownIcon />
            </div>

            {open && (
              <div className="absolute  w-full bg-pink-200 text-black rounded-xl shadow-lg animate-fadeIn">
                {["all", "pending", "complete", "running"].map((item) => (
                  <p
                    key={item}
                    onClick={() => handleShow(item)}
                    className="p-2 hover:bg-gray-300 cursor-pointer transition"
                  >
                    {item}
                  </p>
                ))}
              </div>
            )}
          </div>

          <div className="flex items-center gap-2 bg-pink-200 px-4 py-2 rounded-full shadow-lg w-full md:w-[300px]">
            <SearchIcon className="text-black" />
            <input
              placeholder="Search task..."
              className="bg-transparent outline-none text-black w-full"
              onChange={(e) => setSearch(e.target.value)}
              value={search}
            />
          </div>
        </div>

        <div className="w-full max-w-5xl mx-auto mt-8 px-4 grid gap-4">
          {trackdata
            .filter((item) => {
              const matchStatus = showdata === "all" || showdata === item.type;
              const matchSearch =
                !search ||
                item.newtask.toLowerCase().includes(search.toLowerCase());
              return matchSearch && matchStatus;
            })
            .map((item) => (
              <div
                key={item.id}
                className={`grid grid-cols-5 items-center gap-4 p-4 rounded-xl shadow-lg transition duration-300 hover:scale-[1.02] ${handleFilter(
                  item.type,
                )}`}
              >
                <p className="font-semibold">{item.newtask}</p>
                <p>{item.duedate}</p>
                <p className="capitalize">{item.type}</p>

                <button
                  onClick={() => handleEdit(item.id)}
                  className="bg-black text-white px-3 py-1 rounded-lg hover:scale-105 transition"
                >
                  Edit
                </button>

                <button
                  onClick={() => handleDelete(item.id)}
                  className="bg-red-500 text-white px-3 py-1 rounded-lg hover:scale-105 transition"
                >
                  <DeleteForeverIcon />
                </button>
              </div>
            ))}
        </div>

        <div className="flex justify-center mt-6 ">
          <button
            onClick={() => navigate("/")}
            className="bg-black px-6 py-2 rounded-xl hover:bg-gray-900 hover:scale-105 transition"
          >
            Back
          </button>
        </div>
      </div>
    </>
  );
};

export default Todo;
