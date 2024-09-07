import axios from "axios";

const API_KEY =
	"eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJiODZlODUxOTkxZWI3NWU0ZDEzOGI1ZGE1NWQyYjU4MyIsIm5iZiI6MTcyNTYyNjM4Ni45MTUyMjMsInN1YiI6IjY2ZGFmMTMxYjZmOTkzNDdiMjIxYjkxYSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.R3ozJR2Y3HtFaJUfJbiiHLRDC3ukfSThK__C5wB7tsA";

axios.defaults.baseURL = "https://api.themoviedb.org/3";

export const getPopularMovies = async () => {
	try {
		const response = await axios.get("/movie/popular", {
			headers: { Authorization: `Bearer ${API_KEY}` },
		});

		return response.data.results;
	} catch (error) {
		console.error(error.message);
		return [];
	}
};

export const searchMovies = async (query, page = 1) => {
	try {
		const response = await axios.get("/search/movie", {
			headers: {
				Authorization: `Bearer ${API_KEY}`,
			},
			params: {
				query,
				page,
			},
		});

		return {
			results: response.data.results,
			totalPages: response.data.total_pages,
		};
	} catch (error) {
		console.error(console.log(error.message));
		return { results: [], totalPages: 0 };
	}
};

export const getMovieDetails = async (movieId) => {
	const response = await axios.get(`/movie/${movieId}`, {
		headers: { Authorization: `Bearer ${API_KEY}` },
	});

	return response.data;
};

export const getMovieCredits = async (movieId) => {
	try {
		const response = await axios.get(`movie/${movieId}/credits`, {
			headers: {
				Authorization: `Bearer ${API_KEY}`,
			},
		});

		return response.data;
	} catch (error) {
		console.error(error.message);
		return { cast: [], crew: [] };
	}
};

export const getMovieReviews = async (movieId, page = 1) => {
	try {
		const response = await axios.get(`/movie/${movieId}/reviews`, {
			headers: {
				Authorization: `Bearer ${API_KEY}`,
			},
			params: {
				page,
			},
		});

		return response.data.results;
	} catch (error) {
		console.log(error.message);
		return;
	}
};
