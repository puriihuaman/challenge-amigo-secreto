let listFriends = [];
let winnersList = [];

const REGEX = /^[A-Za-záéíóúÁÉÍÓÚñÑ]+( [A-Za-záéíóúÁÉÍÓÚñÑ]+)*$/;

/**
 * Get the friend's name from the prompt
 * @returns string
 */
function getFriendName() {
	const friendName = getHtmlElement("friendName").value.trim();

	if (!REGEX.test(friendName) || !friendName) {
		alert("Por favor, ingrese un nombre válido (solo letras y espacios).");
		return null;
	}

	if (friendName.length < 2) {
		alert("El nombre es muy corto (mínimo 2 letras).");
		return null;
	}

	if (friendName.length > 50) {
		alert("El nombre es muy largo (máximo 50 letras).");
		return null;
	}

	return friendName;
}

/**
 * Add the name to your friends list
 */
function addFriend() {
	const name = getFriendName();
	if (!name) {
		return;
	}
	if (listFriends.includes(name)) {
		alert("El amigo ya se encuentra en la lista.");
		return;
	}
	listFriends.push(name);

	const input = getHtmlElement("friendName");
	input.value = "";
	input.focus();

	showFriends();
}

/**
 * Show friends names
 */
function showFriends() {
	const friendsList = getHtmlElement("friends-list");

	if (!friendsList) return;

	friendsList.innerHTML = "";

	const fragment = document.createDocumentFragment();
	friendsList.classList.add("fill");

	for (let index = 0; index < listFriends.length; index++) {
		const friend = listFriends[index];

		const li = document.createElement("li");

		li.textContent = friend;
		fragment.prepend(li);
	}

	friendsList.appendChild(fragment);
}

/**
 * Generate a random number
 * @returns number
 */
function generateRandomNumber() {
	return Math.floor(Math.random() * listFriends.length);
}

/**
 * Run the draw
 */
function drawFriends() {
	if (listFriends.length < 2) {
		alert("Por favor, ingrese al menos dos amigos.");
		return;
	}

	const randomNumber = generateRandomNumber();
	const winnerName = listFriends.splice(randomNumber, 1);
	showWinner(winnerName);
}

/**
 * show the winner
 * @param {string} winner
 */
function showWinner(winner) {
	getHtmlElement("friends-list").innerHTML = "";
	const winnerElement = getHtmlElement("result");

	const item = document.createElement("li");
	item.textContent = `El amigo secreto sorteado es: ${winner}`;

	winnerElement.appendChild(item);
	getFriendDrawn(winner);

	const buttonDraw = getHtmlElement(".button-draw");
	buttonDraw.setAttribute("disabled", true);
	buttonDraw.classList.add("disabled");
}

/**
 * Load the list of names that were not drawn.
 * For another giveaway
 */
function drawAgain() {
	if (listFriends.length === 0) {
		getHtmlElement("result").innerHTML = "";
		alert("No tienes ningún amigo. Ingresa los nombres de tus amigos.");
		return;
	}
	getHtmlElement("result").innerHTML = "";
	showFriends();

	const buttonDraw = getHtmlElement(".button-draw");
	buttonDraw.removeAttribute("disabled");
	buttonDraw.classList.remove("disabled");
}

/**
 * Obtener amigo sorteado
 * @returns {string}
 */
function getFriendDrawn(raffledFriend) {
	winnersList.push(raffledFriend);
}

/**
 * Mostrar lista de sorteados
 */
function showDrawnFriends() {
	const dialog = document.getElementById("dialog");
	const winners = document.getElementById("winners");

	if (!dialog || !winners) {
		return;
	}

	if (winnersList.length === 0) {
		alert("No has echo ningún sorteo aún.");
		return;
	}

	const fragment = document.createDocumentFragment();
	winners.innerHTML = "";

	for (let index = 0; index < winnersList.length; index++) {
		const item = document.createElement("li");

		item.textContent = winnersList[index];
		fragment.prepend(item);
	}

	winners.appendChild(fragment);

	if (!dialog.open && winnersList.length > 0) {
		dialog.showModal();
	}
}

/**
 * Close the modal
 */
function closeDialog() {
	const dialog = getHtmlElement("dialog");
	const selectAction = getHtmlElement(".select-action");

	if (!dialog || !selectAction) {
		return;
	}

	const buttonClose =
		dialog.querySelector("button") || dialog.querySelector("#dialog-button");

	dialog.addEventListener("mousedown", (event) => {
		const rect = dialog.getBoundingClientRect();

		const clickOutside =
			event.clientX < rect.left ||
			event.clientX > rect.right ||
			event.clientY < rect.top ||
			event.clientY > rect.bottom;

		if (clickOutside) {
			dialog.close();
			selectAction.value = "";
		}
	});

	buttonClose.addEventListener("click", () => {
		dialog.close();
		selectAction.value = "";
	});
}

/**
 * Reset lists
 */
function resetFriendsList() {
	listFriends = [];
	winnersList = [];
	const friendsList = getHtmlElement("friends-list");
	friendsList.innerHTML = `<li>No hay ningún amigo</li>`;
	friendsList.classList.remove("fill");

	getHtmlElement("result").innerHTML = "";
	const buttonDraw = getHtmlElement(".button-draw");
	buttonDraw.setAttribute("disabled", false);
	buttonDraw.classList.remove("disabled");
}

/**
 * Select an option
 *
 * @returns element
 */
function handleAction() {
	const action = getHtmlElement("action");
	if (!action) {
		return;
	}

	switch (action.value.toLowerCase()) {
		case "another-draw":
			drawAgain();
			break;
		case "winners":
			showDrawnFriends();
			break;
		case "reset":
			resetFriendsList();
			break;
	}
}

/**
 * Get an html element
 * @param {string} selectorName
 * @returns element
 */
function getHtmlElement(selectorName = "") {
	if (!selectorName) return;

	const element =
		document.querySelector(selectorName) ||
		document.getElementById(selectorName);

	if (!element) return;

	return element;
}
