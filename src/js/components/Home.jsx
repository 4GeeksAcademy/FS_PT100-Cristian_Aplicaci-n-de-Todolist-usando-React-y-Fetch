import React from 'react'

//include images into your bundle
import { Todolist } from "./Todolist.jsx"

//create your first component
const Home = () => {

	return (
		<div className="container">
			<h1>todos</h1>
			<ul>
				<Todolist />
			</ul>
		</div>
	);
};

export default Home;