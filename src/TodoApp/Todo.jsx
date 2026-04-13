import React, { useEffect, useState } from "react";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import SearchIcon from "@mui/icons-material/Search";
import { useNavigate } from "react-router-dom";

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
  };

  const handleEdit = (id) => {
    const editData = trackdata.find((item) => item.id === id);
    setData(editData);
    setEditid(id);
  };

  const handleDelete = (id) => {
    const newdata = trackdata.filter((item) => item.id !== id);
    setTrackdata(newdata);
  };

  const HandleDateFilter = () => {
    const sortData = [...trackdata].sort((a, b) => {
      const dateA = new Date(a.duedate);
      const dateB = new Date(b.duedate);

      return sortorder === "asc" ? dateA - dateB : dateB - dateA;
    });
    console.log("kljfdskldf", sortData);
  };
  return (
    <>
      <div className="flex flex-col w-full bg-gradient-to-r from-purple-800  via-blue-800 to-indigo-950 h-screen ">
        <h1 className="text-3xl font-bold  self-center p-4 m-3"> Todo List</h1>
        <div className="flex mx-auto flex-wrap gap-15 ">
          <div className="flex mx-auto justify-center items-center md:text-lg">
            <label className="text-white font-semibold">Task Name</label>
            <input
              type="text"
              placeholder="Enter your task"
              name="newtask"
              value={data.newtask}
              className="p-2 rounded-2xl outline-none bg-pink-200 m-2 placeholder-black"
              onChange={(e) =>
                setData((prev) => ({ ...prev, newtask: e.target.value }))
              }
            />
          </div>
          <div className="flex mx-auto justify-center items-center md:text-lg ">
            <label className="text-white font-semibold">Due-Date</label>
            <input
              type="date"
              placeholder="enter your task"
              name="newtask"
              value={data.duedate}
              onChange={(e) =>
                setData((prev) => ({ ...prev, duedate: e.target.value }))
              }
              className="p-2 rounded-2xl outline-none bg-pink-200 m-2"
            />
          </div>
          <div className="flex mx-auto justify-center items-center">
            <label className="mx-auto m-2 rounded-2xl p-2 text-white font-semibold">
              Status:
              <select
                name="status"
                value={data.type}
                onChange={(e) =>
                  setData((prev) => ({ ...prev, type: e.target.value }))
                }
                className="outline-1 rounded-2xl ml-2 p-1 text-black bg-pink-200"
              >
                <option value="complete">Complete</option>
                <option value="pending">Pending</option>
                <option value="running">Running</option>
              </select>
            </label>
          </div>
          <button
            className="rounded-2xl bg-black text-white m-2 p-2 md:text-lg"
            onClick={(e) => handleClick(e)}
          >
            {editid ? "update task" : "Add Task"}
          </button>
        </div>
        <div className="flex justify-between items-center  gap-5 md:gap-15 mx-auto m-3 md:text-lg p-2">
          <div className=" flex justify-between items-center  mx-auto m-3 md:text-lg p-2">
            <label className="mr-2 text-white font-semibold">
              {" "}
              Search by status
            </label>
            <div
              className="rounded-2xl bg-pink-200 border-2 p-2 border-black cursor-pointer transition-all duration-300 ease-in-out self-end"
              onClick={() => setOpen(!open)}
            >
              {showdata} <KeyboardArrowDownIcon />{" "}
              {open && (
                <div className="mx-auto rounded-xl shadow-md bg-pink-200 transition-all duration-1300 ease-in-out md:text-lg">
                  {["all", "pending", "complete", "running"].map((item) => (
                    <div
                      key={item}
                      className="border-t border-black  flex flex-col w-full md:text-lg"
                    >
                      <p
                        onClick={() => handleShow(item)}
                        className="shadow-md hover:bg-gray-500 cursor-pointer md:text-lg"
                      >
                        {" "}
                        {item}
                      </p>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
          <div className="rounded-2xl bg-pink-200 w-100 p-2 shadow-lg md:text-lg">
            <input
              placeholder="Search by Task name"
              className="outline-none placeholder-black"
              onChange={(e) => setSearch(e.target.value)}
              value={search}
            />
          </div>
        </div>

        <div className="mx-auto border-emerald-300 p-2 rounded-2xl w-2xl  md:text-lg">
          {trackdata
            .filter((item) => {
              const matchStatus = showdata == "all" || showdata == item.type;
              const matchSearch =
                !search ||
                item.newtask.toLowerCase().includes(search.toLowerCase());
              return matchSearch && matchStatus;
            })
            .map((item, i) => (
              <div
                key={item.id}
                className={`mx-auto flex justify-between ${handleFilter(item.type)}
              border-b-1 items-center justify-between gap-3 md:text-lg
              `}
              >
                <p className="p-4 w-30 md:w-40 lg:w-full "> {item.newtask}</p>
                <p className="p-4 w-auto md:w-80"> {item.duedate}</p>
                <p className="p-4 w-auto  md:w-80"> {item.type}</p>
                <button
                  onClick={() => handleEdit(item.id)}
                  className="rounded-2xl bg-black text-white p-2 m-2"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(item.id)}
                  className="rounded-2xl bg-red-500 text-white p-2 m-2"
                >
                  <DeleteForeverIcon />
                </button>
              </div>
            ))}
        </div>
        <button
          className="rounded-2xl bg-black w-20 self-center text-white p-2 m-2"
          onClick={() => navigate("/")}
        >
          {" "}
          Back
        </button>
      </div>
    </>
  );
};

export default Todo;
