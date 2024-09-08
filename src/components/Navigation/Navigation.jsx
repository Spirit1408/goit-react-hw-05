import { NavLink } from "react-router-dom";
import css from "./Navigation.module.css";

export default function Navigation() {
	return (
		<header>
			<div className={css.title}>
				<span className={css.logo}>
					Movies<span className={css.subLogo}>hub</span>
				</span>
				<nav className={css.navContainer}>
					<NavLink to={"/"} className={css.link}>
						Home
					</NavLink>
					<NavLink to={"/movies"} className={css.link}>
						Movies
					</NavLink>
				</nav>
			</div>
		</header>
	);
}
