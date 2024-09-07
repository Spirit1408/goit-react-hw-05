import { NavLink } from "react-router-dom";

export default function NotFoundPage() {
	return (
		<div>
			<h1>Sorry, this page doesn't exist...</h1>
			<NavLink to="/">Go home</NavLink>
		</div>
	);
}
