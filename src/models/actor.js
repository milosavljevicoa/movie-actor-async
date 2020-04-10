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

	static createActorFromLiteral(actorLiteral) {
		return new Actor(actorLiteral["ime"], actorLiteral["prezime"]);
	}
}

export default Actor;
