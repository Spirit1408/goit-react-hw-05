import MovieList from "../../components/MovieList/MovieList";
import { searchMovies } from "../../api";
import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import css from "./MoviesPage.module.css";
import { HiSearch } from "react-icons/hi";
import { GrNext, GrPrevious } from "react-icons/gr";
import { Loader } from "../../components/Loader/Loader";

export default function MoviesPage() {
	const [movies, setMovies] = useState([]);
	const [totalPages, setTotalPages] = useState(1);
	const [isSearched, setIsSearched] = useState(false);
	const [loading, setLoading] = useState(false);
	const [searchParams, setSearchParams] = useSearchParams();
	const query = searchParams.get("query") || "";
	const page = parseInt(searchParams.get("page")) || 1;

	useEffect(() => {
		if (!query) return;

		const fetchMovies = async () => {
			try {
				setLoading(true);
				const { results, totalPages } = await searchMovies(query, page);
				setMovies(results);
				setTotalPages(totalPages);
				setIsSearched(true);
			} catch (error) {
				console.log(error.message);
			} finally {
				setLoading(false);
			}
		};

		fetchMovies();
	}, [query, page]);

	const handleSubmit = (e) => {
		e.preventDefault();
		const form = e.target;
		const newQuery = form.elements.searchInput.value.trim();

		if (newQuery === "") return;

		setSearchParams({ query: newQuery, page: 1 });
		form.reset();
	};

	const handlePageChange = (newPage) => {
		setSearchParams({ query, page: newPage });
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
					defaultValue={query}
				/>
				<button type="submit" className={css.formBtn}>
					<HiSearch size={25} />
				</button>
			</form>

			{loading ? (
				<Loader />
			) : (
				<>
					{isSearched && movies.length === 0 && (
						<p className={css.warning}>
							Sorry, no movies were found with `{query}` request
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
