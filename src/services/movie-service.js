import Actor from "../models/actor";
import Movie from "../models/movie";

const DATA_BASE_URL = "http://localhost:3000/";
// const DATA_BASE_URL =
// 	"https://my-json-server.typicode.com/milosavljevicoa/Aleksandar-Milosavljevic-16722/";

export async function getAllMovies() {
	let movies = [];
	const moviesResponse = await fetch(DATA_BASE_URL + "movies");
	const moviesArray = await moviesResponse.json();
	moviesArray.map((movie) => {
		const newMovie = new Movie(
			movie["id"],
			movie["title"],
			movie["realse-year"]
		);
		movies.push(newMovie);
	});
	return movies;
}

export async function getAllActorsInMovie(moveID) {
	const specificMovie = "movies/" + moveID;

	const movieDetails = await getMovieDetailsJSON(specificMovie);

	const actorIDs = Object.values(movieDetails["actors"]).map((value) =>
		parseInt(value)
	);

	let allActorsPromise = actorIDs.map((id) => getActorDetailsJSON(id));

	let allActors = await Promise.all(allActorsPromise);
	allActors = allActors.map(
		(actor) => new Actor(actor["ime"], actor["prezime"])
	);

	return allActors;
}

async function getMovieDetailsJSON(specificMovie) {
	let movieDetails;
	try {
		let movieDetailsResponse = await fetch(DATA_BASE_URL + specificMovie);
		if (movieDetailsResponse.status === 404) throw "Movie not found";
		if (!movieDetailsResponse.ok) throw "Server side error";
		movieDetails = movieDetailsResponse.json();
	} catch (err) {
		throw err;
	}
	return movieDetails;
}

async function getActorDetailsJSON(actorID) {
	const specificActor = "actors/" + actorID;
	const actorDetailsPromise = await fetch(DATA_BASE_URL + specificActor);
	const actorDetails = actorDetailsPromise.json();
	return actorDetails;
}
