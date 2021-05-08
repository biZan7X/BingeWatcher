import React, { useEffect, useState } from "react";
import "./App.scss";
//& component
import Movie from "./components/Movie";

const App = () => {
	//& APIs
	const APIURL =
		"https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=04c35731a5ee918f014970082a0088b1&page=1";
	const SEARCHAPI =
		"https://api.themoviedb.org/3/search/movie?&api_key=04c35731a5ee918f014970082a0088b1&query=";

	//& states
	const [movies, setMovies] = useState([]);

	//* DRY
	const fetchData = async (api) => {
		const res = await fetch(api);
		const data = await res.json();
		setMovies(data.results);
	};

	//? componentDidMount
	useEffect(() => {
		fetchData(APIURL);
	}, []);

	return (
		<>
			<div className="movie-container">
				{movies.length > 0 &&
					movies.map((data, index) => <Movie key={index} {...data} />)}
			</div>
		</>
	);
};

export default App;
