import React from "react";

const Movie = ({ title, poster_path, overview, vote_average }) => {
	const IMGPATH = "https://image.tmdb.org/t/p/w1280";

	const voterColor = () => {
		if (vote_average >= 8) return "green";
		else if (vote_average > 5 && vote_average < 8) return "orange";
		else return "red";
	};

	return (
		<div className="movie">
			<img src={IMGPATH + poster_path} alt="movie" />
			<div className="movie-info">
				<h3>{title}</h3>
				<span className={`vote ${voterColor()}`}>{vote_average}</span>
			</div>
			<div className="movie-overview">
				<h2>{title}</h2>
				<p>{overview}</p>
			</div>
		</div>
	);
};

export default Movie;
