import React, { useEffect, useState } from "react";
import { unstable_renderSubtreeIntoContainer } from "react-dom";
import { fetchModule } from "vite";


export const Lista = () => {

    const [data, setData] = useState([]);
    const [task, setTask] = useState('');

    useEffect(() => {
        if (data.length == 0) setData(['No hay tareas, añadir tareas'])
    }, [])

    const handleSubmit = e => {
        e.preventDefault();
        setData([...data, task]);
    }

    const handleClick = (index) => {
        let aux = data.filter((el, i) => i != index)
        setData(aux)
    }

    //--------------------- Fech------------------------------------------

    const userCreate = () => {
        fetch("https://playground.4geeks.com/todo/users/cristian", {
            method: "POST",       
    })
    .then(res => res.json())
    .then(
        if
    )
    .catch()

//crea rusuario (post)
//obtener listas (si el usuario no esta creado lo crea) (get)
//introducir tarea (post)
//delete - borrar tarea

return (

    <div>
        <form onSubmit={handleSubmit}>
            <input type="text" value={task} onChange={e => setTask(e.target.value)}
                placeholder={data.length === 0 ? 'No hay tareas, añadir tareas' : 'Escribe una nueva tarea'}
            />
        </form>
        <ul>
            {data.map((el, i) => <li key={i}>{el}
                <span onClick={() => handleClick(i)} className="bg-white d-flex">X</span>
            </li>)}
        </ul>
    </div>
);
};