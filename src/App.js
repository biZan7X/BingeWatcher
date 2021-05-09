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
	const [searchValue, setSearchValue] = useState("");

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

	const onSubmithandler = (e) => {
		e.preventDefault();

		fetchData(SEARCHAPI + searchValue);

		setSearchValue("");
	};

	const renderMovies = () => {
		if (movies.length > 0)
			return movies.map((data, index) => <Movie key={index} {...data} />);

		return <h2 className="no-search">Oops! we could not find anything...</h2>;
	};

	return (
		<>
			<header>
				<h2>{`BingeWatcher </>`}</h2>
				<form onSubmit={onSubmithandler}>
					<input
						type="text"
						className="search"
						placeholder="Search..."
						value={searchValue}
						onChange={(e) => setSearchValue(e.target.value)}
					/>
				</form>
			</header>
			<div className="movie-container">{renderMovies()}</div>
		</>
	);
};

export default App;
