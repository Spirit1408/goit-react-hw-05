import { useEffect, useState } from "react";
import { getMovieCredits } from "../../api";
import { useParams } from "react-router-dom";

export default function MovieCast() {
	const { movieId } = useParams();
	const [cast, setCast] = useState([]);
	const [crew, setCrew] = useState({
		directors: [],
		cinematographers: [],
		soundDesigners: [],
		screenwriters: [],
	});
	const [totalCastCount, setTotalCastCount] = useState(0);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		const fetchMovieCredits = async () => {
			try {
				const data = await getMovieCredits(movieId);
				const castList = data.cast;
				const crewList = data.crew;

				const displayedCast = castList.slice(0, 10);
				const additionalActorsCount = castList.length - displayedCast.length;

				setCast(displayedCast);
				setTotalCastCount(additionalActorsCount);

				const directors = crewList.filter(
					(member) => member.job === "Director",
				);
				const cinematographers = crewList.filter(
					(member) => member.job === "Director of Photography",
				);
				const soundDesigners = crewList.filter(
					(member) => member.job === "Sound Designer",
				);
				const screenwriters = crewList.filter(
					(member) => member.job === "Writer",
				);

				const composers = crewList.filter(
					(member) => member.job === "Composer",
				);

				setCrew({
					directors,
					cinematographers,
					soundDesigners,
					screenwriters,
					composers,
				});
			} catch (error) {
				console.error(error.message);
			} finally {
				setLoading(false);
			}
		};

		fetchMovieCredits();
	}, [movieId]);

	if (loading) {
		return <div>Loading...</div>;
	}

	return (
		<div>
			<h2>Movie Cast and Crew</h2>

			<div>
				<h3>Directors</h3>
				{crew.directors.length === 0 ? (
					<p>No directors available</p>
				) : (
					<ul>
						{crew.directors.map((director) => (
							<li key={director.id}>{director.name}</li>
						))}
					</ul>
				)}
			</div>

			<div>
				<h3>Cinematographers</h3>
				{crew.cinematographers.length === 0 ? (
					<p>No cinematographers available</p>
				) : (
					<ul>
						{crew.cinematographers.map((cinematographer) => (
							<li key={cinematographer.id}>{cinematographer.name}</li>
						))}
					</ul>
				)}
			</div>

			<div>
				<h3>Sound Designers</h3>
				{crew.soundDesigners.length === 0 ? (
					<p>No sound designers available</p>
				) : (
					<ul>
						{crew.soundDesigners.map((soundDesigner) => (
							<li key={soundDesigner.id}>{soundDesigner.name}</li>
						))}
					</ul>
				)}
			</div>

			<div>
				<h3>Screenwriters</h3>
				{crew.screenwriters.length === 0 ? (
					<p>No screenwriters available</p>
				) : (
					<ul>
						{crew.screenwriters.map((screenwriter) => (
							<li key={screenwriter.id}>{screenwriter.name}</li>
						))}
					</ul>
				)}
			</div>

			<div>
				<h3>Composers</h3>
				{crew.composers.length === 0 ? (
					<p>No composers available</p>
				) : (
					<ul>
						{crew.composers.map((composer) => (
							<li key={composer.id}>{composer.name}</li>
						))}
					</ul>
				)}
			</div>

			<div>
				<h3>Cast</h3>
				{cast.length === 0 ? (
					<p>No cast information available</p>
				) : (
					<ul>
						{cast.map((actor) => (
							<li key={actor.id}>
								<p>
									{actor.name} as {actor.character}
								</p>
							</li>
						))}
					</ul>
				)}
				{totalCastCount > 0 && <p>And {totalCastCount} more actors</p>}
			</div>
		</div>
	);
}
