import { useRef, useState } from "react";
import { ITodo } from "./types/todo";
import Todos from "./components/todos";

function App() {
  const [todo, setTodo] = useState<ITodo[]>([
    { id: 1, des: "Coding", isDone: false },
    { id: 2, des: "Eat", isDone: false },
    { id: 3, des: "Sleep", isDone: false },
    { id: 4, des: "Repeat", isDone: false },
  ]);

  const inputRef = useRef<HTMLInputElement | null>(null);

  const handleAdd = () => {
    if (inputRef.current) {
      const newTodo: ITodo = {
        id: Math.max(...todo.map((item) => item.id)) + 1,
        des: inputRef.current.value,
        isDone: false,
      };
      setTodo((t) => [...t, newTodo]);
      inputRef.current.value = "";
    }
  };

  const handleDelete = (id: number) => {
    const newArr = todo.filter((item) => item.id !== id);
    setTodo(newArr);
  };

  const handleDone = (id: number) => {
    const newArr = todo.map((item) => {
      if (item.id === id) {
        return { ...item, isDone: !item.isDone }; 
      }
      return item; 
    });
    setTodo(newArr); 
  };

  return (
    <div className="flex flex-col items-center p-10">
      <h1 className="text-3xl font-bold text-rose-500">
        To<span className="text-blue-500"> Do </span>List
      </h1>
      <Todos todos={todo} handleDelete={handleDelete} handleDone={handleDone} /> 
      <div className="flex mt-10 min-w-[400px] gap-4">
        <input
          ref={inputRef}
          className="w-full border border-teal-500 rounded-md p-2"
          type="text"
          placeholder="Add todo"
        />
        <button onClick={handleAdd} className="bg-cyan-950 rounded-md p-2">
          Add
        </button>
      </div>
      <div className="text-[20px] p-3 font-sans">Checked Count: {todo.filter((item) => item.isDone).length}</div>
    </div>
  );
}

export default App;
