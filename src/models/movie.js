export default class Movie {
	constructor(id, title, releaseYear) {
		this.id = id;
		this.title = title;
		this.releaseYear = releaseYear;
	}

	drawListItem(host) {
		const movieListItem = document.createElement("li");
		movieListItem.innerHTML =
			this.id + " - " + this.title + " (released " + this.releaseYear + ")";
		host.appendChild(movieListItem);
	}
}
