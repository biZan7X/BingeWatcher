import React, { useEffect, useState } from "react";
import { BrowserRouter, Route, Link } from "react-router-dom";
import "./App.scss";
//& component
import Movie from "./components/Movie";
import logo from "./icons/logo.png";
//& icons
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBookmark, faHome } from "@fortawesome/free-solid-svg-icons";

const App = () => {
	//& APIs
	const APIURL =
		"https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=04c35731a5ee918f014970082a0088b1&page=1";
	const SEARCHAPI =
		"https://api.themoviedb.org/3/search/movie?&api_key=04c35731a5ee918f014970082a0088b1&query=";

	//& states
	const [movies, setMovies] = useState([]);
	const [searchValue, setSearchValue] = useState("");
	const [bookMarks, setBookMarks] = useState([]);

	//* DRY
	const fetchData = async (api) => {
		const res = await fetch(api);
		const data = await res.json();
		setMovies(data.results);
	};

	//? componentDidMount
	useEffect(() => {
		fetchData(APIURL);
		//* fetching the bookmarks from the local storage
		setBookMarks(JSON.parse(localStorage.getItem("bookMarks")) || []);
	}, []);

	useEffect(() => {
		//* setting the localStorage
		localStorage.setItem("bookMarks", JSON.stringify(bookMarks));
	}, [bookMarks]);

	const onSubmithandler = (e) => {
		e.preventDefault();

		const text = searchValue.trim();

		if (text === "" || text === " ")
			return alert("Please type something to search...");

		fetchData(SEARCHAPI + text);

		setSearchValue("");
	};

	const RenderMovies = () => {
		if (movies.length > 0)
			return movies.map((data, index) => (
				<Movie
					key={index}
					setBookMarks={setBookMarks}
					bookMarks={bookMarks}
					{...data}
				/>
			));

		return <h2 className="no-search">Oops! we could not find anything...</h2>;
	};

	const RenderBookMarks = () => {
		if (bookMarks.length > 0)
			return bookMarks.map((data, index) => (
				<Movie
					key={index}
					setBookMarks={setBookMarks}
					bookMarks={bookMarks}
					{...data}
				/>
			));

		return (
			<h2 className="no-search">
				Oops! you have not bookmarked any movies yet...
			</h2>
		);
	};

	return (
		<BrowserRouter>
			<header>
				<h2>
					{`BingeWatcher`} <img src={logo} alt="logo" className="logo" />{" "}
				</h2>

				<Link to="/">
					<FontAwesomeIcon
						className="icon-bookmark"
						icon={faHome}
						size="2x"
					/>
				</Link>
				<Link to="/bookmarks">
					<FontAwesomeIcon
						className="icon-bookmark"
						icon={faBookmark}
						size="2x"
					/>
				</Link>

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
			<div className="movie-container">
				<Route path="/" exact component={RenderMovies} />
				<Route path="/bookmarks" component={RenderBookMarks} />
			</div>
		</BrowserRouter>
	);
};

export default App;
