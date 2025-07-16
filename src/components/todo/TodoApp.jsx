import "./todo.css"
import reactLogo from "../../assets/react.svg"
import TodoNew from "./TodoNew"
import TodoData from "./TodoData"
import { useState } from "react"

const TodoApp = () => {
    const [todoList, setTodoList] = useState([
        // { id: 1, name: "Learning React" },
        // { id: 2, name: "Watching Youtube" }
    ]);


    const addNewTodo = (name) => {
        const maxId = todoList.length > 0 ? Math.max(...todoList.map(todoId => todoId.id)) : 0;

        const newTodo = {
            id: maxId + 1,
            name: name
        }
        setTodoList([...todoList, newTodo]);
    }

    const deleteTodo = (id) => {
        setTodoList(todoList.filter(todo => todo.id !== id))
    }

    const randomIntFromInterval = (min, max) => {
        return Math.floor(Math.random() * (max - min + 1) + min);
    }

    return (
        <div className="todo-container">
            <div className="todo-title">Todo List</div>
            <TodoNew
                addNewTodo={addNewTodo}
            />

            {todoList.length > 0 ?
                <TodoData todoList={todoList} deleteTodo={deleteTodo} />
                :
                <div className="todo-image">
                    <img src={reactLogo} alt="" className="logo" />
                </div>
            }

        </div>
    );
}

export default TodoApp;