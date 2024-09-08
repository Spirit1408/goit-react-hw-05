import { useState, useEffect } from "react";
import css from "./ScrollTopBtn.module.css";
import { FaAngleDoubleUp } from "react-icons/fa";

export const ScrollToTopButton = () => {
	const [visible, setVisible] = useState(false);
	const [isPressed, setIsPressed] = useState(false);

	useEffect(() => {
		const handleScroll = () => {
			if (window.scrollY > 50 && !isPressed) {
				setVisible(true);
			} else {
				setVisible(false);
			}
		};

		window.addEventListener("scroll", handleScroll);
		return () => window.removeEventListener("scroll", handleScroll);
	}, [isPressed]);

	const scrollToTop = () => {
		window.scrollTo({ top: 0, behavior: "smooth" });
		setVisible(false);
		setIsPressed(true);
		setTimeout(() => setIsPressed(false), 1000);
	};

	return (
		<>
			{visible && (
				<button
					type="button"
					className={css.scrollTopBtn}
					onClick={scrollToTop}
				>
					<FaAngleDoubleUp />
				</button>
			)}
		</>
	);
};
