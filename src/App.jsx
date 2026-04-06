import { useState } from "react";
import Todo from "./TodoApp/Todo";
import NewTodos from "./TodoApp/NewTodos";

function App() {
  return (
    <>
      <div className="">
        <h1 className="text-3xl font-bold underline text-center">Todo List!</h1>
        <Todo />
      </div>
      <NewTodos />
    </>
  );
}

export default App;
