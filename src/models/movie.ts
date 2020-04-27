export {};
import Actor from "./actor";

export default class Movie {
	private _actors: Array<Actor>;
	private _id: number;
	private _title: string;
	private _releaseYear: string;
	private _description: string;
	constructor(
		_id: number,
		_title: string,
		_releaseYear: string,
		_description: string
	) {
		this._id = _id;
		this._title = _title;
		this._releaseYear = _releaseYear;
		this._description = _description;
		this._actors = new Array<Actor>();
	}

	drawListItem(host: HTMLElement): void {
		const movieListItem: HTMLElement = document.createElement("li");
		movieListItem.innerHTML =
			this._id + " - " + this._title + " (released " + this._releaseYear + ")";
		host.appendChild(movieListItem);
	}

	drawActorsAndDescription(host: HTMLElement): void {
		host.innerHTML = "";
		if (this._id === -1) host.innerHTML = "Invalid movie";
		else {
			host.innerHTML =
				"Description: " + this._description + " <br><br> Actors:";
			const ulForActors: HTMLElement = document.createElement("ul");
			this._actors.forEach((actor) => actor.drawListItems(ulForActors));
			host.appendChild(ulForActors);
		}
	}

	setActors(actors: Array<Actor>): void {
		this._actors = actors;
	}

	static createErrorMovie(): Movie {
		return new Movie(-1, "", "", "");
	}

	static createMovieFromDTO(movieDTO: any): Movie {
		return new Movie(
			movieDTO["id"],
			movieDTO["title"],
			movieDTO["realseYear"],
			movieDTO["description"]
		);
	}

	isErrorMovie(): boolean {
		return this._id === -1;
	}
}
