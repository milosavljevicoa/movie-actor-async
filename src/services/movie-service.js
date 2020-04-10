import Actor from "../models/actor";
import Movie from "../models/movie";
import { fromEvent } from "rxjs";
import { debounceTime, map, switchMap, catchError } from "rxjs/operators";

// const DATA_BASE_URL = "http://localhost:3000/";
const DATA_BASE_URL =
	"https://my-json-server.typicode.com/milosavljevicoa/movie-actor-async";
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
			switchMap((movieTitle) => getDetailsAboutMovie(movieTitle))
		)
		.subscribe((movie) => {
			movie.drawDescription(movieDescriptionElement);
		});
}

export async function getDetailsAboutMovie(movieTitle) {
	const queryStringMovie = "?title=" + formatMovieTitleToDb(movieTitle);
	const movieLiteral = await getMovieDetailsJSON(queryStringMovie);
	const movie = createMovieOrMovieError(movieLiteral);
	if (!movie.isMovieError()) {
		const actorIDs = getValuesFromObjectArray(movieLiteral["actors"]);
		const allActors = await getAllActorsByArrayOfID(actorIDs);
		movie.actors = allActors;
	}
	return movie;
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

async function getMovieDetailsJSON(queryStringMovie) {
	let movieDetails;
	let movieDetailsResponse = await fetch(
		DATA_BASE_URL + "movies/" + queryStringMovie
	);
	movieDetails = await movieDetailsResponse.json();
	movieDetails = movieDetails[0];
	return movieDetails;
}

function createMovieOrMovieError(movieLiteral) {
	return movieLiteral === undefined
		? Movie.createErrorMovie()
		: Movie.createMovieFromLiteral(movieLiteral);
}

function getValuesFromObjectArray(objectArray) {
	return Object.values(objectArray).map((value) => parseInt(value));
}

async function getAllActorsByArrayOfID(actorIDArray) {
	let allActorsPromise = actorIDArray.map((id) => getActorDetailsJSON(id));
	let allActors = await Promise.all(allActorsPromise);
	allActors = allActors.map((actorLiteral) => {
		return Actor.createActorFromLiteral(actorLiteral);
	});
	return allActors;
}

async function getActorDetailsJSON(actorID) {
	const specificActor = "actors/" + actorID;
	const actorDetailsPromise = await fetch(DATA_BASE_URL + specificActor);
	const actorDetails = actorDetailsPromise.json();
	return actorDetails;
}
