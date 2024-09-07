import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getMovieReviews } from "../../api";

export default function MovieReviews() {
	const { movieId } = useParams();
	const [reviews, setReviews] = useState([]);

	useEffect(() => {
		const fetchReviews = async () => {
			const data = await getMovieReviews(movieId);
			setReviews(data);
		};

		fetchReviews();
	}, [movieId]);

	if (reviews.length === 0) {
		return <p>No reviews to show</p>;
	}

	return (
		<div>
			<h2>Reviews</h2>
			<ul>
				{reviews.map((review) => (
					<li key={review.id}>
						<h4>Author: {review.author}</h4>
						<p>{review.content}</p>
					</li>
				))}
			</ul>
		</div>
	);
}
