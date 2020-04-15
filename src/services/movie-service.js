import Actor from "../models/actor";
import Movie from "../models/movie";
import { fromEvent, from, zip, Observable } from "rxjs";
import { debounceTime, map, switchMap, mergeMap } from "rxjs/operators";

const DATA_BASE_URL = "http://localhost:3000/";
// const DATA_BASE_URL =
// 	"https://my-json-server.typicode.com/milosavljevicoa/movie-actor-async/";

export async function getAllMovies() {
	const moviesResponse = await fetch(DATA_BASE_URL + "movies");
	const moviesArray = await moviesResponse.json();
	let movies = moviesArray.map((movieLiteral) =>
		Movie.createMovieFromLiteral(movieLiteral)
	);
	return movies;
}

export function addEventToInput(inputElement, actorsList) {
	const movieDescriptionElement = document.getElementById("movie-description");
	fromEvent(inputElement, "input")
		.pipe(
			debounceTime(1000),
			map((ev) => ev.target.value),
			switchMap((movieDetails) => {
				return getDetailsAboutMovie(movieDetails);
			})
		)
		.subscribe((movie) => {
			movie.drawDescription(movieDescriptionElement);
		});
}

function getDetailsAboutMovie(movieTitle) {
	const queryStringMovie = "?title=" + formatMovieTitleToDb(movieTitle);

	const movieObservable = getMovieDetails(queryStringMovie);
	return movieObservable.pipe(
		switchMap((movieLiteral) => {
			const movie = createMovieOrMovieError(movieLiteral);
			return getMovieObservable(movieLiteral, movie);
		})
	);
}

function formatMovieTitleToDb(movieTitle) {
	movieTitle = movieTitle.toLowerCase();
	let allWords = movieTitle.split(" ");
	let modifiedWords = allWords.map(
		(word) => word.charAt(0).toUpperCase() + word.slice(1)
	);
	let returnVal = modifiedWords.join(" ");
	return returnVal;
}

function getMovieDetails(queryStringMovie) {
	return from(
		fetch(DATA_BASE_URL + "movies/" + queryStringMovie).then((response) =>
			response.json()
		)
	).pipe(map((movieDetails) => movieDetails[0]));
}

function createMovieOrMovieError(movieLiteral) {
	return movieLiteral !== undefined
		? Movie.createMovieFromLiteral(movieLiteral)
		: Movie.createErrorMovie();
}

function getMovieObservable(movieLiteral, movie) {
	let movieObservable;
	if (movieLiteral !== undefined) {
		const actorIDs = getValuesFromObjectArray(movieLiteral["actors"]);
		movieObservable = getAllActorsByArrayOfID(actorIDs).pipe(
			map((actors) => {
				let actorsObject = actors.map((actor) =>
					Actor.createActorFromLiteral(actor)
				);
				movie.actors = actorsObject;
				return movie;
			})
		);
	} else {
		movieObservable = Observable.create((observer) => {
			observer.next(movie);
		});
	}
	return movieObservable;
}

function getValuesFromObjectArray(objectArray) {
	return Object.values(objectArray).map((value) => parseInt(value));
}

function getAllActorsByArrayOfID(actorIDArray) {
	let actorsOvservable = actorIDArray.map((id) => getActorDetails(id));
	return zip(...actorsOvservable);
}

function getActorDetails(actorID) {
	const specificActor = "actors/" + actorID;
	let url = DATA_BASE_URL + specificActor;
	return from(
		fetch(url).then((promise) => promise.json().then((data) => data))
	);
}
