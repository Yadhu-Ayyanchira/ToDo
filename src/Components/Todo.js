import React from "react";
import "./Todo.css";
import { useState, useRef, useEffect } from "react";

import { MdFileDownloadDone } from "react-icons/md";
import { FiEdit } from "react-icons/fi";
import { MdDelete } from "react-icons/md";

function Todo() {
  const [todo, setTodo] = useState("");
  const [todos, setTodos] = useState([]);

  const addTodo = () => {
    setTodos([...todos, { list: todo, id: Date.now(), status: false }]);
    setTodo("");
  };

  const inputRef = useRef("null");

  useEffect(() => {
    inputRef.current.focus();
  });
  // delete todo item by ID
  const onDelete = (id) => {
    setTodos(todos.filter((to) => to.id !== id));
  };

  const onComplete = (id) => {
    let complete = todos.map((todo) => {
      if (todo.id === id) {
        return { ...todo, status: !todo.status };
      }
      return todo;
    });
    setTodos(complete);
  };

  const onEdit = (id)=>{
    const editTodo = todos.find((todo)=>todo.id===id)
    setTodo(editTodo.list)
  }

  return (
    <div className="container">
      <h2>TODO APP</h2>
      <form className="form-group" onSubmit={(e) => e.preventDefault()}>
        <input
          type="text"
          value={todo}
          ref={inputRef}
          placeholder="Add Task"
          className="form-control"
          onChange={(event) => setTodo(event.target.value)}
        />
        <button onClick={addTodo}>ADD</button>
      </form>
      <div className="list">
        <ul>
          {todos.map((todo) => (
            <li className="list-items">
              <div
                className="list-item-list"
                id={todo.status ? "list-item" : null}
              >
                {todo.list}
              </div>
              <span>
                <MdFileDownloadDone
                  className="list-item-icons"
                  id="complete"
                  title="Complete"
                  onClick={() => onComplete(todo.id)}
                />
                <FiEdit className="list-item-icons" id="edit" title="Edit" onClick={()=>onEdit(todo.id)} />
                <MdDelete
                  className="list-item-icons"
                  id="delete"
                  title="Delete"
                  onClick={() => onDelete(todo.id)}
                />
              </span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default Todo;
