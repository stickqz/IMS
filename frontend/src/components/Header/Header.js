import classes from "./Header.module.css";

const Header = (props) => {
	return (
		<>
			<header className={classes["main-header"]}>
				<h1>Dashboard</h1>
				<div className={classes.nav}>
					<ul>
						<li>
							<button>Logout</button>
						</li>
					</ul>
				</div>
			</header>
		</>
	);
};

export default Header;
