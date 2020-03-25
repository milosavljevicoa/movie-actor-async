class Actor {
	constructor(name, surname) {
		this.name = name;
		this.surname = surname;
	}

	drawListItems(host) {
		const movieListItem = document.createElement("li");
		movieListItem.innerHTML = this.name + " " + this.surname;
		host.appendChild(movieListItem);
	}
}

export default Actor;
