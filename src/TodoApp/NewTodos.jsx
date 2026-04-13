import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

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
  // const itemspage = Math.ceil(totalPage / itemsperpage);

  return (
    <>
      {/* sorting */}
      <div
        className={`${darkmode ? "bg-gray-800 text-white" : "bg-white text-black"} h-screen`}
      >
        <div className="w-full text-center text-4xl font-medium ">
          {" "}
          <h1
            className={`${darkmode ? "bg-gradient-to-r from-white to-purple-500 bg-clip-text text-transparent" : "bg-gradient-to-r from-black to-purple-500 bg-clip-text text-transparent"} text-4xl font-bold text-center mt-6 `}
          >
            To-Do-App
          </h1>{" "}
        </div>
        <div className="" onClick={() => setDarkmode(!darkmode)}>
          {" "}
          Darkmode {darkmode ? "🌙" : "☀️"}
        </div>
        <div className="mx-auto  flex flex-col md:flex-row justify-evenly items-left">
          <div className="flex justify-center items-center  p-2 m-3">
            <label className=" font-semibold text-xl"> Name</label>
            <input
              className=" rounded-2xl outline-indigo-50 border-2 m-3 p-2 shadow-lg max-w-4xl"
              required
              type="text"
              value={arr.Name}
              onChange={(e) =>
                setArr((prev) => ({ ...prev, Name: e.target.value }))
              }
            />
          </div>
          <div className="flex justify-center items-center  p-2 m-3">
            <label className=" font-semibold text-xl"> Duedate</label>
            <input
              required
              className=" rounded-2xl outline-indigo-50 border-2 m-3 p-2 shadow-lg max-w-4xl"
              type="date"
              value={arr.duedate}
              onChange={(e) =>
                setArr((prev) => ({ ...prev, duedate: e.target.value }))
              }
            />
          </div>
          <div className="flex justify-center items-center  p-2 m-3">
            <label className=" font-semibold text-xl">Priority</label>
            <input
              required
              className=" rounded-2xl outline-indigo-50 border-2 m-3 p-2 shadow-lg max-w-4xl"
              type="number"
              value={arr.Priority}
              onChange={(e) =>
                setArr((prev) => ({ ...prev, Priority: e.target.value }))
              }
            />
          </div>
          <button
            onClick={handleSubmit}
            className="border-2 border-amber-800 rounded-2xl bg-black p-2 text-white font-bold h-10 w-20 m-14"
          >
            {" "}
            Add{" "}
          </button>
        </div>
        <div className="flex justify-center items-center  p-2 m-3">
          <button
            className="bg-purple-600 p-2 text-white m-2"
            onClick={() => {
              handleToggle("name");
            }}
          >
            {" "}
            Sort by Name {sorttype === "name" ? sortorder || "none" : ""}
          </button>
          <button
            className="bg-purple-600 p-2 text-white m-2"
            onClick={() => {
              handleToggle("date");
            }}
          >
            {" "}
            Sort by Date {sorttype === "date" ? sortorder || "none" : ""}
          </button>
          <button
            className="bg-purple-600 p-2 text-white m-2"
            onClick={() => {
              handleToggle("Priority");
            }}
          >
            {" "}
            Sort by Priority {sorttype ? sortorder || "none" : ""}
          </button>

          <button
            onClick={() => deleteAlldata()}
            className="bg-purple-600 p-2 text-white m-2"
          >
            {" "}
            Delete All
          </button>
        </div>

        <div className="bg-pink-200 w-200 mx-auto rounded-2xl p-2 m-2 flex justify-between items-center">
          <input
            type="text"
            placeholder="search"
            onChange={(e) => setSearchText(e.target.value)}
          ></input>
        </div>

        <div className="bg-amber-300 flex flex-col  self-center text-black">
          <table className="border-separate border-spacing-y-3">
            <thead>
              <th className="p-2 border"> Task Name</th>
              <th className="p-2 border"> DueDate</th>
              <th className="p-2 border">Priority</th>
            </thead>
            <tbody>
              {paginatedData.map((item, i) => (
                <tr
                  key={item.id}
                  className={`${i % 2 == 0 ? "bg-green-400" : "bg-blue-400"} hover:scale-[1] hover:bg-yellow-100 transition`}
                >
                  <td className="p-2 border text-center"> {item.Name}</td>
                  <td className="p-2 border text-center">{item.duedate}</td>
                  <td className="p-2 border  text-center ">{item.Priority}</td>
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
            {/* {Array.from({ totalPage: lastIndex }, (_, i) => {})} */}
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
