import MovieList from "../../components/MovieList/MovieList";
import { searchMovies } from "../../api";
import { useState } from "react";
import css from "./MoviesPage.module.css";
import { HiSearch } from "react-icons/hi";
import { GrNext, GrPrevious } from "react-icons/gr";
import { Loader } from "../../components/Loader/Loader";

export default function MoviesPage() {
	const [movies, setMovies] = useState([]);
	const [query, setQuery] = useState("");
	const [page, setPage] = useState(1);
	const [totalPages, setTotalPages] = useState(1);
	const [isSearched, setIsSearched] = useState(false);
	const [loading, setLoading] = useState(false);

	const handleSubmit = async (e) => {
		e.preventDefault();

		const form = e.target;
		const newQuery = form.elements.searchInput.value;
		setQuery(newQuery);
		setPage(1);

		try {
			setLoading(true);
			const { results, totalPages } = await searchMovies(newQuery, 1);
			setMovies(results);
			setTotalPages(totalPages);
			setIsSearched(true);
		} catch (error) {
			console.log(error.message);
		} finally {
			setLoading(false);
		}

		form.reset();
	};

	const handlePageChange = async (newPage) => {
		try {
			setLoading(true);
			const { results } = await searchMovies(query, newPage);
			setMovies(results);
			setPage(newPage);
		} catch (error) {
			console.log(error.message);
		} finally {
			setLoading(false);
		}
	};

	return (
		<div className={css.moviesContainer}>
			<h1 className={css.title}>Search Movies</h1>
			<form onSubmit={handleSubmit} className={css.form}>
				<input
					className={css.input}
					type="text"
					name="searchInput"
					placeholder="What movie do you want to find?"
				/>
				<button type="submit" className={css.formBtn}>
					<HiSearch size={25} />
				</button>
			</form>

			{loading ? (
				<Loader />
			) : (
				<>
					{isSearched && isSearched && movies?.length === 0 && (
						<p className={css.warning}>
							Sorry, no movies was found with `{query}` request
						</p>
					)}

					{movies.length > 0 && <MovieList movies={movies} />}

					{totalPages > 1 && (
						<div className={css.pagBtns}>
							<button
								className={css.pagBtn}
								type="button"
								onClick={() => handlePageChange(page - 1)}
								disabled={page === 1}
							>
								<GrPrevious />
							</button>
							<span className={css.pagInfo}>
								Page {page} of {totalPages}
							</span>
							<button
								className={css.pagBtn}
								type="button"
								onClick={() => handlePageChange(page + 1)}
								disabled={page === totalPages}
							>
								<GrNext />
							</button>
						</div>
					)}
				</>
			)}
		</div>
	);
}
