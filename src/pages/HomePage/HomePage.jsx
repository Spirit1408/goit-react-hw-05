import MovieList from "../../components/MovieList/MovieList";
import { getPopularMovies } from "../../api";
import { useState, useEffect } from "react";
import css from "./HomePage.module.css";

export default function HomePage() {
	const [movies, setMovies] = useState(() => {
		const savedMovies = localStorage.getItem("movies");
		return savedMovies ? JSON.parse(savedMovies) : [];
	});

	useEffect(() => {
		const fetchMovies = async () => {
			try {
				const popularMovies = await getPopularMovies();
				const savedMovies = localStorage.getItem("movies");

				if (!savedMovies || JSON.stringify(popularMovies) !== savedMovies) {
					setMovies(popularMovies);
					localStorage.setItem("movies", JSON.stringify(popularMovies));
				}
			} catch (error) {
				console.error("Error fetching popular movies:", error.message);
			}
		};

		fetchMovies();
	}, []);

	return (
		<>
			<h1 className={css.title}>Trending movies</h1>

			<div className={css.homeContainer}>
				{movies.length > 0 && <MovieList movies={movies} />}
			</div>
		</>
	);
}
