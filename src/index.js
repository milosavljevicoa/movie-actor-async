import { getAllMovies, getAllActorsInMovie } from "./services/movie-service";
import Movie from "./models/movie";

const movieListHTML = document.getElementById("movie-list");
const actorsListHTML = document.getElementById("actors-list");

getAllMovies().then((movies) => {
	movies.forEach((movie) => {
		movie.drawListItem(movieListHTML);
	});
});

const movieInput = document.getElementById("movie-input");
const movieButtonSearch = document.getElementById("movie-button");

movieButtonSearch.onclick = () => {
	const movieID = parseInt(movieInput.value);
	getAllActorsInMovie(movieID)
		.then((actors) => {
			actorsListHTML.innerHTML = "Actors: ";
			actors.forEach((actor) => {
				actor.drawListItems(actorsListHTML);
			});
		})
		.catch((err) => alert(err));

	movieInput.value = "";
	actorsListHTML.innerHTML = " ";
};
