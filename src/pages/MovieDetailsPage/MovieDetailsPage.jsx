import {
	NavLink,
	Outlet,
	useLocation,
	useNavigate,
	useParams,
} from "react-router-dom";
import { getMovieDetails } from "../../api";
import { useEffect, useRef, useState } from "react";
import { nanoid } from "nanoid";
import { Loader } from "../../components/Loader/Loader";
import css from "./MovieDetailsPage.module.css";

export default function MovieDetailsPage() {
	const { movieId } = useParams();
	const [movie, setMovie] = useState(null);
	const navigate = useNavigate();
	const location = useLocation();
	const previousPageRef = useRef(location.state?.from || "/movies");

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
		return <Loader />;
	}

	return (
		<div className={css.movie}>
			<button
				className={css.backBtn}
				type="button"
				onClick={() => navigate(previousPageRef.current)}
			>
				Go back
			</button>

			<h1 className={css.movieTitle}>{movie.title}</h1>

			<div className={css.movieWrapper}>
				<img
					className={css.poster}
					src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
					alt={movie.title}
				/>

				<div>
					<p className={css.movieDescr}>{movie.overview}</p>

					<ul className={css.infoList}>
						<li>
							<h2 className={css.subTitle}>Slogan</h2>
							<p className={css.slogan}>{movie.tagline}</p>
						</li>

						<li>
							<h2 className={css.subTitle}>Age restrictions</h2>
							{!movie.adult ? (
								<p className={css.info}>No age restrictions</p>
							) : (
								<p className={css.info}>18+</p>
							)}
						</li>

						<li>
							<h2 className={css.subTitle}>Genres</h2>
							<ul className={css.genres}>
								{movie.genres.map((genre) => (
									<li className={css.genre} key={genre.id}>
										{genre.name}
									</li>
								))}
							</ul>
						</li>

						<li>
							<h2 className={css.subTitle}>Release</h2>
							<p className={css.info}>{movie.release_date.slice(0, 4)}</p>
						</li>

						<li>
							<h2 className={css.subTitle}>Country</h2>
							{movie.production_countries.map((country) => (
								<p key={nanoid()} className={css.info}>
									{country.name}
								</p>
							))}
						</li>

						<li>
							<h2 className={css.subTitle}>Budget</h2>
							<p className={css.info}>{movie.budget.toLocaleString("en-US")}</p>
						</li>

						<li>
							<h2 className={css.subTitle}>Revenue</h2>
							<p className={css.info}>
								{movie.revenue.toLocaleString("en-US")}
							</p>
						</li>

						<li>
							<h2 className={css.subTitle}>Duration</h2>
							<p className={css.info}>
								{Math.floor(movie.runtime / 60)}h {movie.runtime % 60}m
							</p>
						</li>

						<li>
							<h2 className={css.subTitle}>Votes</h2>
							<p className={css.info}>{movie.vote_count}</p>
						</li>

						<li>
							<h2 className={css.subTitle}>Avaliation</h2>
							<p className={css.info}>{movie.vote_average.toFixed(1)}</p>
						</li>
					</ul>
				</div>
			</div>

			<ul className={css.links}>
				<li>
					<NavLink
						className={css.link}
						to="cast"
						state={{ from: previousPageRef.current }}
					>
						Cast
					</NavLink>
				</li>
				<li>
					<NavLink
						className={css.link}
						to="reviews"
						state={{ from: previousPageRef.current }}
					>
						Reviews
					</NavLink>
				</li>
			</ul>

			<hr />

			<Outlet />
		</div>
	);
}
