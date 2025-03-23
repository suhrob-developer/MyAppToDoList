//import TodoList from "./components/TodoList";
import React,{useState, useEffect} from "react";
import axios from 'axios'
import   './Todo.css'

const App = ()=> {

  const[todos, setTodos] = useState([])
  const[task, setTask] = useState("")

  //Получить список Todos
  const fetchTodos = async ()=>{
    const res = await axios.get('http://localhost:3006/users')
    setTodos(res.data)
  }

  //Создать новый Todo
  const addTodo = async ()=>{

    if (!task.trim()) return;

    const newTodo = { task, completed:false }
    await axios.post('http://localhost:3006/users',newTodo);
    setTask('')
    fetchTodos() //обновляем список
  }

  const toggleComplete = async(id) => {
    const todo = todos.find(todo => todo.id === id)
    await axios.put(`http://localhost:3006/users/${id}`,{...todo,  completed:!todo.completed})
    fetchTodos();//обновляем список
  }

  // Удалит todo
  const deleteTodo = async(id) => {
    await axios.delete(`http://localhost:3006/users/${id}`)
    fetchTodos();
  }

  //useEffect для загрузки TODOs при монтирование компонента
  useEffect(() => { 
    fetchTodos()
   },[])

  return (
    <div>
    <section className="container">
     <h1>Todo list</h1>
     <input 
     type="text"
     value={task}
     onChange = {(e) => setTask(e.target.value) }
     placeholder="Enter Task"
     />
     <button className="btnTask" onClick={addTodo}>Add Tasks</button>
     <ul>
      {todos.map((todo)=>(<li key={todo.id} style={{textDecoration:'none'}}>
        <span style={{textDecoration:todo.completed ? "line-through":'none', marginRight:'9px', }}>{todo.task}</span>
        <button className="btn-1" onClick = {() => toggleComplete(todo.id)}>Done/Not Done</button>
        <button className="btn-2" onClick = {() => deleteTodo(todo.id)}>Delete</button>
      </li>
    ))}
     </ul>
     </section>
    </div>
  );
}

export default App;
