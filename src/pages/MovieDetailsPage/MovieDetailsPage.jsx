import {
	NavLink,
	Outlet,
	useLocation,
	useNavigate,
	useParams,
} from "react-router-dom";
import { getMovieDetails } from "../../api";
import { useEffect, useState } from "react";
import { nanoid } from "nanoid";

export default function MovieDetailsPage() {
	const { movieId } = useParams();
	const [movie, setMovie] = useState(null);
	const navigate = useNavigate();
	const location = useLocation();
	const previousPage = location?.state?.from || "/movies";

	useEffect(() => {
		const fetchMovieDetails = async () => {
			try {
				const movieData = await getMovieDetails(movieId);
				setMovie(movieData);
			} catch (error) {
				console.log(error.message);
			}
		};

		fetchMovieDetails();
	}, [movieId]);

	if (!movie) {
		return <div>Loading...</div>;
	}

	return (
		<div>
			<button type="button" onClick={() => navigate(previousPage)}>
				Go back
			</button>

			<h1>{movie.title}</h1>

			<p>{movie.overview}</p>

			<img
				src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
				alt={movie.title}
			/>

			<h2>Slogan</h2>
			<p>{movie.tagline}</p>

			<h2>Age restrictions</h2>
			{!movie.adult ? <p>No age restrictions</p> : <p>18+</p>}

			<h2>Genres</h2>
			<ul>
				{movie.genres.map((genre) => (
					<li key={genre.id}>{genre.name}</li>
				))}
			</ul>

			<h2>Release</h2>
			<p>{movie.release_date.slice(0, 4)}</p>

			<h2>Country</h2>
			{movie.production_countries.map((country) => (
				<p key={nanoid()}>{country.name}</p>
			))}

			<h2>Budget</h2>
			<p>{movie.budget.toLocaleString("en-US")}</p>

			<h2>Revenue</h2>
			<p>{movie.revenue.toLocaleString("en-US")}</p>

			<h2>Duration</h2>
			<p>
				{Math.floor(movie.runtime / 60)}h {movie.runtime % 60}m
			</p>

			<h2>Votes</h2>
			<p>{movie.vote_count}</p>

			<h2>Avaliation</h2>
			<p>{movie.vote_average.toFixed(1)}</p>

			<ul>
				<li>
					<NavLink to="cast" state={{ from: previousPage }}>
						Cast
					</NavLink>
				</li>
				<li>
					<NavLink to="reviews" state={{ from: previousPage }}>
						Reviews
					</NavLink>
				</li>
			</ul>

			<hr />

			<Outlet />
		</div>
	);
}
