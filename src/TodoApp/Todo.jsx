import React, { useEffect, useState } from "react";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import SearchIcon from "@mui/icons-material/Search";

const Todo = () => {
  const todokey = "values";

  const [data, setData] = useState({ newtask: "", duedate: "", type: "" });
  const [trackdata, setTrackdata] = useState(() => {
    const rawItems = localStorage.getItem(todokey);
    if (!rawItems) return [];
    return JSON.parse(rawItems);
  });
  const [AddTask, setAddtask] = useState(false);
  const [editid, setEditid] = useState("");
  const [showdata, setShowdata] = useState("all");
  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState();
  const [sortorder, setSortOrder] = useState("asc");
  const [sortedData, setSortdata] = useState([]);

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
      <div className="flex flex-col w-full">
        <div className="flex mx-auto ">
          <input
            type="text"
            placeholder="Enter your task"
            name="newtask"
            value={data.newtask}
            className="p-2 rounded-2xl outline-none bg-pink-200 m-2"
            onChange={(e) =>
              setData((prev) => ({ ...prev, newtask: e.target.value }))
            }
          />

          <input
            type="date"
            placeholder="enter your task"
            name="newtask"
            value={data.duedate}
            onChange={(e) =>
              setData((prev) => ({ ...prev, duedate: e.target.value }))
            }
          />
          <label className="mx-auto m-2 bg-pink-200 rounded-2xl p-2">
            Status:
            <select
              name="status"
              value={data.type}
              onChange={(e) =>
                setData((prev) => ({ ...prev, type: e.target.value }))
              }
              className="outline-2 rounded-2xl ml-2 p-1"
            >
              <option value="complete">Complete</option>
              <option value="pending">Pending</option>
              <option value="running">Running</option>
            </select>
          </label>

          <button
            className="rounded-2xl bg-black text-white m-2 p-2"
            onClick={(e) => handleClick(e)}
          >
            {editid ? "update task" : "Add Task"}
          </button>
        </div>

        <div className="w-2xl mx-auto flex justify-between  border-emerald-300 p-5  max-w-xl rounded-2xl">
          {" "}
          Task List
          <div
            className="rounded-2xl border-2 p-2 border-black cursor-pointer transition-all duration-300 ease-in-out"
            onClick={() => setOpen(!open)}
          >
            {" "}
            {showdata} <KeyboardArrowDownIcon />{" "}
            {open && (
              <div className="mx-auto rounded-xl shadow-md bg-white transition-all duration-1300 ease-in-out">
                {["all", "pending", "complete", "running"].map((item) => (
                  <div
                    key={item}
                    className="border-t border-black  flex flex-col w-full "
                  >
                    <p
                      onClick={() => handleShow(item)}
                      className="shadow-md hover:bg-gray-500 cursor-pointer "
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

        <div className="rounded-2xl bg-pink-200 outline-neutral-50 w-100 mx-auto flex justify-between p-2 mb-3">
          <input
            placeholder="Enter task name to search"
            className="outline-none"
            onChange={(e) => setSearch(e.target.value)}
            value={search}
          />
          <SearchIcon />
        </div>

        <div
          className="mx-auto bg-black rounded-2xl text-white p-2 "
          onClick={() => HandleDateFilter()}
        >
          Filter by date <span> {sortorder == "asc" ? "Desc" : "asc"}</span>
        </div>

        <div className="mx-auto border-emerald-300 p-2  max-w-xl rounded-2xl">
          {/* {trackdata.} */}

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
              
              `}
              >
                <p className="p-4"> {item.newtask}</p>
                <p className="p-4"> {item.duedate}</p>
                <p className="p-4"> {item.type}</p>
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
      </div>
    </>
  );
};

export default Todo;
