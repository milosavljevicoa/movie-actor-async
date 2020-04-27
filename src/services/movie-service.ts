import Actor from "../models/actor";
import Movie from "../models/movie";
import { fromEvent, from, zip, Observable, Observer } from "rxjs";
import { debounceTime, map, switchMap } from "rxjs/operators";

const DATA_BASE_URL = "http://localhost:3000/";
// const DATA_BASE_URL =
// 	"https://my-json-server.typicode.com/milosavljevicoa/movie-actor-async/";

export async function getAllMovies(): Promise<Observable<Movie>> {
	const moviesResponse: Response = await fetch(DATA_BASE_URL + "movies");
	const allMovies: Array<any> = await moviesResponse.json();
	let movies: Array<Movie> = allMovies.map((movieDTO: any) =>
		Movie.createMovieFromDTO(movieDTO)
	);
	return Observable.create((observer: any) => {
		movies.forEach((movie) => {
			observer.next(movie);
		});
	});
}

export function addEventToInput(inputElement: HTMLElement): void {
	const movieDescriptionElement: HTMLElement | null = document.getElementById(
		"movie-description"
	);
	if (movieDescriptionElement === null) return;
	fromEvent(inputElement, "input")
		.pipe(
			debounceTime(1000),
			map((ev: any) => ev.target.value),
			switchMap((movieTitle: string) => {
				return getInformationAboutMovie(movieTitle);
			})
		)
		.subscribe((movie: Movie) => {
			movie.drawActorsAndDescription(movieDescriptionElement);
		});
}

function getInformationAboutMovie(movieTitle: string) {
	const queryStringMovie: string = "?title=" + formatMovieTitleToDb(movieTitle);

	const movieDTO: Observable<any> = fetchMovieFromDb(queryStringMovie);
	return movieDTO.pipe(
		switchMap((movieDTO: any) => {
			const movie: Observable<Movie> = createMovie(movieDTO);
			const actorsIds: Array<number> = getActorsIds(movieDTO);
			const actors: Observable<Actor> = getActors(actorsIds);
			return combineMovieWithActors(movie, actors);
		})
	);
}

function formatMovieTitleToDb(movieTitle: string): string {
	movieTitle = movieTitle.toLowerCase();
	let allWords: Array<string> = movieTitle.split(" ");
	let modifiedWords: Array<string> = allWords.map(
		(word: string) => word.charAt(0).toUpperCase() + word.slice(1)
	);
	let queryString: string = modifiedWords.join(" ");
	return queryString;
}

function fetchMovieFromDb(queryStringMovie: string): Observable<any> {
	return from(
		fetch(DATA_BASE_URL + "movies/" + queryStringMovie).then((response) =>
			response.json()
		)
	).pipe(map((movieDetails: Array<any>) => movieDetails[0]));
}

function createMovie(movieDTO: any) {
	const movie: Movie =
		movieDTO !== undefined
			? Movie.createMovieFromDTO(movieDTO)
			: Movie.createErrorMovie();
	return Observable.create((observer: Observer<Movie>) => {
		observer.next(movie);
	});
}

function getActorsIds(movieDTO: any): Array<number> {
	let actorsIds: Array<number> = new Array<number>();
	if (movieDTO !== undefined) {
		Object.values(movieDTO["actors"]).forEach((value: any) => {
			let id = parseInt(value);
			actorsIds.push(id);
		});
	}
	return actorsIds;
}

function getActors(actorIDArray: Array<number>) {
	let actors: Array<Observable<any>> = actorIDArray.map((id: any) =>
		fetchActorsFromDb(id)
	);
	let actorsObservable: Observable<Actor>;
	if (actors.length !== 0) {
		actorsObservable = zip(...actors).pipe(
			map((actorsDTO: any) =>
				actorsDTO.map((actorDTO: any) => Actor.createActorFromDTO(actorDTO))
			)
		);
	} else {
		actorsObservable = Observable.create((observer: Observer<Actor>) => {
			observer.next(new Actor("", ""));
		});
	}
	return actorsObservable;
}

function fetchActorsFromDb(actorID: number): Observable<Promise<Actor>> {
	const specificActor = "actors/" + actorID;
	let url = DATA_BASE_URL + specificActor;
	return from(
		fetch(url).then((promise) => promise.json().then((data) => data))
	);
}

function combineMovieWithActors(
	movie: Observable<Movie>,
	actors: Observable<Actor>
): Observable<Movie> {
	return zip(movie, actors).pipe(
		map((data: any) => {
			data[0].setActors(data[1]);
			return data[0];
		})
	);
}
