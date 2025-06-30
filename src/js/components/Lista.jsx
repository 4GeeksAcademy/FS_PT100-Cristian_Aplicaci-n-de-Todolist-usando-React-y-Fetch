import React, { useEffect, useState } from "react";


export const Lista = () => {

    const [data, setData] = useState([]);
    const [task, setTask] = useState('')

    useEffect(() => {
        getUserTodos()
    }, [])

    const userCreate = () => {
        fetch('https://playground.4geeks.com/todo/users/cristian', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify()
        })
            .then(resp => {
                if (!resp.ok) throw new Error(`error code: ${resp.status}`)
                return resp.json()
            })
            .then(data => getUserTodos())
            .catch(err => console.log(err))
    }

    const getUserTodos = () => {
        fetch('https://playground.4geeks.com/todo/users/cristian')
            .then(resp => {
                if (!resp.ok) throw new Error(`error code: ${resp.status}`)
                return resp.json()
            })
            .then(data => setData(data.todos))
            .catch(err => userCreate())
    }

    const handleSubmit = e => {
        e.preventDefault();
        fetch('https://playground.4geeks.com/todo/todos/cristian', {
            method: 'POST',
            body: JSON.stringify({
                label: task,
                is_done: false
            }),
            headers: {
                'Content-Type': 'application/json'
            }
        })
            .then(resp => {
                if (!resp.ok) throw new Error(`error code: ${resp.status}`);
                return resp.json();
            })
            .then(newTodo => {
                console.log(newTodo);
                setData([...data, newTodo]); 
                setTask('');
            })
            .catch(err => console.log(err));
    }


    const handleClick = (id) => {
        console.log(id)
        fetch('https://playground.4geeks.com/todo/todos/' + id, {
            method: 'DELETE',
        })
            .then(resp => {
                getUserTodos()
            })
    }

    return (

        <div>
            <form onSubmit={handleSubmit}>
                <input type="text" value={task} onChange={e => setTask(e.target.value)}
                    placeholder={data.length === 0 ? 'No hay tareas, añadir tareas' : 'Escribe una nueva tarea'}
                />
            </form>
            <ul>
                {data && data.map((el) => (
                    <li key={el.id}>
                        <p>{el.label}
                            <span onClick={() => handleClick(el.id)}>X</span> 
                        </p>
                    </li>
                    ))}
            </ul>
            <p className="conteo">
                {data.length} task
            </p>
        </div>
    );
};