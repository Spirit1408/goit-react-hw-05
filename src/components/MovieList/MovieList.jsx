import { NavLink, useLocation } from "react-router-dom";
import css from "./MovieList.module.css";

export default function MovieList({ movies }) {
	const location = useLocation();
	const maxLength = 150;

	return (
		<div>
			{movies.length === 0 ? (
				<p className={css.warning}>No movies to show</p>
			) : (
				<ul className={css.list}>
					{movies.map((movie) => (
						<li className={css.movie} key={movie.id}>
							<NavLink to={`/movies/${movie.id}`} state={{ from: location }}>
								<div className={css.movieCard}>
									<img
										src={
											movie.poster_path
												? `https://image.tmdb.org/t/p/w200${movie.poster_path}`
												: "path/to/no-image-placeholder.jpg"
										}
										alt={movie.title || "No title available"}
									/>
									<div>
										<h3 className={css.movieTitle}>
											{movie.title || "Unavailable"}
										</h3>
										<p className={css.movieInfo}>
											Year:{" "}
											{movie.release_date
												? movie.release_date.slice(0, 4)
												: "Unavailable"}
										</p>
										<p className={css.movieInfo}>
											Rating:{" "}
											{movie.vote_average
												? movie.vote_average.toFixed(1)
												: "Unavailable"}
										</p>
										<p className={css.movieInfo}>
											Description:
											{movie.overview
												? movie.overview.length > maxLength
													? ` ${movie.overview.slice(0, maxLength)}...`
													: movie.overview
												: "Unavailable"}
										</p>
									</div>
								</div>
							</NavLink>
						</li>
					))}
				</ul>
			)}
		</div>
	);
}
