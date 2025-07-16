// import { useState } from "react";
import "./todo.css"
const TodoData = (props) => {

    const { todoList, deleteTodo } = props;

    const handleDelete = (id) => {
        deleteTodo(id)
    }

    return (
        <div className="todo-data">

            {todoList.map((todo, index) => {
                return (
                    <div className="todo-item" key={todo.id}>
                        <div>{index} - {todo.name}</div>
                        <button onClick={() => handleDelete(todo.id)} style={{ background: "red", cursor: "pointer" }}>Delete</button>
                    </div>
                )
            })}
        </div>
    );
}
export default TodoData;