import React,{Fragment , useEffect, useState } from 'react';
import axios from 'axios';
import EditTodo from './EditTodo';

function ListTodo() {

    const deleteTodo = async (id) => {
        try {
            
            const deleTodo = await axios.delete(`http://localhost:5000/todos/${id}`);
            setTodos(todos.filter((todo)=> todo.todo_id !== id));
        } catch (error) {
            console.log(error.message);
        }
    }


    const [todos,setTodos] = useState([]);

    const getTodos = async () => {
        try {
            const response = await axios.get("http://localhost:5000/todos").then(({data})=> data);
            setTodos(response);
        }catch (error) {    
            console.log(error.message);
        }
    }
    useEffect(()=> {
        getTodos();
    },[todos])
    
    return (
        <Fragment>
             <table className="table table-dark mt-5 text-center">
                 <thead>
                        <tr>
                        <th scope="col">Description</th>
                        <th scope="col">edit</th>
                        <th scope="col">delete</th>
                        </tr>
                    </thead>
                <tbody>
                    {
                        todos.map((todo)=> (
                            <tr key={`${todo.todo_id}_${todo.description}`}>
                                <td>{todo.description}</td>
                                <td><EditTodo todo={todo}/></td>
                                <td><button className="btn btn-danger" onClick={() =>deleteTodo(todo.todo_id)}>Delete</button></td>
                            </tr>
                        ))
                    }
                </tbody>
            </table>
        </Fragment>
    )
}

export default ListTodo;