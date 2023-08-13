import classes from "./App.module.css";
import LandingPage from "./components/Landing/LandingPage";

function App() {
	return (
		<div className={classes.app}>
			<LandingPage />
		</div>
	);
}

export default App;
