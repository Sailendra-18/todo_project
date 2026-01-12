import { useState,useEffect,useRef} from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import Navbar from "./component/Navbar";
import { v4 as uuidv4 } from "uuid";

function App() {
  const [todo, settodo] = useState("");
  const [todos, setTodos] = useState([]);
  const [showFinished, setshowFinished] = useState(true);
  const inputRef = useRef(null);

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  useEffect(() => {
    let gettodos=localStorage.getItem("todos");
    if(gettodos){
      let todos= JSON.parse(localStorage.getItem("todos"));
      setTodos(todos);
    }
  
    
  }, [])
  
  const handleChange = (e) => {
    settodo(e.target.value);
  };
  const saveToLS=(params)=>{
    localStorage.setItem("todos",JSON.stringify(todos));
  }

  const toggleFinished = (e) => {
    setshowFinished(!showFinished);
  };
  const handleBox = (e) => {
    let id = e.target.name;
    let index = todos.findIndex((item) => {
      return item.id === id;
    });
    let newTodos = [...todos];
    newTodos[index].isCompleted = !newTodos[index].isCompleted;
    setTodos(newTodos);
    saveToLS();
  };
  const handleDelete = (e, id) => {
    let confirmd=window.confirm("are you sure");
    if(!confirmd) return;
      let newTodos = todos.filter((item) => {
      return item.id !== id;
    });
    setTodos(newTodos);
    saveToLS();
  };
  const handleEdit = (e, id) => {
    let t = todos.filter((i) => i.id === id);
    settodo(t[0].todo);
    let newTodos = todos.filter((item) => {
      return item.id !== id;
    });
    setTodos(newTodos);
     saveToLS();
  };

  const handleSave = () => {
    setTodos([...todos, { id: uuidv4(), todo, isCompleted: false }]);
    settodo("");
    saveToLS();
  };

  return (
    <>
      <Navbar />
      <div className="container mx-3 md:container md:mx-auto my-5 rounded-xl p-5 bg-violet-100 min-h-[80vh] md:w-[35%]">
        <h2 className="font-bold text-xl my-2">Add Todo</h2>
        <div className="flex container2">
          <input
            onChange={handleChange}
            ref={inputRef}
            className="border-black bg-amber-100 mx-4 rounded-2xl w-full "
            type="text"
            value={todo}
          />
          <button
            onClick={handleSave}
            disabled={todo.length < 1}
            className="bg-violet-800 mx-2 rounded-full hover:bg-violet-950 disabled:bg-violet-500 p-4 py-2 text-sm font-bold text-white">
            save
          </button>
        </div>
        <input
          className="my-4"
          id="show"
          onChange={toggleFinished}
          type="checkbox"
          checked={showFinished}
        />
        <label className="mx-2" htmlFor="show">
          Show Finished
        </label>
        <h2 className="font-bold text-xl my-2">Your Todos</h2>
        <div className="urtodos">
          {todos.length === 0 && (
            <div className="text-xl font-bold flex justify-center my-10">
              no todos to display
            </div>
          )}
          {todos.map((item) => {
            return (
              (showFinished || !item.isCompleted) && (
                <div className=" flex gap-5" key={item.id}>
                  <div className="c m-3">
                    <input
                      onChange={handleBox}
                      type="checkbox"
                      name={item.id}
                      id={item.id}
                      checked={item.isCompleted}
                    />
                  </div>
                  <div className="flex">
                    <label
                      htmlFor={item.id}
                      className={item.isCompleted ? "line-through" : ""}>
                      {item.todo}
                    </label>
                  </div>
                  <div className="ed  buttons flex h-full">
                    <button
                      onClick={(e) => handleEdit(e, item.id)}
                      className="bg-violet-800 mx-2 rounded-full hover:bg-violet-950 disabled:bg-violet-500 p-4 py-2 text-sm font-bold text-white">
                      edit
                    </button>
                    <button
                      onClick={(e) => handleDelete(e, item.id)}
                      className="bg-violet-800 mx-2 rounded-full hover:bg-violet-950 disabled:bg-violet-500 p-4 py-2 text-sm font-bold text-white">
                      delete
                    </button>
                  </div>
                </div>
              )
            );
          })}
        </div>
      </div>
    </>
  );
}

export default App;
