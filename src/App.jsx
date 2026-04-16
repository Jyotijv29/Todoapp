import { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import TodoView from "./TodoApp/TodoView";
import Todo from "./TodoApp/Todo";
import NewTodos from "./TodoApp/NewTodos";
import toast, { Toaster } from "react-hot-toast";

function App() {
  return (
    <>
      <div>
        <Toaster />
      </div>

      <BrowserRouter>
        <Routes>
          <Route path="/" element={<TodoView />} />
          <Route path="/simple" element={<Todo />} />
          <Route path="/advanced" element={<NewTodos />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;

// https://todoapp-nine-umber.vercel.app/
