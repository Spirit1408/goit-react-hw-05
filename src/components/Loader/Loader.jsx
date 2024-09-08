import { GridLoader } from "react-spinners";
import css from "./Loader.module.css";

export const Loader = () => {
	return (
		<div className={css.loader}>
			<GridLoader color="#ff9900" margin={5} />
		</div>
	);
};
