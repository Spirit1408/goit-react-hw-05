import MovieList from "../../components/MovieList/MovieList";
import { searchMovies } from "../../api";
import { useState } from "react";

export default function MoviesPage() {
	const [movies, setMovies] = useState([]);
	const [query, setQuery] = useState("");
	const [page, setPage] = useState(1);
	const [totalPages, setTotalPages] = useState(1);
	const [isSearched, setIsSearched] = useState(false);

	const handleSubmit = async (e) => {
		e.preventDefault();

		const form = e.target;
		const newQuery = form.elements.searchInput.value;
		setQuery(newQuery);
		setPage(1);
		setIsSearched(true);

		try {
			const { results, totalPages } = await searchMovies(newQuery, 1);
			setMovies(results);
			setTotalPages(totalPages);
		} catch (error) {
			console.log(error.message);
		}

		form.reset();
	};

	const handlePageChange = async (newPage) => {
		try {
			const { results } = await searchMovies(query, newPage);
			setMovies(results);
			setPage(newPage);
		} catch (error) {
			console.log(error.message);
		}
	};

	return (
		<div>
			<h1>Search Movies</h1>
			<form onSubmit={handleSubmit}>
				<input type="text" name="searchInput" />
				<button type="submit">Search</button>
			</form>

			{isSearched && movies?.length === 0 && <p>No movies was found</p>}

			{movies.length > 0 && <MovieList movies={movies} />}

			{totalPages > 1 && (
				<div>
					<button
						type="button"
						onClick={() => handlePageChange(page - 1)}
						disabled={page === 1}
					>
						Previous
					</button>
					<span>
						{" "}
						Page {page} of {totalPages}{" "}
					</span>
					<button
						type="button"
						onClick={() => handlePageChange(page + 1)}
						disabled={page === totalPages}
					>
						Next
					</button>
				</div>
			)}
		</div>
	);
}
