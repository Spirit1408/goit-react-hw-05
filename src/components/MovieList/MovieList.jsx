import { NavLink, useLocation } from "react-router-dom";

export default function MovieList({ movies }) {
	const location = useLocation();

	return (
		<div>
			{movies.length === 0 ? (
				<p>No movies to show</p>
			) : (
				<ul>
					{movies.map((movie) => (
						<li key={movie.id}>
							<NavLink to={`/movies/${movie.id}`} state={{ from: location }}>
								<div>
									<img
										src={`https://image.tmdb.org/t/p/w200${movie.poster_path}`}
										alt={movie.title}
									/>
									<div>
										<h3>{movie.title}</h3>
										<p>Year: {movie.release_date.slice(0, 4)}</p>
										<p>Rating: {movie.vote_average.toFixed(1)}</p>
										<p>{movie.overview}</p>
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
