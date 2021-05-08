import React from "react";

const Movie = ({ title, poster_path, overview, vote_average }) => {
	const IMGPATH = "https://image.tmdb.org/t/p/w1280";

	return (
		<div className="movie">
			<img src={IMGPATH + poster_path} alt="movie image" />
			<div className="movie-info">
				<h3>{title}</h3>
				<span>{vote_average}</span>
			</div>
		</div>
	);
};

export default Movie;

/*
<div className="movie-overview">
				<h2>{title}</h2>
				<p>{overview}</p>
			</div>
*/
