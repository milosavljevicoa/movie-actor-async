export {};

import { getAllMovies, addEventToInput } from "./services/movie-service";
import Movie from "./models/movie";
import { Observable } from "rxjs";

const movieListHTML = document.getElementById("movie-list");

getAllMovies().then((allMovies: Observable<Movie>) => {
	allMovies.subscribe((movie) => {
		if (movieListHTML !== null) movie.drawListItem(movieListHTML);
	});
});

const movieInput: HTMLElement | null = document.getElementById("movie-input");
if (movieInput !== null) {
	addEventToInput(movieInput);
}
