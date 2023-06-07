import { useState } from "react";
import Todo from "./components/Todo";
import Search from "./components/Search";
import Filter from "./components/Filter";
import "./App.css";
import TodoForm from "./components/TodoForm";

const App = () => {
  const [todo, setTodo] = useState([
    {
      id: 1,
      text: "Criar funcionalidade X no sistema",
      category: "Trabalho",
      isCompleted: false,
    },
    {
      id: 2,
      text: "Ir para a academia",
      category: "Pessoal",
      isCompleted: false
    },
    {
      id: 3,
      text: "Estudar React",
      category: "Estudos",
      isCompleted: false,
    },
    {
      id: 4,
      text: "Estudar Tailwind CSS",
      category: "Estudos",
      isCompleted: false,
    },
  ]);

  const [filter, setFilter] = useState("All");
  const [sort, setSort] = useState("Asc");

  const [search, setSearch] = useState("");

  const addTodo = (text, category) => {
    const newtodo = [...todo,
    { id: Math.floor(Math.random() * 1000), text, category, isCompleted: false }
    ];
    setTodo(newtodo);
  };

  const removeTodo = (id) => {
    const newtodo = [...todo];
    const filteredtodo = newtodo.filter((todo) => todo.id !== id ? todo : null)
    setTodo(filteredtodo);
  };

  const completeTodo = (id) => {
    const newtodo = [...todo];
    newtodo.map((todo) => todo.id === id ? todo.isCompleted = !todo.isCompleted : todo)
    setTodo(newtodo);
  };

  return (
    <div className="app">
      <h1>Lista de Tarefas</h1>
      <Search search={search} setSearch={setSearch} />
      <Filter filter={filter} setFilter={setFilter} setSort={setSort} />
      <div className="todo-list">
        {todo
          .filter((todo) =>
            filter === "All"
              ? true
              : filter === "Completed"
                ? todo.isCompleted
                : !todo.isCompleted
          )
          .filter((todo) =>
            todo.text.toLowerCase().includes(search.toLowerCase())
          )
          .sort((a, b) =>
            sort === "Asc"
              ? a.text.localeCompare(b.text)
              : b.text.localeCompare(a.text)
          )
          .map((todo, index) => (
            <Todo
              key={index}
              index={index}
              todo={todo}
              completeTodo={completeTodo}
              removeTodo={removeTodo}
            />
          ))}
      </div>
      <TodoForm addTodo={addTodo} />
    </div>
  );
};

export default App;