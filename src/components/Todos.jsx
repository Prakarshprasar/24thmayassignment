import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import style from "./todo.module.css";

const Todos = () => {
  const [newtodo, setnewTodo] = useState("");
  const [todos, setTodos] = useState([]);
  const [dlt,setDlt]=useState([])
  const [limit, setlimit] = useState(3)
  const [page, setpage] = useState(1)

  const storejson=(todo)=>{
    // setnewTodo(todo)
    console.log(todo)
    // let dlt=todos.filter((todo)=>todo.id === id);
    // setDlt([...dlt,newtodo])
    
    
    fetch("http://localhost:7000/deleted",{
      method:"POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(todo),
    })
    .then((r) => r.json())
      .then((d) => {
        // console.log(d)
        setDlt([...dlt, d]);
        // setnewTodo("");
        // console.log(newtodo)
      });
  }

  const postData = () => {
    fetch("http://localhost:8000/todos", {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({
        value: newtodo,
        isCompleted: false,
      }),
    })
      .then((r) => r.json())
      .then((d) => {
        // console.log(d)
        setTodos([...todos, d]);
        setnewTodo("");
        // console.log(newtodo)
      });
  };

  useEffect(() => {
    fetch(`http://localhost:8000/todos?_page=${page}&_limit=${limit}`)
      .then((r) => r.json())
      .then((d) => {
        setTodos(d);
      });
  }, [todos]);

  return (
    <div>
      Todos
      <div>
        <input
          type="text"
          onChange={({ target }) => {
            setnewTodo(target.value);
          }}
        />
        <button onClick={postData} disabled={!newtodo}>
          +
        </button>
        {todos.map((todo) => (
          <div className={style.list} key={todo.id}>
            <input type="checkbox" />
            <span>{todo.value}</span>
            <button onClick={()=>{storejson(todo)}}>X</button>
          </div>
        ))}
      </div>
      <div>
        <button disabled={page<=1} onClick={()=>setpage(page-1)}>{"<"}</button>
        <select onChange={(e)=>setlimit(e.target.value)}>
          <option value="3">3</option>
          <option value="6">6</option>
          <option value="9">9</option>
        </select>
        <button disabled={page>=todos.length} onClick={()=>setpage(page+1)}>{">"}</button>
      </div>
    </div>
  );
};

export default Todos;
