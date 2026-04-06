import React, { useEffect, useState } from "react";

const NewTodos = () => {
  const arrayvalue = "arr";
  const itemsperpage = 5;

  const [arr, setArr] = useState({ Name: "", Amount: "", duedate: "" });
  const [data, setData] = useState(() => {
    const items = localStorage.getItem(arrayvalue);
    return items ? JSON.parse(items) : [];
  });
  const [sorttype, setSorttype] = useState(null);
  const [sortorder, setSortorder] = useState(null);
  const [searchtext, setSearchText] = useState("");
  const [debouncetext, setDebouncetext] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  const lastIndex = currentPage * itemsperpage;
  const firsttIndex = lastIndex - itemsperpage;

  const handleSubmit = (e) => {
    e.preventDefault();
    const newdata = { ...arr, id: Date.now() };
    setData((prev) => [...prev, newdata]);
    const lastpage = Math.ceil(data.length / itemsperpage);
    // setData([...data, newdata]);
    setCurrentPage(lastpage);
    setArr({ Name: "", duedate: "", Amount: "" });
  };

  useEffect(() => {
    localStorage.setItem(arrayvalue, JSON.stringify(data));
  }, [data]);

  const deleteAlldata = () => {
    localStorage.removeItem(arrayvalue);
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
      if (sorttype === "amount") {
        return sortorder === "asc"
          ? Number(a.Amount) - Number(b.Amount)
          : Number(b.Amount) - Number(a.Amount);
      }
      return 0;
    });

  useEffect(() => {
    setCurrentPage(1);
  }, [debouncetext, sorttype, sortorder]);

  const paginatedData = displayData.slice(firsttIndex, lastIndex);
  const totalPage = Math.ceil(displayData.length / itemsperpage);
  const itemspage = Math.ceil(totalPage / itemsperpage);

  return (
    <>
      {/* sorting */}
      <div className="w-full text-center text-4xl font-medium"> To-Do-App</div>
      <div className="m x-auto  flex flex-col md:flex-row justify-between">
        <div className="flex justify-center items-center  p-2 m-3">
          <label> Name</label>
          <input
            className=" rounded-2xl outline-indigo-50 border-2 m-3 p-2"
            required
            type="text"
            value={arr.Name}
            onChange={(e) =>
              setArr((prev) => ({ ...prev, Name: e.target.value }))
            }
          />
        </div>
        <div className="flex justify-center items-center  p-2 m-3">
          <label> Duedate</label>
          <input
            required
            className=" rounded-2xl outline-indigo-50 border-2 m-3 p-2"
            type="date"
            value={arr.duedate}
            onChange={(e) =>
              setArr((prev) => ({ ...prev, duedate: e.target.value }))
            }
          />
        </div>
        <div className="flex justify-center items-center  p-2 m-3">
          <label> Amount</label>
          <input
            required
            className=" rounded-2xl outline-indigo-50 border-2 m-3 p-2"
            type="number"
            value={arr.Amount}
            onChange={(e) =>
              setArr((prev) => ({ ...prev, Amount: e.target.value }))
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
            handleToggle("amount");
          }}
        >
          {" "}
          Sort by Amount {sorttype ? sortorder || "none" : ""}
        </button>

        <button
          onClick={() => {
            deleteAlldata;
          }}
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

      <div className="bg-amber-300 flex flex-col  self-center">
        <table border={"2"} className="border-separate border-spacing-y-3">
          <thead>
            <th className="p-2 border"> Task Name</th>
            <th className="p-2 border"> DueDate</th>
            <th className="p-2 border">Amount</th>
          </thead>
          <tbody>
            {paginatedData.map((item, i) => (
              <tr
                key={item.id}
                className={i % 2 == 0 ? "bg-green-300" : "bg-blue-300"}
              >
                <td className="p-2 border text-center"> {item.Name}</td>
                <td className="p-2 border text-center">{item.duedate}</td>
                <td className="p-2 border  text-center ">{item.Amount}</td>
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
    </>
  );
};

export default NewTodos;
