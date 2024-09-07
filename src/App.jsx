import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import Navigation from "./components/Navigation/Navigation";
import HomePage from "./pages/HomePage/HomePage";
import MoviesPage from "./pages/MoviesPage/MoviesPage";
import MovieDetailsPage from "./pages/MovieDetailsPage/MovieDetailsPage";
import NotFoundPage from "./pages/NotFoundPage/NotFoundPage";
import MovieCast from "./components/MovieCast/MovieCast";
import MovieReviews from "./components/MovieReviews/MovieReviews";

export default function App() {
	return (
		<Router>
			<Navigation />

			<Routes>
				<Route path="/" element={<HomePage />} />
				<Route path="/movies" element={<MoviesPage />} />
				<Route path="/movies/:movieId" element={<MovieDetailsPage />}>
					<Route path="cast" element={<MovieCast />} />
					<Route path="reviews" element={<MovieReviews />} />
				</Route>
				<Route path="*" element={<NotFoundPage />} />
			</Routes>
		</Router>
	);
}
