import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getMovieReviews } from "../../api";
import css from "./MovieReviews.module.css";
import { Loader } from "../Loader/Loader";

export default function MovieReviews() {
	const { movieId } = useParams();
	const [reviews, setReviews] = useState([]);
	const [isLoaded, setIsLoaded] = useState(false);

	useEffect(() => {
		const fetchReviews = async () => {
			try {
				setIsLoaded(false);
				const data = await getMovieReviews(movieId);
				setReviews(data);
			} catch (error) {
				console.error(error.message);
			} finally {
				setIsLoaded(true);
			}
		};

		fetchReviews();
	}, [movieId]);

	if (!isLoaded) {
		return <Loader />;
	}

	if (reviews.length === 0) {
		return <p className={css.warning}>No reviews to show</p>;
	}

	return (
		<div>
			<h2 className={css.title}>Reviews</h2>
			<ul className={css.reviewsList}>
				{reviews.map((review) => (
					<li className={css.review} key={review.id}>
						<h4>Author: {review.author}</h4>
						<p>{review.content}</p>
					</li>
				))}
			</ul>
		</div>
	);
}
