import React, { useState } from "react";
import Todo from "./Todo";
import NewTodos from "./NewTodos";
import { Sparkle, CheckCircle, Sparkles } from "lucide-react";

const TodoView = () => {
  const [view, setView] = useState(null);
  return (
    <>
      <div className="min-h-screen bg-gray-300 flex flex-col items-center p-6">
        <h1 className="text-3xl font-bold text-gray-800"> Welcome</h1>
        <p className="text-gray-600 mt-2"> Manage your todos efficiently</p>
        <div className="flex mt-10 flex-wrap justify-center gap-6 items-stretch">
          <div
            className="bg-white w-full sm:w-54 p-6 rounded-2xl shadow-md cursor-pointer bg-gradient-to-r from-pink-500 via-sky-400 to-indigo-500 
            hover:shadow-2xl hover:scale-105 pinktransition duration-300"
            onClick={() => setView("simple")}
          >
            <CheckCircle className=" mb-3" size={30} />
            <h2 className="text-xl font-semibold text-gray-800">
              {" "}
              Simple Todo
            </h2>
            <p className="text-gray-600 mt-2">
              {" "}
              Basic crud operation with clean Ui
            </p>
          </div>
        </div>
        {/* <div className="flex mt-10 flex-wrap justify-center gap-6"> */}
        <div
          className="bg-white w-64 p-6 rounded-2xl mt-10 shadow-md cursor-pointer bg-gradient-to-r from-pink-500 via-sky-400 to-indigo-500 hover:shadow-2xl hover:scale-105 transition duration-300"
          onClick={() => setView("Advanced")}
        >
          <Sparkles className=" mb-3" size={30} />
          <h2 className="text-xl font-semibold text-gray-800">
            {" "}
            Advanced Todo
          </h2>
          <p className="text-gray-600 mt-2">
            {" "}
            Basic crud operation with clean Ui
          </p>
        </div>
      </div>
      {/* </div> */}
      {view === "simple" && <Todo />}
      {view === "Advanced" && <NewTodos />}
    </>
  );
};

export default TodoView;
