import {
	getAllMovies,
	getDetailsAboutMovie,
	addEventToInput,
} from "./src/services/movie-service";

const movieListHTML = document.getElementById("movie-list");

getAllMovies().then((movies) => {
	movies.forEach((movie) => {
		movie.drawListItem(movieListHTML);
	});
});

const movieInput = document.getElementById("movie-input");
const actorsListHTML = document.getElementById("actors-list");

addEventToInput(movieInput, actorsListHTML);
