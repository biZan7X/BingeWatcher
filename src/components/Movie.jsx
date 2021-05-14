import React, { useEffect, useState } from "react";
//& icons
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBookmark } from "@fortawesome/free-solid-svg-icons";

const Movie = ({
	title,
	poster_path,
	overview,
	vote_average,
	setBookMarks,
	bookMarks,
}) => {
	//& state
	const [clicked, setClicked] = useState(false);

	//* images
	const IMGPATH = "https://image.tmdb.org/t/p/w1280";
	const defaultImage =
		"https://www.nopcommerce.com/images/thumbs/0005720_coming-soon-page_550.jpeg";

	//? is bookMarked ?
	useEffect(() => {
		bookMarks.forEach((bm) => {
			if (bm.title === title) {
				setClicked(true);
				return;
			}
		});
	}, []);

	const voterColor = () => {
		if (vote_average >= 8) return "green";
		else if (vote_average > 6 && vote_average < 8) return "orange";
		else return "red";
	};

	const onClickBookmark = () => {
		if (!clicked) {
			const movie = {
				title,
				poster_path,
				overview,
				vote_average,
			};
			setBookMarks([...bookMarks, movie]);
		} else {
			const bookMarksTemp = bookMarks.filter((ob) => ob.title !== title);
			setBookMarks(bookMarksTemp);
		}

		setClicked(!clicked);
	};

	return (
		<div className="movie">
			<FontAwesomeIcon
				className="icon-bookmark"
				onClick={onClickBookmark}
				style={{ color: clicked ? "yellow" : "white" }}
				icon={faBookmark}
				size="3x"
			/>
			<img
				className="image"
				src={poster_path ? IMGPATH + poster_path : defaultImage}
				alt="movie"
			/>
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
