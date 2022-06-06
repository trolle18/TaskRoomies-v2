// import { useState } from "react";
// import TodoForm from "./TodoForm";

// export default function TodoList() {
//     const [todos, setTodos] = useState([])

//     const addTodo = todo => {
//         if(!todo.text || /^\s*$/.test(todo.text)) {
//             return
//         }

//         const newTodos = [todo, ...todos]
//         setTodos(newTodos)
//         console.log(...todos);
//     }

//     return (
//         <>
//             <h1>Whats the plan for today?</h1>
//             <TodoForm onSubmit={addTodo}/>
//         </>
//     );
// };