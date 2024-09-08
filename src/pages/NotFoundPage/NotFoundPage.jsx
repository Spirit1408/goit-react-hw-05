import { NavLink } from "react-router-dom";
import css from "./NotFoundPage.module.css";

export default function NotFoundPage() {
	return (
		<>
			<h1 className={css.title}>Sorry, this page doesn`t exist...</h1>
			<NavLink className={css.button} to="/">
				Go home
			</NavLink>
		</>
	);
}
