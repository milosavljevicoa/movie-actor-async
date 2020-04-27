export {};

class Actor {
	private _name: string;
	private _surname: string;
	constructor(_name: string, _surname: string) {
		this._name = _name;
		this._surname = _surname;
	}

	drawListItems(host: HTMLElement): void {
		const movieListItem: HTMLElement = document.createElement("li");
		movieListItem.innerHTML = this._name + " " + this._surname;
		host.appendChild(movieListItem);
	}

	static createActorFromDTO(actorDTO: any): Actor {
		return new Actor(actorDTO["ime"], actorDTO["prezime"]);
	}
}

export default Actor;
