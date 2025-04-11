import React, { useEffect, useState } from "react";


export const Lista = () => {

    const [data, setData] = useState([]);
    const [task, setTask] = useState('');


    const handleSubmit = e => {
        e.preventDefault();
        setTask('')
        fetch('https://playground.4geeks.com/todo/todos/cristian' ,{
            method: "POST",
            body: JSON.stringify({
                "label": "task",
                "is_done": false
              }),
              headers: {
                'Content-Type': 'aplication/json'
              }
        })
        .then(resp => {
            if (!resp.ok) throw new Error(`error code: ${resp.status}`)
                return resp.json
        })
        .then(data => console.log(data)
        )
        .catch(error => console.log(error)
        )
        };

    const handleClick = (index) => {
        let aux = data.filter((el, i) => i != index)
        setData(aux)
    }

    useEffect (() => {
        userCreate()
        getUserTodos()
    },[])

    //---------- POST ----------//
    const userCreate = () => {
        fetch('https://playground.4geeks.com/todo/users/cristian' ,{
        method: "POST"
    })
    .then(resp => {
        if (!resp.ok) throw new Error(`error code: ${resp.status}`)
            return resp.json
    })
    .then(data => getUserTodos())
    .catch(error => console.log(error)
    )
    };

    //---------- GET ----------//
    const getUserTodos = () => {
        fetch('https://playground.4geeks.com/todo/users/cristian')
        .then(resp => {
            if (!resp.ok) throw new Error(`error code: ${resp.status}`)
                return resp.json
        })
        .then(data => setData(data.todos))
        .catch(userCreate())
    };

return (

    <div>
        <form onSubmit={handleSubmit}>
            <input type="text" value={task} onChange={e => setTask(e.target.value)}
                placeholder={data.length === 0 ? 'No hay tareas, añadir tareas' : 'Escribe una nueva tarea'}
            />
        </form>
        <ul>
            {data.todos?.map((el, i) => <li key={i}>{el}
                <span onClick={() => handleClick(i)} className="bg-white d-flex">X</span>
            </li>)}
        </ul>
        <p className="conteo">
            {data.length} task
        </p>
    </div>
);
};