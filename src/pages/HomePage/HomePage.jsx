import MovieList from "../../components/MovieList/MovieList";
import { getPopularMovies } from "../../api";
import { useState } from "react";
import { useEffect } from "react";

export default function HomePage() {
	const [movies, setMovies] = useState([]);

	useEffect(() => {
		const fetchMovies = async () => {
			try {
				const popularMovies = await getPopularMovies();
				setMovies(popularMovies);
			} catch (error) {
				console.error("Error fetching popular movies:", error.message);
			}
		};

		fetchMovies();
	}, []);

	return (
		<div>
			<h1>Trending movies</h1>
			{movies.length > 0 && <MovieList movies={movies} />}
		</div>
	);
}
