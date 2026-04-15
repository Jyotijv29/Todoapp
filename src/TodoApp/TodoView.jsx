import React, { useState } from "react";
import Todo from "./Todo";
import NewTodos from "./NewTodos";
import { CheckCircle, Sparkles } from "lucide-react";
import { useNavigate } from "react-router-dom";

const TodoView = () => {
  const navigate = useNavigate();

  return (
    <>
      <div className="min-h-screen bg-gray-300 flex flex-col items-center p-6">
        <h1 className="text-3xl font-bold text-gray-800"> Welcome</h1>
        <p className="text-gray-600 mt-2"> Manage your todos efficiently</p>
        <div className="flex mt-10 flex-wrap justify-center gap-6 items-stretch">
          <div
            className="text-white  w-full sm:w-64 p-6 rounded-2xl mt-10 shadow-md cursor-pointer bg-gradient-to-r from-pink-500 via-sky-400 to-indigo-500 hover:shadow-2xl hover:scale-105  active:scale-95 transition duration-300"
            onClick={() => navigate("/simple")}
          >
            <CheckCircle className=" mb-3" size={30} />
            <h2 className="text-xl font-semibold text-gray-800 text-white">
              {" "}
              Simple Todo
            </h2>
            <p className="text-gray-600 mt-2 text-white">
              {" "}
              Basic crud operation with clean Ui
            </p>
          </div>
          <div
            className="  w-full sm:w-64 p-6 rounded-2xl mt-10 shadow-md cursor-pointer bg-gradient-to-r from-pink-500 via-sky-400 to-indigo-500 hover:shadow-2xl hover:scale-105 transition duration-300"
            onClick={() => navigate("advanced")}
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
      </div>
    </>
  );
};

export default TodoView;
