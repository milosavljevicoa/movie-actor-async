import Actor from "./actor";
export default class Movie {
	constructor(id, title, releaseYear, description, actors = new Array()) {
		this.id = id;
		this.title = title;
		this.releaseYear = releaseYear;
		this.description = description;
		this.actors = actors;
	}

	drawListItem(host) {
		const movieListItem = document.createElement("li");
		movieListItem.innerHTML =
			this.id + " - " + this.title + " (released " + this.releaseYear + ")";
		host.appendChild(movieListItem);
	}

	drawDescription(host) {
		host.innerHTML = "";
		if (this.id === -1) host.innerHTML = "Invalid movie";
		else {
			host.innerHTML = "Description: " + this.description + " <br><br> Actors:";
			const ulForActors = document.createElement("ul");
			this.actors.map((actor) => actor.drawListItems(ulForActors));
			host.appendChild(ulForActors);
		}
	}

	static createErrorMovie() {
		return new Movie(-1, "", "", "");
	}

	static createMovieFromLiteral(movieLiteral) {
		return new Movie(
			movieLiteral["id"],
			movieLiteral["title"],
			movieLiteral["realse-year"],
			movieLiteral["description"]
		);
	}

	static doesMovieExist(movieLiteral) {
		return movieLiteral != undefined;
	}

	isMovieError() {
		return this.id === -1;
	}
}
