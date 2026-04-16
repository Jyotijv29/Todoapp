import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

const NewTodos = () => {
  const arrayvalue = "arr";
  const itemsperpage = 5;
  const navigate = useNavigate();

  const [arr, setArr] = useState({ Name: "", Priority: "", duedate: "" });
  const [data, setData] = useState(() => {
    const items = localStorage.getItem(arrayvalue);
    return items ? JSON.parse(items) : [];
  });
  const [sorttype, setSorttype] = useState(null);
  const [sortorder, setSortorder] = useState(null);
  const [searchtext, setSearchText] = useState("");
  const [debouncetext, setDebouncetext] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [darkmode, setDarkmode] = useState(false);
  const [showtooltip, setShowtooltip] = useState(false);

  const lastIndex = currentPage * itemsperpage;
  const firsttIndex = lastIndex - itemsperpage;

  const handleSubmit = (e) => {
    e.preventDefault();
    const newdata = { ...arr, id: Date.now() };
    setData((prev) => {
      const updated = [...prev, newdata];
      const lastpage = Math.max(1, Math.ceil(updated.length / itemsperpage));
      // setData([...data, newdata]);
      setCurrentPage(lastpage);
      return updated;
    });
    toast.success("task added");
    setArr({ Name: "", duedate: "", Priority: "" });
  };

  useEffect(() => {
    localStorage.setItem(arrayvalue, JSON.stringify(data));
  }, [data]);

  const deleteAlldata = () => {
    localStorage.removeItem(arrayvalue);
    setData([]);
  };

  const handleToggle = (type) => {
    if (sorttype !== type) {
      setSorttype(type);
      setSortorder("asc");
    } else if (sortorder === "asc") {
      setSortorder("desc");
    } else if (sortorder === "desc") {
      setSortorder(null);
      setSorttype(null);
    } else {
      setSortorder("asc");
    }
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncetext(searchtext);
    }, 500);
    return () => clearTimeout(timer);
  }, [searchtext]);

  const displayData = data
    .filter((item) =>
      item.Name?.toLowerCase().includes(debouncetext.toLowerCase()),
    )
    .sort((a, b) => {
      if (!sorttype || !sortorder) return 0;
      if (sorttype === "name") {
        return sortorder === "asc"
          ? a.Name.localeCompare(b.Name)
          : b.Name.localeCompare(a.Name);
      }
      if (sorttype === "date") {
        const dateA = new Date(a.duedate);
        const dateB = new Date(b.duedate);
        return sortorder === "asc" ? dateA - dateB : dateB - dateA;
      }
      if (sorttype === "Priority") {
        return sortorder === "asc"
          ? Number(a.Priority) - Number(b.Priority)
          : Number(b.Priority) - Number(a.Priority);
      }
      return 0;
    });

  useEffect(() => {
    setCurrentPage(1);
  }, [debouncetext, sorttype, sortorder]);

  const paginatedData = displayData.slice(firsttIndex, lastIndex);
  const totalPage = Math.ceil(displayData.length / itemsperpage);

  return (
    <>
      <div
        className={`${darkmode ? "bg-gray-800 text-white" : "bg-white text-black"} min-h-screen w-full flex flex-col items-center`}
      >
        <div className="flex justify-between items-center px-4 md:px-10 mt-4 w-full">
          <h1
            className={`text-2xl md:text-4xl font-bold tracking-wide transition-all duration-500 ${darkmode ? "bg-gradient-to-r from-white to-purple-400 bg-clip-text text-transparent" : "bg-gradient-to-r from-black to-purple-600 bg-clip-text text-transparent"}`}
          >
            To-Do-App
          </h1>{" "}
          <button
            onClick={() => setDarkmode(!darkmode)}
            className={`px-4 py-2  rounded-full shadow-md transition-all duration-300 hover:scale-110 ${darkmode ? "bg-yellow-400 text-black" : "bg-gray-800 text-white"}`}
          >
            {darkmode ? "Light ☀️" : "Dark 🌙"}
          </button>
        </div>

        <div className="flex flex-col md:flex-row gap-5 justify-center items-center px-4 mt-6">
          <div className="flex flex-col md:flex-row  itmes-center  w-full md:w-auto gap-1">
            <label className=" font-semibold text-xl md:self-center">
              {" "}
              Name
            </label>
            <input
              className=" w-full md:w-auto border-2 p-2 rounded-xl shadow-md focus:ring-2 focus:ring-purple-400 transition-all duration-300 hover:scale-105"
              required
              type="text"
              value={arr.Name}
              onChange={(e) =>
                setArr((prev) => ({ ...prev, Name: e.target.value }))
              }
            />
          </div>
          <div className="flex flex-col md:flex-row itmes-center justify-around w-full md:w-auto gap-1">
            <label className=" font-semibold text-xl  md:self-center">
              {" "}
              Duedate
            </label>
            <input
              required
              className=" w-full md:w-auto border-2 p-2  rounded-xl shadow-md focus:ring-2 focus:ring-purple-400 transition-all duration-300 hover:scale-105"
              type="date"
              value={arr.duedate}
              onChange={(e) =>
                setArr((prev) => ({ ...prev, duedate: e.target.value }))
              }
            />
          </div>
          <div className="flex flex-col md:flex-row itmes-center justify-around w-full md:w-auto gap-1 relative">
            <label className=" font-semibold text-xl  md:self-center">
              Priority
            </label>
            <input
              required
              onFocus={() => setShowtooltip(true)}
              onBlur={() => setShowtooltip(false)}
              className=" w-full md:w-auto border-2 p-2 rounded-xl shadow-md focus:ring-2 focus:ring-purple-400 transition-all duration-300 hover:scale-105"
              type="number"
              value={arr.Priority}
              onChange={(e) =>
                setArr((prev) => ({ ...prev, Priority: e.target.value }))
              }
            />
            {showtooltip && (
              <div className="absolute top-full mt-2 w-1/2 p -3 bg-purple-100 flex flex-col z-10 shadow-lg  ">
                <p> high - 1</p> <p> Medium - 2</p> <p> Low - 3</p>
              </div>
            )}
          </div>
          <button
            onClick={handleSubmit}
            className="bg-purple-600 px-6 py-2 rounded-xl text-white font-semibold shadow-xl hover:bg-purple-700 hover:scale-110 transition-all duration-300"
          >
            {" "}
            Add{" "}
          </button>
        </div>
        <div className="flex justify-center items-center  p-2 m-3">
          <button
            className="bg-purple-600 p-2 text-white m-2 hover:scale-105 hover:bg-purple-900 transition duration-300"
            onClick={() => {
              handleToggle("name");
            }}
          >
            {" "}
            Sort by Name {sorttype === "name" ? sortorder || "none" : ""}
          </button>
          <button
            className="bg-purple-600 p-2 text-white m-2 hover:scale-105 hover:bg-purple-900 transition duration-300"
            onClick={() => {
              handleToggle("date");
            }}
          >
            {" "}
            Sort by Date {sorttype === "date" ? sortorder || "none" : ""}
          </button>
          <button
            className="bg-purple-600 p-2 text-white m-2 hover:scale-105 hover:bg-purple-900 transition duration-300"
            onClick={() => {
              handleToggle("Priority");
            }}
          >
            {" "}
            Sort by Priority {sorttype ? sortorder || "none" : ""}
          </button>

          <button
            onClick={() => deleteAlldata()}
            className="bg-purple-600 p-2 text-white m-2 hover:scale-105 hover:bg-purple-950 transition duration-300"
          >
            {" "}
            Delete All
          </button>
        </div>

        <div className="w-full md:w-1/2 mx-auto mt-6 px-4">
          <input
            type="text"
            placeholder="search tasks "
            onChange={(e) => setSearchText(e.target.value)}
            className="w-full p-3 rounded-full border shadow:md focus:ring-2 focus:ring-purple-400 transition-all duration-300"
          />
        </div>

        {paginatedData.length ? (
          <div className="overflow-x-auto m-6 px-4 w-full ">
            <table className="w-full border-collapse rounded-xl overflow-hidden shadow-lg">
              <thead className="bg-purple-500 border-b">
                <th className="p-2 border"> Task Name</th>
                <th className="p-2 border"> DueDate</th>
                <th className="p-2 border">Priority</th>
              </thead>
              <tbody>
                {paginatedData.map((item, i) => (
                  <tr className="hover:bg-purple-100 hover:scale-[1.01] transition-all duration-300">
                    <td className="p-3 text-center border"> {item.Name}</td>
                    <td className="p-3 text-center border">{item.duedate}</td>
                    <td className="p-3 text-center border ">{item.Priority}</td>
                  </tr>
                ))}
              </tbody>
            </table>
            <div className="flex justify-between  bg-red-400 p-2  ">
              <button
                disabled={currentPage === 1}
                onClick={() => setCurrentPage((prev) => prev - 1)}
              >
                {" "}
                prev
              </button>
              <span>
                {" "}
                page {currentPage} of {totalPage}
              </span>
              <button
                disabled={lastIndex >= displayData.length}
                onClick={() => setCurrentPage((prev) => prev + 1)}
              >
                {" "}
                next
              </button>
            </div>
          </div>
        ) : (
          <div className={` ${darkmode ? "text-white" : "text-black"}`}>
            <h2 className="font-bold text-2xl mt-6 tracking-wide">
              {" "}
              No Task to display
            </h2>
            <p className="text-xl text-gray-500">
              {" "}
              Try adding new Task or try for different search
            </p>
          </div>
        )}

        <div className="flex justify-center">
          <button
            className="bg-black rounded-2xl text-white w-24 py-2 mt-6 hover:bg-gray-800 transition"
            onClick={() => navigate("/")}
          >
            Back
          </button>
        </div>
      </div>
    </>
  );
};

export default NewTodos;
